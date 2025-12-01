import {expect, Locator, Page} from '@playwright/test';

export class PatientDetailsPage {
  readonly page: Page;
  readonly patientDetailsHeaderLocator: Locator;
  readonly appointmentNavigationBtnLocator: Locator;
  readonly profileDetailsNavigationBtnLocator: Locator;
  readonly bookFutureAppointmentBtnLocator: Locator;
  readonly checkInBtnLocator: Locator;
  readonly patientNameMrnLocator: Locator;
  readonly transferModalHeaderLocator: Locator;
  readonly checkincheckoutBtnLocator: Locator;
  readonly editProfileBtnLocator: Locator;
  readonly undoEditBtnLocator: Locator;
  readonly givenNameTextLocator: Locator;
  readonly lastNameTextLocator: Locator;
  readonly ageTextLocator: Locator;
  readonly genderTextLocator: Locator;
  readonly phoneNumberTextLocator: Locator;
  readonly emailTextLocator: Locator;
  readonly NoKNameTextLocator: Locator;
  readonly NoKPhoneTextLocator: Locator;
  readonly relashionshipTextLocator: Locator;
  readonly providerHmoDetailsTextLocator: Locator;
  readonly NokEmailTextLocator: Locator;
  readonly prefferedConsultantLocator: Locator;
  readonly notificationConsentLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.patientDetailsHeaderLocator = page.locator(
      "//h3[text()='Patient Details']"
    );
    this.appointmentNavigationBtnLocator = page.locator(
      "//span[@class='nav-text tw-whitespace-nowrap no-scrollbar' and text()='Appointments']"
    );
    this.profileDetailsNavigationBtnLocator = page.locator(
      "//span[@class='nav-text tw-whitespace-nowrap no-scrollbar' and text()='Profile Details']"
    );
    this.bookFutureAppointmentBtnLocator = page.getByText(
      'Book Future Appointment'
    );
    this.checkInBtnLocator = page
      .getByRole('button', {name: 'Check In'})
      .nth(0);
    this.transferModalHeaderLocator = page.getByRole('heading', {
      name: 'Transfer Patient',
    });
    this.patientNameMrnLocator = page.locator(
      "//h2[@class='tw-text-lg tw-font-semibold tw-text-foreground  tw-divide-gray-200']"
    );
    this.checkincheckoutBtnLocator = page.getByRole('button', {
      name: /check[- ]?in|check[- ]?out/i,
    });
    this.editProfileBtnLocator = page.getByText('Edit Profile');
    this.undoEditBtnLocator = page.getByText('Undo Edit');
    this.givenNameTextLocator = page.locator(
      "//p[text()='Given Name']/following-sibling::h4"
    );
    this.lastNameTextLocator = page.locator(
      "//p[text()='Last Name']/following-sibling::h4"
    );
    this.ageTextLocator = page.locator(
      "//p[text()='Age (D.O.B)']/following-sibling::h4"
    );
    this.genderTextLocator = page.locator(
      "//p[text()='Sex']/following-sibling::h4"
    );
    this.phoneNumberTextLocator = page
      .locator("//p[text()='Phone Number']/following-sibling::h4")
      .first();
    this.emailTextLocator = page
      .locator("//p[text()='Email Address']/following-sibling::h4")
      .first();
    this.NoKNameTextLocator = page.locator(
      "//p[text()='Full Name']/following-sibling::h4"
    );
    this.NoKPhoneTextLocator = page
      .locator("//p[text()='Phone Number']/following-sibling::h4")
      .nth(1);
    this.relashionshipTextLocator = page.locator(
      "//p[text()='Relationship']/following-sibling::h4"
    );
    this.providerHmoDetailsTextLocator = page.locator(
      "//p[@class='tw-text-natural-700 tw-font-medium']"
    );
    this.NokEmailTextLocator = page
      .locator("//p[text()='Email Address']/following-sibling::h4")
      .nth(1);
    this.notificationConsentLocator = page.locator(
      "//p[text()='Notification Consent']/following-sibling::h4"
    );
    this.prefferedConsultantLocator = page.locator(
      "//p[text()='Preferred Consultant']/following-sibling::h4"
    );
  }
  async getPatientProfileDetails() {
    const [
      givenName,
      lastName,
      age,
      gender,
      phoneNumber,
      email,
      NoKName,
      NoKPhone,
      relationship,
      nokEmail,
      prefferedConsultant,
      smsConsent,
      emailConsent,
    ] = await Promise.all([
      this.givenNameTextLocator.textContent(),
      this.lastNameTextLocator.textContent(),
      this.ageTextLocator.textContent(),
      this.genderTextLocator.textContent(),
      this.phoneNumberTextLocator.textContent(),
      this.emailTextLocator.textContent(),
      this.NoKNameTextLocator.textContent(),
      this.NoKPhoneTextLocator.textContent(),
      this.relashionshipTextLocator.textContent(),
      this.NokEmailTextLocator.textContent(),
      this.prefferedConsultantLocator.textContent(),

      (await this.notificationConsentLocator.textContent())
        ?.toLowerCase()
        .includes('phone') || false,
      (await this.notificationConsentLocator.textContent())
        ?.toLowerCase()
        .includes('email') || false,
    ]);
    return {
      givenName,
      lastName,
      age: age?.trim(),
      gender: gender?.trim(),
      phoneNumber: phoneNumber?.trim(),
      email: email?.trim(),
      noKName: NoKName?.trim(),
      noKPhone: NoKPhone?.trim(),
      relationship: relationship?.trim(),
      nokEmail: nokEmail?.trim(),
      prefferedConsultant: prefferedConsultant?.trim(),
      smsConsent,
      emailConsent,
    };
  }

  async verifyPatientDetailsPage() {
    await expect.soft(this.patientDetailsHeaderLocator).toBeVisible();
    //await expect.soft(this.patientNameMrnLocator).toContainText(patientName)
  }
  async clickAppointmentNavigation() {
    await this.appointmentNavigationBtnLocator.click();
  }
  async clickProfileDetailsNavigation() {
    await this.profileDetailsNavigationBtnLocator.click();
  }
  async clickBookFutureAppointment() {
    await this.bookFutureAppointmentBtnLocator.click();
  }
  async clickCheckIn() {
    await this.checkInBtnLocator.click();
  }
  async getPatientNameAndMrn() {
    const patientNameMrnText = await this.patientNameMrnLocator.textContent();
    return patientNameMrnText;
  }
  async isTransferModalVisible() {
    await expect.soft(this.transferModalHeaderLocator).toBeVisible();
  }

  async fetchAppointCardOnPatientDetailsPage(patientName: string) {
    // 1. Find the specific appointment card for the patient.
    const patientCard = this.page
      .locator("//h5[text()='Present']//following-sibling::div/div")
      .nth(0);
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
  async clickCheckinCheckoutBtn() {
    const isCheckIn = await this.checkincheckoutBtnLocator.textContent();
    if (isCheckIn?.toLowerCase().includes('check in')) {
      await this.checkincheckoutBtnLocator.click();
    } else {
      console.log('Patient is already checked in.');
    }
    return isCheckIn?.toLowerCase().includes('check in');
  }
  async verifyCheckinCheckoutBtnText(expectedText: string) {
    const actualText = await this.checkincheckoutBtnLocator.textContent();
    expect
      .soft(actualText?.toLowerCase())
      .toContain(expectedText.toLowerCase());
  }
  async clickEditProfileBtn() {
    await this.editProfileBtnLocator.click();
    expect.soft(this.undoEditBtnLocator).toBeVisible();
  }
  async clickUndoEditBtn() {
    await this.undoEditBtnLocator.click();
    expect.soft(this.editProfileBtnLocator).toBeVisible();
  }
}
