import { expect,page } from "@playwright/test";
import { test } from "../../fixture/fixture-loader";
import { ModuleSelectorPage } from "../../pages/moduleSelectorPage";
import { LoginPage } from "../../pages/loginPage";
import { da, tr } from "@faker-js/faker";
import { DashboardPage} from "../../pages/outpatient/dashboardPage";
import { PatientTransferred } from "../../pages/outpatient/patientTransferred";
import { compareTransferLists } from "../../utils/transferUtils";
import { NavigationSideBarComponent } from "../../pages/navigationSideBarComponet";
import { FrontdeskPatientListingPage } from "../../pages/frontdesk/frontdeskListingPage";
import {TransferModalPage} from "../../pages/frontdesk/transferModalPage"


const devUrl = "https://dev.indigoemr.com";


test.beforeAll(async ({ browser }) => 
{
     const context = await browser.newContext();
     const page = await context.newPage();
     const loginpage = new LoginPage(page);
     const selectLocation = new ModuleSelectorPage(page, "Front Desk");
     const navbar = new NavigationSideBarComponent(page);
     const patientListing = new FrontdeskPatientListingPage(page);
     const transferModalPage = new TransferModalPage(page);
     await page.goto(devUrl);
     await loginpage.selectLocation();
     await page.waitForURL('**/modules');
     expect(page.url()).toBe('https://dev.indigoemr.com/modules');
     await selectLocation.selectFrontDeskModule();
     await navbar.clickOnPatientsNavBar();
     await patientListing.isPageOpen();
     await page.getByRole('cell', { name: 'Check In' }).first().click();
     await transferModalPage.isModalOpen();
     await transferModalPage.clickOnConsultant();
     await transferModalPage.selectTimeSlot();
     await transferModalPage.selectReason();
     await transferModalPage.getConsultationFee();
     await transferModalPage.isConsultationFeeVisible();
     await transferModalPage.clickSubmitBtn();
     await page.waitForLoadState('networkidle');
     



})

test("TC1.001 transfer List is visible on Dashboard ", async ({ page }) =>
     {
      const loginPage = new LoginPage(page);
      const selectLocation = new ModuleSelectorPage(page, "Outpatient");
      const dashboardPage = new DashboardPage(page);
      await page.goto(devUrl);
      await loginPage.selectLocation();
      await page.waitForURL('**/modules')
      expect(page.url()).toBe("https://dev.indigoemr.com/modules");
      await selectLocation.selectOutpatientModule();
      await page.waitForURL('**/dashboard');
      expect(page.url()). toBe("https://dev.indigoemr.com/out-patient/dashboard");
      await dashboardPage.isPageOpen();
      await dashboardPage.paitientTransferHeader();
      await dashboardPage.readTransferPaiitientList();

     }) 

test("TC1.002 transfer List verify by date ", async ({ page }) =>     
     {
          const loginPage = new LoginPage(page);
      const selectLocation = new ModuleSelectorPage(page, "Outpatient");
      const dashboardPage = new DashboardPage(page);
      await page.goto(devUrl);
      await loginPage.selectLocation();
      await page.waitForURL('**/modules')
      expect(page.url()).toBe("https://dev.indigoemr.com/modules");
      await selectLocation.selectOutpatientModule();
      await page.waitForURL('**/dashboard');
      expect(page.url()). toBe("https://dev.indigoemr.com/out-patient/dashboard");
      await page.waitForLoadState('networkidle');
      await dashboardPage.isPageOpen();
      await dashboardPage.paitientTransferHeader();
      let transfers = await dashboardPage.readTransferListContent();
       transfers = transfers.slice(0,3)
       console.log(transfers);
       dashboardPage.dataAssertion(transfers);


     }) 
 
test("TC1.003 comparism of transfer List on dashboard to department TL ", async ({ page }) =>  
{
      const loginPage = new LoginPage(page);
      const selectLocation = new ModuleSelectorPage(page, "Outpatient");
      const dashboardPage = new DashboardPage(page);
      const paitientTransferred = new PatientTransferred(page);
      await page.goto(devUrl);
      await loginPage.selectLocation();
      await page.waitForURL('**/modules')
      expect(page.url()).toBe("https://dev.indigoemr.com/modules");
      await selectLocation.selectOutpatientModule();
      await page.waitForURL('**/dashboard');
      expect(page.url()). toBe("https://dev.indigoemr.com/out-patient/dashboard");
      await page.waitForLoadState('networkidle');
      await dashboardPage.isPageOpen();
      await dashboardPage.paitientTransferHeader();
      let transfers = await dashboardPage.readTransferListContent();
       transfers = transfers
       .filter(entry => entry.includes("with Luth"))
       .map(entry => entry.split("Accept Patient")[0]);
       console.log(transfers);
      await dashboardPage.viewDeptTransferList();
      await page.waitForLoadState('networkidle');
      await paitientTransferred.pageIsOpen();
      let cards = await paitientTransferred.readDepartmentTList();
      cards = cards
       .map(entry => entry.split("Accept Patient")[0]);
       console.log(cards);
      let transfersEqualsCards = compareTransferLists(transfers, cards);
      expect(transfersEqualsCards).toBeTruthy()


})