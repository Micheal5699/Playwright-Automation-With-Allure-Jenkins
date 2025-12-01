import { expect, Locator, Page } from "@playwright/test";



export class ModuleSelectorPage {
  readonly page: Page;
  readonly frontDeskLocator: Locator;
  readonly outpatientLocator: Locator;
  readonly labLocator: Locator;
  readonly pharmacyLocator: Locator;
  readonly inventoryLacator: Locator;
  readonly billingLocator: Locator;
  readonly inpatientLocator: Locator;
  readonly reportingLocator: Locator;

  constructor(page: Page, moduleName: string) {
    this.page = page;
    this.frontDeskLocator = page.locator("//h2[text()='Front Desk']");
    this.outpatientLocator = page.locator("//h2[text()='OutPatients']");
    this.labLocator = page.locator("//h2[text()='Laboratory']");
    this.pharmacyLocator = page.locator("//h2[text()='Pharmacy']");
    this.inventoryLacator = page.locator("//h2[text()='Inventory']");
    this.billingLocator = page.locator("//h2[text()='Billing']");
    this.inpatientLocator = page.locator("//h2[text()='In Patients']");
    this.reportingLocator = page.locator("//h2[text()='Reporting']");
  }

  async selectFrontDeskModule() {
    await this.frontDeskLocator.click();
    await expect(this.page).toHaveURL(`https://dev.indigoemr.com/frontdesk/dashboard`);
  }
  async selectOutpatientModule() {
    await this.outpatientLocator.click();
    await expect(this.page).toHaveURL(`https://dev.indigoemr.com/out-patient/dashboard`);
  }
  async selectLabModule() {
    await this.labLocator.click();
    await expect(this.page).toHaveURL(`https://dev.indigoemr.com/laboratory/task-management`);
  }
  async selectPharmacyModule() {
    await this.pharmacyLocator.click();
    await expect(this.page).toHaveURL(`https://dev.indigoemr.com/pharmacy/dashboard`);
  }
  async selectInventoryModule() {
    await this.inventoryLacator.click();
    await expect(this.page).toHaveURL(`https://dev.indigoemr.com/inventory/stock`);
  }
  async selectBillingModule() {
    await this.billingLocator.click();
    await expect(this.page).toHaveURL(`https://dev.indigoemr.com/billing/dashboard`);
  }
    async selectInpatientModule() {
        await this.inpatientLocator.click();
        await expect(this.page).toHaveURL(`https://dev.indigoemr.com/in-patient/dashboard`);
    }
}