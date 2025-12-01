import { Locator, Page, expect } from "@playwright/test";

export class ExtendHMOPatientPage {

  readonly page: Page;
  readonly admissionCardBtn: Locator;
  readonly filterDropdown: Locator;
  readonly sponsorsHMOdropdown: Locator;
  readonly anchorHMO: Locator;
  readonly gateWayHMO: Locator;
  readonly applyfilterBtn: Locator;
  readonly topPatient: Locator;
  readonly admitteCardElipsisBtn: Locator;
  readonly extendAdmissionBtn: Locator;
  readonly checkInDateField: Locator;
  readonly chooseyearDropdown: Locator;
  readonly checkOutDateField: Locator;
  readonly admitPatientBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.admissionCardBtn = page.locator("//div[@class='tw-grid tw-gap-6 tw-mb-9 md:tw-grid-cols-4']//div[2]");
    this.filterDropdown = page.getByRole('button', { name: 'Filters' });
    this.sponsorsHMOdropdown = page.locator('.modal-select__input-container').first();
    this.anchorHMO = page.getByRole('option', { name: 'ANCHOR' });
    this.gateWayHMO = page.getByRole('option', { name: 'Gateway' });
    this.applyfilterBtn = page.getByRole('button', { name: 'Apply filter' });
    this.topPatient = page.locator("tbody tr:first-child td a").first();
    this.admitteCardElipsisBtn = page.locator('i.iconmoon.icon-option');
    this.extendAdmissionBtn = page.getByText("Extend Admission").first();
    this.checkInDateField = page.locator("body > div:nth-child(5) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > form:nth-child(1) > div:nth-child(3) > div:nth-child(6) > button:nth-child(1) > div:nth-child(1)");
    this.checkOutDateField = page.locator("//p[normalize-space()='Check-out-date']");
    this.chooseyearDropdown = page.getByLabel('Choose the Year')
    this.admitPatientBtn = page.getByRole('button', { name: 'Admit Patient' });
  }

  async clickAdmissionCardBtn() {
    await this.admissionCardBtn.click();
  }

  async clickFilterDropdown() {
    await this.filterDropdown.click();
  }

  async clickTopPatient() {
    await this.topPatient.click();
  }
  async clickSponsorsHMOdropdown() {
    await this.sponsorsHMOdropdown.click();
  }
  async clickAnchorHmo() {
    await this.anchorHMO.click();
  }
  async clickGateWayHmo() {
    await this.gateWayHMO.click();
  }
    async clickApplyfilterBtn() {
    await this.applyfilterBtn.click();
  }

  async clickAdmittedCardElipsisBtn() {
    await this.admitteCardElipsisBtn.first().click();
  }

  async clickExtendAdmissionBtn() {
    await this.extendAdmissionBtn.click();
  }

async enterCheckOutDate() {
  // 1. Open the calendar
  await this.checkOutDateField.click();

  // 2. Get all buttons that look like a day (numbers only)
  const dayButtons = await this.page.locator("//button[normalize-space() != '' and number(normalize-space()) = number(normalize-space())]").all();

  if (dayButtons.length === 0) throw new Error("❌ No day buttons found in the calendar");

  // 3. Click the first available day
  await dayButtons[0].click();
}

async chooseYear(year: string) {
await this.page.getByRole('button', { name: 'Check-out-date DD-MM-YYYY ' }).click();
await this.page.getByLabel('Choose the Year').selectOption('2030');
await this.page.getByRole('button', { name: 'Friday, November 1st,' }).click();
}

    async clickAdmitPatientBtn() {  
    await this.admitPatientBtn.click();
  }

}
