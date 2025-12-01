import {
  expect,
  type APIRequestContext,
  type APIResponse,
} from '@playwright/test';
import fs from 'fs/promises';
import path from 'path';
import * as mrnUtils from './mrnUtils';
import {formatDate} from './dateutils';

const baseUrl = 'https://dev-api.indigoemr.com/v2';
const todayDate = formatDate();
const defaultLoginPayload = {
  username: 'adeolu@summitech.io',
  password: 'Password1@',
  type: 'clientStaff',
};
const defaultAvailableAppointmentPayload = {
  specialty: 'ophthalmology || generalPractice ',
  branchId: '5fe0a45f0de6b9d5e097f1dd',
  appointmentDate: todayDate,
  consultantId: '63889bba61dce4734caf725a',
};

export class APIUtils {
  private request: APIRequestContext;
  private token?: string;

  constructor(requestContext: APIRequestContext) {
    this.request = requestContext;
  }

  setRequestContext(requestContext: APIRequestContext) {
    this.request = requestContext;
  }

  /**
   * Log in via API, extract token (tries common locations, including response.data.token),
   * save token to disk (login-token.json by default) and optionally save cookies (storage state).
   *
   * @param tokenPath file path to save token JSON (default ./login-token.json)
   * @param saveStorageStateWhenAvailable if true, also call request.storageState({ path: storagePath }) to save cookies
   * @param storagePath file path to save storageState (default ./login-setup.json)
   */
  async loginAndSaveToken(
    tokenPath: string = path.resolve(process.cwd(), './login-token.json'),
    payload: unknown = defaultLoginPayload,
    saveStorageStateWhenAvailable = true,
    storagePath: string = path.resolve(process.cwd(), './login-setup.json')
  ): Promise<string> {
    const loginUrl = `${baseUrl}/login`;

    const resp: APIResponse = await this.request.post(loginUrl, {
      headers: {'Content-Type': 'application/json; charset=utf-8'},
      data: payload,
      
    });
const rawText = await resp.text();
console.log(`[APIUtils] Login response body: ${rawText}`);
    if (!resp.ok()) {
      const bodyText = await resp.text().catch(() => '<unable to read body>');
      throw new Error(`Login API failed: ${resp.status()} - ${bodyText}`);
    }

    // Parse json body
    const body = await resp.json().catch(() => null);    // Extract token from common locations. Your sample shows token at body.data.token
    const token = APIUtils.extractTokenFromResponse(body);
    if (!token) {
      // Save response for debugging and throw
      await fs
        .writeFile(
          tokenPath + '.response.json',
          JSON.stringify(body ?? {}, null, 2),
          'utf8'
        )
        .catch(() => {});
      throw new Error(
        `Login succeeded but no token found in response. Raw response saved to ${tokenPath}.response.json`
      );
    }

    this.token = token;
    // persist token
    await fs.writeFile(tokenPath, JSON.stringify({token}, null, 2), 'utf8');

    // Optionally save storageState (cookies) from request context
    if (saveStorageStateWhenAvailable) {
      try {
        // request.storageState() will save cookies set by the server during this API call
        await this.request.storageState({path: storagePath});
      } catch (e) {
        // non-fatal: keep going, but inform user
        // eslint-disable-next-line no-console
        console.warn(
          'Could not save storageState from request context:',
          (e as Error).message || e
        );
      }
    }

    return token;
  }

  /**
   * Try to load previously-saved token from file.
   */
  async loadTokenFromFile(tokenPath: string = path.resolve(process.cwd(), './login-token.json')): Promise<string | null> {
  try {
    const raw = await fs.readFile(tokenPath, 'utf8');
    try {
      const parsed = JSON.parse(raw);
      if (parsed?.token) {
        this.token = parsed.token;
        console.log(`[APIUtils] Loaded token from file: ${tokenPath}`);
        return parsed.token;
      }
      console.warn(`[APIUtils] token file parsed but missing 'token' property: ${tokenPath}`);
      return null;
    } catch (parseErr) {
      // Save offending content for inspection and return null so login is retried
      const invalidPath = tokenPath + '.invalid.json';
      await fs.writeFile(invalidPath, raw, 'utf8').catch(() => {});
      //console.error(`[APIUtils] Failed to parse ${tokenPath}. Raw content saved to ${invalidPath}. Parse error:`, parseErr.message || parseErr);
      return null;
    }
  } catch (readErr) {
    // file unreadable/missing -> treat as absent token
    return null;
  }
}

  /**
   * Build Authorization headers. Normalizes token with 'Bearer ' prefix if needed.
   */
  authHeader(providedToken?: string): {Authorization: string} {
    const tokenToUse = providedToken ?? this.token;
    if (!tokenToUse)
      throw new Error(
        'No token available. Call loginAndSaveToken() or loadTokenFromFile() first.'
      );
    const normalized = tokenToUse.startsWith('Bearer ')
      ? tokenToUse
      : `Bearer ${tokenToUse}`;
    return {Authorization: normalized};
  }

