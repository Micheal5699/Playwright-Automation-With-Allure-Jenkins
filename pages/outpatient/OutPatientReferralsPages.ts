import { Locator, Page, expect } from "@playwright/test";
import { get } from "http";
import { getDateParts, getFormattedDate, getFormattedTime, getTomorrowDate } from "../../utils/dateutils";
import { stringify } from "querystring";

export class ReferralsModulePage {

    readonly page: Page;

    readonly systemDoneBtn: Locator;
    readonly referralTabBtn: Locator;
    readonly addEntryDropdown: Locator;
    readonly referalButton: Locator;
    readonly drugfield: Locator;
    readonly durationField: Locator;
    readonly dosageInput: Locator;
    readonly referealReasonField: Locator;
    readonly commentField: Locator;
    readonly hospitalBranchDropdown: Locator;
    readonly physicianNameDropdown: Locator;
    readonly specialtyDropdown: Locator;
    readonly signedByBtn: Locator;
    readonly pin1Field: Locator;
    readonly pin2Field: Locator 
    readonly pin3Field: Locator;
    readonly pin4Field: Locator
    readonly saveBtn: Locator;
    readonly showBtn: Locator;
    readonly validPinSuccessMessage: Locator;
    readonly submitBtn: Locator;
    readonly referralCreationSuccessMessage: Locator;
    readonly verifyReferralVisibility: Locator;
    readonly externalRadioBtn: Locator;
    readonly hospitalNameField: Locator;
    readonly physicianNameField: Locator;
    readonly specialtyNameField: Locator;
    readonly errorMessageForNotFilllingField: Locator;
    readonly incorrectPinErrorMessage: Locator;
    readonly editMedicationBtn: Locator;
    readonly addMedicationButton: Locator;
    readonly deleteMedicationBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.systemDoneBtn = page.getByText('systemDone').first();
        this.referralTabBtn = page.getByRole('button', { name: ' Referral' })
        this.addEntryDropdown = page.getByRole('button', { name: ' Add Entry' })
        this.referalButton = page.getByRole('menuitem', { name: 'Referral' })
        this.drugfield = page.locator('.form__select.tw-w-full.tw-h-\\[24px\\] > .modal-select__control > .modal-select__value-container > .modal-select__input-container')
        this.durationField = page.locator('#duration')
        this.dosageInput = page.getByRole('textbox', { name: '0' })
        this.referealReasonField = page.locator('#reason')
        this.commentField = page.locator('#comment')
        this.hospitalBranchDropdown = page.locator('.tw-grid.tw-grid-cols-12.tw-gap-6.tw-mt-3 > div > .tw-relative > .form__select > .modal-select__control > .modal-select__value-container > .modal-select__input-container').first()
        this.physicianNameDropdown = page.locator('.tw-col-span-12.md\\:tw-col-span-6 > .tw-relative > .form__select > .modal-select__control > .modal-select__value-container > .modal-select__input-container').first()
        this.specialtyDropdown = page.locator('#specialty > .modal-select__control > .modal-select__value-container > .modal-select__input-container')
        this.signedByBtn = page.getByRole('button', { name: 'Signed By:', exact: true })
        this.pin1Field = page.getByRole('textbox', { name: '-' }).first()
        this.pin2Field = page.getByRole('textbox', { name: '-' }).nth(1)
        this.pin3Field = page.getByRole('textbox', { name: '-' }).nth(2)
        this.pin4Field = page.getByRole('textbox', { name: '-' }).nth(3)
        this.saveBtn = page.getByRole('button', { name: 'Save' })
        this.showBtn = page.getByRole('button', { name: 'Show', exact: true })
        this.validPinSuccessMessage = page.getByText('Verification successful')
        this.submitBtn = page.getByRole('button', { name: 'Submit' })
        this.referralCreationSuccessMessage = page.getByText('Referral created successfully.')
        this.verifyReferralVisibility = page.getByRole('heading', { name: 'Standard Referral' }).first()
        this.externalRadioBtn = page.getByText('External')
        this.hospitalNameField = page.locator('#hospitalName')
        this.physicianNameField = page.locator('#physicianName')
        this.specialtyNameField = page.locator('#specialty')
        this.errorMessageForNotFilllingField = page.getByText('Some missing details in')
        this.incorrectPinErrorMessage = page.getByText('The supplied PIN is incorrect')
        this.editMedicationBtn = page.getByRole('cell', { name: ' ' }).locator('i').first()
        this.addMedicationButton = page.locator('button:has-text("Add Medication")');
        this.deleteMedicationBtn = page.getByRole('cell', { name: ' ' }).locator('i').nth(1)

    }

        async clickSystemDoneBtn() {
            await this.systemDoneBtn.click();       
    }
    async clickReferralTabBtn() {
        await this.referralTabBtn.click();
    }
    async clickAddEntryDropdown() {
        await this.addEntryDropdown.click();
    }
    async clickReferalButton() {
        await this.referalButton.click();
    }
    async enterDrugField(drugName: string) {
        await this.drugfield.click()
        await this.drugfield.pressSequentially(drugName);
        const firstOption = this.page.locator('[role="option"]').first();
        await firstOption.click();
    }
    async enterDurationField(duration: string) {
        await this.durationField.fill(duration);
    }
    async enterDosageField(dosage: string) {
        await this.dosageInput.fill(dosage);
    }
    async enterReferealReasonField(reason: string) {
        await this.referealReasonField.fill(reason);
    }
    async enterCommentField(comment: string) {
        await this.commentField.fill(comment);
    }
    async selectHospitalBranch(branchName: string) {
        await this.hospitalBranchDropdown.click();
        await this.hospitalBranchDropdown.pressSequentially(branchName);
        const firstOption = this.page.locator('[role="option"]').first();
        await firstOption.click();
    }
    async selectPhysicianName(physicianName: string) {
        await this.physicianNameDropdown.click();
        await this.physicianNameDropdown.pressSequentially(physicianName);
        const firstOption = this.page.locator('[role="option"]').first();
        await firstOption.click();
    }
    async selectSpecialty(specialty: string) {
        await this.specialtyDropdown.click();
        await this.specialtyDropdown.pressSequentially(specialty);
        const firstOption = this.page.locator('[role="option"]').first();
        await firstOption.click();
    }
    async clickSignedByBtn() {
        await this.signedByBtn.click();
    }
    async enterPin1Field(pin1: string) {
        await this.pin1Field.fill(pin1);
    }
    async enterPin2Field(pin2: string) {
        await this.pin2Field.fill(pin2);
    }
    async enterPin3Field(pin3: string) {
        await this.pin3Field.fill(pin3);
    }
    async enterPin4Field(pin4: string) {
        await this.pin4Field.fill(pin4);
    }
    async clickSaveBtn() {
        await this.saveBtn.click();
    }
    async clickShowBtn() {
        await this.showBtn.click();
    }
    async verifyValidPinSuccessMessage() {
        await expect(this.validPinSuccessMessage).toBeVisible();
    }
    async clickSubmitBtn() {
        await this.submitBtn.click();
    }
    async verifyReferralCreationSuccessMessage() {
        await expect(this.referralCreationSuccessMessage).toBeVisible();
    }
    async verifyReferralVisibilityInList() {
        await expect(this.verifyReferralVisibility).toBeVisible();
    }
    async clickExternalRadioBtn() {
        await this.externalRadioBtn.click();
    }
    async enterHospitalNameField(hospitalName: string) {
        await this.hospitalNameField.fill(hospitalName);
    }
    async enterPhysicianNameField(physicianName: string) {
        await this.physicianNameField.fill(physicianName);
    }
    async enterSpecialtyNameField(specialtyName: string) {
        await this.specialtyNameField.fill(specialtyName);
    }
    async verifyErrorMessageForNotFilllingField() {
        await expect(this.errorMessageForNotFilllingField).toBeVisible();
    }
    async verifyIncorrectPinErrorMessage() {
        await expect(this.incorrectPinErrorMessage).toBeVisible();
    }
    async clickEditMedicationBtn() {
        await this.editMedicationBtn.click();
    }
    async clickAddMedicationButton() {
        await this.addMedicationButton.click();
    }
    async clickDeleteMedicationBtn() {
        await this.deleteMedicationBtn.click();
    }
    
}