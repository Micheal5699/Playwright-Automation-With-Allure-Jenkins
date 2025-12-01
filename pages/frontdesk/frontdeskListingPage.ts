import { expect, Locator, Page } from "@playwright/test";
import {getRandomName} from"../../utils/nameUtils";
import {getHmoprovider} from "../../utils/HMOutils";
import {formatDate} from "../../utils/dateutils";



export class FrontdeskPatientListingPage{


readonly page: Page;
readonly headerTextLocator: Locator;
readonly registerPatientBtnLocator: Locator;
readonly filterBtnLacator: Locator;
readonly patientNameLocator: Locator;
readonly checkinBtnLocator: Locator;
readonly successToastLocator: Locator;
readonly patientLinkLocator: Locator;
readonly editProfileBtnLocator: Locator;
readonly givenNameFieldLocator: Locator;
readonly tittleFieldLocator: Locator;
readonly searchLocator: Locator;
readonly searchByFilter: Locator;
readonly searchDropdown: Locator;
readonly genderFilterLocator: Locator;











constructor(page: Page) {
    this.page = page;
    this.headerTextLocator = page.getByRole('heading', { name: 'Patients', exact: true });
    this.registerPatientBtnLocator = page.getByRole('button', { name: 'Register a Patient', exact: true });
    this.filterBtnLacator = page.locator("//span[text()='Filters']")
    this.patientNameLocator = page.locator("//a[@class='hover:tw-text-[#6a69e4] tw-text-foreground tw-no-underline']")
    this.checkinBtnLocator = page.locator('table tbody tr:has(button:has-text("Check In")) button:has-text("Check In")').first()
    this.successToastLocator = page.getByRole('heading', { name: 'New Appointment' });
    this.patientLinkLocator = page.getByRole('row').getByRole('link')
    this.editProfileBtnLocator = page.getByText('Edit Profile')
    this.givenNameFieldLocator = page.getByRole('textbox', { name: 'Enter your given name' })
    this.tittleFieldLocator = page.locator('.lg\\:tw-pl-4 > .tw-mb-4 > .tw-relative > .form__select > .modal-select__control > .modal-select__value-container > .modal-select__input-container')
    this.searchLocator = page.locator("//input[@placeholder='Search...']");
    this.searchByFilter = page.getByRole('button', { name: 'Name' });
    this.searchDropdown = page.locator("body/div[3]");
    this.genderFilterLocator= page.locator("//body[1]/div[3]/div[1]/div[1]/form[1]/div[1]/div[2]/div[1]/div[1]/div[1]");




}
async isPageOpen() {
    return await this.headerTextLocator.isVisible();
}
async clickRegisterPatientBtn() {
    await this.registerPatientBtnLocator.click({ force: true });
}
async clickFilterBtn() {
    await this.filterBtnLacator.click();
}
 async FilterBy(filter: string) 
    {
     await this.filterBtnLacator.click();
      this.page.getByText(filter);
     switch(filter) 
     {
       case "Sponsors/HMO":
        let searchResult = false;

        while (searchResult == false) {
           this.page.locator('.modal-select__input-container').first();
          const HMO = await getHmoprovider(this.page)
          await this.page.getByRole('option', { name:HMO}).click();
          await this.applyFilter();
          await this.page.waitForLoadState("networkidle");
          
          const emptyResult = await this.page.locator(".settings__empty");
          const isEmpty = await emptyResult.isVisible().catch(() => false)
          
          if (!isEmpty) {
            searchResult = true;
            await this.assertSearchResults(HMO);
          }
        }
        
        break;
        case "Gender":
        await this.genderFilterLocator.click();
        await this.page.getByRole('option', { name: 'Male', exact: true }).click();
        await this.applyFilter();
        await this.page.waitForLoadState("networkidle");
        await this.assertSearchResults("Male");
        await this.genderFilterLocator.click();
        await this.page.getByRole('option', { name: 'Female', exact: true }).click();
        await this.applyFilter();
        await this.page.waitForLoadState("networkidle");
        await this.assertSearchResults("Female");
        break;

        case "Date From":
          const date = formatDate();
          const dateFrom =this.page.getByRole('button', { name: 'Monday, September 1st,' });
          await this.page.getByRole('button', { name: 'Date From' }).click();
          await dateFrom.click();
          const dateTo = this.page.getByRole('button',{name: date});
          await dateTo.click();
          await this.applyFilter();
          await this.page.waitForLoadState("networkidle");
         // await this.assertSearchResults(date);
          break;

          case "Private Patient" :
          await this.page.getByRole('checkbox').click();
          await this.applyFilter();
          await this.page.waitForLoadState("networkidle");
          await this.assertSearchResults("Private Patient");
          break;
       }
     }
      async applyFilter()
     {
       await this.page.getByRole('button', { name: 'Apply' }).click();    
      }    

