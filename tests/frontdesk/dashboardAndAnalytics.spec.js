const { expect } = require("@playwright/test");
const {test} = require("../../fixture/fixture-loader");
const { LoginPage } = require("../../pages/loginPage");
const { ModuleSelectorPage } = require("../../pages/moduleSelectorPage");
// const { NavigationSideBarComponent } = require("../../pages/navigationSideBarComponet");
// const { FrontdeskPatientListingPage } = require("../../pages/frontdesk/frontdeskListingPage");
// const { TransferModalPage } = require("../../pages/frontdesk/transferModalPage");
// const { CheckoutPatientPage } = require("../../pages/frontdesk/checkoutPatientPage");
const { DashboardPage } = require("../../pages/frontdesk/dashboardPage");
const { RegistratormFormComponent } = require ("../../pages/frontdesk/registrationFormComponent");
const { AdmissionFormModal } = require ("../../pages/inpatient/admissionFormModal");


const devUrl = "https://dev.indigoemr.com/login";

test("TC1.018 Dashboard and Analytics Count (Patient Registration Count)", async ({ page, user }) => {
    const loginPage = new LoginPage(page);
    const selectLocation = new ModuleSelectorPage(page, "Front Desk");
    // const navbar = new NavigationSideBarComponent(page);
    // const patientListing = new FrontdeskPatientListingPage(page);
    // const transferModal = new TransferModalPage(page);
    // const checkoutPage = new CheckoutPatientPage(page);
    const dashboardPage = new DashboardPage(page);
    const resgistrationModalPage = new RegistratormFormComponent(page);
        
        // Login and navigate to Patients listing page
        await page.goto(devUrl);
        await loginPage.selectLocation();
        await page.waitForURL("**/modules");
        await selectLocation.selectFrontDeskModule();
       // await dashboardPage.clcikOnSurportCloseIcon();
        await dashboardPage.clickRegisterPatientBtn(resgistrationModalPage.headerTextLocator)
        //check that the registration page is open
        const isOpen =await resgistrationModalPage.isModalOpen();
        expect.soft(isOpen).toBe(true);
        //select the patient's plan
        const selectPlanText =await resgistrationModalPage.selectPlan(Math.floor(Math.random() * 5) + 1);
        await resgistrationModalPage.selectTitle('MR.');
        // Enter the patient's name
        await resgistrationModalPage.fillGivenName(user.firstName);
        await resgistrationModalPage.fillLastName(user.lastName);
        //Check the gender ration button
        await resgistrationModalPage.selectGender()
        await resgistrationModalPage.fillDOB(user.year, user.month.toString(), user.day  );
        await resgistrationModalPage.fillPhoneNumber(user.phoneNumber);
        await resgistrationModalPage.fillEmail();
        await resgistrationModalPage.fillLocation();
        await dashboardPage.clickOnSupportCloseIcon();
       // await resgistrationModalPage.selectConsultant()
        //Fill exact location
        await resgistrationModalPage.fillExactLocation();
        //Fill HMO details
        await resgistrationModalPage.clickHmoHeader();
        await resgistrationModalPage.selectHMOProvider();
        await resgistrationModalPage.selectProviderPlan()
        await resgistrationModalPage.fillProviderId(user.providerId);
        await resgistrationModalPage.clickAddNewBtn();
        //Check that the preview HMO is visible
        await expect.soft(resgistrationModalPage.previewHmoLocator).toBeVisible();
        //Fill next of kin details
        await resgistrationModalPage.clickNokHeader();
        await resgistrationModalPage.fillNokName(user.name);
        //Select next of kin relationship
        await resgistrationModalPage.selectNokRelationship(user.nokRelationship);
        await resgistrationModalPage.fillNokPhoneNumber(user.phoneNumber);
        await resgistrationModalPage.fillNokEmail(user.email);
        //await resgistrationModalPage.fillNokAddress();
        await resgistrationModalPage.clickReceivedEmail();
        await resgistrationModalPage.clickReceiveSms();
        await resgistrationModalPage.clickRegisterPatientBtn()
        await expect.soft(resgistrationModalPage.successMessageLocator).toBeVisible();
        //Check that the patient is registered successfully
        const successMessage = await resgistrationModalPage.successMessageLocator.textContent();
        expect.soft(successMessage).toContain("Patient registered successfully.");
        //Close Transfer Patient modal message
        await resgistrationModalPage.clickCancelTransferPatientBtn();
        //Get the registration count from the dashboard
        await resgistrationModalPage.getRegistrationCount();
        await page.waitForTimeout(70000);
        const registrationCount = await resgistrationModalPage.getRegistrationCount();
        console.log(`Patient Registration Incremented by 1: ${registrationCount}`);
})
test("TC1.019 Dashboard and Analytics Count (Appointments Count)", async ({ page, user }) => {
    const loginPage = new LoginPage(page);
    const selectLocation = new ModuleSelectorPage(page, "Front Desk");
    // const navbar = new NavigationSideBarComponent(page);
    // const patientListing = new FrontdeskPatientListingPage(page);
    // const transferModal = new TransferModalPage(page);
    // const checkoutPage = new CheckoutPatientPage(page);
    const dashboardPage = new DashboardPage(page);
    const resgistrationModalPage = new RegistratormFormComponent(page);
        
        // Login and navigate to Patients listing page
        await page.goto(devUrl);
        await loginPage.selectLocation();
        await page.waitForURL("**/modules");
        await selectLocation.selectFrontDeskModule();
        // Calculate Appontments cont on dashboard
        await resgistrationModalPage.getAppointmentCount
        await page.waitForTimeout(20000);
        const initialAppointmentCount = await resgistrationModalPage.getAppointmentCount();
        console.log(`Total Appointment Count: ${initialAppointmentCount}`);

        })
