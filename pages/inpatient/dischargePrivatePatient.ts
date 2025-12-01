import { Locator, Page, expect } from "@playwright/test";
export class DischargePrivatePatientPage{

readonly page: Page;
readonly admitPatientBtn: Locator;
readonly patientNameField: Locator;
readonly patientSearchedFor: Locator;
readonly autorizationCodeField: Locator;
readonly reasonForVisitField: Locator;
readonly checkInDateField: Locator;
readonly checkOutDateField: Locator;
readonly specialtyDropdown: Locator;
readonly wardDropdown: Locator;
readonly roomDropdown: Locator;
readonly bedSpaceNoDropdown: Locator;
readonly consultantDropdown: Locator;
readonly submitAdmitPatientBtn: Locator;
readonly admissionCardBtn: Locator;
readonly topPatient: Locator;
readonly admitteCardElipsisBtn: Locator;
// readonly cancelAdmissionBtn: Locator;
// readonly reasonField: Locator;
// readonly submitReasonBtn: Locator;
// readonly emergencyToggleBtn: Locator;
readonly awaitCheckoutBtn: Locator;
readonly attendingPhysicianDropdown: Locator;
readonly attendingNurseDropdown: Locator;
readonly treatmentSummaryField: Locator;
readonly symptomsField: Locator;
readonly diagnosisDischargeField: Locator;
readonly dischargePlanField: Locator;
readonly clinicalCommentsField: Locator;
readonly makeBedAvailableCheckbox: Locator;
readonly submitDischargeBtn: Locator;
readonly followUpDateField: Locator;
readonly checkOutBtn: Locator;
readonly proceedBtn: Locator;




constructor(page: Page) {
    this.page = page;
    this.admitPatientBtn = page.getByRole('button', { name: 'Admit patient' });
    this.patientNameField = page.getByRole('dialog').getByRole('textbox', { name: 'Search...' })
    this.patientSearchedFor = page.locator("//div[@role='dialog']//li[1]");
    this.autorizationCodeField = page.locator('input[placeholder="Enter code here"]');
    this.reasonForVisitField = page.locator('input[placeholder="Enter text"]');
    this.checkInDateField = page.getByRole('button', { name: 'Check-in-date * DD-MM-YYYY ' });
    this.checkOutDateField = page.getByRole('button', { name: 'Check-out-date DD-MM-YYYY ' });
    this.specialtyDropdown = page.locator('[id=":rf:-form-item"] > .modal-select__control > .modal-select__value-container > .modal-select__input-container');
    this.wardDropdown = page.locator('[id=":rg:-form-item"] > .modal-select__control > .modal-select__value-container > .modal-select__input-container');
    this.roomDropdown = page.locator('[id=":rh:-form-item"] > .modal-select__control > .modal-select__value-container > .modal-select__input-container');
    this.bedSpaceNoDropdown = page.locator('[id=":ri:-form-item"] > .modal-select__control > .modal-select__value-container > .modal-select__input-container');
    this.consultantDropdown = page.locator('[id=":rj:-form-item"] > .modal-select__control > .modal-select__value-container > .modal-select__input-container');
    this.submitAdmitPatientBtn = page.getByRole('button', { name: 'Admit Patient', exact: true });
    this.admissionCardBtn = page.locator("//div[@class='tw-grid tw-gap-6 tw-mb-9 md:tw-grid-cols-4']//div[2]");
    this.topPatient = page.locator("tbody tr:first-child td a").first();
    this.admitteCardElipsisBtn = page.locator('i.iconmoon.icon-option');
    // this.cancelAdmissionBtn = page.getByText('Cancel admission', { exact: true });
    // this.reasonField = page.getByRole('textbox', { name: 'Enter Reason' });
    // this.submitReasonBtn = page.getByRole('button', { name: 'submit' });
    // this.emergencyToggleBtn = page.getByRole('switch')
    this.awaitCheckoutBtn = page.getByText('Await Checkout', { exact: true })
    this.attendingPhysicianDropdown = page.locator('.modal-select__input-container').first()
    this.attendingNurseDropdown = page.locator('div:nth-child(2) > .tw-relative > .form__select > .modal-select__control > .modal-select__value-container > .modal-select__input-container');
    this.treatmentSummaryField = page.getByRole('textbox', { name: 'Type here' }).first();
    this.symptomsField = page.getByRole('textbox', { name: 'Search symptoms...' });
    this.diagnosisDischargeField = page.getByRole('textbox', { name: 'Search diagnosis at discharge' });
    this.dischargePlanField = page.locator('#plan');
    this.clinicalCommentsField = page.getByRole('textbox', { name: 'Type here' }).nth(2);
    this.makeBedAvailableCheckbox = page.locator('input[type="checkbox"]').nth(0);
    this.submitDischargeBtn = page.getByRole('button', { name: 'Submit' })
    this.followUpDateField = page.getByRole('button', { name: 'Follow up date DD-MM-YYYY ' });
    this.checkOutBtn = page.getByText('Checkout', { exact: true });
    this.proceedBtn = page.getByRole('button', { name: 'Proceed' })


}

async clickAdmitPatientBtn(){
await this.admitPatientBtn.click();
}
async enterPatientName(patientName: string){
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const randomIndex = Math.floor(Math.random() * alphabet.length);
  const ramdomalphalbet = alphabet[randomIndex];
     await this.patientNameField.click({force: true});
     await this.patientNameField.pressSequentially(ramdomalphalbet);
     await this.patientSearchedFor.click();
}
async enterAuthorizationCode(authorizationCode: string) {
  const authField = this.page.locator('input[placeholder="Enter code here"]');

  // Wait for the field to appear in the DOM (whether enabled or disabled)
  await authField.waitFor({ state: 'attached', timeout: 10000 });

  // Check if it's enabled
  const isEnabled = await authField.isEnabled();

  if (isEnabled) {
    console.log("✅ Authorization field is enabled. Filling in the code...");
    await authField.click();
    await authField.fill(authorizationCode);
  } else {
    console.log("⚠️ Authorization field is disabled. Skipping this step...");
    // Optionally, you can add an assertion or just skip silently
  }
}
async enterReasonForVisit(reason: string){
    await this.reasonForVisitField.click();
    await this.reasonForVisitField.fill(reason);
}
private getRandomDate(daysFromTodayStart: number, daysFromTodayEnd: number): Date {
    const today = new Date();
    const randomOffset =
      Math.floor(Math.random() * (daysFromTodayEnd - daysFromTodayStart + 1)) +
      daysFromTodayStart;
    const randomDate = new Date(today);
    randomDate.setDate(today.getDate() + randomOffset);
    return randomDate;
  }

