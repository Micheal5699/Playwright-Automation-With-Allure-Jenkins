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
import { PrescriptionPage } from "../../pages/outpatient/PrescriptionPage";
import { PatientDetailPage } from "../../pages/outpatient/patientDetailPage";
import { time } from "console";


const devUrl = "https://dev.indigoemr.com";


test("TC3.001 transfer patient  ", async ({ page }) =>
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
            await page.locator('.modal-select__input-container').first().click();
            await page.getByRole('option', { name: 'General Practice' }).click();
            await transferModalPage.clickOnConsultant();
            await transferModalPage.selectTimeSlot();
            await transferModalPage.selectReason();
            await transferModalPage.getConsultationFee();
            await transferModalPage.isConsultationFeeVisible();
            await transferModalPage.clickSubmitBtn(); 
            
})

test("TC3.002 Make drug precription for patient", async ({ page }) =>
{
   const loginPage = new LoginPage(page);
             const selectLocation = new ModuleSelectorPage(page, "Outpatient");
             const dashboardPage = new DashboardPage(page);
             const patientTransferred = new PatientTransferred(page);
             const patientDetailPage = new PatientDetailPage(page);
             const prescriptionPage = new PrescriptionPage(page);
             await page.goto(devUrl);
             await loginPage.selectLocation();
             await page.waitForURL('**/modules')
             expect(page.url()).toBe("https://dev.indigoemr.com/modules");
             await selectLocation.selectOutpatientModule();
             await page.waitForURL('**/dashboard');
             expect(page.url()). toBe("https://dev.indigoemr.com/out-patient/dashboard");
             await dashboardPage.isPageOpen();
             await dashboardPage.popUPIsVisible({ timeout: 10000 });
             await dashboardPage.popUpContent();
             await dashboardPage.popUpAssertion();
             await dashboardPage.closePopUp();
             await dashboardPage.viewDeptTransferList();
             await patientTransferred.pageIsOpen();
             await patientTransferred.acceptPatient();
             await patientTransferred.exit();
             await dashboardPage.startSession();
             await dashboardPage.startpopup();
             await patientDetailPage.clickPrescription();
             await prescriptionPage.pageIsOpen();
             await prescriptionPage.addPrescription();
             await prescriptionPage.popupisvissble();
             await prescriptionPage.selectprescription();
             //await page.pause();
             await prescriptionPage.clickDrug();
             await prescriptionPage.typedrug();
             await page.waitForLoadState('networkidle');
             await prescriptionPage.assigndose();
             await prescriptionPage.selectUnit();
             await prescriptionPage.selectRoute();
             await prescriptionPage.selectFrequency();
             await prescriptionPage.selectDuration();
             await prescriptionPage.addItem();
             await prescriptionPage.submit();
})

         
test("TC3.003 Make lens precription for patient", async ({ page }) =>
{
   const loginPage = new LoginPage(page);
             const selectLocation = new ModuleSelectorPage(page, "Outpatient");
             const dashboardPage = new DashboardPage(page);
             const patientDetailPage = new PatientDetailPage(page);
             const prescriptionPage = new PrescriptionPage(page);
             await page.goto(devUrl);
             await loginPage.selectLocation();
             await page.waitForURL('**/modules')
             expect(page.url()).toBe("https://dev.indigoemr.com/modules");
             await selectLocation.selectOutpatientModule();
             await page.waitForURL('**/dashboard');
             expect(page.url()). toBe("https://dev.indigoemr.com/out-patient/dashboard");
             await dashboardPage.isPageOpen();
             await dashboardPage.patientCardIsVissible({timeout: 10000});
             await dashboardPage.clickOnPatientName();
             await patientDetailPage.clickPrescription();
             await prescriptionPage.pageIsOpen();
             await prescriptionPage.addPrescription();
             await prescriptionPage.popupisvissble();
             await prescriptionPage.selectprescription();
             await prescriptionPage.clickOnLensOption();
            // await page.pause();
             await prescriptionPage.fillSphereRightEye();
             await prescriptionPage.fillSphereLeftEye();
             await prescriptionPage.fillAxisRightEye();
             await prescriptionPage.fillAxisLeftEye();
             await prescriptionPage.fillPrismRightEye();
             await prescriptionPage.fillPrismLeftEye();
             await prescriptionPage.fillLensType();
             await prescriptionPage.fillLensCoating();
             await prescriptionPage.clickOnBuyNewFrame();
             await prescriptionPage.fillProduct();
             await prescriptionPage.fillMaterial();
             await prescriptionPage.fillHeight();
             await prescriptionPage.clickOnNoPrescription();
             await prescriptionPage.setNextAppointmentDate();
             await prescriptionPage.clickOnRaiseBill();
             await prescriptionPage.submit();
             await prescriptionPage.raiseBillSubmit();


})    

    

