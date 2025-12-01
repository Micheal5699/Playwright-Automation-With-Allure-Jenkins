import { Locator, Page } from "@playwright/test";
import { invalid } from "moment";



export class EditPatientProfilePage{

    readonly page: Page;
    readonly headerTextLocator: Locator;
    readonly givenNameFieldLocator: Locator;
    readonly titleFieldLocator: Locator;
    readonly lastNameFieldLocator: Locator;
    readonly dateOfBirthFieldLocator: Locator;
    readonly genderFieldLocator: Locator;
    readonly phoneNumberFieldLocator: Locator;
    readonly emailFieldLocator: Locator
    readonly addressFieldLocator: Locator
    readonly selectPlanDropdownLocator: Locator
    readonly selectPlanOptionLocator: Locator
    readonly prefferedConsultantLocator: Locator
    readonly prefferedConsultantOptionLocator: Locator
    readonly nextOfKinNameFieldLocator: Locator
    readonly nextOfKinPhoneFieldLocator: Locator
    readonly nextOfKinEmailFieldLocator: Locator
    readonly nextOfKinAddressFieldLocator: Locator
    readonly relationshipDropdownLocator: Locator
    readonly relationshipOptionLocator: Locator
    readonly hmoProviderDropdownLocator: Locator
    readonly hmoProviderOptionLocator: Locator
    readonly hmoIDFieldLocator: Locator
    readonly hmoPlanDropdownLocator: Locator
    readonly hmoPlanOptionLocator: Locator
    readonly addNewHmoBtnLocator: Locator
    readonly updateProfileBtnLocator: Locator
    readonly consentSMSLocator: Locator
    readonly consentEmailLocator: Locator
    readonly deleteHmoBtnLocator: Locator
    readonly continueBtnLocator: Locator
    readonly closeBtnLocator: Locator
    readonly successMessageLocator: Locator
    readonly undoEditBtnLocator: Locator;
    readonly alertMessageLocator: Locator;
    readonly invalidEmailMessageLocator: Locator;







    constructor(page: Page) {
        this.page = page;
        this.headerTextLocator = page.getByText('Personal DetailsUndo Edit');
        this.givenNameFieldLocator = page.getByRole('textbox', { name: 'Enter your given name' });
        this.titleFieldLocator = page.locator('.lg\\:tw-pl-4 > .tw-mb-4 > .tw-relative > .form__select > .modal-select__control > .modal-select__value-container > .modal-select__input-container')
        this.lastNameFieldLocator = page.getByRole('textbox', { name: 'Enter your last name' });
        this.dateOfBirthFieldLocator = page.getByRole('button', { name: 'Date of Birth' })
        this.genderFieldLocator = page.locator('.modal-select__input-container').first()
        this.phoneNumberFieldLocator = page.locator('form div').filter({ hasText: 'Personal DetailsUndo EditGiven Name Last' }).getByPlaceholder('Enter phone number');
        this.emailFieldLocator = page.getByRole('textbox', { name: 'Enter your email' });
        this.addressFieldLocator = page.getByRole('textbox', { name: 'Enter your address' });
        this.selectPlanDropdownLocator = page.locator('.tw-mb-4.lg\\:tw-pl-4 > .tw-relative > .form__select > .modal-select__control > .modal-select__value-container > .modal-select__input-container');
        this.selectPlanOptionLocator = page.getByRole('option').nth(1);
        this.prefferedConsultantLocator = page.locator('.tw-mt-6 > .tw-relative > .form__select > .modal-select__control > .modal-select__value-container > .modal-select__input-container');
        this.prefferedConsultantOptionLocator = page.getByRole('option').nth(1);
        this.nextOfKinNameFieldLocator = page.getByRole('textbox', { name: 'Enter next of kin name' })
            this.nextOfKinPhoneFieldLocator = page.locator('div').filter({ hasText: /^Email Address Phone Number Phone$/ }).getByPlaceholder('Enter phone number'); 
        this.nextOfKinEmailFieldLocator = page.getByPlaceholder('johndoe@gmail.com')
        this.nextOfKinAddressFieldLocator = page.locator('form div').filter({ hasText: 'Next of KinName Phone Email Address Relationship' }).getByPlaceholder('Enter address');
        this.relationshipDropdownLocator = page.locator('.details-section__group > .lg\\:tw-pl-4 > .tw-relative > .form__select > .modal-select__control > .modal-select__value-container > .modal-select__input-container')
        this.relationshipOptionLocator = page.getByRole('option').nth(1);
        this.hmoProviderDropdownLocator = page.locator('form div').filter({ hasText: 'HMO Provider' }).getByRole('combobox');
        this.hmoProviderOptionLocator = page.getByRole('option').nth(1);
        this.hmoIDFieldLocator = page.locator('form div').filter({ hasText: 'Provider ID' }).nth(3);
        this.hmoPlanDropdownLocator = page.locator('form div').filter({ hasText: 'HMO Plan' }).getByRole('combobox');
        this.hmoPlanOptionLocator = page.getByRole('option').nth(1);
        this.addNewHmoBtnLocator = page.getByRole('button', { name: 'Add New' });
        this.consentSMSLocator = page.locator('label').filter({ hasText: 'Does the patient want to be able to receive SMS' }).locator('span').first();
        this.consentEmailLocator = page.locator('label').filter({ hasText: 'Does the patient want to be able to receive Email' })
        this.updateProfileBtnLocator = page.getByRole('button', { name: 'Update Profile' });
        this.deleteHmoBtnLocator = page.getByRole('cell', { name: '' });
        this.continueBtnLocator = page.getByRole('button', { name: 'Continue' });
        this.successMessageLocator = page.getByText('Patient details updated')
        this.undoEditBtnLocator = page.getByText('Undo Edit');
        this.alertMessageLocator = page.getByRole('alert');
        this.closeBtnLocator = page.getByRole('button', { name: 'Close' }).nth(1);
        this.invalidEmailMessageLocator = page.getByText('The email format entered is')
    
    }
async clickCloseBtn() {
        await this.closeBtnLocator.click();
    }

