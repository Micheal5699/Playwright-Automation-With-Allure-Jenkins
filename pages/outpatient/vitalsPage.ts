import { Locator, Page, expect } from "@playwright/test";
import { get } from "http";
import { getDateParts, getFormattedDate, getFormattedTime, getTomorrowDate } from "../../utils/dateutils";
import { stringify } from "querystring";

export class VitalsModalPage {

    readonly page: Page;
    
    readonly newAppointmentNotificationLocator: Locator;
    readonly acceptPatientBtn: Locator;
    readonly startSessionBtn: Locator;
    readonly startBtn: Locator;
    readonly temparatureReadingDropdown: Locator;
    readonly temapratureField: Locator;
    readonly heightFtField: Locator;
    readonly heightInchField: Locator;
    readonly weightField: Locator;
    readonly systolicField: Locator;
    readonly diastolicField: Locator;
    readonly pulseField: Locator;
    readonly respiratoryField: Locator;
    readonly spo2Field: Locator;
    readonly respiratoryFlowRateFld: Locator;
    readonly painField: Locator;
    readonly painSeveritydropdown: Locator;
    readonly commentField: Locator;
    readonly bloodGlucoseField: Locator;
    readonly heartRateFld: Locator;
    readonly oxygenAmmountField: Locator;
    readonly oxygenLevelField: Locator;
    readonly submitBtn: Locator;
    readonly proceedBtn: Locator;
    readonly endSessionBtn: Locator;
    readonly continueWithEndSessionBtn: Locator;
    readonly vitalsSignsBtn: Locator;
    readonly addNewVitalsBtn: Locator;
    readonly temperatureReadingDropdown2: Locator;
    readonly vitalsCountLocator: Locator;

    constructor(page: Page) {
        this.page = page;
        this.newAppointmentNotificationLocator = page.locator("//div[@class='notification-card-2-message']");
        this.acceptPatientBtn = page.getByText('Accept Patient', { exact: true }).first();
        this.startSessionBtn = page.locator("//span[normalize-space()='START SESSION']").first();
        this.startBtn = page.locator("//button[normalize-space()='Start']");
        this.temparatureReadingDropdown = page.locator("//input[@id='react-select-3-input']");
        this.temapratureField = page.locator("//input[@name='temperature']");
        this.heightFtField = page.locator("//input[@name='heightInFeet']");
        this.heightInchField = page.locator("//input[@name='heightInInch']");
        this.weightField = page.locator("//input[@name='weight']");
        this.systolicField = page.locator("//input[@name='systolic']");
        this.diastolicField = page.locator("//input[@name='diastolic']");
        this.pulseField = page.locator("//input[@name='pulseRate']");
        this.respiratoryField = page.locator("//input[@name='respiratoryRate']");
        this.spo2Field = page.locator("//input[@name='spo2']");
        this.respiratoryFlowRateFld = page.locator("//input[@id='respiratoryFlowRate']");
        this.painField = page.locator("//input[@id='painLocation']");
        this.painSeveritydropdown = page.locator("(//div[contains(text(),'Select Option')])[2]");
        this.commentField = page.locator("//input[@id='comment']");
        this.bloodGlucoseField = page.locator("//input[@name='bloodGlucose']");
        this.heartRateFld = page.locator("//input[@name='heartRate']");
        this.oxygenAmmountField = page.locator("//input[@name='oxygenLevel']");
        this.oxygenLevelField = page.locator("//input[@name='oxygenLevelInL']");
        this.submitBtn = page.locator("//button[normalize-space()='Submit']");
        this.proceedBtn = page.locator("//button[normalize-space()='Proceed']");
        this.endSessionBtn = page.locator("//button[normalize-space()='End Session']");
        this.continueWithEndSessionBtn = page.locator("//button[normalize-space()='Continue With End Session']");
        this.vitalsSignsBtn = page.locator("//button[normalize-space()='Vital Signs']");
        this.addNewVitalsBtn = page.locator("//button[normalize-space()='Add New Vitals']");
        this.temperatureReadingDropdown2 = page.locator("//input[@id='react-select-5-input']");
        this.vitalsCountLocator = page.locator("//div[contains(@class, 'tw-px-10') and contains(@class, 'tw-py-9')]");


    }

async verifyPatientTransferToast(expectedText: string) {
  const toast = this.page.locator("//div[contains(@class, 'notification-card-2-message')]");
  await this.page.waitForTimeout(2000);
  await expect(toast).toBeVisible({ timeout: 250000 });
  await expect(toast).toContainText(expectedText);
  }

