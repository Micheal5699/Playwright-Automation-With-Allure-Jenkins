import { expect,page } from "@playwright/test";
import { test } from "../../fixture/fixture-loader";
import { DashboardPage } from "../../pages/frontdesk/dashboardPage";
import { LoginPage } from "../../pages/loginPage";
import { ModuleSelectorPage } from "../../pages/moduleSelectorPage";
import { da, tr } from "@faker-js/faker";
import { NavigationSideBarComponent } from "../../pages/navigationSideBarComponet";
import { FrontdeskPatientListingPage } from "../../pages/frontdesk/frontdeskListingPage";


const devUrl = "https://dev.indigoemr.com";
    

test('TC3.001 Test Search for patient card by name', async ({ page, user }) => 
   {
     const loginpage = new LoginPage(page);
     const selectLocation = new ModuleSelectorPage(page, "Front Desk");
     const navbar = new NavigationSideBarComponent(page);
     const patientListing = new FrontdeskPatientListingPage(page);
    
         await page.goto(devUrl);
         await loginpage.selectLocation();
         await page.waitForURL('**/modules');
            expect.soft(page.url()).toBe('https://dev.indigoemr.com/modules');
         await selectLocation.selectFrontDeskModule();
             expect. soft(page.url()).toBe('https://dev.indigoemr.com/frontdesk/dashboard');
         await navbar.clickOnPatientsNavBar();
         await patientListing.isPageOpen();
         await patientListing.searchBy("Name");
             
         
    });

test('TC3.002 Test Search for patient card by MRN', async ({ page, user }) =>
{
    const loginpage = new LoginPage(page);
     const selectLocation = new ModuleSelectorPage(page, "Front Desk");
     const navbar = new NavigationSideBarComponent(page);
     const patientListing = new FrontdeskPatientListingPage(page);
   
   await page.goto(devUrl);
         await loginpage.selectLocation();
         await page.waitForURL('**/modules');
            expect.soft(page.url()).toBe('https://dev.indigoemr.com/modules');
         await selectLocation.selectFrontDeskModule();
             expect. soft(page.url()).toBe('https://dev.indigoemr.com/frontdesk/dashboard');
         await navbar.clickOnPatientsNavBar();
         await patientListing.isPageOpen();
         await patientListing.searchBy("MRN");

});
test('TC3.003 Test Search for patient card by phone', async ({ page, user }) =>
{
    const loginpage = new LoginPage(page);
     const selectLocation = new ModuleSelectorPage(page, "Front Desk");
     const navbar = new NavigationSideBarComponent(page);
     const patientListing = new FrontdeskPatientListingPage(page);
   await page.goto(devUrl);
         await loginpage.selectLocation();
         await page.waitForURL('**/modules');
            expect.soft(page.url()).toBe('https://dev.indigoemr.com/modules');
         await selectLocation.selectFrontDeskModule();
             expect. soft(page.url()).toBe('https://dev.indigoemr.com/frontdesk/dashboard');
         await navbar.clickOnPatientsNavBar();
         await patientListing.isPageOpen();
         await patientListing.searchBy("Phone");

});









