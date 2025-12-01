import {expect, Locator, Page} from '@playwright/test';

export class OutPatientDashboardPage {
  readonly page: Page;
  readonly acceptPatientBtnLocator: Locator;
  readonly startSessionBtnLocator: Locator;
  readonly startBtnLocator: Locator;
  readonly successNotificationLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.acceptPatientBtnLocator = page.locator(
      "//span[text()='Accept Patient']"
    );
    this.startSessionBtnLocator = page
      .locator("//span[text()='START']")
      .first();
    this.startBtnLocator = page.locator("//button[contains(text(), 'Start')]");
    this.successNotificationLocator = page.locator(
      "//div[contains(@class, 'Toastify__toast--success') and contains(., 'Appointment Accepted')]"
    );
  }
  getAcceptPatientBtnLocator(patientName: string) {
    return this.page
      .locator(
        `//p[contains(text(), '${patientName}')]/following-sibling::div//span[text()='Accept Patient']`
      )
      .first();
  }
  getAcceptedPatientLocator(patientName: string) {
    return this.page
      .locator(
        `//p[contains( text(), '${patientName}')]/following-sibling::div//span[contains(text(), "Accepted by")]`
      )
      .first();
  }
  async clickAcceptPatientBtn(patientName: string) {
    await this.getAcceptPatientBtnLocator(patientName).click({force: true});
  }

  getStartSessionBtnLocator(patientName: string) {
    return this.page
      .locator(
        `//h3[contains(text(), '${patientName}')]/following-sibling::button[.//span[text() = 'START']]`
      )
      .first();
  }
  async clickPatientCard(patientName: string) {
    const locator = this.page.locator(
      `//h3[contains(text(), '${patientName}')]`
    );
    await locator.first().click({force: true});
  }
  async fetchAppointCardOnDashboard(patientName: string) {
    // 1. Find the specific appointment card for the patient.
    const patientCard = this.page
      .locator('div.tw-rounded-lg.tw-border', {hasText: patientName})
      .nth(1);
    // It's good practice to wait for the element to be visible to avoid race conditions.
    await patientCard.waitFor({state: 'visible'});

    // 2. Helper function to keep the code DRY and use a more robust XPath selector.
    const getDetailText = (label: string) => {
      return patientCard
        .locator(`//h4[text()='${label}']//following-sibling::p`)
        .textContent();
    };

    // 3. Fetch all details concurrently. The original code was missing `await`,
    // which is a critical bug as it would return Promises instead of values.
    const [date, reason, time, consultantName, specialty, status, state] =
      await Promise.all([
        getDetailText('DATE'),
        getDetailText('REASON'),
        getDetailText('TIME'),
        getDetailText('CONSULTANT'),
        getDetailText('SPECIALTY'),
        patientCard.locator('div.tw-inline-flex').textContent(),
        patientCard.locator('.appointment-state span').textContent(),
      ]);
  }
}