test("TC3.004 Make Contact lens  precription for patient", async ({ page }) =>
{
   const loginPage = new LoginPage(page);
             const selectLocation = new ModuleSelectorPage(page, "Outpatient");
             const dashboardPage = new DashboardPage(page);
             const patientDetailPage = new PatientDetailPage(page);
             const prescriptionPage = new PrescriptionPage(page);
             await page.goto(devUrl);
             await loginPage.selectLocation();
             await page.waitForURL('**/modules')
             expect(page.url()).toBe("https://dev.indigoemr.com/modules");
             await selectLocation.selectOutpatientModule();
             await page.waitForURL('**/dashboard');
             expect(page.url()). toBe("https://dev.indigoemr.com/out-patient/dashboard");
             await dashboardPage.isPageOpen();
             await dashboardPage.patientCardIsVissible({timeout: 10000});
             await dashboardPage.clickOnPatientName();
             await patientDetailPage.clickPrescription();
             await prescriptionPage.pageIsOpen();
             await prescriptionPage.addPrescription();
             await prescriptionPage.popupisvissble();
             await prescriptionPage.selectprescription();
             await prescriptionPage.clickOnContactLens();
             //await page.pause();
             await prescriptionPage.fillSphereRightEyeCLens();
             await prescriptionPage.fillSphereLeftEyeCLens();
             await prescriptionPage.fillCylinderRightEyeCLens();
             await prescriptionPage.fillCylinderLeftEyeCLens();
             await prescriptionPage.fillAxisRightEyeCLens();
             await prescriptionPage.fillAxisLeftEyeCLens();
             await prescriptionPage.fillContactLensType();
             await prescriptionPage.fillContactLensCoating();
             await prescriptionPage.fillContactLensMaterial();
             await prescriptionPage.clickOnNoPrescription();
             await prescriptionPage.setNextAppointmentDate();
             await prescriptionPage.clickOnContactLensRaiseBill();
             await prescriptionPage.submit();
             await page.waitForLoadState("networkidle");
             await prescriptionPage.submit();


})            

test("TC3.005 End session for patient", async ({ page }) =>
{
   const loginPage = new LoginPage(page);
             const selectLocation = new ModuleSelectorPage(page, "Outpatient");
             const dashboardPage = new DashboardPage(page);
             const patientDetailPage = new PatientDetailPage(page);
             const prescriptionPage = new PrescriptionPage(page);
             await page.goto(devUrl);
             await loginPage.selectLocation();
             await page.waitForURL('**/modules')
             expect(page.url()).toBe("https://dev.indigoemr.com/modules");
             await selectLocation.selectOutpatientModule();
             await page.waitForURL('**/dashboard');
             expect(page.url()). toBe("https://dev.indigoemr.com/out-patient/dashboard");
             await dashboardPage.isPageOpen();
             await dashboardPage.patientCardIsVissible({timeout: 10000});
             await dashboardPage.clickOnPatientName();
             await patientDetailPage. clickVitals();
             await prescriptionPage.fillTempReading();
             await prescriptionPage.enterTemperature();
             await prescriptionPage.submit();
             await prescriptionPage.proceed();

})          