test("TC1.018 Dashboard and Analytics Count (Admitted Emergency Patient Count)", async ({ page, user }) => {
    const loginPage = new LoginPage(page);
    const selectLocation = new ModuleSelectorPage(page, "Front Desk");
    // const navbar = new NavigationSideBarComponent(page);
    // const patientListing = new FrontdeskPatientListingPage(page);
    // const transferModal = new TransferModalPage(page);
    // const checkoutPage = new CheckoutPatientPage(page);
    // const dashboardPage = new DashboardPage(page);
    const resgistrationModalPage = new RegistratormFormComponent(page);
    const admissionFormModal = new AdmissionFormModal(page);
        
        // Login and navigate to In Patients page
        await page.goto(devUrl);
        await loginPage.selectLocation();
        await page.waitForURL("**/modules");
        await selectLocation.selectInpatientModule();
        // Add patient flow
        await admissionFormModal.clickAdmitPatientBtn()
        await admissionFormModal.clickToggleEmergencyBtn()
        await admissionFormModal.fillPatientField()
        await admissionFormModal.selectPatient()
        await admissionFormModal.fillAuthCode("1234")
        await admissionFormModal.fillReasonForVisit("Testing")
        await admissionFormModal.fillCheckInDate();
        await admissionFormModal.fillCheckOutDate();
        await admissionFormModal.selectSpecialty("ophthalmology")


        // await page.waitForTimeout(20000);
        // const initialAppointmentCount = await resgistrationModalPage.getAppointmentCount();
        // console.log(`Total Appointment Count: ${initialAppointmentCount}`);


// })

//     test("TC1.017 Check Out a patient from Patient details Page", async ({ page }) => {
//     const loginPage = new LoginPage(page);
//     const selectLocation = new ModuleSelectorPage(page, "Front Desk");
//     const navbar = new NavigationSideBarComponent(page);
//     const patientListing = new FrontdeskPatientListingPage(page);
//     const transferModal = new TransferModalPage(page);
//     const checkoutPage = new CheckoutPatientPage(page);

//     // Login and navigate to Patients listing page
//     await page.goto(devUrl);
//     await loginPage.selectLocation();
//     await page.waitForURL("**/modules");
//     await selectLocation.selectFrontDeskModule();
//     await navbar.clickOnPatientsNavBar();
    
//     // Step 2: Check In patient
//     const patientName = await patientListing.getFirstPatientWithCheckIn();
//     console.log("Patient selected:", patientName);

//     await patientListing.clickFirstPatientWithCheckIn();
//     await expect(await transferModal.isModalOpen()).toBeTruthy();

//     await transferModal.clickOnConsultant();
//     await transferModal.selectTimeSlot();
//     await transferModal.selectReason();
//     await transferModal.clickSubmitBtn();
//     await checkoutPage.clickPatientbtn();
//     await checkoutPage.clickCheckoutBtn2();
    
});