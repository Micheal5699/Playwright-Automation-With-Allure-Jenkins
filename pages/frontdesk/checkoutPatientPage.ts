// checkoutPatientPage.ts
import { Page, expect } from "@playwright/test";

export class CheckoutPatientPage {
  private page: Page;
  private toastMessage;
  private checkOutBtn;
  private patientRow;
  private checkoutBtn2;
  private appontmenttab
  private appointmentCard
  private appointmentCard1
  private rescheduleBtn
  private UpdateBtn
  private specialtyDropdown
  private whomToSeeDropdown
  private timeDropdown
  private monthdropdownLocator
  private cancelAppointmentBtn
  private cancelAppointmentModalHeading
  private cancelAppointmentModalBtn
  private canceledAppointmentCard

  constructor(page: Page) {
    this.page = page;
    this.toastMessage = page.locator("//div[@class='dashboard']//section[@aria-label='Notifications Alt+T']");
    this.checkOutBtn = page.locator("(//button[@type='button'][normalize-space()='Check Out'])[1]");
    this.patientRow = page.locator("tbody tr:first-child td a").first();
    this.checkoutBtn2 = page.locator("//button[normalize-space()='Check Out']");
    this.appontmenttab = page.locator("//span[contains(@class,'nav-text tw-whitespace-nowrap no-scrollbar')][normalize-space()='Appointments']");
    this.appointmentCard = page.locator("(//span[contains(text(),'ES')])[1]")
    this.appointmentCard1 = page.locator("(//span[contains(text(),'ADR')])[1]")
    this.rescheduleBtn = page.locator("//button[normalize-space()='Reschedule']")
    this.UpdateBtn = page.locator("//button[normalize-space()='Update']")
    this.specialtyDropdown = page.locator("//label[text()='Specialty']/following::div[contains(@class,'modal-select__input-container')][1]");
    this.whomToSeeDropdown = page.locator("//div[@class='modal-select__value-container css-hlgwow']//div[@class='modal-select__input-container css-19bb58m']");
    this.timeDropdown = page.locator("//div[@class='modal-select__value-container css-hlgwow']//div[@class='modal-select__input-container css-19bb58m']");
    this.monthdropdownLocator = page.locator("//p[normalize-space()='Date of Appointment']");
    this.cancelAppointmentBtn = page.getByRole('button', { name: 'Cancel' })
    this.cancelAppointmentModalHeading = page.getByRole('heading', { name: 'You are about to terminate' })
    this.cancelAppointmentModalBtn = page.getByRole('button', { name: 'Cancel' }).nth(1)
    this.canceledAppointmentCard = page.getByText('canceled')

  }

  // Click the Checkout button for a patient
  async clickCheckoutBtn() {
    await this.checkOutBtn.click();
  }

