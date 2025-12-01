import { expect, Locator, Page } from "@playwright/test";
import { PassThrough } from "stream";

export class RegistratormFormComponent{
    readonly page: Page;
    readonly registrationModalHeaderLocator: Locator;
    readonly chooseImageBtnLocator: Locator;
    readonly takePhotoBtnLocator: Locator;
    readonly selectPlanLocator: Locator;
    readonly titleDropdownLocator: Locator;
    readonly locationInputFieldLocator: Locator;
    readonly givenNameFieldLocator: Locator;
    readonly lastNameFieldLocator: Locator;
    readonly genderRadioBtnLocator: Locator;
    readonly DOBDatePickerLocator: Locator;
    readonly yearCalenderPickerLocator: Locator;
    readonly monthCalenderPickerLocator: Locator;
    readonly phoneNumberFieldLocator: Locator;
    readonly prefferedConsultantLocator: Locator;
    readonly optionsMenuLocator: Locator;
    readonly emailFieldLocator: Locator;
    readonly locationFieldLocator: Locator;
    readonly locationSugestionoptionLocator: Locator;
    readonly consultantOptionLocator:   Locator;
    readonly exactLocationOptionLocator: Locator;
    readonly exactAddressInputFieldLocator: Locator;
    readonly hmoCorporateHeaderLocator: Locator;
    readonly hmoProviderLocator: Locator;
    readonly hmoProviderOptionLocator: Locator;
    readonly providerPlanLocator: Locator;
    readonly providerIdLocator: Locator;
    readonly addNewBtnLocator: Locator;
    readonly previewHmoLocator: Locator;
    readonly NokHeaderLocator: Locator;
    readonly NokNameFieldLocator: Locator;
    readonly NokPhoneNumberFieldLocator: Locator
    readonly NokEmailFieldLocator: Locator;
    readonly NokRelationshipFieldLocator: Locator;
    readonly NokAddressFieldLocator: Locator;
    readonly receivedEmailLocator: Locator;
    readonly receiveSmsLocator: Locator;
    readonly registerPatientBtnLocator: Locator;
    readonly successMessageLocator: Locator;
    readonly phoneNoErrorMessageLocator: Locator;
    readonly tagFieldLocator: Locator;
    readonly familyTagOptionLocator: Locator;
    readonly inpatestSelecPlanBlnLocacor: Locator
    readonly headerTextLocator: Locator
    readonly titleLocator: Locator
    readonly cancelTrasferPatientBtnLocator: Locator
    readonly patientRegistrationCountLocator;
    readonly appointmentCountLocator: Locator
    
    


    
    constructor(page: Page) {
        this.page = page;
        this.registrationModalHeaderLocator = page.locator("//h3[text()='Registration form']");
        this.chooseImageBtnLocator = page.getByRole('button', { name: 'Choose Image' });
        this.takePhotoBtnLocator = page.getByRole('button', { name: 'Take Photo' });
        this.selectPlanLocator = page.locator('.form__settings > .tw-grid > div:nth-child(2) > .tw-relative > .form__select > .modal-select__control > .modal-select__value-container > .modal-select__input-container').first()
        this.optionsMenuLocator = page.getByRole('option').nth(2)
        this.titleDropdownLocator = page.locator("div:nth-child(3) > .tw-relative > .form__select > .modal-select__control > .modal-select__value-container > .modal-select__input-container").last()
       // this.titleOptionLocator = page.getByRole('option', { name: "MR" })
        this.givenNameFieldLocator = page.getByPlaceholder('Enter Given Name');
        this.lastNameFieldLocator = page.getByPlaceholder('Enter Last Name');
        this.genderRadioBtnLocator=page.getByLabel('label')//.filter({ hasText: user.gender }).locator('span')
this.DOBDatePickerLocator = page.getByRole('button', { name: 'Date of Birth '})//* DD-MM-YYYY ' })
this.yearCalenderPickerLocator = page.getByRole('combobox', { name: 'Choose the Year' })
//this.dayCalenderPickerLocator= page.getByRole('gridcell', { name: patient.day })
this.monthCalenderPickerLocator=page.getByLabel('Choose the Month')
this.phoneNumberFieldLocator = page.locator('form').filter({ hasText: 'Choose ImageTake ' }).getByPlaceholder('Enter phone number')
this.emailFieldLocator=page.locator('#email')
this.locationFieldLocator=page.locator('div[id="react-select-2-placeholder"]').first()
this.locationInputFieldLocator = page.locator('#react-select-2-input').nth(1)
this.locationSugestionoptionLocator=page.getByRole('option').nth(2)
 this.prefferedConsultantLocator=page.locator('div:nth-child(10) > .tw-relative > .form__select > .modal-select__control > .modal-select__value-container > .modal-select__input-container');
   this.consultantOptionLocator= page.locator("(//div[contains(@id, 'react-select-')])[2]")
   this.exactLocationOptionLocator =page.locator('form').filter({ hasText: 'Choose ImageTake PhotoSelect' }).getByRole('switch');
   this.exactAddressInputFieldLocator=page.getByRole('textbox', { name: 'Enter Details' });
    this.hmoCorporateHeaderLocator = page.locator('div').filter({ hasText: /^HMO \/ CORPORATE$/ });
    this.hmoProviderLocator =page.locator('.tw-col-span-12.lg\\:tw-col-span-6 > .tw-relative > .form__select > .modal-select__control > .modal-select__value-container > .modal-select__input-container');
    this.hmoProviderOptionLocator = page.getByRole('option').nth(0)
    this.providerPlanLocator = page.locator('.container-fluid.tw-my-5.tw-pb-5 > .form__settings > .tw-grid > div:nth-child(2) > .tw-relative > .form__select > .modal-select__control > .modal-select__value-container > .modal-select__input-container')
    this.providerIdLocator = page.getByRole('textbox', { name: 'Type ID here' })
    this.addNewBtnLocator = page.getByRole('button', { name: ' Add New' })
    this.previewHmoLocator = page.getByText('PreviewHmo/Corporate');
    this.NokHeaderLocator= page.getByRole('heading', { name: 'NEXT OF KIN DETAILS' });
    this.NokNameFieldLocator = page.getByRole('textbox', { name: 'Enter Full Name' });
    this.NokRelationshipFieldLocator = page.locator('div:nth-child(3) > .container-fluid > .form__settings > .tw-grid > div:nth-child(2) > .tw-relative > .form__select > .modal-select__control > .modal-select__value-container > .modal-select__input-container');
    this.NokPhoneNumberFieldLocator =page.locator('form').filter({ hasText: 'Full Name' }).getByPlaceholder('Enter phone number');
    this.NokEmailFieldLocator = page.locator('#nokEmail');
    this.NokAddressFieldLocator = page.locator('div:nth-child(5) > .tw-w-full > .css-b62m3t-container > .css-1bvggxv-control > .css-8akrpk > .css-1q8xqc9')
    this.receivedEmailLocator = page.locator('label').filter({ hasText: 'Does the patient want to be able to receive Email?' }).locator('span').first()
    this.receiveSmsLocator = page.locator('label').filter({ hasText: 'Does the patient want to be able to receive SMS?' }).locator('span').first()
    this.registerPatientBtnLocator = page.getByRole('button', { name: 'Register Patient & Transfer' })
    this.successMessageLocator = page.getByText('Patient registered successfully.');
    this.phoneNoErrorMessageLocator = page.getByRole('alert');
    this.tagFieldLocator = page.locator('div:nth-child(4) > .tw-relative > .form__select > .modal-select__control > .modal-select__value-container > .modal-select__input-container');
    this.familyTagOptionLocator = page.getByRole('option', { name: 'Family' })
    this.inpatestSelecPlanBlnLocacor=page.locator('.tw-col-span-12 > .tw-relative > .form__select > .modal-select__control > .modal-select__value-container > .modal-select__input-container').first()
    this.titleLocator = page.locator('div.tw-relative.tw-w-full.tw-px-5').filter({ hasText: 'Title' });
    this.headerTextLocator = page.getByRole('heading', { name: 'Registration form' })
    this.cancelTrasferPatientBtnLocator = page.locator("//div[@class='modal__header--icon']//*[name()='svg']")
    this.patientRegistrationCountLocator = page.locator("//div[@class='tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-6 tw-mb-8']//div[2]");
    this.appointmentCountLocator = page.locator("(//div[@class='frontdesk__stat-card'])[1]")
       
}
async isModalOpen() {
    return await this.registrationModalHeaderLocator.isVisible();
}
async selectPlan() {
    await this.selectPlanLocator.click();
    await this.page.waitForTimeout(3000);
    const selectedPlan =await this.optionsMenuLocator.click();
   // return selectedPlan;

}
async selectInaptientPaln(){
    await this.inpatestSelecPlanBlnLocacor.click()
    await this.page.waitForTimeout(3000)
    const selectedPlan = await this.optionsMenuLocator.click({force:true});
    return selectedPlan;
}


// async selectTitle(title: string) {
// await this.titleDropdownLocator.click();
// await this.page.keyboard.press('ArrowDown'); // Open options
// await this.page.keyboard.type(title); // Type to filter
// await this.page.keyboard.press('Enter'); // Select   // Click the dropdown by label
// } 

async selectTitle(title: string) {
  await this.titleLocator.click();
  await this.page.getByText(title, { exact: true }).click();
}

async fillGivenName(firstName: string) {
     await this.givenNameFieldLocator.fill(firstName);
}
async fillLastName(lastName: string) {
    await this.lastNameFieldLocator.fill(lastName);
}
async selectGender() {   
  const genderInput = this.page.getByRole('dialog').getByText('Female');
  await genderInput.check();
}
    


async fillDOB(year: string, month: string, day: string, i: number = parseInt(day)) {
         await this.DOBDatePickerLocator.click();
         await this.yearCalenderPickerLocator.selectOption(year);
         await this.monthCalenderPickerLocator.selectOption(month);
        await this.page.getByRole('gridcell').nth(i).click({force:true});
}
async fillPhoneNumber(phooneNumber: string) {
   // const number = "1234567890"
  //  const randomNumber = Math.floor(Math.random() * number.length);
   // const randomnumber = number[randomNumber]
   // const phoneNumber = randomNumber.toString();
    await this.phoneNumberFieldLocator.click({force: true});
    await this.phoneNumberFieldLocator.type(phooneNumber);
}
async fillEmail() {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    const ramdomalphalbet = alphabet[randomIndex];
    await this.emailFieldLocator.click({force: true});
    await this.emailFieldLocator.fill(ramdomalphalbet + ramdomalphalbet + "@inboxkiten.com");
}
async fillLocation() {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const randomIndex = Math.floor(Math.random() * alphabet.length);
  const ramdomalphalbet = alphabet[randomIndex];
     await this.locationFieldLocator.click({force: true});
     await this.locationFieldLocator.pressSequentially(ramdomalphalbet + ramdomalphalbet);
     await this.locationSugestionoptionLocator.click();

}
async selectConsultant() {
    await this.prefferedConsultantLocator.click();
    return await this.consultantOptionLocator.click();
}
async fillExactLocation() {
    await this.exactLocationOptionLocator.click();
    await expect.soft(this.exactAddressInputFieldLocator).toBeVisible();
    await this.exactAddressInputFieldLocator.fill("123 Main St, City, Country");

}
async clickHmoHeader(){
        await this.hmoCorporateHeaderLocator.click();

}

async selectHMOProvider() {
    await this.hmoProviderLocator.click();
    await this.hmoProviderOptionLocator.click();
}
async selectProviderPlan() {
    await this.providerPlanLocator.click();
    await this.hmoProviderOptionLocator.click();
}

