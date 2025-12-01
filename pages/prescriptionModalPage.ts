import { Locator, Page } from "@playwright/test";



export class PrescriptionModalPage {
    readonly page: Page;
    readonly headerTextLocator: Locator;
    readonly registerANewPatientBtnLocator: Locator;








    constructor(page:   Page) {
        this.page = page;
        this.headerTextLocator = page.getByRole('heading', { name: ' Add Prescription' });
        this.registerANewPatientBtnLocator = page.getByRole('button', { name: '+ Register guest' });
    }
    async verifyPrescriptionModal() {
        await this.headerTextLocator.waitFor();
        await this.headerTextLocator.isVisible();
    }
    async clickRegisterANewPatientBtn() {
        await this.registerANewPatientBtnLocator.click();
        
    }

    
}