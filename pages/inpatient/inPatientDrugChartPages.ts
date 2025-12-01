import { Locator, Page, expect } from "@playwright/test";

export class InpatientDrugChartPage{

readonly page: Page;
readonly navigationSideBarLocator: Locator;
readonly patientButton: Locator;
readonly patientRowBtn: Locator;
readonly appountmentTabBtn: Locator;
readonly systemDoneCard: Locator;
readonly prescriptionBtn: Locator;
readonly addPrescriptionBtn: Locator;
readonly selectPrescriptionDropdown: Locator;
readonly selectDrugType: Locator;
readonly dosageInput: Locator;
readonly unitDropdown: Locator;
readonly routeDropdown: Locator;
readonly frequencyDropdown: Locator;
readonly durationDropdown: Locator;
readonly createDrugChartChckbox: Locator;
readonly addItemBtn: Locator;
readonly submitBtn: Locator;
readonly drugChartBtn: Locator;
readonly administerDoseBtn: Locator;
readonly additionalNoteField: Locator;
readonly administerBtn: Locator;
readonly successMessage: Locator;
readonly timeLeftToTkaeDose: Locator;
readonly closeSuccessModal: Locator;
readonly viewAdministered: Locator;
readonly verifyAdministeredCard: Locator;
readonly closeButton: Locator;
readonly drugChartListLocator: Locator;
readonly drugChartListPage: Locator;
readonly administerNextDoseBtn: Locator;
readonly hoursLeftToTakeDose: Locator;



constructor(page: Page) {
    this.page = page;
    this.navigationSideBarLocator = page.locator(".navigation-sidebar");
    this.patientButton = this.page.getByRole('link', { name: ' Patients' })
    this.patientRowBtn = this.page.locator("tbody tr:first-child td a").first();
    this.appountmentTabBtn = this.page.getByRole('link', { name: 'Appointments' })
    this.systemDoneCard = this.page.getByText('systemDone').first()
    this.prescriptionBtn = this.page.getByRole('button', { name: ' Prescription' })
    this.addPrescriptionBtn = this.page.getByRole('button', { name: ' Add Prescription' })
    this.selectPrescriptionDropdown = this.page.locator('.modal-select__value-container.modal-select__value-container--is-multi > .modal-select__input-container')
    this.selectDrugType = this.page.locator("(//div[@class='modal-select__input-container css-19bb58m'])[3]");
    this.dosageInput = this.page.getByRole('textbox', { name: '0' })
    this.unitDropdown = this.page.locator('.tw-col-span-3 > .tw-relative > .form__select > .modal-select__control > .modal-select__value-container > .modal-select__input-container').first();
    this.routeDropdown = this.page.locator('div:nth-child(3) > .tw-relative > .form__select > .modal-select__control > .modal-select__value-container > .modal-select__input-container')
    this.frequencyDropdown = this.page.locator('div:nth-child(4) > .tw-relative > .form__select > .modal-select__control > .modal-select__value-container > .modal-select__input-container')
    this.durationDropdown = this.page.locator('div:nth-child(5) > .tw-relative > .form__select > .modal-select__control > .modal-select__value-container > .modal-select__input-container').first()
    this.createDrugChartChckbox = this.page.getByText('Create appointment drug chart')
    this.addItemBtn = this.page.getByRole('button', { name: ' Add Item' })
    this.submitBtn = this.page.getByRole('button', { name: 'Submit' })
    this.drugChartBtn = this.page.getByRole('button', { name: ' Drug Charts' })
    this.administerDoseBtn = this.page.getByText('Administer Dose').first()
    this.additionalNoteField = this.page.getByRole('textbox', { name: 'Any extra details you\'ll like' })
    this.administerBtn = this.page.getByRole('button', { name: 'Administer', exact: true })
    this.successMessage = this.page.getByRole('heading', { name: 'Drug has been administered' })
    this.timeLeftToTkaeDose = this.page.getByRole('heading', { name: 'Time left for patient to take' })
    this.closeSuccessModal = this.page.getByRole('button', { name: 'Close' })
    this.viewAdministered = this.page.locator('button:has-text("Administered")').first();
    this.verifyAdministeredCard = this.page.getByText('Administered', { exact: true })
    this.closeButton = page.locator('.modal__header--icon > .close_svg__feather > path')
    this.drugChartListLocator = page.getByRole('button', { name: 'List' })
    this.drugChartListPage = page.getByRole('cell', { name: 'S/N' });
    this.administerNextDoseBtn = this.page.getByText('Administer Next Dose').first()
    this.hoursLeftToTakeDose = this.page.locator('h3[class="tw-text-3xl tw-font-semibold tw-text-gray-800"]');

}
async clickSideBarPatientButton() {
await this.navigationSideBarLocator.hover();
await this.patientButton.click();
}
async clickPatientBtn(){
await this.patientRowBtn.waitFor({ state: "visible" });
await this.patientRowBtn.click();
}
async clickAppointmentTabBtn(){
await this.appountmentTabBtn.click();
}
async clickSystemDoneCard(){
await this.systemDoneCard.click();
}
async clickPrescriptionBtn(){
await this.prescriptionBtn.click();
}
async clickAddPrescriptionBtn(){
await this.addPrescriptionBtn.click();
}
async selectPrescriptionOption(prescriptionName: string){
    await this.selectPrescriptionDropdown.click({ force: true });
    await this.selectPrescriptionDropdown.locator("input.modal-select__input").fill(prescriptionName);
  await this.page.locator(".modal-select__option").first().click();
}
async fillDrugtype(drugName: string) {
    await this.selectDrugType.click({ force: true });
    await this.selectDrugType.locator("input.modal-select__input").fill(drugName);
    await this.page.locator(".modal-select__option").first().click();
}
async fillDosage(dosageValue: string) {
    await this.dosageInput.fill(dosageValue);
}
async selectUnit(unitValue: string) {
    await this.unitDropdown.click({ force: true });
    await this.unitDropdown.locator("input.modal-select__input").fill(unitValue);
    await this.page.locator(".modal-select__option").first().click();
}
async selectRoute(routeValue: string) {
    await this.routeDropdown.click({ force: true });
    await this.routeDropdown.locator("input.modal-select__input").fill(routeValue);
    await this.page.locator(".modal-select__option").first().click();
}
async selectFrequency(frequencyValue: string) {
    await this.frequencyDropdown.click({ force: true });
    await this.frequencyDropdown.locator("input.modal-select__input").fill(frequencyValue);
    await this.page.locator(".modal-select__option").first().click();
}
async selectDuration(durationValue: string) {
    await this.durationDropdown.click({ force: true });
    await this.durationDropdown.locator("input.modal-select__input").fill(durationValue);
    await this.page.locator(".modal-select__option").first().click();
}
async checkCreateDrugChartCheckbox() {
    await this.createDrugChartChckbox.click();
}
async clickAddItemBtn(){
    await this.addItemBtn.click();
}
async clickSubmitBtn(){
    await this.submitBtn.click();
}
 async verifySuccessMessage(message: string) {
    const successToast = this.page.locator(`//div[contains(text(),'${message}')]`);
    await expect(successToast).toBeVisible();
}
async clickDrugChartBtn(){
    await this.drugChartBtn.click();
}
async clickAdministerDoseBtn(){
    await this.administerDoseBtn.click();
}
async fillAdditionalNoteField(note: string) {
    await this.additionalNoteField.fill(note);
}
async clickAdministerBtn(){
    await this.administerBtn.click();
}
async verifySuccessMessageAdministered() {
    await expect(this.successMessage).toBeVisible({ timeout: 10000 });
}
async verifyTimeLeftToTakeDose() {
    await expect(this.timeLeftToTkaeDose).toBeVisible({ timeout: 10000 });
}
async clickCloseSuccessModal(){
    await this.closeSuccessModal.click();
}
async viewAdministeredCard() {
    await this.viewAdministered.click();
}
async verifyAdministerdDrugChart() {
    await expect(this.verifyAdministeredCard).toBeVisible({ timeout: 10000 });
}
async clickCloseButton() {
    await this.closeButton.click();
}
async viewDrugChartList() {
    await this.drugChartListLocator.click();
}
async VerifyUserIsOnDrugChartListPage() {
    await expect(this.drugChartListPage).toBeVisible({ timeout: 10000 });
}
async clickAdministerNextDoseBtn(){
    await this.administerNextDoseBtn.click();
}
async verifyHoursLeftToTakeDose() {
  await expect(this.hoursLeftToTakeDose).toBeVisible({ timeout: 10000 });
  const timeLeftText = await this.hoursLeftToTakeDose.textContent();
  console.log(`🕒 ${timeLeftText?.trim()}`);
}
async getLatestDrugChartTimestamp() {
  await this.clickDrugChartBtn();
  await this.page.waitForTimeout(2000);
  const timestamps = await this.page.locator("text=Administered at").allInnerTexts();
  if (timestamps.length === 0) {
    console.log("⚠️ No administered timestamps found in drug chart.");
    return null;
  }
  const latestTimestamp = timestamps[0].trim();
  console.log(`🕒 Latest drug chart entry: ${latestTimestamp}`);
  return latestTimestamp;
}
}