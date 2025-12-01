import { Locator, Page } from "@playwright/test";



export class InpatientDashboardPage{

readonly page: Page;
readonly admitPatientBtnLocator: Locator;













constructor(page: Page) {
    this.page = page;
    this.admitPatientBtnLocator = this.page.getByRole('button', { name: 'Admit patient' })







}
async clickAdmitPatientBtn(modalLocator: Locator, maxRetries = 5, timeout = 50000) {
    let attempt = 0;
    const start = Date.now();
    while (attempt < maxRetries && Date.now() - start < timeout) {
        await this.admitPatientBtnLocator.click({ force: true });
        if (await modalLocator.isVisible({ timeout: 3000 })) {
            return; // Modal is open, exit loop
        }
        attempt++;
        await this.page.waitForTimeout(1000); // Optional: short wait before retry
    }
    throw new Error('Admit Patient modal did not open after maximum retries');
}
}