  // Verify toast message
  async isSuccessToastVisible(): Promise<boolean> {
    return await this.toastMessage.isVisible();
  }

// Select the first patient from the list and click to open details
  async clickPatientbtn() {
    await this.patientRow.waitFor({ state: "visible" });
    await this.patientRow.click();
  }
  
// Click checkout button on the patient details page
async clickCheckoutBtn2() {
  await this.checkoutBtn2.waitFor({ state: "visible" });
  await this.checkoutBtn2.click();
}
  // Click Appointments tab
  async clickAppointmentTab() {
  await this.appontmenttab.waitFor({ state: "visible" });
  await this.appontmenttab.click();

}
async handleAppointment() {
  await this.appointmentCard.waitFor({ state: "visible", timeout: 10000 });
  await this.appointmentCard.click();

  if (await this.page.getByRole("button", { name: "Cancel" }).isVisible()) {
    console.log("Appointment is scheduled → proceeding to cancel");
    await this.page.getByRole("button", { name: "Cancel" }).click();

    // Wait for modal/dialog to appear
    const modal = this.page.getByRole("dialog", { name: /Confirmation/i });

    // Match label with or without *
    const reasonField = this.page.getByLabel(/Reason for Cancellation/i);
    await reasonField.waitFor({ state: "visible", timeout: 10000 });
    await reasonField.fill("Patient unavailable");

    await this.page.getByRole("button", { name: "Proceed" }).click();
    console.log("Appointment canceled successfully");
  } 
  else if (await this.page.getByRole("button", { name: "Reschedule" }).isVisible()) {
    console.log("Appointment already canceled → rescheduling so we can cancel again");
    await this.page.getByRole("button", { name: "Reschedule" }).click();

    const updateButton = this.page.getByRole("button", { name: "Update" });
    await updateButton.waitFor({ state: "visible", timeout: 10000 });
    await updateButton.click();

    // After rescheduling, cancel again
    await this.handleAppointment();
  } 
  else {
    throw new Error(`Neither Cancel nor Reschedule button is visible in the modal.`);
  }
}
async verifySuccessMessage() {
  const successMsg = this.page.getByText('Appointment terminated successfully', { exact: true });
  await expect(successMsg).toBeVisible({ timeout: 10000 });
  console.log("✅ Success message verified: Appointment terminated successfully");
}
async clickAppointmentCard() {
  await this.appointmentCard.waitFor({ state: "visible", timeout: 10000 });
  await this.appointmentCard.click()
}
async cickCancelAppointmentBtn() {
  await this.cancelAppointmentBtn.waitFor({ state: "visible", timeout: 10000 });
  await this.cancelAppointmentBtn.click();
}
async cancelationConfirmation() {
  const modal = this.cancelAppointmentModalHeading;
  await expect(modal).toBeVisible({ timeout: 10000 });
  console.log("✅ Cancel Appointment modal is visible");
}
async clickCancelAppointmentModalBtn() {
  await this.cancelAppointmentModalBtn.waitFor({ state: "visible", timeout: 10000 });
  await this.cancelAppointmentModalBtn.click();
  console.log("✅ Clicked Cancel button on the modal");
}

async accessAppointmentCard() {
  await this.appointmentCard1.waitFor({ state: "visible", timeout: 10000 });
  await this.appointmentCard1.click();
}
async clickRescheduleBtn() {
  await this.rescheduleBtn.waitFor({ state: "visible", timeout: 10000 });
  await this.rescheduleBtn.click();
}
async updateAppointment() {
  await this.UpdateBtn.waitFor({ state: "visible", timeout: 10000 });
  await this.UpdateBtn.click();
}
async verifyCanceledShowsOnCard() {
  await expect(this.canceledAppointmentCard).toBeVisible({ timeout: 10000 });
  console.log("✅ Canceled status is visible on the appointment card");
}

async selectSpecialtyDropdown(searchText: string) {
  await this.specialtyDropdown.click();
  await this.specialtyDropdown.locator("input.modal-select__input").fill(searchText);
  await this.page.locator(".modal-select__option").first().click();
    }

    async selectWhomToSeeDropdown(searchText: string) {
  await this.whomToSeeDropdown.click();
  await this.whomToSeeDropdown.locator("input.modal-select__input").fill(searchText);
  await this.page.locator(".modal-select__option").first().click();
        }
    async selectTimeDropdown() {
  await this.timeDropdown.click();
  await this.page.locator(".modal-select__option").first().click();
    }
    async selectMonthDropdown() {
  await this.monthdropdownLocator.click();
  const today = new Date();
  const day = today.getDate();
  const month = today.toLocaleString("en-US", { month: "long" });
  const year = today.getFullYear();
  const lastDayOfMonth = new Date(year, today.getMonth() + 1, 0).getDate();
  const randomDay = Math.floor(Math.random() * (lastDayOfMonth - day + 1)) + day;
  const randomDate = new Date(year, today.getMonth(), randomDay);
  const randomDayName = randomDate.toLocaleString("en-US", { weekday: "long" });
  const randomMonthName = randomDate.toLocaleString("en-US", { month: "long" });
  const randomDayNumber = randomDate.getDate();
  const suffix = this.getDaySuffix(randomDayNumber);
  const ariaLabel = `${randomDayName}, ${randomMonthName} ${randomDayNumber}${suffix}, ${year}`;
  const dayLocator = this.page.locator(`button[aria-label='${ariaLabel}']`);
  await dayLocator.waitFor({ state: "visible" });
  await dayLocator.click();
}
private getDaySuffix(day: number): string {
  if (day > 3 && day < 21) return "th";
  switch (day % 10) {
    case 1: return "st";
    case 2: return "nd";
    case 3: return "rd";
    default: return "th";
    };
};
};