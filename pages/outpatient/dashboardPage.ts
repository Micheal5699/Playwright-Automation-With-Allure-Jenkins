import { expect, Locator, Page } from "@playwright/test";
import { th } from "@faker-js/faker";
import { AssertionError } from "assert";
import {getDateDMY} from "../../utils/dateutils";


export class DashboardPage{
 
    readonly page: Page;
    readonly headerTextLocator: Locator
    readonly appointmentCountLocator: Locator
    readonly admissionCountLocator: Locator
    readonly emergencyCountLocator: Locator
    readonly surgeryCountLocator: Locator
    readonly departmentTransferListLocator: Locator
    readonly filterLocator: Locator
    readonly pTransferBodyLocator: Locator
    readonly allTransferlistLocator: Locator
    readonly searchByFilterLocator: Locator
    readonly searchByFilterDropdownLocator: Locator
    readonly paitientTransferHeaderLocator : Locator
    readonly notificationPopUpLocator: Locator
    readonly popUpMessageLoactor: Locator
    readonly closePopUplocator: Locator
     readonly startSessionLocator: Locator
     readonly starrtBtnLocator: Locator
     readonly message2locator: Locator
     readonly appointmentCardsLocator: Locator
     readonly patientNameLocator: Locator
    

   
    



    constructor(page: Page) {
        this.page = page;
        this.headerTextLocator = page.locator("h3[class='tw-text-[2rem] tw-my-12 dashboard-header__title']");
        this.appointmentCountLocator = page.locator("(//div[@role='button'])[1]");
        this.admissionCountLocator = page.locator("(//div[@role='button'])[2]");
        this.emergencyCountLocator = page.locator("(//div[@role='button'])[3]");
        this.surgeryCountLocator = page.locator("(//div[@role='button'])[4]");
        this.departmentTransferListLocator = page.locator("div[class='tw-mb-5 md:tw-mb-0 ']");
        this.filterLocator = page.getByRole('button', { name: 'Filters' });
        this.paitientTransferHeaderLocator = page.locator("(//div[contains(@class,'patients-dashboard-head')])[1]");
        this.pTransferBodyLocator = page.locator("(//div[@class='patients-dashboard-body'])[1]")
        this.allTransferlistLocator = page.locator("div[class='dashboard-header-link']");
        this.searchByFilterLocator = page.locator("(//input[@placeholder='Search...'])[1]");
        this.searchByFilterDropdownLocator = page.locator("(//div[@class='tw-absolute tw-bottom-3 tw-left-5'])[1]");
        this.notificationPopUpLocator = page.locator(".Toastify__toast-container.Toastify__toast-container--top-right");
        this.popUpMessageLoactor = page.locator(".tw-mb-4.notification-card-2-message-title");
        this.closePopUplocator = page.getByText('Close');
        this.startSessionLocator= page.getByRole('button', { name: 'START SESSION' }).last();
        this.starrtBtnLocator = page.getByRole('button', { name: 'Start', exact: true });
        this.message2locator= page.locator("(//p[@class='tw-mb-0 notification-card-2-message-text'])[1]");
        this.appointmentCardsLocator= page.locator("div[class='tw-grid lg:tw-grid-cols-2 tw-gap-6']");
        this.patientNameLocator = page.locator("h3[class='header-title tw-mx-auto md:tw-mr-auto md:tw-ml-3']").last();
    }    

 async isPageOpen() 
   {
     return await this.headerTextLocator.isVisible();
   }
 
   async getAppointmentCount() 
   {
     return await this.appointmentCountLocator.textContent();
   }
   
   async getAdmissionCount() 
   {
     return await this.admissionCountLocator.textContent();
   }
   
   async getEmergencyCount() 
   {
     return await this.emergencyCountLocator.textContent();
   }
   
   async getSurgeryCount() 
   {
     return await this.surgeryCountLocator.textContent();
   }
  
   async paitientTransferHeader()
   {
     return await this.paitientTransferHeaderLocator.isVisible();
   }

   async readTransferPaiitientList() 
   {
      {
         const cells = this.pTransferBodyLocator.locator("div:first-child");
         const body = await cells.allTextContents();
             if (body.length === 0)
             {
               throw new Error("No transfer found in the table");
              }   
      } 
    }          
   
  async readTransferListContent() 
   {
    const transferBodySelector = ".patients-dashboard-body";
    await this.page.waitForSelector(transferBodySelector);
    
     let transfers = await this.page.$$eval(`${transferBodySelector} div`, cells => {
       return cells.map(cell => cell.textContent?.trim() || "");
     })
    
     
     return transfers;
     

    }

   dataAssertion(transfers: string[])
   {
     const date = getDateDMY();

     for (const transfer of transfers) {
      expect(transfer).toContain(date);
     }
   }


 async viewDeptTransferList()
{
  await this.departmentTransferListLocator.click();
  await this.page.locator("(//h3[@class='access-log-header__title'])[1]").isVisible();
}
 
 async popUPIsVisible()
 {
   return await this.notificationPopUpLocator.isVisible();
   
 }

 async popUpAssertion()
 {
   await expect(this.popUpMessageLoactor).toHaveText("New Appointment")
 }

 async closePopUp()
 {
  await this.closePopUplocator.click();
 }

 async popUpContent ()
 {
  const notificationText= await this.message2locator.innerText();
  const match = notificationText.match(/has transferred (.*?) for Appt Test Mode/);
  const patientName = match ? match[1].trim() : null;
  expect(patientName).not.toBeNull();
  console.log(`Patient Name: ${patientName}`);
  return patientName;
 }
 
  async startSession()
 {
   await this.startSessionLocator.click();

  }
 
  async startpopup()
  {
    await this.starrtBtnLocator.click();
  }
 async patientCardIsVissible()
    {
        await this.patientNameLocator.isVisible();
    }
    
    async clickOnPatientName()
    {
        await this.patientNameLocator.click();
    }




}
