import {expect, Locator, Page} from '@playwright/test';
import {RegistratormFormComponent} from './registrationFormComponent';

export class DashboardPage {
  readonly page: Page;
  readonly registerPatientBtnrLocator: Locator;
  readonly bookFutureAppointmentLocator: Locator;
  readonly quickBookBlnLocator: Locator;
  readonly appointsCountLocator: Locator;
  readonly registratinCountLocator: Locator;
  readonly registeredEmmergancyCountLocator: Locator;
  readonly appointmentCardStateLocator: Locator;
  readonly appointmentCardstatusLocator: Locator;
  readonly patientNameLocator: Locator;
  readonly appointmentNotificationCardLocator: Locator;
  readonly searchInputFieldLocator: Locator;
  readonly patientNameSearchResultLocator: Locator;
  readonly InvalidAppointmentNotificationLocator: Locator;
  readonly supportCloseIconLocator: Locator;
  readonly filterBtnLocator: Locator;
  readonly filterDropdownLocator: Locator;
  readonly nameFilterLocator: Locator;
  readonly mrnFilterLocator: Locator;
  readonly phoneFilterLocator: Locator;
  readonly emailFilterLocator: Locator;
  readonly departmentFilterLocator: Locator;
  readonly idNoFilterLocator: Locator;
  // readonly titleLocator: Locator;
  // readonly registrationCount: Locator;
  // readonly emergencyCount: Locator;
  // readonly appointmentsCount: Locator;

  constructor(page: Page) {
    this.page = page;
    this.registerPatientBtnrLocator = page.getByRole('button', {
      name: 'Register a Patient',
    });
    this.bookFutureAppointmentLocator = page.locator(
      "//button[text()='Book Future Appointment']"
    );
    this.quickBookBlnLocator = page.locator(
      "//h4[text()='Adeolu1 Ogungbesan']//parent::div//following-sibling::div"
    );
    this.appointsCountLocator = page.locator(
      "//h4[text()='Appointments']//parent::div/div/p"
    );
    this.registratinCountLocator = page.locator(
      "//h4[text()='Registration']//parent::div/div/p"
    );
    this.registeredEmmergancyCountLocator = page.locator(
      "//h4[text()='Admitted Emergency Patient']//parent::div/div/p"
    );
    this.appointmentCardStateLocator = page.locator(
      "(//div[@class='tw-relative tw-p-0'])[last()]/div[1]"
    );
    this.appointmentCardstatusLocator = page.locator(
      "(//div[@class='tw-relative tw-p-0'])[last()]/div[2]/div[2]"
    );
    this.patientNameLocator = page.locator(
      "(//div[@class='tw-relative tw-p-0'])[last()]/div[2]/div[1]/h3"
    );
    this.appointmentNotificationCardLocator = page.locator(
      "//h3[@class='tw-mb-4 notification-card-2-message-title']"
    );
    this.searchInputFieldLocator = page.getByPlaceholder('Search...');
    this.patientNameSearchResultLocator = page.locator(
      "//li[contains(@class,'tw-p-4 hover:tw-bg-gray-50 tw-cursor-pointer tw-')][1]"
    );
    this.InvalidAppointmentNotificationLocator = page.locator(
      "//div[@class='Toastify__toast Toastify__toast-theme--colored Toastify__toast--error']"
    );
    this.supportCloseIconLocator = page
      .locator('div')
      .filter({hasText: 'How can we help?'})
      .locator('svg');
    this.filterBtnLocator = page.locator("//button[@id='radix-:r0:']");
    this.filterDropdownLocator = page.locator("//div[@id='radix-:r1:']");
    //div[contains(text(),'Name')]
    //*[@id="radix-:r1:"]/div[1]
    this.nameFilterLocator = page.locator("//*[@id='radix-:r1:']/div[1]");
    this.mrnFilterLocator = page.locator("//div[normalize-space()='MRN']");
    this.phoneFilterLocator = page.getByRole('menuitem', {name: 'Phone'});
    this.emailFilterLocator = page.getByRole('menuitem', {name: 'Email'});
    this.departmentFilterLocator = page.getByRole('menuitem', {
      name: 'Department',
    });
    this.idNoFilterLocator = page.getByRole('menuitem', {name: 'ID No'});
    // this.titleLocator = this.page.getByRole('button', { name: 'Title' });
    // this.titleLocator = page.locator('div.tw-relative.tw-w-full.tw-px-5').filter({ hasText: 'Title' });
    // this.registrationCount = page.locator('text=Registration').locator('xpath=..').locator('div').nth(1);
    // this.emergencyCount = page.locator('text=Admitted Emergency Patient').locator('xpath=..').locator('div').nth(1);
    // this.appointmentsCount = page.locator('text=Appointments').locator('xpath=..').locator('div').nth(1);
  }
  async clickRegisterPatientBtn(
    modalLocator: Locator,
    maxRetries = 5,
    timeout = 50000
  ) {
    let attempt = 0;
    const start = Date.now();
    while (attempt < maxRetries && Date.now() - start < timeout) {
      await this.registerPatientBtnrLocator.click({force: true});
      if (await modalLocator.isVisible({timeout: 3000})) {
        return; // Modal is open, exit loop
      }
      attempt++;
      await this.page.waitForTimeout(1000); // Optional: short wait before retry
    }
    throw new Error('Quick Book modal did not open after maximum retries');
  }