    async getAlertMessage()
    {
        return await this.alertMessageLocator.textContent();
    }   

    async clickUndoEditBtn() {
        this.undoEditBtnLocator.click();
    }

    async verifyEditPatientProfilePage() {
        return await this.headerTextLocator.isVisible();
    }
    async getGivenNameValue(): Promise<string> {
        return await this.givenNameFieldLocator.inputValue();
    }   
    async getLastNameValue(): Promise<string> {
        return await this.lastNameFieldLocator.inputValue();
    }
    async getUpdatedEmail(): Promise<string> {
        return await this.emailFieldLocator.inputValue();
    }
    async getUpdatedAddress(): Promise<string> {
        return await this.addressFieldLocator.inputValue();
    }
    async getUpdatedPhoneNumber(): Promise<string> {
        return await this.phoneNumberFieldLocator.inputValue();
    }   
    async updateGivenName(newGivenName: string) {
        await this.givenNameFieldLocator.fill(newGivenName);
        return newGivenName;
    }
    async updateLastName(newLastName: string) {
        await this.lastNameFieldLocator.fill(newLastName);
        return newLastName;
    }
    async updateEmail(newEmail: string) {
        await this.emailFieldLocator.fill(newEmail);
        return newEmail;
    }
    async updateTitle(title: string) {
        await this.titleFieldLocator.click();
        await this.page.getByRole('option', { name: title }).click();
    }
    
    
    async updateAddress(newAddress: string) {
        await this.addressFieldLocator.fill(newAddress);
        return newAddress;
    }
    async updatePhoneNumber(newPhoneNumber: string) {
        await this.phoneNumberFieldLocator.clear();
        await this.phoneNumberFieldLocator.fill(newPhoneNumber);
        return newPhoneNumber;
    }
    async clickUpdateProfileBtn() {
        await this.updateProfileBtnLocator.click();
        await this.continueBtnLocator.click({force:true});
    }
    async isSuccessMessageVisible() {
        return await this.successMessageLocator.textContent();
    }
    async clickAddNewHmoBtn() {
        await this.addNewHmoBtnLocator.click();
    }
    async clickDeleteHmoBtn() {
        await this.deleteHmoBtnLocator.click();
    }
    async updatePatientTitle(title: string) {
        await this.titleFieldLocator.click();
        await this.page.getByRole('option', { name: title }).click();
    }
    async updateNokDetails(nokName: string,   nokEmail: string,  relationship: string) {
        await this.nextOfKinNameFieldLocator.fill(nokName);
        // await this.nextOfKinPhoneFieldLocator.clear({force:true});
       // await this.nextOfKinPhoneFieldLocator.type(nokPhone);
        //await this.emailFieldLocator.fill(newEmail);
        await this.nextOfKinEmailFieldLocator.fill(nokEmail);
        await this.relationshipDropdownLocator.click();
        await this.page.getByRole('option', { name: relationship }).first().click();
        //await this.relationshipOptionLocator.click();
        return {
            nokName,
            // nokPhone,
            nokEmail,
            relationship
        };  

    }
    async updatePatientProfile(UpdatedGivenName: string, UpdatedLastName: string, UpdatedEmail: string, UpdatedPhoneNumber: string, UpdatedAddress: string, UpdatedTitle: string) {

        await this.updateGivenName(UpdatedGivenName);
        await this.updateLastName(UpdatedLastName);
        await this.updateEmail(UpdatedEmail);
        await this.updatePhoneNumber(UpdatedPhoneNumber);
        await this.updatePatientTitle(UpdatedTitle);
        return {
            UpdatedGivenName,
            UpdatedLastName,
            UpdatedEmail,
            UpdatedPhoneNumber,
            UpdatedAddress
        };
    }
    async updatePrefferedConsultant() {
        await this.prefferedConsultantLocator.click();
        const prefferedConsultant = this.page.getByRole('option').nth(1).click();
        return prefferedConsultant;
    
    }
    async toggleSmsConsent() {
        await this.consentSMSLocator.click();
    }
    async toggleEmailConsent() {
        await this.consentEmailLocator.click();
    }

} 