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


test("TC2.001 Check In patient", async ({ page }) =>
{
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


test("TC2.002 verify notification pop for new appointment", async ({ page }) =>
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
          await dashboardPage.popUPIsVisible({ timeout: 10000 });
          await dashboardPage.popUpAssertion();
          await dashboardPage.closePopUp();
          


})