   async clearFilter()
   {
     await this.page.getByRole('button', { name: 'Clear' }).click();
    }
   
// This function finds the name of the first patient with a Check In button
async getFirstPatientWithCheckIn() {
  const patientName = await this.page.locator(
  'table tbody tr:has(button:has-text("Check in")) td a'
).first().innerText();
  return patientName;
}
async clickFirstPatientWithCheckIn() {
    await this.checkinBtnLocator.click();
}
async isCheckoutBtnVisible(patientName: string){
  const btnName = this.page.getByRole('row', { name: patientName }).getByRole('button')
  const btnText = await btnName.textContent()
  return btnText;

}
async clickThePatientLinkText(patientName: string) {
  const lintText = this.page.getByRole('link', { name: patientName });
  await lintText.click();
}
async isSuccessToastVisible() {
  return await this.successToastLocator.isVisible();
}
async isPatientListed(patientName: string): Promise<boolean> {
    const patientLocator = this.page.getByRole('link', { name: patientName })
    return await patientLocator.isVisible();
  } 
  // ...existing code...

async openRegistrationForm(maxTries: number = 5): Promise<void> {
    let tries = 0;
    // Replace this with a locator that uniquely identifies the registration form
    const registrationFormLocator = this.page.getByRole('heading', { name: 'Registration form' });

    while (tries < maxTries) {
        await this.clickRegisterPatientBtn();
        // Wait a short time for the form to appear
        await this.page.waitForTimeout(500);
        if (await registrationFormLocator.isVisible()) {
            break;
        }
        tries++;
    }
}
async clickPatientLink(n: number) {
  await this.patientLinkLocator.nth(n).click();
}
async clickEditProfileBtn() {
  await this.editProfileBtnLocator.click();
}

async getGivenNameValue(): Promise<string> {
  return await this.givenNameFieldLocator.inputValue();
}

async enterGivenName(givenName: string) {
  await this.givenNameFieldLocator.fill(givenName);
}
async getTittleValue(): Promise<string> {
  const initialTittle = await this.tittleFieldLocator.inputValue();
  await this.tittleFieldLocator.click();
  await this.page.keyboard.press('ArrowDown');
  await this.page.keyboard.press('Enter');
  return initialTittle;
}




   async searchBy(filter: string) 
   {
    await this.searchByFilter.click();
    await this.page.getByRole('menuitem', { name: filter }).click();
    switch(filter) 
   {
      case 'Name':
        const randomName = await getRandomName(this.page);
          await this.searchLocator.fill(randomName)
          await this.assertSearchResults(randomName);
          break;
       case "MRN":
          const MRN = Math.floor(Math.random() * 90) + 10; // Generate a random MRN
        await this.searchLocator.fill(MRN.toString());
       await this.assertSearchResults(MRN.toString());
        break; 
       case "Phone":
        const phone = Math.floor(Math.random() * 900) + 10;
        await this.searchLocator.fill(phone.toString());
        await this.assertSearchResults(phone.toString());
        break;
          
    }

    }

    async assertSearchResults(searchParam: string) {
      await this.page.waitForSelector('table tbody tr');

  // Get all rows in the result table
  const rows = this.page.locator('table tbody tr');
  const rowCount = await rows.count();

  // Assert that there is at least one result
  expect(rowCount).toBeGreaterThan(0);

  // Assert that each row contains the search text
  for (let i = 0; i < rowCount; i++) {
    const row = rows.nth(i);

    const rowText = await rows.nth(i).innerText();
    
    let finalRowText = rowText.replace(/\s/g, "").trim()
    finalRowText = finalRowText.toLocaleLowerCase()

    searchParam = searchParam.replace(/\s/g, "").trim()
    searchParam = searchParam.toLocaleLowerCase()


    console.log(rowText, searchParam);

    expect.soft(finalRowText).toContain(searchParam);
  }
    }
  }
  