import { expect, Locator, Page } from "@playwright/test";

export class AdmissionFormModal {

  readonly page: Page;
  readonly headerTextLocator: Locator;
  readonly closeBtnLocator: Locator;
  readonly submitBtnLocator: Locator;
  readonly registerANewPatientBtnLocator: Locator;
  readonly admitPatientBtnLocator: Locator;
  readonly toggleEmergencyBtnLocator: Locator;
  readonly patientFieldLocator: Locator;
  readonly locationSugestionoptionLocator: Locator;
  readonly authCode: Locator;
  readonly reasonForVisit: Locator;
  readonly checkInDateLocator: Locator;
  readonly checkOutDateLocator: Locator
  readonly specialtyLocator: Locator

  constructor(page: Page) {
    this.page = page;

    this.headerTextLocator = page.getByRole('heading', { name: 'Admit Patient' }).nth(0);
    this.closeBtnLocator = page.getByRole('dialog').getByRole('img');
    this.submitBtnLocator = page.getByRole('button', { name: 'Submit' }).nth(1);
    this.registerANewPatientBtnLocator = page.getByRole('button', { name: '+ Register a new patient' });
    this.admitPatientBtnLocator = page.locator("//button[normalize-space()='Admit patient']");
    this.toggleEmergencyBtnLocator = page.locator("//button[@value='on']");
    this.patientFieldLocator = page.locator('div[role="dialog"] input[placeholder="Search..."]');
    this.locationSugestionoptionLocator=page.locator("//div[@role='dialog']//li[1]")
    this.authCode = page.locator('input[placeholder="Enter code here"]')
    this.reasonForVisit = page.locator('input[placeholder="Enter text"]')
    this.checkInDateLocator = page.getByRole('button', { name: 'Check-in-date '})//* DD-MM-YYYY ' })
    this.checkOutDateLocator = page.getByRole('button', { name: 'Check-out-date '})//* DD-MM-YYYY ' })
    this.specialtyLocator = page.locator("div[class='modal-select__value-container modal-select__value-container--has-value css-hlgwow'] div[class='modal-select__input-container css-19bb58m']");
  }

  async isAdmissionFormModalVisible() {
    return this.headerTextLocator.isVisible();
  }

  async clickCloseBtn() {
    await this.closeBtnLocator.click();
    await expect.soft(this.headerTextLocator).toBeHidden();
  }

  async clickSubmitBtn() {
    await this.submitBtnLocator.click();
  }

  async clickRegisterANewPatientBtn() {
    await this.registerANewPatientBtnLocator.click();
  }

  async clickAdmitPatientBtn() {
    await this.admitPatientBtnLocator.click();
  }

  async clickToggleEmergencyBtn() {
    await this.toggleEmergencyBtnLocator.click();
  }

  async fillPatientField() {
    // Step 1: generate a random single letter (a-z)
    const randomLetter = String.fromCharCode(97 + Math.floor(Math.random() * 26));

    // Step 3: type into the input
  await this.patientFieldLocator.click();
  //await patientFieldLocator.fill(""); // clear any existing text
  await this.patientFieldLocator.pressSequentially(randomLetter);
  }
  // Step 4: wait for dropdown container to appear
  async  selectPatient() {
    await this.locationSugestionoptionLocator.click();
  }
    async fillAuthCode(code: string) {
    await this.authCode.fill(code);
  }
    async fillReasonForVisit(reason: string) {
    await this.reasonForVisit.fill(reason);
  }
  async fillCheckInDate() {
  await this.checkInDateLocator.click();
  // Always click the "Today" button regardless of the day/month/year
  const todayButton = this.page.getByRole('button', {name: /Today/i,});
  await todayButton.click();
}
async fillCheckOutDate() {
  await this.checkOutDateLocator.click();
  // Always click the "Today" button regardless of the day/month/year
  const todayButton = this.page.getByRole('button', {name: /Today/i,});
  await todayButton.click();
}
async selectSpecialty(searchText: string) {
  // Click inside the specialty input
  const field = this.specialtyLocator.first(); // ensure only 1 input is picked
  await field.click();
  await field.pressSequentially(searchText);

  // Wait for options to appear
  const firstOption = this.page.locator("//div[contains(@class,'modal-select__menu')]//div[@role='option']").first();
  await firstOption.waitFor({ state: 'visible' });
  await firstOption.click();
}
}
