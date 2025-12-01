import  { expect, request } from "@playwright/test";
import { LoginPage } from "../../pages/loginPage";
import { test } from "../../fixture/fixture-loader";
import { ModuleSelectorPage } from "../../pages/moduleSelectorPage";
import { NavigationSideBarComponent } from "../../pages/navigationSideBarComponet";
const { OutpatientDrugChartPage } = require("../../pages/outpatient/outPatientdrugChartPages");
const { ReferralsModulePage } = require("../../pages/outpatient/OutPatientReferralsPages");
import { generateRandomNumber, generateRandomVitals } from "../../utils/VitalsUtils";
const devUrl = 'https://dev.indigoemr.com';


test("TC1.001 Create Internal Physician information Referrals for customers", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const selectLocation = new ModuleSelectorPage(page, "Front Desk");
        const navbar = new NavigationSideBarComponent(page)
        const outpatientDrugChartPage = new OutpatientDrugChartPage(page);
        const referralsModulePage = new ReferralsModulePage(page);
        // Generate random data
        const randomMrn = generateRandomNumber(10);
        const vitals = generateRandomVitals();
        // Step 1: Login and navigate
        await page.goto(devUrl);
        // await loginPage.login('ibukun.a@qacetech.ng', 'Testing@123');
        await loginPage.selectLocation();
        await page.waitForURL("**/modules");
        await selectLocation.selectOutpatientModule();
        await outpatientDrugChartPage.clickSideBarPatientButton()
        await outpatientDrugChartPage.clickPatientBtn()
        await outpatientDrugChartPage.clickAppointmentTabBtn()
        await referralsModulePage.clickSystemDoneBtn()
        await referralsModulePage.clickReferralTabBtn()
        await referralsModulePage.clickAddEntryDropdown()
        await referralsModulePage.clickReferalButton()
        await referralsModulePage.enterDrugField("Amoxicillin")
        await referralsModulePage.enterDurationField("5 days")
        await referralsModulePage.enterDosageField("500mg")
        await referralsModulePage.enterReferealReasonField("This is a test purpose")
        await referralsModulePage.enterCommentField("Take after meal please")
        await referralsModulePage.selectHospitalBranch('Charity Vision')
        await referralsModulePage.selectPhysicianName('Bantu Simba')
        await referralsModulePage.selectSpecialty('General Practice')
        await referralsModulePage.clickSignedByBtn()
        await referralsModulePage.enterPin1Field('1')
        await referralsModulePage.enterPin2Field('1')
        await referralsModulePage.enterPin3Field('1')
        await referralsModulePage.enterPin4Field('1')
        await referralsModulePage.clickSaveBtn()
        await referralsModulePage.verifyValidPinSuccessMessage()
        await referralsModulePage.clickSubmitBtn()
        await referralsModulePage.verifyReferralCreationSuccessMessage()
        await referralsModulePage.verifyReferralVisibilityInList()
})
test("TC1.002 Create External Physician information Referrals for customers", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const selectLocation = new ModuleSelectorPage(page, "Front Desk");
        const navbar = new NavigationSideBarComponent(page)
        const outpatientDrugChartPage = new OutpatientDrugChartPage(page);
        const referralsModulePage = new ReferralsModulePage(page);
        // Generate random data
        const randomMrn = generateRandomNumber(10);
        const vitals = generateRandomVitals();
        // Step 1: Login and navigate
        await page.goto(devUrl);
        // await loginPage.login('ibukun.a@qacetech.ng', 'Testing@123');
        await loginPage.selectLocation();
        await page.waitForURL("**/modules");
        await selectLocation.selectOutpatientModule();
        await outpatientDrugChartPage.clickSideBarPatientButton()
        await outpatientDrugChartPage.clickPatientBtn()
        await outpatientDrugChartPage.clickAppointmentTabBtn()
        await referralsModulePage.clickSystemDoneBtn()
        await referralsModulePage.clickReferralTabBtn()
        await referralsModulePage.clickAddEntryDropdown()
        await referralsModulePage.clickReferalButton()
        await referralsModulePage.enterDrugField("Amoxicillin")
        await referralsModulePage.enterDurationField("5 days")
        await referralsModulePage.enterDosageField("500mg")
        await referralsModulePage.enterReferealReasonField("This is a test purpose")
        await referralsModulePage.enterCommentField("Take after meal please")
        await referralsModulePage.clickExternalRadioBtn()
        await referralsModulePage.enterHospitalNameField('Charity Vision')
        await referralsModulePage.enterPhysicianNameField('Bantu Simba')
        await referralsModulePage.enterSpecialtyNameField('General Practice')
        await referralsModulePage.clickSignedByBtn()
        await referralsModulePage.enterPin1Field('1')
        await referralsModulePage.enterPin2Field('1')
        await referralsModulePage.enterPin3Field('1')
        await referralsModulePage.enterPin4Field('1')
        await referralsModulePage.clickSaveBtn()
        await referralsModulePage.verifyValidPinSuccessMessage()
        await referralsModulePage.clickSubmitBtn()
        await referralsModulePage.verifyReferralCreationSuccessMessage()
        await referralsModulePage.verifyReferralVisibilityInList()
})
test("TC1.003 Verify that user cannot Create Internal Physician information Referrals for customers with incorrect PIN", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const selectLocation = new ModuleSelectorPage(page, "Front Desk");
        const navbar = new NavigationSideBarComponent(page)
        const outpatientDrugChartPage = new OutpatientDrugChartPage(page);
        const referralsModulePage = new ReferralsModulePage(page);
        // Generate random data
        const randomMrn = generateRandomNumber(10);
        const vitals = generateRandomVitals();
        // Step 1: Login and navigate
        await page.goto(devUrl);
        // await loginPage.login('ibukun.a@qacetech.ng', 'Testing@123');
        await loginPage.selectLocation();
        await page.waitForURL("**/modules");
        await selectLocation.selectOutpatientModule();
        await outpatientDrugChartPage.clickSideBarPatientButton()
        await outpatientDrugChartPage.clickPatientBtn()
        await outpatientDrugChartPage.clickAppointmentTabBtn()
        await referralsModulePage.clickSystemDoneBtn()
        await referralsModulePage.clickReferralTabBtn()
        await referralsModulePage.clickAddEntryDropdown()
        await referralsModulePage.clickReferalButton()
        await referralsModulePage.enterDrugField("Amoxicillin")
        await referralsModulePage.enterDurationField("5 days")
        await referralsModulePage.enterDosageField("500mg")
        await referralsModulePage.enterReferealReasonField("This is a test purpose")
        await referralsModulePage.enterCommentField("Take after meal please")
        await referralsModulePage.selectHospitalBranch('Charity Vision')
        await referralsModulePage.selectPhysicianName('Bantu Simba')
        await referralsModulePage.selectSpecialty('General Practice')
        await referralsModulePage.clickSignedByBtn()
        await referralsModulePage.enterPin1Field('1')
        await referralsModulePage.enterPin2Field('2')
        await referralsModulePage.enterPin3Field('3')
        await referralsModulePage.enterPin4Field('4')
        await referralsModulePage.clickSaveBtn()
        await referralsModulePage.verifyIncorrectPinErrorMessage()
})
test("TC1.004 Verify that user cannot Create External Physician information Referrals for customers with incorrect PIN", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const selectLocation = new ModuleSelectorPage(page, "Front Desk");
        const navbar = new NavigationSideBarComponent(page)
        const outpatientDrugChartPage = new OutpatientDrugChartPage(page);
        const referralsModulePage = new ReferralsModulePage(page);
        // Generate random data
        const randomMrn = generateRandomNumber(10);
        const vitals = generateRandomVitals();
        // Step 1: Login and navigate
        await page.goto(devUrl);
        // await loginPage.login('ibukun.a@qacetech.ng', 'Testing@123');
        await loginPage.selectLocation();
        await page.waitForURL("**/modules");
        await selectLocation.selectOutpatientModule();
        await outpatientDrugChartPage.clickSideBarPatientButton()
        await outpatientDrugChartPage.clickPatientBtn()
        await outpatientDrugChartPage.clickAppointmentTabBtn()
        await referralsModulePage.clickSystemDoneBtn()
        await referralsModulePage.clickReferralTabBtn()
        await referralsModulePage.clickAddEntryDropdown()
        await referralsModulePage.clickReferalButton()
        await referralsModulePage.enterDrugField("Amoxicillin")
        await referralsModulePage.enterDurationField("5 days")
        await referralsModulePage.enterDosageField("500mg")
        await referralsModulePage.enterReferealReasonField("This is a test purpose")
        await referralsModulePage.enterCommentField("Take after meal please")
        await referralsModulePage.clickExternalRadioBtn()
        await referralsModulePage.enterHospitalNameField('Charity Vision')
        await referralsModulePage.enterPhysicianNameField('Bantu Simba')
        await referralsModulePage.enterSpecialtyNameField('General Practice')
        await referralsModulePage.clickSignedByBtn()
        await referralsModulePage.enterPin1Field('1')
        await referralsModulePage.enterPin2Field('2')
        await referralsModulePage.enterPin3Field('3')
        await referralsModulePage.enterPin4Field('4')
        await referralsModulePage.clickSaveBtn()
        await referralsModulePage.verifyIncorrectPinErrorMessage()
})
test("TC1.005 Verify user cannot Create External Physician information Referrals for customers when the Hospital branch field is empty", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const selectLocation = new ModuleSelectorPage(page, "Front Desk");
        const navbar = new NavigationSideBarComponent(page)
        const outpatientDrugChartPage = new OutpatientDrugChartPage(page);
        const referralsModulePage = new ReferralsModulePage(page);
        // Generate random data
        const randomMrn = generateRandomNumber(10);
        const vitals = generateRandomVitals();
        // Step 1: Login and navigate
        await page.goto(devUrl);
        // await loginPage.login('ibukun.a@qacetech.ng', 'Testing@123');
        await loginPage.selectLocation();
        await page.waitForURL("**/modules");
        await selectLocation.selectOutpatientModule();
        await outpatientDrugChartPage.clickSideBarPatientButton()
        await outpatientDrugChartPage.clickPatientBtn()
        await outpatientDrugChartPage.clickAppointmentTabBtn()
        await referralsModulePage.clickSystemDoneBtn()
        await referralsModulePage.clickReferralTabBtn()
        await referralsModulePage.clickAddEntryDropdown()
        await referralsModulePage.clickReferalButton()
        await referralsModulePage.enterDrugField("Amoxicillin")
        await referralsModulePage.enterDurationField("5 days")
        await referralsModulePage.enterDosageField("500mg")
        await referralsModulePage.enterReferealReasonField("This is a test purpose")
        await referralsModulePage.enterCommentField("Take after meal please")
        await referralsModulePage.clickExternalRadioBtn()
        await referralsModulePage.enterPhysicianNameField('Bantu Simba')
        await referralsModulePage.enterSpecialtyNameField('General Practice')
        await referralsModulePage.clickSignedByBtn()
        await referralsModulePage.enterPin1Field('1')
        await referralsModulePage.enterPin2Field('1')
        await referralsModulePage.enterPin3Field('1')
        await referralsModulePage.enterPin4Field('1')
        await referralsModulePage.clickSaveBtn()
        await referralsModulePage.verifyValidPinSuccessMessage()
        await referralsModulePage.clickSubmitBtn()
        await referralsModulePage.verifyErrorMessageForNotFilllingField()
})
test("TC1.006 Verify that user can edit mediacation after adding more than 1 medication item", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const selectLocation = new ModuleSelectorPage(page, "Front Desk");
        const navbar = new NavigationSideBarComponent(page)
        const outpatientDrugChartPage = new OutpatientDrugChartPage(page);
        const referralsModulePage = new ReferralsModulePage(page);
        // Generate random data
        const randomMrn = generateRandomNumber(10);
        const vitals = generateRandomVitals();
        // Step 1: Login and navigate
        await page.goto(devUrl);
        // await loginPage.login('ibukun.a@qacetech.ng', 'Testing@123');
        await loginPage.selectLocation();
        await page.waitForURL("**/modules");
        await selectLocation.selectOutpatientModule();
        await outpatientDrugChartPage.clickSideBarPatientButton()
        await outpatientDrugChartPage.clickPatientBtn()
        await outpatientDrugChartPage.clickAppointmentTabBtn()
        await referralsModulePage.clickSystemDoneBtn()
        await referralsModulePage.clickReferralTabBtn()
        await referralsModulePage.clickAddEntryDropdown()
        await referralsModulePage.clickReferalButton()
        await referralsModulePage.enterDrugField("Amoxicillin")
        await referralsModulePage.enterDurationField("5 days")
        await referralsModulePage.enterDosageField("500mg")
        await referralsModulePage.clickAddMedicationButton()
        await referralsModulePage.clickEditMedicationBtn()
        await referralsModulePage.enterDrugField("Amoxicillin")
        await referralsModulePage.enterDurationField("10 days")
        await referralsModulePage.enterDosageField("400mg")
        await referralsModulePage.clickAddMedicationButton()
})
test("TC1.007 Verify that user can delete mediacation after adding more than 1", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const selectLocation = new ModuleSelectorPage(page, "Front Desk");
        const navbar = new NavigationSideBarComponent(page)
        const outpatientDrugChartPage = new OutpatientDrugChartPage(page);
        const referralsModulePage = new ReferralsModulePage(page);
        // Generate random data
        const randomMrn = generateRandomNumber(10);
        const vitals = generateRandomVitals();
        // Step 1: Login and navigate
        await page.goto(devUrl);
        // await loginPage.login('ibukun.a@qacetech.ng', 'Testing@123');
        await loginPage.selectLocation();
        await page.waitForURL("**/modules");
        await selectLocation.selectOutpatientModule();
        await outpatientDrugChartPage.clickSideBarPatientButton()
        await outpatientDrugChartPage.clickPatientBtn()
        await outpatientDrugChartPage.clickAppointmentTabBtn()
        await referralsModulePage.clickSystemDoneBtn()
        await referralsModulePage.clickReferralTabBtn()
        await referralsModulePage.clickAddEntryDropdown()
        await referralsModulePage.clickReferalButton()
        await referralsModulePage.enterDrugField("Amoxicillin")
        await referralsModulePage.enterDurationField("5 days")
        await referralsModulePage.enterDosageField("500mg")
        await referralsModulePage.clickAddMedicationButton()
        await referralsModulePage.clickDeleteMedicationBtn()
})
test("TC1.008 Verify that user can add more than 1 mediacation while creating Internal Physician information Referrals for customers", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const selectLocation = new ModuleSelectorPage(page, "Front Desk");
        const navbar = new NavigationSideBarComponent(page)
        const outpatientDrugChartPage = new OutpatientDrugChartPage(page);
        const referralsModulePage = new ReferralsModulePage(page);
        // Generate random data
        const randomMrn = generateRandomNumber(10);
        const vitals = generateRandomVitals();
        // Step 1: Login and navigate
        await page.goto(devUrl);
        // await loginPage.login('ibukun.a@qacetech.ng', 'Testing@123');
        await loginPage.selectLocation();
        await page.waitForURL("**/modules");
        await selectLocation.selectOutpatientModule();
        await outpatientDrugChartPage.clickSideBarPatientButton()
        await outpatientDrugChartPage.clickPatientBtn()
        await outpatientDrugChartPage.clickAppointmentTabBtn()
        await referralsModulePage.clickSystemDoneBtn()
        await referralsModulePage.clickReferralTabBtn()
        await referralsModulePage.clickAddEntryDropdown()
        await referralsModulePage.clickReferalButton()
        await referralsModulePage.enterDrugField("Amoxicillin")
        await referralsModulePage.enterDurationField("5")
        await referralsModulePage.enterDosageField("500")
        await referralsModulePage.clickAddMedicationButton()
        await referralsModulePage.enterDrugField("PARACETAMOL SYR")
        await referralsModulePage.enterDurationField("10")
        await referralsModulePage.enterDosageField("400")
        await referralsModulePage.enterReferealReasonField("This is a test purpose")
        await referralsModulePage.enterCommentField("Take after meal please")
        await referralsModulePage.selectHospitalBranch('Charity Vision')
        await referralsModulePage.selectPhysicianName('Bantu Simba')
        await referralsModulePage.selectSpecialty('General Practice')
        await referralsModulePage.clickSignedByBtn()
        await referralsModulePage.enterPin1Field('1')
        await referralsModulePage.enterPin2Field('1')
        await referralsModulePage.enterPin3Field('1')
        await referralsModulePage.enterPin4Field('1')
        await referralsModulePage.clickSaveBtn()
        await referralsModulePage.verifyValidPinSuccessMessage()
        await referralsModulePage.clickSubmitBtn()
        await referralsModulePage.verifyReferralCreationSuccessMessage()
        await referralsModulePage.verifyReferralVisibilityInList()
})
test("TC1.009 Verify that user can add more than 1 mediacation while creating External Physician information Referrals for customers", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const selectLocation = new ModuleSelectorPage(page, "Front Desk");
        const navbar = new NavigationSideBarComponent(page)
        const outpatientDrugChartPage = new OutpatientDrugChartPage(page);
        const referralsModulePage = new ReferralsModulePage(page);
        // Generate random data
        const randomMrn = generateRandomNumber(10);
        const vitals = generateRandomVitals();
        // Step 1: Login and navigate
        await page.goto(devUrl);
        // await loginPage.login('ibukun.a@qacetech.ng', 'Testing@123');
        await loginPage.selectLocation();
        await page.waitForURL("**/modules");
        await selectLocation.selectOutpatientModule();
        await outpatientDrugChartPage.clickSideBarPatientButton()
        await outpatientDrugChartPage.clickPatientBtn()
        await outpatientDrugChartPage.clickAppointmentTabBtn()
        await referralsModulePage.clickSystemDoneBtn()
        await referralsModulePage.clickReferralTabBtn()
        await referralsModulePage.clickAddEntryDropdown()
        await referralsModulePage.clickReferalButton()
        await referralsModulePage.enterDrugField("Amoxicillin")
        await referralsModulePage.enterDurationField("5")
        await referralsModulePage.enterDosageField("500")
        await referralsModulePage.clickAddMedicationButton()
        await referralsModulePage.enterDrugField("PARACETAMOL SYR")
        await referralsModulePage.enterDurationField("10")
        await referralsModulePage.enterDosageField("400")
        await referralsModulePage.enterReferealReasonField("This is a test purpose")
        await referralsModulePage.enterCommentField("Take after meal please")
        await referralsModulePage.clickExternalRadioBtn()
        await referralsModulePage.enterHospitalNameField('Charity Vision')
        await referralsModulePage.enterPhysicianNameField('Bantu Simba')
        await referralsModulePage.enterSpecialtyNameField('General Practice')
        await referralsModulePage.clickSignedByBtn()
        await referralsModulePage.enterPin1Field('1')
        await referralsModulePage.enterPin2Field('1')
        await referralsModulePage.enterPin3Field('1')
        await referralsModulePage.enterPin4Field('1')
        await referralsModulePage.clickSaveBtn()
        await referralsModulePage.verifyValidPinSuccessMessage()
        await referralsModulePage.clickSubmitBtn()
        await referralsModulePage.verifyReferralCreationSuccessMessage()
        await referralsModulePage.verifyReferralVisibilityInList()
})