import { Locator, Page } from "@playwright/test";




export class PharmarcyDashbordPage {
    readonly page;
    readonly sellItemBtnLocator: Locator
    readonly selPrescriptionItemBtnLocator: Locator
    readonly sellRetailItemBtnLocator: Locator













    constructor(page: Page) {
        this.page = page;
        this.sellItemBtnLocator = page.getByRole('button', { name: 'Sell item' })
        this.selPrescriptionItemBtnLocator = page.getByRole('menuitem', { name: 'Prescription' })
        this.sellRetailItemBtnLocator = page.getByRole('menuitem', { name: 'Retail' })


    }
    
async clickToSellPrescriptionItem() {
    await this.sellItemBtnLocator.click(); 
    await this.selPrescriptionItemBtnLocator.click();

}
async clickSellRetailItemBtn() {
    await this.sellItemBtnLocator.click();
    await this.sellRetailItemBtnLocator.click();

}

}