import {expect, Locator, Page} from '@playwright/test';
import {
  getDateParts,
  getFormattedDate,
  getFormattedTime,
  getTomorrowDate,
} from '../../utils/dateutils';

export class PatientDetailsPage {
  readonly page: Page;
  readonly appointmentNavigationBtnLocator: Locator;
  readonly progressNoteBtnLocator: Locator;
  readonly addEntryBtnLocator: Locator;
  readonly addEntryDropDown: Locator;
  readonly deliveryFormLocator: Locator;
  readonly progressNoteLemonLocator: Locator;
  readonly formSampleNurseLocator: Locator;
  readonly progressNoteKolLocator: Locator;
  readonly progressNoteLocator: Locator;
  readonly nameInput: Locator;
  readonly commentInput: Locator;
  readonly describeResultInput: Locator;
  readonly employeeNameCell: Locator;
  readonly attachmentNameInput: Locator;
  readonly calenderIconLocator: Locator;
  readonly datePickerLocator: Locator;
  readonly monthdropdownLocator: Locator;
  readonly yearDropdownLocator: Locator;
  readonly submitButtonLocator: Locator;
  readonly titleInput: Locator;
  readonly selectInput: Locator;
  readonly progressNoteKolNameInput: Locator;
  readonly saveButtonLocator: Locator;
  readonly searchBar: Locator;
  readonly progressNoteTitleInput: Locator;
  readonly progressNoteObservationInput: Locator;
  readonly progressNoteOutcomeInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.appointmentNavigationBtnLocator = page.locator(
      "//span[@class='nav-text tw-whitespace-nowrap no-scrollbar' and text()='Appointments']"
    );
    this.progressNoteBtnLocator = page.getByRole('button', {
      name: 'Progress Note',
    });
    this.addEntryBtnLocator = page.getByRole('button', {name: 'Add Entry'});

    this.addEntryDropDown = page.locator("//div[@role='menu'");
    this.addEntryDropDown = page.getByRole('menu', {name: ' Add Entry'});
    this.deliveryFormLocator = page.getByRole('menuitemradio', {
      name: 'delivery form',
    });
    this.progressNoteLemonLocator = page.getByRole('menuitemradio', {
      name: 'progress Note Lemon',
    });
    this.formSampleNurseLocator = page.getByRole('menuitemradio', {
      name: 'FORM SAMPLE NURSE',
    });
    this.progressNoteKolLocator = page.getByRole('menuitemradio', {
      name: 'PROGRESS NOTE KOL',
    });
    this.progressNoteLocator = page.getByRole('menuitem', {
      name: 'Progress Note',
    });
    this.nameInput = page.locator(
      "//div[.//label[contains(text(), 'Name')]]//input[@role='combobox']"
    );
    this.commentInput = page.locator(
      "//div[.//label[contains(text(), 'comment')]]//input[@type='textinput']"
    );
    this.describeResultInput = page.getByLabel('Describe result');
    this.employeeNameCell = page.locator(
      "//th[div[contains(text(), 'EMPLOYEE')]]/following-sibling::td//input[@type='text']"
    );
    this.attachmentNameInput = page.locator(
      "//div[.//label[contains(text(), 'Attachment')]]//input[@placeholder='Enter custom name']"
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
    this.submitButtonLocator = page.locator("//button[text() = 'Submit']");
    this.titleInput = page.getByRole('textbox', {name: 'Type'});
    this.selectInput = page.locator(
      "//label[contains(text(), 'Selet')]/ancestor::div[contains(@class, 'tw-relative')]//input[@role='combobox']"
    );
    this.progressNoteKolNameInput = page.locator(
      "//div[.//label[contains(text(), 'NAME')]]//input"
    );
    this.saveButtonLocator = page.locator('//button[text()="Save"]');
    this.progressNoteTitleInput = page.locator('input#title');
    this.progressNoteObservationInput = page.locator('textarea#observation');
    this.progressNoteOutcomeInput = page.locator('textarea#outcome');

    this.searchBar = page.locator('input.dashboard-search-bar__bar');
  }
  async selectEntryType(locatorName: string) {
    const locators: Record<string, Locator> = {
      deliveryForm: this.deliveryFormLocator,
      progressNoteLemon: this.progressNoteLemonLocator,
      formSampleNurse: this.formSampleNurseLocator,
      progressNoteKol: this.progressNoteKolLocator,
      progressNote: this.progressNoteLocator,
    };

    const locator = locators[locatorName];

    if (locator) {
      await locator.click();
    } else {
      throw new Error(`Locator '${locatorName}' not found`);
    }
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
  async fillFormFields(
    page: Page,
    data: {title: string; observation: string; outcome: string}
  ) {
    await page.locator('input#title').fill(data.title);
    await page.locator('textarea#observation').fill(data.observation);
    await page.locator('textarea#outcome').fill(data.outcome);
  }
  async selectDateRange(page: Page, startLabel: string, endLabel: string) {
    // Ensure calendar is visible
    await page.waitForSelector('.rdp-root');

    // Select month and year if needed
    await page.selectOption('.rdp-months_dropdown', '9'); // October = index 9
    await page.selectOption('.rdp-years_dropdown', '2025');

    // Click start date
    await page.getByRole('button', {name: startLabel}).click();

    // Click end date
    await page.getByRole('button', {name: endLabel}).click();
  }
}