  async clickQuickBookBtn() {
    await this.quickBookBlnLocator.click({force: true});
  }

  async clickBookFutureAppointmentBtn() {
    await this.bookFutureAppointmentLocator.click();
  }

  async clickQuickBookAppointmentBtn() {
    await this.quickBookBlnLocator.click();
  }
  async getAppointmentsCount() {
    return await this.appointsCountLocator.textContent();
  }

  async getRegistrationCount() {
    return await this.registratinCountLocator.textContent();
  }

  async getRegisteredEmergencyCount() {
    return await this.registeredEmmergancyCountLocator.textContent();
  }
  async getAppointmentCardState() {
    return await this.appointmentCardStateLocator.textContent();
  }
  async getAppointmentCardStatus() {
    return await this.appointmentCardstatusLocator.textContent();
  }
  async getPatientName() {
    return await this.patientNameLocator.textContent();
  }
  async getAppointmentNotificationText() {
    return await this.appointmentNotificationCardLocator.textContent();
  }
  async searchPatient(searchTerm: string) {
    await this.searchInputFieldLocator.click();
    await this.searchInputFieldLocator.pressSequentially(searchTerm);
    await this.page.waitForTimeout(2000); // Wait for search results to update
  }
  async clickOnSupportCloseIcon() {
    // This method handles an intermittent support chat modal.
    // It's better to click only if it's visible to avoid test failures.
    // A short timeout prevents slowing down tests if the modal doesn't appear.
    if (await this.supportCloseIconLocator.isVisible({timeout: 5000})) {
      await this.supportCloseIconLocator.click({force: true});
    }
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

    // 4. Return a structured object with the fetched details.
    return {
      date,
      reason,
      time,
      consultantName,
      specialty,
      status,
      state,
      patientName,
    };
  }

  async filterByName() {
    await this.filterBtnLocator.click();
    await this.nameFilterLocator.click();
    await this.page.waitForTimeout(1000); // Wait for search results to update
  }
  async filterByMRN() {
    await this.filterBtnLocator.click();
    await this.mrnFilterLocator.click();
    await this.page.waitForTimeout(1000); // Wait for search results to update
  }
  async filterByPhone() {
    await this.filterBtnLocator.click();
    await this.phoneFilterLocator.click();
    await this.page.waitForTimeout(1000); // Wait for search results to update
  }
  async filterByEmail() {
    await this.filterBtnLocator.click();
    await this.phoneFilterLocator.click();
    await this.page.waitForTimeout(1000); // Wait for search results to update
  }
  async filterByDepartment() {
    await this.filterBtnLocator.click();
    await this.departmentFilterLocator.click();
    await this.page.waitForTimeout(1000); // Wait for search results to update
  }
  async filterByID() {
    await this.filterBtnLocator.click();
    await this.idNoFilterLocator.click();
    await this.page.waitForTimeout(1000); // Wait for search results to update
  }
  async selectFilterByLabel(label: string, optionText?: string) {
    await this.page.getByRole('button', {name: 'Filters'}).click();
    await this.page
      .locator('label')
      .filter({hasText: label})
      .pressSequentially(`${optionText}`);
    if (optionText) {
      const option = this.page.getByRole('option', {name: optionText});
      const chosen = option.textContent();
      await option.click();
      const value = await this.page
        .locator('.modal-select__input-container')
        .first()
        .textContent();
      return value ?? chosen ?? '';
      await this.page.locator("//button[contains(text(), 'Apply')]").click();
    }
  }
  getAppointmentCards() {
    return this.page
      .locator('div.tw-rounded-lg.tw-border.tw-bg-card.tw-cursor-pointer')
      .filter({has: this.page.locator('h3')});
  }
  async getCardField(card: Locator, label: string) {
    const field = card.locator(`h4:has-text("${label}") + p`);
    if (await field.count()) {
      const text = await field.textContent();
      return text?.trim() ?? null;
    }
  }
}