        async clickAcceptPatientBtn() {
            await this.acceptPatientBtn.click();       
    }
    async clickStartSessionBtn() {
        await this.startSessionBtn.click();       
    }
    async clickStartBtn() {
        await this.startBtn.click();       
    }
    async selectTemparatureReading(value: string) {
        await this.temparatureReadingDropdown.fill(value);
        const firstOption = this.page.locator('[role="option"]').first();
        await firstOption.click();       
    }
    async typeTemparature(value: string) {
        return this.temapratureField.fill(value);       
    }
    async typeHeightFt(value: string) {
        return this.heightFtField.fill(value);       
    }
    async typeHeightInch(value: string) {
        return this.heightInchField.fill(value);       
    }
    async typeWeight(value: string) {
        return this.weightField.fill(value);       
    }
    async typeSystolic(value: string) {
        return this.systolicField.fill(value);       
    }
    async typeDiastolic(value: string) {
        return this.diastolicField.fill(value);       
    }
    async typePulse(value: string) {
        return this.pulseField.fill(value);       
    }
    async typeRespiratory(value: string) {
        return this.respiratoryField.fill(value);       
    }
    async typeSpo2(value: string) {
        return this.spo2Field.fill(value);       
    }
    async typeRespiratoryFlowRate(value: string) {
        return this.respiratoryFlowRateFld.fill(value);       
    }
    async typePain(value: string) {
        return this.painField.fill(value);       
    }
    async selectPainSeverity(value: string) {
        await this.painSeveritydropdown.click();
        // const firstOption = this.page.locator('[role="option"]').first();
        // await firstOption.click();       
    }
    async typeComment(value: string) {
        return this.commentField.fill(value);       
    }
    async typeBloodGlucose(value: string) {
        return this.bloodGlucoseField.fill(value);       
    }
    async typeHeartRate(value: string) {
        return this.heartRateFld.fill(value);       
    }
    async typeOxygenAmmount(value: string) {
        return this.oxygenAmmountField.fill(value);       
    }
    async typeOxygenLevel(value: string) {
        return this.oxygenLevelField.fill(value);       
    }
    async clickSubmitBtn() {
        await this.submitBtn.click();       
    }
    async clickProceedBtn() {
        await this.proceedBtn.click();       
    }
    async verifySuccessMessage(message: string) {
    const successToast = this.page.locator(`//div[contains(text(),'${message}')]`);
    await expect(successToast).toBeVisible();
}
    async clickEndSessionBtn() {
        await this.endSessionBtn.click();       
    }
    async clickContinueWithEndSessionBtn() {
        await this.continueWithEndSessionBtn.click();       
    }
    async verifyErrorMessage(message: string) {
    const successToast = this.page.locator(`//div[contains(text(),'${message}')]`);
    await expect(successToast).toBeVisible();
}
    async clickVitalsSignsBtn() {
        await this.page.waitForTimeout(7000);
        await this.vitalsSignsBtn.click({ force: true });       
    }
    async clickAddNewVitalsBtn() {
        await this.addNewVitalsBtn.click();       
    }
    async selectTemparatureReading2(value: string) {
        await this.temperatureReadingDropdown2.fill(value);
        const firstOption = this.page.locator('[role="option"]').first();
        await firstOption.click();       
    }
    async verifyVitalsCount(expectedCount: number) {
  const vitals = this.vitalsCountLocator;
  await expect(vitals).toHaveCount(expectedCount);
  console.log(`Found ${expectedCount} vitals on the page`);
}
}