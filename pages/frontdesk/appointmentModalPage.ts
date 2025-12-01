import {Locator, Page, expect} from '@playwright/test';
import {get} from 'http';
import {
  getDateParts,
  getFormattedDate,
  getFormattedTime,
  getTomorrowDate,
} from '../../utils/dateutils';
import {stringify} from 'querystring';

export class AppointmentModalPage {
  readonly page: Page;
  readonly modalHeaderLocator: Locator;
  readonly mrnFieldLocator: Locator;
  //readonly nameFieldLocator: Locator;
  readonly mrnSugestionLocator: Locator;
  readonly specialityLocator: Locator;
  readonly ophtSpecialitySelectionLocator: Locator;
  readonly gpSpecialitySelectionLocator: Locator;
  readonly calenderIconLocator: Locator;
  readonly monthdropdownLocator: Locator;
  readonly yearDropdownLocator: Locator;
  readonly datePickerLocator: Locator;
  readonly timePickerLocator: Locator;
  readonly timeSlotLocator: Locator;
  readonly reasonForVisitLocator: Locator;
  readonly purposeOfVisitLocator: Locator;
  readonly consultationFeeLocator: Locator;
  readonly bookAppointmentButtonLocator: Locator;
  readonly appointmentCountLocator: Locator;
  readonly whomToSeeFieldLocator: Locator;
  readonly constantantNameLocator: Locator;
  readonly appointmentdateLocator: Locator;
  readonly selectSectionModalHeaderLocator: Locator;
  readonly selectSectionInputLocator: Locator;
  readonly vitalsSectionLocator: Locator;
  readonly consultantSectionLocator: Locator;
  readonly outpatientPrecedureSectionLocator: Locator;
  readonly confirmSectionBtnLocator: Locator;
  readonly nameFieldLocator: Locator;
  readonly updateButton: Locator;
  readonly preferredBranchLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.modalHeaderLocator = page.locator(
      "//h3[@class='modal__header__title undefined']"
    );
    this.mrnFieldLocator = page.locator("//input[@id='mrn']");
    this.nameFieldLocator = page.locator("//input[@id='name']");
    this.mrnSugestionLocator = page.locator("//li[@class='suggestion'][1]");
    this.specialityLocator = page.locator(
      "//label[text()='Specialty']//parent::span//parent::div/div/div/div[1]"
    );
    this.ophtSpecialitySelectionLocator = page.locator(
      "//div[contains(@class, 'modal-select__option')][1]"
    );
    this.gpSpecialitySelectionLocator = page.locator(
      "//div[contains(@class, 'modal-select__option')][2]"
    );
    this.calenderIconLocator = page.locator(
      "//div[@class='tw-flex tw-items-end tw-justify-between tw-w-full ']/i"
    );
    this.monthdropdownLocator = page.getByLabel('Choose the Month');
    this.yearDropdownLocator = page.locator(
      "//select[@class='rdp-dropdown rdp-years_dropdown']"
    );
    this.datePickerLocator = page.locator(
      "//td[@class= 'tw-h-9 tw-w-9 tw-rounded-md tw-p-0 tw-font-normal aria-selected:tw-opacity-100']"
    );
    this.timePickerLocator = page.locator(
      "//label[text()='Time']//parent::span//parent::div/div/div/div[2]"
    );
    this.timeSlotLocator = page.locator(
      'div:nth-child(7) .modal-select__option'
    );
    this.reasonForVisitLocator = page.locator(
      "//label[text()='Reason For Visit']//parent::span//parent::div/div/div/div[1]"
    );
    this.purposeOfVisitLocator = page.locator(
      "//div[contains(@class, 'modal-select__option')][2]"
    );
    this.consultationFeeLocator = page.locator(
      "(//div[@class='transfer-patient__consultant'] //span[@class='paragraph-sm'])[last()]"
    );
    this.bookAppointmentButtonLocator = page.locator(
      "//button[text()='Book Appointment']"
    );
    this.appointmentCountLocator = page.locator(
      "//span[@class='paragraph-sm'][2]"
    );
    this.whomToSeeFieldLocator = page.locator(
      "//label[text()='Whom To See']//parent::span//parent::div/div/div/div[2]"
    );
    this.constantantNameLocator = page.locator(
      "//div[text()='Adeolu1 Ogungbesan']"
    );
    this.appointmentdateLocator = page.locator(
      "//p[text()='Date of Appointment']//parent::div"
    );
    this.selectSectionModalHeaderLocator = page.locator(
      "//h3[text()='Select section']"
    );
    this.selectSectionInputLocator = page.locator(
      '.modal--confirm__body > .tw-relative > .form__select > .modal-select__control > .modal-select__value-container > .modal-select__input-container'
    );
    this.vitalsSectionLocator = page.locator(
      "(//div[contains(@class, 'modal-select__option')])[1]"
    );
    this.consultantSectionLocator = page.locator(
      "(//div[contains(@class, 'modal-select__option')])[2]"
    );
    this.outpatientPrecedureSectionLocator = page.locator(
      "(//div[contains(@class, 'modal-select__option')])[3]"
    );
    this.confirmSectionBtnLocator = page.locator("//button[text()='Confirm']");
    this.updateButton = page.locator("//button[normalize-space()='Update']");
    this.preferredBranchLocator = page.locator(
      "//label[text()='Preferred Branch']/following::div[contains(@class,'modal-select__input-container')][1]"
    );
  }
  async isModalOpen() {
    return await this.modalHeaderLocator.isVisible();
  }
  async getModalHeaderText() {
    const headerText = await this.modalHeaderLocator.textContent();
    return headerText;
  }
  async fillMrnField(mrn: number) {
    mrn = Math.floor(Math.random() * 90) + 10; // Generate a random MRN
    await this.mrnFieldLocator.fill(mrn.toString());
  }
  async selectMrnSuggestion() {
    const patientMrn = await this.mrnSugestionLocator.textContent();
    await this.mrnSugestionLocator.click();
  }
  async getPatientName() {
    const patientName = await this.page.getAttribute('#name', 'value');

    return patientName;
  }

  // async fillNameField(name: string) {
  // await this.nameFieldLocator.fill(name);

  // }
  async selectSpeciality(speciality: string = 'Ophthalmology', string = 'GP') {
    await this.specialityLocator.click();

    if (speciality === 'Ophthalmology') {
      await this.ophtSpecialitySelectionLocator.click();
    } else if (speciality === 'GP') {
      await this.gpSpecialitySelectionLocator.click();
    } else {
      throw new Error('Invalid speciality selected');
    }

    const selectedSpeciality = await this.specialityLocator.textContent();
    console.log('Selected Speciality: ', selectedSpeciality);
    return selectedSpeciality;
  }
  async selectDate() {
    const tomorrow = getDateParts();
    const formattedDate = getTomorrowDate();
    await this.calenderIconLocator.click();
    //await this.yearDropdownLocator.selectOption(tomorrow.year );
    // await this.monthdropdownLocator.selectOption(tomorrow.month);
    this.datePickerLocator.locator(`text="${tomorrow.tomorrowdate}"`).click();
    return tomorrow;
  }
  async selectTime() {
    await this.timePickerLocator.click();
    const appointmentTime = this.timeSlotLocator.nth(0);
    const selectedTime = appointmentTime.textContent();
    await appointmentTime.click();
    return selectedTime;
  }
  async selectReasonForVisit() {
    await this.reasonForVisitLocator.click();
    await this.purposeOfVisitLocator.click();
    const reasonText = await this.reasonForVisitLocator.textContent();
    return reasonText;
  }
  async getConsultationFee() {
    const feeText = await this.consultationFeeLocator.textContent();
    return feeText;
  }
  async clickBookAppointmentBtn() {
    await this.bookAppointmentButtonLocator.click();
  }
  async isBookButtonDisabled() {
    return await this.bookAppointmentButtonLocator.isDisabled();
  }
  async selectWhomToSee() {
    // Step 1: Locate the container using the label "Whom To See"
    const whomToSeeContainer = this.page
      .locator('label:text("Whom To See")')
      .locator('..')
      .locator('..');

    // Step 2: Click the dropdown to activate the input
    await whomToSeeContainer.locator('.modal-select__control').click();

    // Step 3: Type into the input field
    await whomToSeeContainer.locator('input[type="text"]').fill('Adeolu1');

    // Step 4: Select the matching option
    await this.page
      .locator('.modal-select__option', {hasText: 'Adeolu1 Ogungbesan'})
      .click();
  }
  async getAppointmentDate() {
    const today = getDateParts();
    const appointmentDate = await this.appointmentdateLocator.textContent();
    return today;
  }
  async isSelectSectionVisible() {
    const selectSectionModalHeader =
      await this.selectSectionModalHeaderLocator.isVisible();
    return selectSectionModalHeader;
  }

  async selectSection(
    section: 'Consultant' | 'Outpatient Procedure' | 'vitals' = 'Consultant'
  ) {
    await this.selectSectionInputLocator.click({force: true});
    if (section == 'Consultant') {
      await this.consultantSectionLocator.click();
    } else if (section == 'Outpatient Procedure') {
      await this.outpatientPrecedureSectionLocator.click();
    } else if (section == 'vitals') {
      await this.vitalsSectionLocator.click();
    } else {
      throw new Error('Invalid section selected');
    }
    const selectedSection = await this.selectSectionInputLocator.textContent();
    console.log('Selected Section: ', selectedSection);
    return selectedSection;
  }

  async selectVitals(
    section: 'Consultant' | 'Outpatient Procedure' | 'Vitals' = 'Consultant'
  ) {
    await this.selectSectionInputLocator.click({force: true});

    if (section === 'Consultant') {
      await this.vitalsSectionLocator.click();
    } else if (section === 'Outpatient Procedure') {
      await this.outpatientPrecedureSectionLocator.click();
    } else if (section === 'Vitals') {
      await this.vitalsSectionLocator.click();
    } else {
      throw new Error('Invalid section selected');
    }

    const selectedSection = await this.selectSectionInputLocator.textContent();
    console.log('Selected Section: ', selectedSection);
    return selectedSection;
  }

  async clickConfirmSectionBtn() {
    await this.confirmSectionBtnLocator.click({force: true});
  }
  async verifyUpdateButtonIsDisabled() {
    await expect(this.updateButton).toBeDisabled();
  }

  async selectPreferredBranch(branch: string) {
    await this.preferredBranchLocator.waitFor({
      state: 'visible',
      timeout: 10000,
    });
    await expect(this.preferredBranchLocator).toBeEnabled();

    // Interact once it's ready
    await this.preferredBranchLocator.click();
    await this.preferredBranchLocator
      .locator('input.modal-select__input')
      .fill(branch);
    await this.page.locator('.modal-select__option').first().click();
  }
  async verifyNoSlotsAvailableMessage() {
    const noSlotMessage = this.page.locator('text=0 slots available');
    await expect(noSlotMessage).toBeVisible({timeout: 10000});
  }
}