  private formatDateForSelector(date: Date): string {
    const options: Intl.DateTimeFormatOptions = { weekday: "long", month: "long", day: "numeric" };
    const formatted = date.toLocaleDateString("en-US", options);
    const day = date.getDate();

    const suffix =
      day % 10 === 1 && day !== 11
        ? "st"
        : day % 10 === 2 && day !== 12
        ? "nd"
        : day % 10 === 3 && day !== 13
        ? "rd"
        : "th";

    return `${formatted.replace(day.toString(), `${day}${suffix}`)},`;
  }

  async enterCheckInDate() {
    const checkInDate = this.getRandomDate(1, 10);
    const formattedCheckIn = this.formatDateForSelector(checkInDate);

    await this.checkInDateField.click();
    await this.page.getByRole("button", { name: new RegExp(formattedCheckIn, "i") }).click();

    console.log(`✅ Selected random Check-in date: ${formattedCheckIn}`);
    return checkInDate;
  }

  async enterCheckOutDate(checkInDate: Date) {
    const checkOutDate = new Date(checkInDate);
    checkOutDate.setDate(checkInDate.getDate() + Math.floor(Math.random() * 5) + 1);
    const formattedCheckOut = this.formatDateForSelector(checkOutDate);

    await this.checkOutDateField.click();
    await this.page.getByRole("button", { name: new RegExp(formattedCheckOut, "i") }).click();

    console.log(`✅ Selected random Check-out date: ${formattedCheckOut}`);
  }
async selectSpecialty(specialty: string) {
    await this.specialtyDropdown.click({ force: true });
    await this.specialtyDropdown.pressSequentially(specialty);
    const firstOption = this.page.locator('[role="option"]').first();
    await firstOption.click();
}
async selectWard(ward: string) {
    await this.wardDropdown.click();
    await this.wardDropdown.pressSequentially(ward);
    const firstOption = this.page.locator('[role="option"]').first();
    await firstOption.click();
}
async selectRoom(room: string) {
    await this.roomDropdown.click();
    await this.roomDropdown.pressSequentially(room);
    const firstOption = this.page.locator('[role="option"]').first();
    await firstOption.click();
}
async selectBedSpaceNo(bedSpace: string) {
    await this.bedSpaceNoDropdown.click();
    await this.bedSpaceNoDropdown.pressSequentially(bedSpace);
    const firstOption = this.page.locator('[role="option"]').first();
    await firstOption.click();
}
async selectConsultant(consultant: string) {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const randomIndex = Math.floor(Math.random() * alphabet.length);
  const ramdomalphalbet = alphabet[randomIndex];
    await this.consultantDropdown.click();
    await this.consultantDropdown.pressSequentially(ramdomalphalbet);
    const firstOption = this.page.locator('[role="option"]').first();
    await firstOption.click();
}
async clickSubmitAdmitPatientBtn(){
    await this.submitAdmitPatientBtn.click();   
}
async clickAdmissionCardBtn(){
    await this.admissionCardBtn.click();
}
async clickTopPatient(){
    await this.topPatient.click();
}
async clickAdmittedCardElipsisBtn(){
    await this.admitteCardElipsisBtn.first().click();
}
// async clickCancelAdmissionBtn(){
//     await this.cancelAdmissionBtn.click();
// }
// async enterReasonForCancellation(reason: string){
//     await this.reasonField.click();
//     await this.reasonField.fill(reason);
// }
// async clickSubmitReasonBtn(){
//     await this.submitReasonBtn.click();
// }
// async toggleEmergencySwitch(){
//     await this.emergencyToggleBtn.click();
// }
// async verifyAdmitPatientBtnIsDisabled() {
//     await expect(this.submitAdmitPatientBtn).toBeDisabled();
// }
async clickAwaitCheckoutBtn(){
    await this.awaitCheckoutBtn.click();
}
async selectAttendingPhysician(physician: string) {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const randomIndex = Math.floor(Math.random() * alphabet.length);
  const ramdomalphalbet = alphabet[randomIndex];
    await this.attendingPhysicianDropdown.click();
    await this.attendingPhysicianDropdown.pressSequentially(ramdomalphalbet);
    const firstOption = this.page.locator('[role="option"]').first();
    await firstOption.click();
}
async selectAttendingNurse(nurse: string) {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const randomIndex = Math.floor(Math.random() * alphabet.length);
  const ramdomalphalbet = alphabet[randomIndex];
    await this.attendingNurseDropdown.click();
    await this.attendingNurseDropdown.pressSequentially(ramdomalphalbet);
    const firstOption = this.page.locator('[role="option"]').first();
    await firstOption.click();
}
async enterTreatmentSummary(summary: string){
    await this.treatmentSummaryField.click();
    await this.treatmentSummaryField.fill(summary);
}
async enterSymptoms(symptoms: string){
   const alphabet = "abcdefghiklmnoprstuvwyz";
  const randomIndex = Math.floor(Math.random() * alphabet.length);
  const ramdomalphalbet = alphabet[randomIndex];
    await this.symptomsField.click();
    await this.symptomsField.pressSequentially(ramdomalphalbet);
    const firstOption = this.page.locator('[role="option"]').first();
    await firstOption.click();
}
async enterDiagnosisAtDischarge(diagnosis: string){
    const alphabet = "abcdefghiklmnoprstuvwyz";
  const randomIndex = Math.floor(Math.random() * alphabet.length);
  const ramdomalphalbet = alphabet[randomIndex];
    await this.diagnosisDischargeField.click();
    await this.diagnosisDischargeField.pressSequentially(ramdomalphalbet);
    const firstOption = this.page.locator('[role="option"]').first();
    await firstOption.click();
}
async clickReasonForDischargeCheckbox() {
    // Total number of checkboxes you listed (0–5)
    const randomIndex = Math.floor(Math.random() * 6);
    await this.page.getByRole('checkbox').nth(randomIndex).click();
    console.log(`✔️ Clicked checkbox at index: ${randomIndex}`);
}
async enterDischargePlan(plan: string){
    await this.dischargePlanField.click();
    await this.dischargePlanField.fill(plan);
}
async clickDischargeServicesCheckbox() {
    const checkboxSelectors = [
        this.page.locator('.tw-col-span-6 > .undefined > input').first(),
        this.page.locator('div:nth-child(3) > .tw-col-span-6 > .undefined > input'),
        this.page.locator('div:nth-child(4) > .tw-col-span-6 > .undefined > input')
    ];
    const randomIndex = Math.floor(Math.random() * checkboxSelectors.length);
    await checkboxSelectors[randomIndex].click();
    console.log(`✔️ Clicked custom checkbox at index: ${randomIndex}`);
}
async enterClinicalComments(comments: string){
    await this.clinicalCommentsField.click();
    await this.clinicalCommentsField.fill(comments);
}
async clickMakeBedAvailableCheckbox(){
    await this.makeBedAvailableCheckbox.click();
}
async clickSubmitDischargeBtn(){
    await this.submitDischargeBtn.click();
}
// Generate a random date
/**
 * Enter a follow-up date in the date picker
 * @param daysFromTodayStart - minimum days from today
 * @param daysFromTodayEnd - maximum days from today
 */
async enterFollowUpDate(daysFromTodayStart: number = 1, daysFromTodayEnd: number = 14) {
    // Generate a random date within the given range
    const today = new Date();
    const randomOffset = Math.floor(Math.random() * (daysFromTodayEnd - daysFromTodayStart + 1)) + daysFromTodayStart;
    const followUpDate = new Date(today);
    followUpDate.setDate(today.getDate() + randomOffset);
    // Format date for the date picker selector
    const options: Intl.DateTimeFormatOptions = { weekday: "long", month: "long", day: "numeric" };
    const day = followUpDate.getDate();
    const suffix =
        day % 10 === 1 && day !== 11 ? "st" :
        day % 10 === 2 && day !== 12 ? "nd" :
        day % 10 === 3 && day !== 13 ? "rd" : "th";
    const formattedDate = `${followUpDate.toLocaleDateString("en-US", options).replace(day.toString(), `${day}${suffix}`)},`;
    // Open the date picker
    await this.followUpDateField.click();
    // Click the random date
    await this.page.getByRole("button", { name: new RegExp(formattedDate, "i") }).click();
    console.log(`🟦 FINAL UI LABEL TO CLICK: ${formattedDate}`);
    return followUpDate;
}

async clickCheckOutBtn(){
    await this.checkOutBtn.click();
}
async clickProceedBtn(){
    await this.proceedBtn.click();
}
async verifySubmitDischargeBtnIsDisabled() {
    const isDisabled = await this.submitDischargeBtn.isDisabled();

    if (isDisabled) {
        console.log("⚠️  Submit button is disabled, please enter treatment summary before proceeding.");
    } else {
        console.log("✅ Submit button is enabled.");
    }
  }
  async verifySubmitDischargeBtnIsDisabledCB() {
    const isDisabled = await this.submitDischargeBtn.isDisabled();

    if (isDisabled) {
        console.log("‼️  Check a reason for discharge checkbox to enable the Submit button.");
    } else {
        console.log("✅ Submit button is enabled.");
    }
  }
  async verifySubmitDischargeBtnIsDisabledDP() {
    const isDisabled = await this.submitDischargeBtn.isDisabled();

    if (isDisabled) {
        console.log("‼️  Enter Discharge Plan to enable the Submit button.");
    } else {
        console.log("✅ Submit button is enabled.");
    }
  }
  async verifySubmitDischargeBtnIsDisabledCC() {
    const isDisabled = await this.submitDischargeBtn.isDisabled();

    if (isDisabled) {
        console.log("‼️  Enter Discharge Plan to enable the Submit button.");
    } else {
        console.log("✅ Submit button is enabled.");
    }
  }
}