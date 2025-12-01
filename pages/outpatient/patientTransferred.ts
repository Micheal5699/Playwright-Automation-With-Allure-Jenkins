import { expect, Locator, Page } from "@playwright/test";
import { th } from "@faker-js/faker";

export class PatientTransferred{

    readonly page: Page;
    readonly headerTextLocator: Locator
    readonly patientTrasferTrayLocator: Locator
    readonly goBackLocator: Locator
    readonly acceptPatientLocator: Locator
   





constructor(page: Page) {
    this.page = page;
    this.headerTextLocator = page.locator("(//h3[@class='dashboard-header__title'])[1]");
    this.patientTrasferTrayLocator = page.locator("(//div[@class='mb-5'])[1]");
    this.goBackLocator = page.locator("(//div[@class='tw-flex tw-items-center tw-cursor-pointer'])[1]");
    this.acceptPatientLocator = page.getByRole('button', { name: 'Accept Patient' }).first();
    
    
}

async pageIsOpen()
{
    await this.headerTextLocator.isVisible();
}

async exit()
{
    await this.goBackLocator.click();
}

async readDepartmentTList()
{
    const patientTrasferCard = "div[class='mb-5']";
    await this.page.waitForSelector(patientTrasferCard);

    let cards= await this.page.$$eval(`${patientTrasferCard} div[class='tw-mt-5']`, cells =>{
        return cells.map(cell => cell.textContent?.trim() || "");
    })
    
    return cards;
}

  async acceptPatient()
 {
    await this.acceptPatientLocator.click();
 }

 



}