import { Locator, Page, expect } from "@playwright/test";

export class InpatientAdmitPatientPage{

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
readonly cancelAdmissionBtn: Locator;
readonly reasonField: Locator;
readonly submitReasonBtn: Locator;
readonly emergencyToggleBtn: Locator;




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
    this.cancelAdmissionBtn = page.getByText('Cancel admission', { exact: true });
    this.reasonField = page.getByRole('textbox', { name: 'Enter Reason' });
    this.submitReasonBtn = page.getByRole('button', { name: 'submit' });
    this.emergencyToggleBtn = page.getByRole('switch')


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
    await this.specialtyDropdown.click();
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
    await this.admitteCardElipsisBtn.click();
}
async clickCancelAdmissionBtn(){
    await this.cancelAdmissionBtn.click();
}
async enterReasonForCancellation(reason: string){
    await this.reasonField.click();
    await this.reasonField.fill(reason);
}
async clickSubmitReasonBtn(){
    await this.submitReasonBtn.click();
}
async toggleEmergencySwitch(){
    await this.emergencyToggleBtn.click();
}
async verifyAdmitPatientBtnIsDisabled() {
    await expect(this.submitAdmitPatientBtn).toBeDisabled();
}
}