  async getWithAuth(
    url: string,
    options: {headers?: Record<string, string>} = {}
  ) {
    // Ensure token is available (try to load from file if not)

    // Ensure token is available (try to load from file if not)
    if (!this.token) {
      await this.loadTokenFromFile().catch(() => null);
    }
    if (!this.token) {
      throw new Error(
        'No token available for getWithAuth(); call loginAndSaveToken() first.'
      );
    }

    const headers = {...(options.headers || {}), ...this.authHeader()};

    try {
      // console.log(`[APIUtils] GET ${url}`);
      // console.log('[APIUtils] request headers:', headers);
      const resp = await this.request.get(url, {headers});
      console.log(`[APIUtils] GET ${url} -> ${resp.status()}`);
      return resp;
    } catch (err) {
      console.error(
        `[APIUtils] GET ${url} failed:`,
        (err as Error).message || err
      );
      throw err;
    }
  }
  async postWithAuth(
    url: string,
    data?: unknown,
    options: {headers?: Record<string, string>} = {}
  ) {
    if (!this.token) {
      await this.loadTokenFromFile().catch(() => null);
    }
    if (!this.token) {
      throw new Error(
        'No token available for postWithAuth(); call loginAndSaveToken() first.'
      );
    }

    const headers = {...(options.headers || {}), ...this.authHeader()};

    try {
      console.log(`[APIUtils] POST ${url}`);
      //console.log('[APIUtils] request headers:', headers);
      const resp = await this.request.post(url, {headers, data});
      console.log(`[APIUtils] POST ${url} -> ${resp.status()}`);
      return resp;
    } catch (err) {
      console.error(
        `[APIUtils] POST ${url} failed:`,
        (err as Error).message || err
      );
      throw err;
    }
  }

  /**
   * Best-effort extractor for token from login response.
   * It checks common shapes:
   *  - body.token
   *  - body.data.token  (your sample)
   *  - body.accessToken / body.access_token
   *  - body.jwt
   */
  static extractTokenFromResponse(body: any): string | undefined {
    if (!body) return undefined;
    const tries = [
      (b: any) => b?.data?.token,
      (b: any) => b?.token,
      (b: any) => b?.accessToken,
      (b: any) => b?.access_token,
      (b: any) => b?.jwt,
      (b: any) => b?.data?.accessToken,
      (b: any) => b?.data?.access_token,
      (b: any) => (typeof b === 'string' ? b : undefined),
    ];
    for (const fn of tries) {
      try {
        const v = fn(body);
        if (typeof v === 'string' && v.trim().length > 0) return v.trim();
      } catch {
        // ignore
      }
    }
    return undefined;
  }
  async searchPatients(mrn?: string) {
    const searchMrn = mrn ?? mrnUtils.getRandomMRN();
    const url = `${baseUrl}/patients?mrn=${encodeURIComponent(searchMrn)}`;

    // console.log(`[APIUtils] searchPatients mrn=${searchMrn}`);

    const resp = await this.getWithAuth(url);
    // Do not parse twice here; return the response so caller can choose.
    return resp;
  }
  async getAppointmentPurpose() {
    const url = `${baseUrl}/appointment-purposes`;
    const appointmentPurpose = await this.getWithAuth(url);
    return appointmentPurpose;
  }
  async getAvailableAppointments(
    payload: Record<string, string> = defaultAvailableAppointmentPayload
  ): Promise<APIResponse> {
    const params = new URLSearchParams(payload as Record<string, string>);
    const url = `${baseUrl}/appointment/consultant?${params.toString()}`;
    const resp = await this.getWithAuth(url);

    return resp;
  }
  async bookAppointment(payload: Record<string, string>) {
    const url = `${baseUrl}/appointment`;
    const resp = await this.postWithAuth(url, payload);
    return resp;
  }
  async safeJson(res) {
    try {
      return await res.json();
    } catch {
      return {};
    }
  }
  async acceptPatient(appointmentId: string, appointmentStateId: string) {
    const url = `${baseUrl}/vitals/accept`;
    const payload = {
      appointmentId,
      appointmentStateId,
    };
    const resp = await this.postWithAuth(url, payload);
    return resp;
  }

  async submitVitals(
    appointmentId: string,
    vitalsPayload: Record<string, any>
  ) {
    const url = `${baseUrl}/appointments/${appointmentId}/vitals`;
    // payload shape depends on your API; include appointmentId and vitals fields
    const payload = {
      ...vitalsPayload,
    };
    const resp = await this.postWithAuth(url, payload);
    return resp;
  }
  /*
  async getCookies() {
    // Make login request
    const loginResponse = await this.apiContext.post(
      'https://dev-api.indigoemr.com/v2/login',
      {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        data: loginPayload,
      }
    );

    if (!loginResponse.ok()) {
      throw new Error(`Login API failed: ${loginResponse.status()}`);
    }

    // Get JSON body
    const loginResponseJson = await loginResponse.json();

    // Create new browser context with storage state
    const loginContext = await this.apiContext.request.newContext();
    await loginContext.storageState({path: './login-setup.json'});

    console.log('Login response:', loginResponseJson);
    console.log('Login cookies saved to login-setup.json');

    return loginResponseJson;
  }
    */
}
export default APIUtils;
