import { expect } from "@playwright/test";
import { test } from "../fixture/fixture-loader";
import { APIUtils } from "../utils/APIUtils";
import { getRandomMRN } from "../utils/mrnUtils";
import { getDateYMD } from "../utils/dateutils";

// --- Constants ---
const todayDate = getDateYMD();
const DEFAULT_BRANCH_ID = "5fe0a45f0de6b9d5e097f1dd";
const DEFAULT_CONSULTANT_ID = "63889bba61dce4734caf725a";
const DEFAULT_SPECIALTY = "generalPractice";

//test.use({ storageState: "noAuth.json" });

// --- Helpers ---
const log = (msg: string, data?: any) =>
  console.log(`[QA-LOG] ${msg}`, data ?? "");

const getDateFromSlot = (slot: any) =>
  slot?.appointmentDate || slot?.date || slot?.day || slot?.slotDate || todayDate;

const buildBookPayload = ({
  purpose,
  patient,
  slot,
  specialty,
}: {
  purpose: any;
  patient: any;
  slot: any;
  specialty: string;
}) => ({
  appointmentDate: getDateFromSlot(slot),
  appointmentPurpose: purpose,
  appointmentState: {
    state: "consultant",
    staffId: DEFAULT_CONSULTANT_ID,
    staffName: "Adeolu1 Ogungbesan",
  },
  patient,
  appointmentSlot: slot,
  consultant: "5fd740d728641f3f787edcb6",
  branchId: DEFAULT_BRANCH_ID,
  specialty,
  section: "vitals",
});

// ============================================================
// Chained Test Suite: Book → Accept Appointment via API
// ============================================================
test.describe("Appointment Booking and Acceptance Flow", () => {
  let appointmentId: string | null = null;
  let appointmentStateId: string | null = null;

test("Book and accept patient appointment via API", async ({ request }) => {
    const api = new APIUtils(request);
    const token = await api.loginAndSaveToken();
    expect.soft(token, "Auth token should be valid").toBeTruthy();

    // --- Step 1: Search for patient ---
    await test.step("Search for a patient", async () => {
      const mrn = getRandomMRN();
      log("Searching MRN:", mrn);

      const patientResp = await api.searchPatients(mrn);
      expect.soft(patientResp.ok()).toBeTruthy();

      const patientBody = await api.safeJson(patientResp);
      const patientDocs = patientBody?.data?.docs ?? [];
      expect(Array.isArray(patientDocs)).toBe(true);

      if (patientDocs.length < 1) throw new Error("No patients found from search.");

      const selectedPatient = patientDocs[1] ?? patientDocs[0];
      const patient = {
        name: selectedPatient?.name ?? "N/A",
        mrn: selectedPatient?.mrn ?? "N/A",
        _id: selectedPatient?._id ?? "N/A",
      };

      log("Selected patient:", patient);

      // Save for reuse
      (global as any).patient = patient;
    });

    // --- Step 2: Get appointment purposes ---
    const purposeResp = await api.getAppointmentPurpose();
    expect.soft(purposeResp.ok()).toBeTruthy();

    const purposeBody = await api.safeJson(purposeResp);
    const purposes = purposeBody?.data ?? [];
    if (purposes.length === 0) throw new Error("No appointment purposes found.");

    const appointmentPurpose = {
      name: purposes[0]?.name,
      _id: purposes[0]?._id,
      price: purposes[0]?.price ?? 0,
    };
    log("Using appointment purpose:", appointmentPurpose);

    // --- Step 3: Get available slots ---
    const slotPayload = {
      specialty: DEFAULT_SPECIALTY,
      branchId: DEFAULT_BRANCH_ID,
      appointmentDate: todayDate,
      consultantId: DEFAULT_CONSULTANT_ID,
    };

    const slotsResp = await api.getAvailableAppointments(slotPayload);
    expect.soft(slotsResp.ok()).toBeTruthy();

    const slotsBody = await api.safeJson(slotsResp);
    const slots = slotsBody?.data?.availableAppointmentSlots ?? [];
    if (!Array.isArray(slots) || slots.length === 0)
      throw new Error("No available appointment slots found.");

    log(`Fetched ${slots.length} available slots.`);

    // --- Step 4: Book an appointment ---
    await test.step("Book appointment slot", async () => {
      const patient = (global as any).patient;
      let booked = false;
      let lastResponse = null;

      for (const [i, slot] of slots.entries()) {
        const bookPayload = buildBookPayload({
          purpose: appointmentPurpose,
          patient,
          slot,
          specialty: DEFAULT_SPECIALTY,
        });

        log(`Attempting to book slot #${i + 1}`, slot);

        const resp = await api.bookAppointment(bookPayload);
        lastResponse = resp;
        const body = await api.safeJson(resp);

        if (resp.ok()) {
          log("✅ Appointment booked successfully:", body);
          booked = true;

          const appointmentRecord = Array.isArray(body?.data)
            ? body.data[0]
            : body?.data ?? null;

          appointmentId = appointmentRecord?._id ?? appointmentRecord?.id ?? null;

          const stateHistory = appointmentRecord?.appointmentStateHistory;
          if (Array.isArray(stateHistory) && stateHistory.length > 0) {
            const last = stateHistory[stateHistory.length - 1];
            appointmentStateId = last?._id ?? last?.id ?? null;
          } else {
            appointmentStateId = stateHistory?._id ?? stateHistory?.id ?? null;
          }

          log("Stored Appointment ID:", appointmentId);
          log("Stored Appointment State ID:", appointmentStateId);
          break;
        }

        const message = (body?.message || body?.error || "").toLowerCase();
        if (message.includes("appointment slot already taken")) {
          log("⚠️ Slot already taken, trying next...");
          continue;
        }

        log(`❌ Booking failed on slot #${i + 1}:`, body);
        break;
      }

      expect.soft(booked).toBeTruthy();
      if (!booked && lastResponse) {
        const errBody = await api.safeJson(lastResponse);
        log("❌ Failed to book after all attempts:", errBody);
      }
    });

    // --- Step 5: Accept the appointment ---
    await test.step("Accept booked appointment", async () => {
      if (!appointmentId || !appointmentStateId) {
        console.error("Missing appointmentId or appointmentStateId:", {
          appointmentId,
          appointmentStateId,
        });
        throw new Error("Cannot accept appointment: missing IDs");
      }

      const acceptApptResp = await api.acceptPatient(appointmentId, appointmentStateId);
      const body = await api.safeJson(acceptApptResp);

      log("Accept Patient Response:", JSON.stringify(body, null, 2));

      expect.soft(acceptApptResp.ok(), "Accept API should return OK").toBeTruthy();

      if (acceptApptResp.ok()) {
        console.log("✅ Appointment accepted successfully");
      } else {
        console.error("❌ Failed to accept appointment");
      }
    });
  });
});
