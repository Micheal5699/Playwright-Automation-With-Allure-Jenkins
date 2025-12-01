import  { expect, request } from "@playwright/test";
import { LoginPage } from "../../pages/loginPage";
import { test } from "../../fixture/fixture-loader";
import { ModuleSelectorPage } from "../../pages/moduleSelectorPage";
import { NavigationSideBarComponent } from "../../pages/navigationSideBarComponet";
import { DashboardPage } from "../../pages/frontdesk/dashboardPage";
import { AppointmentModalPage } from "../../pages/frontdesk/appointmentModalPage";
import { VitalsModalPage } from "../../pages/outpatient/vitalsPage";
import { generateRandomNumber, generateRandomVitals } from "../../utils/VitalsUtils";
const devUrl = 'https://dev.indigoemr.com';
const outPatient = 'https://dev.indigoemr.com/out-patient/dashboard'


test("TC1.001 Create Orals Vitals successfully with perfect temperature", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const selectLocation = new ModuleSelectorPage(page, "Front Desk");
        const navbar = new NavigationSideBarComponent(page)
        const dashboardPage = new DashboardPage(page);
        const appointmentModalPage = new AppointmentModalPage(page);
        const vitalsPage = new VitalsModalPage(page);
        // Generate random data
        const randomMrn = generateRandomNumber(10);
        const vitals = generateRandomVitals();
        // Step 1: Login and navigate
        await page.goto(devUrl);
        await loginPage.selectLocation();
        await page.waitForURL("**/modules");
        await selectLocation.selectFrontDeskModule();
        await dashboardPage.clickOnSupportCloseIcon();
        await dashboardPage.clickQuickBookAppointmentBtn();
        const headerText=await appointmentModalPage.getModalHeaderText(); 
        expect.soft(headerText).toBe("Book Appointment")
        await appointmentModalPage.fillMrnField(randomMrn);
        await appointmentModalPage.selectMrnSuggestion();
        const patientName = await appointmentModalPage.getPatientName();
        const selectedSpeciality = await appointmentModalPage.selectSpeciality("Ophthalmology");
        const appointment = await appointmentModalPage.getAppointmentDate();
        const selectedTime= await appointmentModalPage.selectTime(0);
        await dashboardPage.clickOnSupportCloseIcon();
        const appointmentPurpose=await appointmentModalPage.selectReasonForVisit();
        await appointmentModalPage.clickBookAppointmentBtn(); 
        await appointmentModalPage.selectVitals();
        await appointmentModalPage.clickConfirmSectionBtn();
        await vitalsPage.verifyPatientTransferToast('has transferred');
        await page.goto(outPatient);
        await vitalsPage.clickAcceptPatientBtn()
        await vitalsPage.clickStartSessionBtn();
        await vitalsPage.clickStartBtn();
        await vitalsPage.selectTemparatureReading("Oral")
        await vitalsPage.typeTemparature(vitals.temperature)
        await vitalsPage.typeHeightFt(vitals.heightFt);
        await vitalsPage.typeHeightInch(vitals.heightInch);
        await vitalsPage.typeWeight(vitals.weight);
        await vitalsPage.typeSystolic(vitals.systolic);
        await vitalsPage.typeDiastolic(vitals.diastolic);
        await vitalsPage.typePulse(vitals.pulse);
        await vitalsPage.typeRespiratory(vitals.respiratory);
        await vitalsPage.typeSpo2(vitals.spo2);
        // await vitalsPage.typeRespiratoryFlowRate('Test Purpose');
        //await vitalsPage.typePain('Test');
        // await vitalsPage.selectPainSeverity();
        await dashboardPage.clickOnSupportCloseIcon();
        await vitalsPage.typeComment(vitals.comment);
        await vitalsPage.typeBloodGlucose(vitals.bloodGlucose);
        await vitalsPage.typeHeartRate(vitals.heartRate);
        await vitalsPage.typeOxygenAmmount(vitals.oxygenAmount);
        await vitalsPage.typeOxygenLevel(vitals.oxygenLevel);
        await vitalsPage.clickSubmitBtn();
        await vitalsPage.clickProceedBtn();
        await vitalsPage.verifySuccessMessage("Successful")
        await vitalsPage.clickVitalsSignsBtn();
        await vitalsPage.verifyVitalsCount(1);
})
test("TC2.002 Create Rectals Vitals successfully with perfect temperature", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const selectLocation = new ModuleSelectorPage(page, "Front Desk");
        const navbar = new NavigationSideBarComponent(page)
        const dashboardPage = new DashboardPage(page);
        const appointmentModalPage = new AppointmentModalPage(page);
        const vitalsPage = new VitalsModalPage(page);
        // Generate random data
        const randomMrn = generateRandomNumber(10);
        const vitals = generateRandomVitals();
        // Step 1: Login and navigate
        await page.goto(devUrl);
        await loginPage.selectLocation();
        await page.waitForURL("**/modules");
        await selectLocation.selectFrontDeskModule();
        await dashboardPage.clickOnSupportCloseIcon();
        await dashboardPage.clickQuickBookAppointmentBtn();
        const headerText=await appointmentModalPage.getModalHeaderText(); 
        expect.soft(headerText).toBe("Book Appointment")
        await appointmentModalPage.fillMrnField(randomMrn);
        await appointmentModalPage.selectMrnSuggestion();
        const patientName = await appointmentModalPage.getPatientName();
        const selectedSpeciality = await appointmentModalPage.selectSpeciality("Ophthalmology");
        const appointment = await appointmentModalPage.getAppointmentDate();
        const selectedTime= await appointmentModalPage.selectTime(0);
        await dashboardPage.clickOnSupportCloseIcon();
        const appointmentPurpose=await appointmentModalPage.selectReasonForVisit();
        await appointmentModalPage.clickBookAppointmentBtn(); 
        await appointmentModalPage.selectVitals();
        await appointmentModalPage.clickConfirmSectionBtn();
        await vitalsPage.verifyPatientTransferToast('has transferred');
        await page.goto(outPatient);
        await vitalsPage.clickAcceptPatientBtn()
        await vitalsPage.clickStartSessionBtn();
        await vitalsPage.clickStartBtn();
        await vitalsPage.selectTemparatureReading("Rectal")
        await vitalsPage.typeTemparature(vitals.temperature)
        await vitalsPage.typeHeightFt(vitals.heightFt);
        await vitalsPage.typeHeightInch(vitals.heightInch);
        await vitalsPage.typeWeight(vitals.weight);
        await vitalsPage.typeSystolic(vitals.systolic);
        await vitalsPage.typeDiastolic(vitals.diastolic);
        await vitalsPage.typePulse(vitals.pulse);
        await vitalsPage.typeRespiratory(vitals.respiratory);
        await vitalsPage.typeSpo2(vitals.spo2);
        // await vitalsPage.typeRespiratoryFlowRate('Test Purpose');
        //await vitalsPage.typePain('Test');
        // await vitalsPage.selectPainSeverity();
        await dashboardPage.clickOnSupportCloseIcon();
        await vitalsPage.typeComment(vitals.comment);
        await vitalsPage.typeBloodGlucose(vitals.bloodGlucose);
        await vitalsPage.typeHeartRate(vitals.heartRate);
        await vitalsPage.typeOxygenAmmount(vitals.oxygenAmount);
        await vitalsPage.typeOxygenLevel(vitals.oxygenLevel);
        await vitalsPage.clickSubmitBtn();
        await vitalsPage.clickProceedBtn();
        await vitalsPage.verifySuccessMessage("Successful")
        await vitalsPage.clickVitalsSignsBtn();
        await vitalsPage.verifyVitalsCount(1);
})
test("TC3.003 Create Armpit Vitals successfully with perfect temperature", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const selectLocation = new ModuleSelectorPage(page, "Front Desk");
        const navbar = new NavigationSideBarComponent(page)
        const dashboardPage = new DashboardPage(page);
        const appointmentModalPage = new AppointmentModalPage(page);
        const vitalsPage = new VitalsModalPage(page);
        // Generate random data
        const randomMrn = generateRandomNumber(10);
        const vitals = generateRandomVitals();
        // Step 1: Login and navigate
        await page.goto(devUrl);
        await loginPage.selectLocation();
        await page.waitForURL("**/modules");
        await selectLocation.selectFrontDeskModule();
        await dashboardPage.clickOnSupportCloseIcon();
        await dashboardPage.clickQuickBookAppointmentBtn();
        const headerText=await appointmentModalPage.getModalHeaderText(); 
        expect.soft(headerText).toBe("Book Appointment")
        await appointmentModalPage.fillMrnField(randomMrn);
        await appointmentModalPage.selectMrnSuggestion();
        const patientName = await appointmentModalPage.getPatientName();
        const selectedSpeciality = await appointmentModalPage.selectSpeciality("Ophthalmology");
        const appointment = await appointmentModalPage.getAppointmentDate();
        const selectedTime= await appointmentModalPage.selectTime(0);
        await dashboardPage.clickOnSupportCloseIcon();
        const appointmentPurpose=await appointmentModalPage.selectReasonForVisit();
        await appointmentModalPage.clickBookAppointmentBtn(); 
        await appointmentModalPage.selectVitals();
        await appointmentModalPage.clickConfirmSectionBtn();
        await vitalsPage.verifyPatientTransferToast('has transferred');
        await page.goto(outPatient);
        await vitalsPage.clickAcceptPatientBtn()
        await vitalsPage.clickStartSessionBtn();
        await vitalsPage.clickStartBtn();
        await vitalsPage.selectTemparatureReading("Armpit")
        await vitalsPage.typeTemparature(vitals.temperature)
        await vitalsPage.typeHeightFt(vitals.heightFt);
        await vitalsPage.typeHeightInch(vitals.heightInch);
        await vitalsPage.typeWeight(vitals.weight);
        await vitalsPage.typeSystolic(vitals.systolic);
        await vitalsPage.typeDiastolic(vitals.diastolic);
        await vitalsPage.typePulse(vitals.pulse);
        await vitalsPage.typeRespiratory(vitals.respiratory);
        await vitalsPage.typeSpo2(vitals.spo2);
        // await vitalsPage.typeRespiratoryFlowRate('Test Purpose');
        //await vitalsPage.typePain('Test');
        // await vitalsPage.selectPainSeverity();
        await dashboardPage.clickOnSupportCloseIcon();
        await vitalsPage.typeComment(vitals.comment);
        await vitalsPage.typeBloodGlucose(vitals.bloodGlucose);
        await vitalsPage.typeHeartRate(vitals.heartRate);
        await vitalsPage.typeOxygenAmmount(vitals.oxygenAmount);
        await vitalsPage.typeOxygenLevel(vitals.oxygenLevel);
        await vitalsPage.clickSubmitBtn();
        await vitalsPage.clickProceedBtn();
        await vitalsPage.verifySuccessMessage("Successful")
        await vitalsPage.clickVitalsSignsBtn();
        await vitalsPage.verifyVitalsCount(1);
})
test("TC4.004 Create Ear Vitals successfully with perfect temperature", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const selectLocation = new ModuleSelectorPage(page, "Front Desk");
        const navbar = new NavigationSideBarComponent(page)
        const dashboardPage = new DashboardPage(page);
        const appointmentModalPage = new AppointmentModalPage(page);
        const vitalsPage = new VitalsModalPage(page);
        // Generate random data
        const randomMrn = generateRandomNumber(10);
        const vitals = generateRandomVitals();
        // Step 1: Login and navigate
        await page.goto(devUrl);
        await loginPage.selectLocation();
        await page.waitForURL("**/modules");
        await selectLocation.selectFrontDeskModule();
        await dashboardPage.clickOnSupportCloseIcon();
        await dashboardPage.clickQuickBookAppointmentBtn();
        const headerText=await appointmentModalPage.getModalHeaderText(); 
        expect.soft(headerText).toBe("Book Appointment")
        await appointmentModalPage.fillMrnField(randomMrn);
        await appointmentModalPage.selectMrnSuggestion();
        const patientName = await appointmentModalPage.getPatientName();
        const selectedSpeciality = await appointmentModalPage.selectSpeciality("Ophthalmology");
        const appointment = await appointmentModalPage.getAppointmentDate();
        const selectedTime= await appointmentModalPage.selectTime(0);
        await dashboardPage.clickOnSupportCloseIcon();
        const appointmentPurpose=await appointmentModalPage.selectReasonForVisit();
        await appointmentModalPage.clickBookAppointmentBtn(); 
        await appointmentModalPage.selectVitals();
        await appointmentModalPage.clickConfirmSectionBtn();
        await vitalsPage.verifyPatientTransferToast('has transferred');
        await page.goto(outPatient);
        await vitalsPage.clickAcceptPatientBtn()
        await vitalsPage.clickStartSessionBtn();
        await vitalsPage.clickStartBtn();
        await vitalsPage.selectTemparatureReading("Ear")
        await vitalsPage.typeTemparature(vitals.temperature)
        await vitalsPage.typeHeightFt(vitals.heightFt);
        await vitalsPage.typeHeightInch(vitals.heightInch);
        await vitalsPage.typeWeight(vitals.weight);
        await vitalsPage.typeSystolic(vitals.systolic);
        await vitalsPage.typeDiastolic(vitals.diastolic);
        await vitalsPage.typePulse(vitals.pulse);
        await vitalsPage.typeRespiratory(vitals.respiratory);
        await vitalsPage.typeSpo2(vitals.spo2);
        // await vitalsPage.typeRespiratoryFlowRate('Test Purpose');
        //await vitalsPage.typePain('Test');
        // await vitalsPage.selectPainSeverity();
        await dashboardPage.clickOnSupportCloseIcon();
        await vitalsPage.typeComment(vitals.comment);
        await vitalsPage.typeBloodGlucose(vitals.bloodGlucose);
        await vitalsPage.typeHeartRate(vitals.heartRate);
        await vitalsPage.typeOxygenAmmount(vitals.oxygenAmount);
        await vitalsPage.typeOxygenLevel(vitals.oxygenLevel);
        await vitalsPage.clickSubmitBtn();
        await vitalsPage.clickProceedBtn();
        await vitalsPage.verifySuccessMessage("Successful")
        await vitalsPage.clickVitalsSignsBtn();
        await vitalsPage.verifyVitalsCount(1);
})
test("TC5.005 Create Forhead Vitals successfully with perfect temperature", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const selectLocation = new ModuleSelectorPage(page, "Front Desk");
        const navbar = new NavigationSideBarComponent(page)
        const dashboardPage = new DashboardPage(page);
        const appointmentModalPage = new AppointmentModalPage(page);
        const vitalsPage = new VitalsModalPage(page);
        // Generate random data
        const randomMrn = generateRandomNumber(10);
        const vitals = generateRandomVitals();
        // Step 1: Login and navigate
        await page.goto(devUrl);
        await loginPage.selectLocation();
        await page.waitForURL("**/modules");
        await selectLocation.selectFrontDeskModule();
        await dashboardPage.clickOnSupportCloseIcon();
        await dashboardPage.clickQuickBookAppointmentBtn();
        const headerText=await appointmentModalPage.getModalHeaderText(); 
        expect.soft(headerText).toBe("Book Appointment")
        await appointmentModalPage.fillMrnField(randomMrn);
        await appointmentModalPage.selectMrnSuggestion();
        const patientName = await appointmentModalPage.getPatientName();
        const selectedSpeciality = await appointmentModalPage.selectSpeciality("Ophthalmology");
        const appointment = await appointmentModalPage.getAppointmentDate();
        const selectedTime= await appointmentModalPage.selectTime(0);
        await dashboardPage.clickOnSupportCloseIcon();
        const appointmentPurpose=await appointmentModalPage.selectReasonForVisit();
        await appointmentModalPage.clickBookAppointmentBtn(); 
        await appointmentModalPage.selectVitals();
        await appointmentModalPage.clickConfirmSectionBtn();
        await vitalsPage.verifyPatientTransferToast('has transferred');
        await page.goto(outPatient);
        await vitalsPage.clickAcceptPatientBtn()
        await vitalsPage.clickStartSessionBtn();
        await vitalsPage.clickStartBtn();
        await vitalsPage.selectTemparatureReading("Forhead")
        await vitalsPage.typeTemparature(vitals.temperature)
        await vitalsPage.typeHeightFt(vitals.heightFt);
        await vitalsPage.typeHeightInch(vitals.heightInch);
        await vitalsPage.typeWeight(vitals.weight);
        await vitalsPage.typeSystolic(vitals.systolic);
        await vitalsPage.typeDiastolic(vitals.diastolic);
        await vitalsPage.typePulse(vitals.pulse);
        await vitalsPage.typeRespiratory(vitals.respiratory);
        await vitalsPage.typeSpo2(vitals.spo2);
        // await vitalsPage.typeRespiratoryFlowRate('Test Purpose');
        //await vitalsPage.typePain('Test');
        // await vitalsPage.selectPainSeverity();
        await dashboardPage.clickOnSupportCloseIcon();
        await vitalsPage.typeComment(vitals.comment);
        await vitalsPage.typeBloodGlucose(vitals.bloodGlucose);
        await vitalsPage.typeHeartRate(vitals.heartRate);
        await vitalsPage.typeOxygenAmmount(vitals.oxygenAmount);
        await vitalsPage.typeOxygenLevel(vitals.oxygenLevel);
        await vitalsPage.clickSubmitBtn();
        await vitalsPage.clickProceedBtn();
        await vitalsPage.verifySuccessMessage("Successful")
        await vitalsPage.clickVitalsSignsBtn();
        await vitalsPage.verifyVitalsCount(1);
})
test("TC6.006 User should not be able to End sesssion without filling Vitals details", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const selectLocation = new ModuleSelectorPage(page, "Front Desk");
        const navbar = new NavigationSideBarComponent(page)
        const dashboardPage = new DashboardPage(page);
        const appointmentModalPage = new AppointmentModalPage(page);
        const vitalsPage = new VitalsModalPage(page);
        // Generate random data
        const randomMrn = generateRandomNumber(10);
        const vitals = generateRandomVitals();
        // Step 1: Login and navigate
        await page.goto(devUrl);
        await loginPage.selectLocation();
        await page.waitForURL("**/modules");
        await selectLocation.selectFrontDeskModule();
        await dashboardPage.clickOnSupportCloseIcon();
        await dashboardPage.clickQuickBookAppointmentBtn();
        const headerText=await appointmentModalPage.getModalHeaderText(); 
        expect.soft(headerText).toBe("Book Appointment")
        await appointmentModalPage.fillMrnField(randomMrn);
        await appointmentModalPage.selectMrnSuggestion();
        const patientName = await appointmentModalPage.getPatientName();
        const selectedSpeciality = await appointmentModalPage.selectSpeciality("Ophthalmology");
        const appointment = await appointmentModalPage.getAppointmentDate();
        const selectedTime= await appointmentModalPage.selectTime(0);
        await dashboardPage.clickOnSupportCloseIcon();
        const appointmentPurpose=await appointmentModalPage.selectReasonForVisit();
        await appointmentModalPage.clickBookAppointmentBtn(); 
        await appointmentModalPage.selectVitals();
        await appointmentModalPage.clickConfirmSectionBtn();
        await vitalsPage.verifyPatientTransferToast('has transferred');
        await page.goto(outPatient);
        await vitalsPage.clickAcceptPatientBtn()
        await vitalsPage.clickStartSessionBtn();
        await vitalsPage.clickStartBtn();
        await vitalsPage.clickEndSessionBtn()
        await vitalsPage.clickContinueWithEndSessionBtn();
        await vitalsPage.verifyErrorMessage("Vital record is yet to be filled")
})
test("TC7.007 User can add more than 1 vitals", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const selectLocation = new ModuleSelectorPage(page, "Front Desk");
        const navbar = new NavigationSideBarComponent(page)
        const dashboardPage = new DashboardPage(page);
        const appointmentModalPage = new AppointmentModalPage(page);
        const vitalsPage = new VitalsModalPage(page);
        // Generate random data
        const randomMrn = generateRandomNumber(10);
        const vitals = generateRandomVitals();
        // Step 1: Login and navigate
        await page.goto(devUrl);
        await loginPage.selectLocation();
        await page.waitForURL("**/modules");
        await selectLocation.selectFrontDeskModule();
        await dashboardPage.clickOnSupportCloseIcon();
        await dashboardPage.clickQuickBookAppointmentBtn();
        const headerText=await appointmentModalPage.getModalHeaderText(); 
        expect.soft(headerText).toBe("Book Appointment")
        await appointmentModalPage.fillMrnField(randomMrn);
        await appointmentModalPage.selectMrnSuggestion();
        const patientName = await appointmentModalPage.getPatientName();
        const selectedSpeciality = await appointmentModalPage.selectSpeciality("Ophthalmology");
        const appointment = await appointmentModalPage.getAppointmentDate();
        const selectedTime= await appointmentModalPage.selectTime(0);
        await dashboardPage.clickOnSupportCloseIcon();
        const appointmentPurpose=await appointmentModalPage.selectReasonForVisit();
        await appointmentModalPage.clickBookAppointmentBtn(); 
        await appointmentModalPage.selectVitals();
        await appointmentModalPage.clickConfirmSectionBtn();
        await vitalsPage.verifyPatientTransferToast('has transferred');
        await page.goto(outPatient);
        await vitalsPage.clickAcceptPatientBtn()
        await vitalsPage.clickStartSessionBtn();
        await vitalsPage.clickStartBtn();
        await vitalsPage.selectTemparatureReading("Ear")
        await vitalsPage.typeTemparature(vitals.temperature)
        await vitalsPage.typeHeightFt(vitals.heightFt);
        await vitalsPage.typeHeightInch(vitals.heightInch);
        await vitalsPage.typeWeight(vitals.weight);
        await vitalsPage.typeSystolic(vitals.systolic);
        await vitalsPage.typeDiastolic(vitals.diastolic);
        await vitalsPage.typePulse(vitals.pulse);
        await vitalsPage.typeRespiratory(vitals.respiratory);
        await vitalsPage.typeSpo2(vitals.spo2);
        // await vitalsPage.typeRespiratoryFlowRate('Test Purpose');
        //await vitalsPage.typePain('Test');
        // await vitalsPage.selectPainSeverity();
        await dashboardPage.clickOnSupportCloseIcon();
        await vitalsPage.typeComment(vitals.comment);
        await vitalsPage.typeBloodGlucose(vitals.bloodGlucose);
        await vitalsPage.typeHeartRate(vitals.heartRate);
        await vitalsPage.typeOxygenAmmount(vitals.oxygenAmount);
        await vitalsPage.typeOxygenLevel(vitals.oxygenLevel);
        await vitalsPage.clickSubmitBtn();
        await vitalsPage.clickProceedBtn();
        await vitalsPage.verifySuccessMessage("Successful")
        await vitalsPage.clickVitalsSignsBtn();
        await vitalsPage.clickAddNewVitalsBtn();
        await vitalsPage.selectTemparatureReading2("Oral")
        await vitalsPage.typeTemparature(vitals.temperature)
        await vitalsPage.clickSubmitBtn();
        await vitalsPage.verifySuccessMessage("Successful")
        await vitalsPage.verifyVitalsCount(2);
})