    async fillProviderId(providerId: string) {
        await this.providerIdLocator.fill(providerId);
    }
    async clickAddNewBtn() {
        await this.addNewBtnLocator.click();
    }
    async selectNokRelationship(relationship: "Father" | "Mother" | "Relation" | "Sibling" | "Spouse" | "Cousin" | "Friend") {
        await this.NokRelationshipFieldLocator.click();
        await this.page.getByRole('option', { name: relationship }).click();
    }
    async fillNokName(name: string) {
        await this.NokNameFieldLocator.fill(name);
    }
    async clickNokHeader() {
        await this.NokHeaderLocator.click();
    }
    async fillNokPhoneNumber(phoneNumber: string) {
        await this.NokPhoneNumberFieldLocator.click({ force: true });
        await this.NokPhoneNumberFieldLocator.fill(phoneNumber);
    }
    async fillNokEmail(email: string) {
        await this.NokEmailFieldLocator.fill(email);
    }
    async fillNokAddress() {
        const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const randomIndex = Math.floor(Math.random() * alphabet.length);
  const ramdomalphalbet = alphabet[randomIndex];
  await this.NokAddressFieldLocator.click({force: true});
     await this.NokAddressFieldLocator.type(ramdomalphalbet + ramdomalphalbet);
     await this.locationSugestionoptionLocator.click();
    }
    async clickReceivedEmail() {
        await this.receivedEmailLocator.click();
    }
    async clickReceiveSms() {
        await this.receiveSmsLocator.click();
    }
    async clickRegisterPatientBtn() {
        await this.registerPatientBtnLocator.click();
    }
    async isPhoneNoErrorMessageVisible() {
        return await this.phoneNoErrorMessageLocator.textContent()
    }
    async selectFamilyTag() {
        await this.tagFieldLocator.click();
        await this.familyTagOptionLocator.click();
    }
    async clickCancelTransferPatientBtn() {
        await this.cancelTrasferPatientBtnLocator.click();
    }
    async getRegistrationCount(): Promise<number> {
    const text = await this.patientRegistrationCountLocator.innerText();
    return parseInt(text.replace(/\D/g, ""), 10); // remove non-numeric chars just in case
  }
  async getAppointmentCount(): Promise<number> {
    const text = await this.appointmentCountLocator.textContent();
    const count = parseInt(text?.match(/\d+/)?.[0] || '0', 10);
    return count;
  }


}