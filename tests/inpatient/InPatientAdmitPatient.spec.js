import  { expect, request } from "@playwright/test";
import { LoginPage } from "../../pages/loginPage";
import { test } from "../../fixture/fixture-loader";
import { ModuleSelectorPage } from "../../pages/moduleSelectorPage";
import { NavigationSideBarComponent } from "../../pages/navigationSideBarComponet";
const { InpatientDrugChartPage } = require("../../pages/inpatient/inPatientdrugChartPages");
const { InpatientAdmitPatientPage } = require("../../pages/inpatient/InPatientAdmitPatientPages");
import { generateRandomNumber, generateRandomVitals } from "../../utils/VitalsUtils";
const devUrl = 'https://dev.indigoemr.com';


test("TC1.001 Admit Ophthalmology Patient successfully", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const selectLocation = new ModuleSelectorPage(page, "Front Desk");
        const navbar = new NavigationSideBarComponent(page)
        const inpatientDrugChartPage = new InpatientDrugChartPage(page);
        const inpatientAdmitPatientPage = new InpatientAdmitPatientPage(page);
        // Generate random data
        const randomMrn = generateRandomNumber(10);
        const vitals = generateRandomVitals();
        // Step 1: Login and navigate
        await page.goto(devUrl);
        await loginPage.selectLocation();
        await page.waitForURL("**/modules");
        await selectLocation.selectInpatientModule();
        await inpatientAdmitPatientPage.clickAdmitPatientBtn();
        await inpatientAdmitPatientPage.enterPatientName()
        await inpatientAdmitPatientPage.enterAuthorizationCode("AUTH12345");
        await inpatientAdmitPatientPage.enterReasonForVisit("Regular Checkup");
        const checkInDate = await inpatientAdmitPatientPage.enterCheckInDate();
        await inpatientAdmitPatientPage.enterCheckOutDate(checkInDate);
        await inpatientAdmitPatientPage.selectSpecialty("Ophthalmology");
        await inpatientAdmitPatientPage.selectWard("0-10 kids");
        await inpatientAdmitPatientPage.selectRoom("r 1");
        await inpatientAdmitPatientPage.selectBedSpaceNo("b 2");
        await inpatientAdmitPatientPage.selectConsultant();
        await inpatientAdmitPatientPage.clickSubmitAdmitPatientBtn();
        // Cancel Admission for new entry purpose
        await inpatientAdmitPatientPage.clickAdmissionCardBtn();
        await inpatientAdmitPatientPage.clickTopPatient();
        await inpatientAdmitPatientPage.clickAdmittedCardElipsisBtn();
        await inpatientAdmitPatientPage.clickCancelAdmissionBtn();
        await inpatientAdmitPatientPage.enterReasonForCancellation("Test Admission Cancellation");
        await inpatientAdmitPatientPage.clickSubmitReasonBtn();
        await expect(page.getByText("Patient Admission Successfully Canceled")).toBeVisible();
})
test("TC2.002 Admit General Practice Patient successfully", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const selectLocation = new ModuleSelectorPage(page, "Front Desk");
        const navbar = new NavigationSideBarComponent(page)
        const inpatientDrugChartPage = new InpatientDrugChartPage(page);
        const inpatientAdmitPatientPage = new InpatientAdmitPatientPage(page);
        // Generate random data
        const randomMrn = generateRandomNumber(10);
        const vitals = generateRandomVitals();
        // Step 1: Login and navigate
        await page.goto(devUrl);
        await loginPage.selectLocation();
        await page.waitForURL("**/modules");
        await selectLocation.selectInpatientModule();
        await inpatientAdmitPatientPage.clickAdmitPatientBtn();
        await inpatientAdmitPatientPage.enterPatientName()
        await inpatientAdmitPatientPage.enterAuthorizationCode("AUTH12345");
        await inpatientAdmitPatientPage.enterReasonForVisit("Regular Checkup");
        const checkInDate = await inpatientAdmitPatientPage.enterCheckInDate();
        await inpatientAdmitPatientPage.enterCheckOutDate(checkInDate);
        await inpatientAdmitPatientPage.selectSpecialty("General Practice");
        await inpatientAdmitPatientPage.selectWard("0-10 kids");
        await inpatientAdmitPatientPage.selectRoom("r 1");
        await inpatientAdmitPatientPage.selectBedSpaceNo("b 2");
        await inpatientAdmitPatientPage.selectConsultant();
        await inpatientAdmitPatientPage.clickSubmitAdmitPatientBtn();
        // Cancel Admission for new entry purpose
        await inpatientAdmitPatientPage.clickAdmissionCardBtn();
        await inpatientAdmitPatientPage.clickTopPatient();
        await inpatientAdmitPatientPage.clickAdmittedCardElipsisBtn();
        await inpatientAdmitPatientPage.clickCancelAdmissionBtn();
        await inpatientAdmitPatientPage.enterReasonForCancellation("Test Admission Cancellation");
        await inpatientAdmitPatientPage.clickSubmitReasonBtn();
        await expect(page.getByText("Patient Admission Successfully Canceled")).toBeVisible();
})
test("TC3.003 Admit Obstetrics and Gynaecology Patient successfully", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const selectLocation = new ModuleSelectorPage(page, "Front Desk");
        const navbar = new NavigationSideBarComponent(page)
        const inpatientDrugChartPage = new InpatientDrugChartPage(page);
        const inpatientAdmitPatientPage = new InpatientAdmitPatientPage(page);
        // Generate random data
        const randomMrn = generateRandomNumber(10);
        const vitals = generateRandomVitals();
        // Step 1: Login and navigate
        await page.goto(devUrl);
        await loginPage.selectLocation();
        await page.waitForURL("**/modules");
        await selectLocation.selectInpatientModule();
        await inpatientAdmitPatientPage.clickAdmitPatientBtn();
        await inpatientAdmitPatientPage.enterPatientName()
        await inpatientAdmitPatientPage.enterAuthorizationCode("AUTH12345");
        await inpatientAdmitPatientPage.enterReasonForVisit("Regular Checkup");
        const checkInDate = await inpatientAdmitPatientPage.enterCheckInDate();
        await inpatientAdmitPatientPage.enterCheckOutDate(checkInDate);
        await inpatientAdmitPatientPage.selectSpecialty("Obstetrics and Gynaecology");
        await inpatientAdmitPatientPage.selectWard("0-10 kids");
        await inpatientAdmitPatientPage.selectRoom("r 1");
        await inpatientAdmitPatientPage.selectBedSpaceNo("b 2");
        await inpatientAdmitPatientPage.selectConsultant();
        await inpatientAdmitPatientPage.clickSubmitAdmitPatientBtn();
        // Cancel Admission for new entry purpose
        await inpatientAdmitPatientPage.clickAdmissionCardBtn();
        await inpatientAdmitPatientPage.clickTopPatient();
        await inpatientAdmitPatientPage.clickAdmittedCardElipsisBtn();
        await inpatientAdmitPatientPage.clickCancelAdmissionBtn();
        await inpatientAdmitPatientPage.enterReasonForCancellation("Test Admission Cancellation");
        await inpatientAdmitPatientPage.clickSubmitReasonBtn();
        await expect(page.getByText("Patient Admission Successfully Canceled")).toBeVisible();
})
test("TC4.004 Admit Endocrinology Patient successfully", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const selectLocation = new ModuleSelectorPage(page, "Front Desk");
        const navbar = new NavigationSideBarComponent(page)
        const inpatientDrugChartPage = new InpatientDrugChartPage(page);
        const inpatientAdmitPatientPage = new InpatientAdmitPatientPage(page);
        // Generate random data
        const randomMrn = generateRandomNumber(10);
        const vitals = generateRandomVitals();
        // Step 1: Login and navigate
        await page.goto(devUrl);
        await loginPage.selectLocation();
        await page.waitForURL("**/modules");
        await selectLocation.selectInpatientModule();
        await inpatientAdmitPatientPage.clickAdmitPatientBtn();
        await inpatientAdmitPatientPage.enterPatientName()
        await inpatientAdmitPatientPage.enterAuthorizationCode("AUTH12345");
        await inpatientAdmitPatientPage.enterReasonForVisit("Regular Checkup");
        const checkInDate = await inpatientAdmitPatientPage.enterCheckInDate();
        await inpatientAdmitPatientPage.enterCheckOutDate(checkInDate);
        await inpatientAdmitPatientPage.selectSpecialty("Endocrinology");
        await inpatientAdmitPatientPage.selectWard("0-10 kids");
        await inpatientAdmitPatientPage.selectRoom("r 1");
        await inpatientAdmitPatientPage.selectBedSpaceNo("b 2");
        await inpatientAdmitPatientPage.selectConsultant();
        await inpatientAdmitPatientPage.clickSubmitAdmitPatientBtn();
        // Cancel Admission for new entry purpose
        await inpatientAdmitPatientPage.clickAdmissionCardBtn();
        await inpatientAdmitPatientPage.clickTopPatient();
        await inpatientAdmitPatientPage.clickAdmittedCardElipsisBtn();
        await inpatientAdmitPatientPage.clickCancelAdmissionBtn();
        await inpatientAdmitPatientPage.enterReasonForCancellation("Test Admission Cancellation");
        await inpatientAdmitPatientPage.clickSubmitReasonBtn();
        await expect(page.getByText("Patient Admission Successfully Canceled")).toBeVisible();
})
test("TC5.005 Admit Cardiology Patient successfully", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const selectLocation = new ModuleSelectorPage(page, "Front Desk");
        const navbar = new NavigationSideBarComponent(page)
        const inpatientDrugChartPage = new InpatientDrugChartPage(page);
        const inpatientAdmitPatientPage = new InpatientAdmitPatientPage(page);
        // Generate random data
        const randomMrn = generateRandomNumber(10);
        const vitals = generateRandomVitals();
        // Step 1: Login and navigate
        await page.goto(devUrl);
        await loginPage.selectLocation();
        await page.waitForURL("**/modules");
        await selectLocation.selectInpatientModule();
        await inpatientAdmitPatientPage.clickAdmitPatientBtn();
        await inpatientAdmitPatientPage.enterPatientName()
        await inpatientAdmitPatientPage.enterAuthorizationCode("AUTH12345");
        await inpatientAdmitPatientPage.enterReasonForVisit("Regular Checkup");
        const checkInDate = await inpatientAdmitPatientPage.enterCheckInDate();
        await inpatientAdmitPatientPage.enterCheckOutDate(checkInDate);
        await inpatientAdmitPatientPage.selectSpecialty("Cardiology");
        await inpatientAdmitPatientPage.selectWard("0-10 kids");
        await inpatientAdmitPatientPage.selectRoom("r 1");
        await inpatientAdmitPatientPage.selectBedSpaceNo("b 2");
        await inpatientAdmitPatientPage.selectConsultant();
        await inpatientAdmitPatientPage.clickSubmitAdmitPatientBtn();
        // Cancel Admission for new entry purpose
        await inpatientAdmitPatientPage.clickAdmissionCardBtn();
        await inpatientAdmitPatientPage.clickTopPatient();
        await inpatientAdmitPatientPage.clickAdmittedCardElipsisBtn();
        await inpatientAdmitPatientPage.clickCancelAdmissionBtn();
        await inpatientAdmitPatientPage.enterReasonForCancellation("Test Admission Cancellation");
        await inpatientAdmitPatientPage.clickSubmitReasonBtn();
        await expect(page.getByText("Patient Admission Successfully Canceled")).toBeVisible();
})
test("TC6.006 Admit Paediatrician Patient successfully", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const selectLocation = new ModuleSelectorPage(page, "Front Desk");
        const navbar = new NavigationSideBarComponent(page)
        const inpatientDrugChartPage = new InpatientDrugChartPage(page);
        const inpatientAdmitPatientPage = new InpatientAdmitPatientPage(page);
        // Generate random data
        const randomMrn = generateRandomNumber(10);
        const vitals = generateRandomVitals();
        // Step 1: Login and navigate
        await page.goto(devUrl);
        await loginPage.selectLocation();
        await page.waitForURL("**/modules");
        await selectLocation.selectInpatientModule();
        await inpatientAdmitPatientPage.clickAdmitPatientBtn();
        await inpatientAdmitPatientPage.enterPatientName()
        await inpatientAdmitPatientPage.enterAuthorizationCode("AUTH12345");
        await inpatientAdmitPatientPage.enterReasonForVisit("Regular Checkup");
        const checkInDate = await inpatientAdmitPatientPage.enterCheckInDate();
        await inpatientAdmitPatientPage.enterCheckOutDate(checkInDate);
        await inpatientAdmitPatientPage.selectSpecialty("Paediatrician");
        await inpatientAdmitPatientPage.selectWard("0-10 kids");
        await inpatientAdmitPatientPage.selectRoom("r 1");
        await inpatientAdmitPatientPage.selectBedSpaceNo("b 2");
        await inpatientAdmitPatientPage.selectConsultant();
        await inpatientAdmitPatientPage.clickSubmitAdmitPatientBtn();
        // Cancel Admission for new entry purpose
        await inpatientAdmitPatientPage.clickAdmissionCardBtn();
        await inpatientAdmitPatientPage.clickTopPatient();
        await inpatientAdmitPatientPage.clickAdmittedCardElipsisBtn();
        await inpatientAdmitPatientPage.clickCancelAdmissionBtn();
        await inpatientAdmitPatientPage.enterReasonForCancellation("Test Admission Cancellation");
        await inpatientAdmitPatientPage.clickSubmitReasonBtn();
        await expect(page.getByText("Patient Admission Successfully Canceled")).toBeVisible();
})
test("TC7.007 Admit Emergency Patient successfully", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const selectLocation = new ModuleSelectorPage(page, "Front Desk");
        const navbar = new NavigationSideBarComponent(page)
        const inpatientDrugChartPage = new InpatientDrugChartPage(page);
        const inpatientAdmitPatientPage = new InpatientAdmitPatientPage(page);
        // Generate random data
        const randomMrn = generateRandomNumber(10);
        const vitals = generateRandomVitals();
        // Step 1: Login and navigate
        await page.goto(devUrl);
        await loginPage.selectLocation();
        await page.waitForURL("**/modules");
        await selectLocation.selectInpatientModule();
            // ✅ Capture initial emergency patient count
        const emergencyCard = page.locator("//div[@class='tw-grid tw-gap-6 tw-mb-9 md:tw-grid-cols-4']//div[3]");
        const initialCountText = await emergencyCard.textContent();
        const initialCount = parseInt(initialCountText?.trim() || "0");
        console.log("Initial Emergency Patient Count:", initialCount);
        await inpatientAdmitPatientPage.clickAdmitPatientBtn();
        await inpatientAdmitPatientPage.toggleEmergencySwitch();
        await inpatientAdmitPatientPage.enterPatientName()
        await inpatientAdmitPatientPage.enterAuthorizationCode("AUTH12345");
        await inpatientAdmitPatientPage.enterReasonForVisit("Regular Checkup");
        const checkInDate = await inpatientAdmitPatientPage.enterCheckInDate();
        await inpatientAdmitPatientPage.enterCheckOutDate(checkInDate);
        await inpatientAdmitPatientPage.selectSpecialty("Ophthalmology");
        await inpatientAdmitPatientPage.selectWard("0-10 kids");
        await inpatientAdmitPatientPage.selectRoom("r 1");
        await inpatientAdmitPatientPage.selectBedSpaceNo("b 2");
        await inpatientAdmitPatientPage.selectConsultant();
        await inpatientAdmitPatientPage.clickSubmitAdmitPatientBtn();
            // ✅ Verify emergency patient count increased by 1
        await emergencyCard.waitFor({ state: "visible", timeout: 5000 });
        const updatedCountText = await emergencyCard.textContent();
        const updatedCount = parseInt(updatedCountText?.trim() || "0");
        console.log("Updated Emergency Patient Count:", updatedCount);
        expect(updatedCount).toBe(initialCount + 1);
        // Cancel Admission for new entry purpose
        await inpatientAdmitPatientPage.clickAdmissionCardBtn();
        await inpatientAdmitPatientPage.clickTopPatient();
        await inpatientAdmitPatientPage.clickAdmittedCardElipsisBtn();
        await inpatientAdmitPatientPage.clickCancelAdmissionBtn();
        await inpatientAdmitPatientPage.enterReasonForCancellation("Test Admission Cancellation");
        await inpatientAdmitPatientPage.clickSubmitReasonBtn();
        await expect(page.getByText("Patient Admission Successfully Canceled")).toBeVisible();
})
test("TC8.008 Verify that user cannot Admit Patient successfully when patient name field is empty", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const selectLocation = new ModuleSelectorPage(page, "Front Desk");
        const navbar = new NavigationSideBarComponent(page)
        const inpatientDrugChartPage = new InpatientDrugChartPage(page);
        const inpatientAdmitPatientPage = new InpatientAdmitPatientPage(page);
        // Generate random data
        const randomMrn = generateRandomNumber(10);
        const vitals = generateRandomVitals();
        // Step 1: Login and navigate
        await page.goto(devUrl);
        await loginPage.selectLocation();
        await page.waitForURL("**/modules");
        await selectLocation.selectInpatientModule();
        await inpatientAdmitPatientPage.clickAdmitPatientBtn();
        // await inpatientAdmitPatientPage.enterPatientName()
        await inpatientAdmitPatientPage.enterAuthorizationCode("AUTH12345");
        await inpatientAdmitPatientPage.enterReasonForVisit("Regular Checkup");
        const checkInDate = await inpatientAdmitPatientPage.enterCheckInDate();
        await inpatientAdmitPatientPage.enterCheckOutDate(checkInDate);
        await inpatientAdmitPatientPage.selectSpecialty("Ophthalmology");
        await inpatientAdmitPatientPage.selectWard("0-10 kids");
        await inpatientAdmitPatientPage.selectRoom("r 1");
        await inpatientAdmitPatientPage.selectBedSpaceNo("b 2");
        await inpatientAdmitPatientPage.selectConsultant();
        await inpatientAdmitPatientPage.verifyAdmitPatientBtnIsDisabled();
})
test("TC9.009 Verify that user cannot Admit Patient successfully when Reason field is empty", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const selectLocation = new ModuleSelectorPage(page, "Front Desk");
        const navbar = new NavigationSideBarComponent(page)
        const inpatientDrugChartPage = new InpatientDrugChartPage(page);
        const inpatientAdmitPatientPage = new InpatientAdmitPatientPage(page);
        // Generate random data
        const randomMrn = generateRandomNumber(10);
        const vitals = generateRandomVitals();
        // Step 1: Login and navigate
        await page.goto(devUrl);
        await loginPage.selectLocation();
        await page.waitForURL("**/modules");
        await selectLocation.selectInpatientModule();
        await inpatientAdmitPatientPage.clickAdmitPatientBtn();
        await inpatientAdmitPatientPage.enterPatientName()
        await inpatientAdmitPatientPage.enterAuthorizationCode("AUTH12345");
        const checkInDate = await inpatientAdmitPatientPage.enterCheckInDate();
        await inpatientAdmitPatientPage.enterCheckOutDate(checkInDate);
        await inpatientAdmitPatientPage.selectSpecialty("Ophthalmology");
        await inpatientAdmitPatientPage.selectWard("0-10 kids");
        await inpatientAdmitPatientPage.selectRoom("r 1");
        await inpatientAdmitPatientPage.selectBedSpaceNo("b 2");
        await inpatientAdmitPatientPage.selectConsultant();
        await inpatientAdmitPatientPage.verifyAdmitPatientBtnIsDisabled();
})
test("TC10.010 Verify that user cannot Admit Patient successfully without inputing checkin and checkout date", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const selectLocation = new ModuleSelectorPage(page, "Front Desk");
        const navbar = new NavigationSideBarComponent(page)
        const inpatientDrugChartPage = new InpatientDrugChartPage(page);
        const inpatientAdmitPatientPage = new InpatientAdmitPatientPage(page);
        // Generate random data
        const randomMrn = generateRandomNumber(10);
        const vitals = generateRandomVitals();
        // Step 1: Login and navigate
        await page.goto(devUrl);
        await loginPage.selectLocation();
        await page.waitForURL("**/modules");
        await selectLocation.selectInpatientModule();
        await inpatientAdmitPatientPage.clickAdmitPatientBtn();
        await inpatientAdmitPatientPage.enterPatientName()
        await inpatientAdmitPatientPage.enterAuthorizationCode("AUTH12345");
        await inpatientAdmitPatientPage.enterReasonForVisit("Regular Checkup");
        await inpatientAdmitPatientPage.selectSpecialty("Ophthalmology");
        await inpatientAdmitPatientPage.selectWard("0-10 kids");
        await inpatientAdmitPatientPage.selectRoom("r 1");
        await inpatientAdmitPatientPage.selectBedSpaceNo("b 2");
        await inpatientAdmitPatientPage.selectConsultant();
        await inpatientAdmitPatientPage.verifyAdmitPatientBtnIsDisabled();
})
test("TC11.011 Verify that user cannot Admit Patient successfully without selecting specialty", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const selectLocation = new ModuleSelectorPage(page, "Front Desk");
        const navbar = new NavigationSideBarComponent(page)
        const inpatientDrugChartPage = new InpatientDrugChartPage(page);
        const inpatientAdmitPatientPage = new InpatientAdmitPatientPage(page);
        // Generate random data
        const randomMrn = generateRandomNumber(10);
        const vitals = generateRandomVitals();
        // Step 1: Login and navigate
        await page.goto(devUrl);
        await loginPage.selectLocation();
        await page.waitForURL("**/modules");
        await selectLocation.selectInpatientModule();
        await inpatientAdmitPatientPage.clickAdmitPatientBtn();
        await inpatientAdmitPatientPage.enterPatientName()
        await inpatientAdmitPatientPage.enterAuthorizationCode("AUTH12345");
        await inpatientAdmitPatientPage.enterReasonForVisit("Regular Checkup");
        const checkInDate = await inpatientAdmitPatientPage.enterCheckInDate();
        await inpatientAdmitPatientPage.enterCheckOutDate(checkInDate);
        await inpatientAdmitPatientPage.selectWard("0-10 kids");
        await inpatientAdmitPatientPage.selectRoom("r 1");
        await inpatientAdmitPatientPage.selectBedSpaceNo("b 2");
        await inpatientAdmitPatientPage.selectConsultant();
        await inpatientAdmitPatientPage.verifyAdmitPatientBtnIsDisabled();
})
test("TC12.012 Verify that user cannot Admit Patient successfully without selecting ward", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const selectLocation = new ModuleSelectorPage(page, "Front Desk");
        const navbar = new NavigationSideBarComponent(page)
        const inpatientDrugChartPage = new InpatientDrugChartPage(page);
        const inpatientAdmitPatientPage = new InpatientAdmitPatientPage(page);
        // Generate random data
        const randomMrn = generateRandomNumber(10);
        const vitals = generateRandomVitals();
        // Step 1: Login and navigate
        await page.goto(devUrl);
        await loginPage.selectLocation();
        await page.waitForURL("**/modules");
        await selectLocation.selectInpatientModule();
        await inpatientAdmitPatientPage.clickAdmitPatientBtn();
        await inpatientAdmitPatientPage.enterPatientName()
        await inpatientAdmitPatientPage.enterAuthorizationCode("AUTH12345");
        await inpatientAdmitPatientPage.enterReasonForVisit("Regular Checkup");
        const checkInDate = await inpatientAdmitPatientPage.enterCheckInDate();
        await inpatientAdmitPatientPage.enterCheckOutDate(checkInDate);
        await inpatientAdmitPatientPage.selectSpecialty("Ophthalmology");
        await inpatientAdmitPatientPage.selectConsultant();
        await inpatientAdmitPatientPage.verifyAdmitPatientBtnIsDisabled();
})
test("TC13.013 Verify that user cannot Admit Patient successfully without selecting Bed Space Number", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const selectLocation = new ModuleSelectorPage(page, "Front Desk");
        const navbar = new NavigationSideBarComponent(page)
        const inpatientDrugChartPage = new InpatientDrugChartPage(page);
        const inpatientAdmitPatientPage = new InpatientAdmitPatientPage(page);
        // Generate random data
        const randomMrn = generateRandomNumber(10);
        const vitals = generateRandomVitals();
        // Step 1: Login and navigate
        await page.goto(devUrl);
        await loginPage.selectLocation();
        await page.waitForURL("**/modules");
        await selectLocation.selectInpatientModule();
        await inpatientAdmitPatientPage.clickAdmitPatientBtn();
        await inpatientAdmitPatientPage.enterPatientName()
        await inpatientAdmitPatientPage.enterAuthorizationCode("AUTH12345");
        await inpatientAdmitPatientPage.enterReasonForVisit("Regular Checkup");
        const checkInDate = await inpatientAdmitPatientPage.enterCheckInDate();
        await inpatientAdmitPatientPage.enterCheckOutDate(checkInDate);
        await inpatientAdmitPatientPage.selectSpecialty("Ophthalmology");
        await inpatientAdmitPatientPage.selectWard("0-10 kids");
        await inpatientAdmitPatientPage.selectRoom("r 1");
        await inpatientAdmitPatientPage.verifyAdmitPatientBtnIsDisabled();

})
test("TC14.014 Verify that user cannot Admit Patient successfully without selecting Room", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const selectLocation = new ModuleSelectorPage(page, "Front Desk");
        const navbar = new NavigationSideBarComponent(page)
        const inpatientDrugChartPage = new InpatientDrugChartPage(page);
        const inpatientAdmitPatientPage = new InpatientAdmitPatientPage(page);
        // Generate random data
        const randomMrn = generateRandomNumber(10);
        const vitals = generateRandomVitals();
        // Step 1: Login and navigate
        await page.goto(devUrl);
        await loginPage.selectLocation();
        await page.waitForURL("**/modules");
        await selectLocation.selectInpatientModule();
        await inpatientAdmitPatientPage.clickAdmitPatientBtn();
        await inpatientAdmitPatientPage.enterPatientName()
        await inpatientAdmitPatientPage.enterAuthorizationCode("AUTH12345");
        await inpatientAdmitPatientPage.enterReasonForVisit("Regular Checkup");
        const checkInDate = await inpatientAdmitPatientPage.enterCheckInDate();
        await inpatientAdmitPatientPage.enterCheckOutDate(checkInDate);
        await inpatientAdmitPatientPage.selectSpecialty("Ophthalmology");
        await inpatientAdmitPatientPage.selectWard("0-10 kids");
        await inpatientAdmitPatientPage.selectConsultant();
        await inpatientAdmitPatientPage.verifyAdmitPatientBtnIsDisabled();
})
test("TC15.015 Verify that user cannot Admit Patient successfully without selecting Consultant", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const selectLocation = new ModuleSelectorPage(page, "Front Desk");
        const navbar = new NavigationSideBarComponent(page)
        const inpatientDrugChartPage = new InpatientDrugChartPage(page);
        const inpatientAdmitPatientPage = new InpatientAdmitPatientPage(page);
        // Generate random data
        const randomMrn = generateRandomNumber(10);
        const vitals = generateRandomVitals();
        // Step 1: Login and navigate
        await page.goto(devUrl);
        await loginPage.selectLocation();
        await page.waitForURL("**/modules");
        await selectLocation.selectInpatientModule();
        await inpatientAdmitPatientPage.clickAdmitPatientBtn();
        await inpatientAdmitPatientPage.enterPatientName()
        await inpatientAdmitPatientPage.enterAuthorizationCode("AUTH12345");
        await inpatientAdmitPatientPage.enterReasonForVisit("Regular Checkup");
        const checkInDate = await inpatientAdmitPatientPage.enterCheckInDate();
        await inpatientAdmitPatientPage.enterCheckOutDate(checkInDate);
        await inpatientAdmitPatientPage.selectSpecialty("Ophthalmology");
        await inpatientAdmitPatientPage.selectWard("0-10 kids");
        await inpatientAdmitPatientPage.selectRoom("r 1");
        await inpatientAdmitPatientPage.selectBedSpaceNo("b 2");
        await inpatientAdmitPatientPage.verifyAdmitPatientBtnIsDisabled();

})