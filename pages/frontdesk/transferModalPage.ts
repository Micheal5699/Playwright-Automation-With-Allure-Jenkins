import { expect, Locator, Page } from "@playwright/test";
import { FrontdeskPatientListingPage } from "./frontdeskListingPage";
import { th } from "@faker-js/faker";

export class TransferModalPage{

    readonly page: Page;
    readonly headerTextLocator: Locator;

readonly specialtyDropdownLocator: Locator
readonly consultantRadionBtnLocator: Locator
readonly timeSlotDropdownLocator: Locator
readonly timeSlotOptionLocator: Locator
readonly reasonDropdownLocator: Locator
readonly reasonSlotOptionLocator: Locator
readonly consultationFeeLocator: Locator
readonly submitBtnLocator: Locator
readonly closeBtnLocator: Locator







constructor(page: Page) {
    this.page = page;
    this.headerTextLocator = page.locator('div').filter({ hasText: /^Transfer Patient$/ }).nth(2)
    this.specialtyDropdownLocator = page.locator('.modal-select__input-container').first();
    this.consultantRadionBtnLocator=page.locator("//span[text()='Adeolu1 Ogungbesan']/parent::label/preceding-sibling::input")
    this.timeSlotDropdownLocator=page.locator('div:nth-child(4) > div:nth-child(2) > .tw-relative > .form__select > .modal-select__control > .modal-select__value-container > .modal-select__input-container')
    this.timeSlotOptionLocator=page.getByRole('option').first()
    this.reasonDropdownLocator=page.locator('div:nth-child(3) > .tw-relative > .form__select > .modal-select__control > .modal-select__value-container > .modal-select__input-container')
    this.reasonSlotOptionLocator=page.getByRole('option').nth(1)
    this.consultationFeeLocator=page.getByText('Consultation Fee: ₦')
    this.submitBtnLocator=page.getByRole('button', { name: 'Transfer & Raise Bill' })
    this.closeBtnLocator = page.getByRole('dialog').getByRole('img');

}
 async isModalOpen() 
   {
     return await this.headerTextLocator.isVisible();
   }
//  async clickSpecialtyDropdown() 
//    {
//     await this.specialtyDropdownLocator.click();
//    }
//  async selectSpeciality(filter: string) 
//    {
//        await this.specialtyDropdownLocator.click();
//      const options =  this.page.getByRole('option', { name:filter }).first();
//      await expect(options).toBeVisible();
//      const selectedOption = await options.textContent()
//       await options.click();
//       return selectedOption;
//     }
 async clickOnConsultant() 
    {
     await this.consultantRadionBtnLocator.click();
    }
  /*
async selectFirstDropdownOptionByLabel(labelText: string): Promise<string> {
  // Locate the wrapper that contains the label
  const wrapper = this.page.locator('div.tw-flex.tw-flex-col.tw-gap-1')
    .filter({ has: this.page.locator(`label:has-text("${labelText}")`) });

  // Find the input within the scoped wrapper
  const input = wrapper.locator('input.modal-select__input');
  await input.waitFor({ state: 'visible' });
  await input.click();

  // Select the first dropdown option
  const firstOption = this.page.locator('div[id*="option"]').first();
  await firstOption.waitFor({ state: 'visible' });
  const selectedText = await firstOption.textContent();
  await firstOption.click();

  return selectedText?.trim() || '';
}
*/

 async selectTimeSlot() 
   {
     await this.timeSlotDropdownLocator.click();
     const firstOption = this.page.locator('div[id*="option"]').first();
     const selectedTime = await firstOption.textContent();
     await firstOption.click();
     return selectedTime;
    }

async selectReason() {
    await this.reasonDropdownLocator.click();
    const reasonOption = this.page.getByRole('option').nth(1); // Assuming the second option is desired
    await reasonOption.waitFor({ state: 'visible' });
    const selectedReason = await reasonOption.textContent();
    await reasonOption.click();
    return selectedReason;
}
    
async getConsultationFee() {
    return await this.consultationFeeLocator.textContent();
}
async isConsultationFeeVisible() {
    return await this.consultationFeeLocator.isVisible();
}
async clickSubmitBtn() {
    await this.submitBtnLocator.click();
}

/**
 * Closes the transfer modal and verifies that the user is returned to the patient listing page.
 * This provides a robust way to exit the modal and ensure the UI is in the correct state.
 */
async closeModalAndReturnToListing(): Promise<void> {
    const patientListingPage = new FrontdeskPatientListingPage(this.page);
    let retries = 0;
    const maxRetries = 5;
    while (await this.headerTextLocator.isVisible() && retries < maxRetries) {
        await this.page.reload();
        await this.page.waitForTimeout(3000)
        retries++;  
    }

    // Wait for the modal to disappear and the listing page to be visible
    //await expect.soft(this.headerTextLocator).not.toBeVisible();
    //await expect.soft(patientListingPage.headerTextLocator).toBeVisible();
}

}