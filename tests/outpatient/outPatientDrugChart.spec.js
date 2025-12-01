import { generateInpatientDrugData } from "../../utils/InPatient&OutPatientUtils";

const { expect } = require("@playwright/test");
const {test} = require("../../fixture/fixture-loader");
const { LoginPage } = require("../../pages/loginPage");
const { ModuleSelectorPage } = require("../../pages/moduleSelectorPage");
const { DashboardPage } = require("../../pages/frontdesk/dashboardPage");
const { RegistratormFormComponent } = require ("../../pages/frontdesk/registrationFormComponent");
const { AdmissionFormModal } = require ("../../pages/inpatient/admissionFormModal");
const { InpatientDrugChartPage } = require("../../pages/inpatient/inPatientdrugChartPages");
const { OutpatientDrugChartPage } = require("../../pages/outpatient/outPatientdrugChartPages");

const devUrl = "https://dev.indigoemr.com/login";
const inPatient = "https://dev.indigoemr.com/in-patient/dashboard"

// ...existing code...
test("TC1.001 Verify that user can administer dose", async ({ page, user }) => {
    const loginPage = new LoginPage(page);
    const selectLocation = new ModuleSelectorPage(page, "Front Desk");
    const dashboardPage = new DashboardPage(page);
    const resgistrationModalPage = new RegistratormFormComponent(page);
    // Removed inpatientDrugChartPage variable — use outpatientDrugChartPage everywhere
    const outpatientDrugChartPage = new OutpatientDrugChartPage(page);
    const drugData = generateInpatientDrugData();
        
        // Login and navigate to Patients listing page
        await page.goto(devUrl);
        await loginPage.selectLocation();
        await page.waitForURL("**/modules");
        await selectLocation.selectOutpatientModule();
        await outpatientDrugChartPage.clickSideBarPatientButton();
        await outpatientDrugChartPage.clickPatientBtn();
        await outpatientDrugChartPage.clickAppointmentTabBtn();
        await outpatientDrugChartPage.clickSystemDoneCard();
        await outpatientDrugChartPage.clickPrescriptionBtn();
        await outpatientDrugChartPage.clickAddPrescriptionBtn();
        await outpatientDrugChartPage.selectPrescriptionOption("Drug");
        await outpatientDrugChartPage.fillDrugtype(drugData.drugType);
        await outpatientDrugChartPage.fillDosage(drugData.dosage);
        await outpatientDrugChartPage.selectUnit(drugData.unit);
        await outpatientDrugChartPage.selectRoute(drugData.route);
        await outpatientDrugChartPage.selectFrequency(drugData.frequency);
        await outpatientDrugChartPage.selectDuration(drugData.duration);
        await outpatientDrugChartPage.checkCreateDrugChartCheckbox();
        await outpatientDrugChartPage.clickAddItemBtn();
        await outpatientDrugChartPage.clickSubmitBtn();
        await outpatientDrugChartPage.verifySuccessMessage("Prescription added successfully");
        await outpatientDrugChartPage.clickDrugChartBtn();
        await outpatientDrugChartPage.clickAdministerDoseBtn();
        await outpatientDrugChartPage.fillAdditionalNoteField(drugData.note);
        await outpatientDrugChartPage.clickAdministerBtn();
        await outpatientDrugChartPage.verifySuccessMessageAdministered("Drug has been administered successfully");
        await outpatientDrugChartPage.verifyTimeLeftToTakeDose("Time left for patient to take next dose");
        await outpatientDrugChartPage.clickCloseSuccessModal();
        await outpatientDrugChartPage.viewAdministeredCard();
        await outpatientDrugChartPage.verifyAdministerdDrugChart();
})
test("TC1.002 Verify that the a dose can be re-administered", async ({ page, user }) => {
    const loginPage = new LoginPage(page);
    const selectLocation = new ModuleSelectorPage(page, "Front Desk");
    const dashboardPage = new DashboardPage(page);
    const resgistrationModalPage = new RegistratormFormComponent(page);
    const outpatientDrugChartPage = new OutpatientDrugChartPage(page);
    const drugData = generateInpatientDrugData();
        
        // Login and navigate to Patients listing page
        await page.goto(devUrl);
        await loginPage.selectLocation();
        await page.waitForURL("**/modules");
        await selectLocation.selectInpatientModule();
        await outpatientDrugChartPage.clickSideBarPatientButton();
        await outpatientDrugChartPage.clickPatientBtn();
        await outpatientDrugChartPage.clickAppointmentTabBtn();
        await outpatientDrugChartPage.clickSystemDoneCard();
        await outpatientDrugChartPage.clickPrescriptionBtn();
        await outpatientDrugChartPage.clickAddPrescriptionBtn();
        await outpatientDrugChartPage.selectPrescriptionOption("Drug");
        await outpatientDrugChartPage.fillDrugtype(drugData.drugType);
        await outpatientDrugChartPage.fillDosage(drugData.dosage);
        await outpatientDrugChartPage.selectUnit(drugData.unit);
        await outpatientDrugChartPage.selectRoute(drugData.route);
        await outpatientDrugChartPage.selectFrequency(drugData.frequency);
        await outpatientDrugChartPage.selectDuration(drugData.duration);
        await outpatientDrugChartPage.checkCreateDrugChartCheckbox();
        await outpatientDrugChartPage.clickAddItemBtn();
        await outpatientDrugChartPage.clickSubmitBtn();
        await outpatientDrugChartPage.verifySuccessMessage("Prescription added successfully");
        await outpatientDrugChartPage.clickDrugChartBtn();
        await outpatientDrugChartPage.clickAdministerDoseBtn();
        await outpatientDrugChartPage.fillAdditionalNoteField(drugData.note);
        await outpatientDrugChartPage.clickAdministerBtn();
        await outpatientDrugChartPage.verifySuccessMessageAdministered("Drug has been administered successfully");
        await outpatientDrugChartPage.verifyTimeLeftToTakeDose("Time left for patient to take next dose");
        await outpatientDrugChartPage.clickCloseSuccessModal();
        await outpatientDrugChartPage.clickAdministerNextDoseBtn();
        await outpatientDrugChartPage.fillAdditionalNoteField(drugData.note);
        await outpatientDrugChartPage.clickAdministerBtn();
        await outpatientDrugChartPage.verifySuccessMessageAdministered("Drug has been administered successfully");
        await outpatientDrugChartPage.verifyTimeLeftToTakeDose("Time left for patient to take next dose");
        await outpatientDrugChartPage.clickCloseSuccessModal();
})
test("TC1.003 Verify that time left to take next dose is displayed", async ({ page, user }) => {
    const loginPage = new LoginPage(page);
    const selectLocation = new ModuleSelectorPage(page, "Front Desk");
    const dashboardPage = new DashboardPage(page);
    const resgistrationModalPage = new RegistratormFormComponent(page);
    const outpatientDrugChartPage = new OutpatientDrugChartPage(page);
    const drugData = generateInpatientDrugData();
        
        // Login and navigate to Patients listing page
        await page.goto(devUrl);
        await loginPage.selectLocation();
        await page.waitForURL("**/modules");
        await selectLocation.selectInpatientModule();
        await outpatientDrugChartPage.clickSideBarPatientButton();
        await outpatientDrugChartPage.clickPatientBtn();
        await outpatientDrugChartPage.clickAppointmentTabBtn();
        await outpatientDrugChartPage.clickSystemDoneCard();
        await outpatientDrugChartPage.clickPrescriptionBtn();
        await outpatientDrugChartPage.clickAddPrescriptionBtn();
        await outpatientDrugChartPage.selectPrescriptionOption("Drug");
        await outpatientDrugChartPage.fillDrugtype(drugData.drugType);
        await outpatientDrugChartPage.fillDosage(drugData.dosage);
        await outpatientDrugChartPage.selectUnit(drugData.unit);
        await outpatientDrugChartPage.selectRoute(drugData.route);
        await outpatientDrugChartPage.selectFrequency(drugData.frequency);
        await outpatientDrugChartPage.selectDuration(drugData.duration);
        await outpatientDrugChartPage.checkCreateDrugChartCheckbox();
        await outpatientDrugChartPage.clickAddItemBtn();
        await outpatientDrugChartPage.clickSubmitBtn();
        await outpatientDrugChartPage.verifySuccessMessage("Prescription added successfully");
        await outpatientDrugChartPage.clickDrugChartBtn();
        await outpatientDrugChartPage.clickAdministerDoseBtn();
        await outpatientDrugChartPage.fillAdditionalNoteField(drugData.note);
        await outpatientDrugChartPage.clickAdministerBtn();
        await outpatientDrugChartPage.verifySuccessMessageAdministered("Drug has been administered successfully");
        await outpatientDrugChartPage.verifyHoursLeftToTakeDose();
})
test("TC1.004 Verify that unchecking 'Create Drug Chart' skips chart creation", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const selectLocation = new ModuleSelectorPage(page, "Front Desk");
  const dashboardPage = new DashboardPage(page);
  const registrationModalPage = new RegistratormFormComponent(page);
  const outpatientDrugChartPage = new OutpatientDrugChartPage(page);
  const drugData = generateInpatientDrugData();

  // Step 1: Login and navigate to the in-patient section
  await page.goto(devUrl);
  await loginPage.selectLocation();
  await page.waitForURL("**/modules");
  await selectLocation.selectInpatientModule();
  await outpatientDrugChartPage.clickSideBarPatientButton();
  await outpatientDrugChartPage.clickPatientBtn();
  await outpatientDrugChartPage.clickAppointmentTabBtn();
  await outpatientDrugChartPage.clickSystemDoneCard();
  const beforeTimestamp = await outpatientDrugChartPage.getLatestDrugChartTimestamp();
  await outpatientDrugChartPage.clickPrescriptionBtn();
  await outpatientDrugChartPage.clickAddPrescriptionBtn();
  await outpatientDrugChartPage.selectPrescriptionOption("Drug");
  await outpatientDrugChartPage.fillDrugtype(drugData.drugType);
  await outpatientDrugChartPage.fillDosage(drugData.dosage);
  await outpatientDrugChartPage.selectUnit(drugData.unit);
  await outpatientDrugChartPage.selectRoute(drugData.route);
  await outpatientDrugChartPage.selectFrequency(drugData.frequency);
  await outpatientDrugChartPage.selectDuration(drugData.duration);
  await outpatientDrugChartPage.clickAddItemBtn();
  await outpatientDrugChartPage.clickSubmitBtn();
  await outpatientDrugChartPage.verifySuccessMessage("Prescription added successfully");
  const afterTimestamp = await outpatientDrugChartPage.getLatestDrugChartTimestamp();
  if (beforeTimestamp === afterTimestamp) {
    console.log("✅ Verified: No new drug chart entry created when 'Create Drug Chart' was unchecked.");
  } else {
    console.log(`❌ Unexpected new entry detected:
      Before: ${beforeTimestamp}
      After: ${afterTimestamp}`);
  }
  expect(afterTimestamp).toBe(beforeTimestamp);
})
test("TC1.005 Verify that user can view drug chart list", async ({ page, user }) => {
    const loginPage = new LoginPage(page);
    const selectLocation = new ModuleSelectorPage(page, "Front Desk");
    const dashboardPage = new DashboardPage(page);
    const resgistrationModalPage = new RegistratormFormComponent(page);
    const outpatientDrugChartPage = new OutpatientDrugChartPage(page);
    const drugData = generateInpatientDrugData();
        
        // Login and navigate to Patients listing page
        await page.goto(devUrl);
        await loginPage.selectLocation();
        await page.waitForURL("**/modules");
        await selectLocation.selectInpatientModule();
        await outpatientDrugChartPage.clickSideBarPatientButton();
        await outpatientDrugChartPage.clickPatientBtn();
        await outpatientDrugChartPage.clickAppointmentTabBtn();
        await outpatientDrugChartPage.clickSystemDoneCard();
        await outpatientDrugChartPage.clickPrescriptionBtn();
        await outpatientDrugChartPage.clickAddPrescriptionBtn();
        await outpatientDrugChartPage.selectPrescriptionOption("Drug");
        await outpatientDrugChartPage.fillDrugtype(drugData.drugType);
        await outpatientDrugChartPage.fillDosage(drugData.dosage);
        await outpatientDrugChartPage.selectUnit(drugData.unit);
        await outpatientDrugChartPage.selectRoute(drugData.route);
        await outpatientDrugChartPage.selectFrequency(drugData.frequency);
        await outpatientDrugChartPage.selectDuration(drugData.duration);
        await outpatientDrugChartPage.checkCreateDrugChartCheckbox();
        await outpatientDrugChartPage.clickAddItemBtn();
        await outpatientDrugChartPage.clickSubmitBtn();
        await outpatientDrugChartPage.verifySuccessMessage("Prescription added successfully");
        await outpatientDrugChartPage.clickDrugChartBtn();
        await outpatientDrugChartPage.clickAdministerDoseBtn();
        await outpatientDrugChartPage.fillAdditionalNoteField(drugData.note);
        await outpatientDrugChartPage.clickAdministerBtn();
        await outpatientDrugChartPage.verifySuccessMessageAdministered("Drug has been administered successfully");
        await outpatientDrugChartPage.verifyTimeLeftToTakeDose("Time left for patient to take next dose");
        await outpatientDrugChartPage.clickCloseSuccessModal();
        await outpatientDrugChartPage.viewAdministeredCard();
        await outpatientDrugChartPage.verifyAdministerdDrugChart();
        await outpatientDrugChartPage.clickCloseButton();
        await outpatientDrugChartPage.viewDrugChartList();
        await outpatientDrugChartPage.VerifyUserIsOnDrugChartListPage();
    });