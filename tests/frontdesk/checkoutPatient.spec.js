const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../../pages/loginPage");
const { ModuleSelectorPage } = require("../../pages/moduleSelectorPage");
const { NavigationSideBarComponent } = require("../../pages/navigationSideBarComponet");
const { FrontdeskPatientListingPage } = require("../../pages/frontdesk/frontdeskListingPage");
const { TransferModalPage } = require("../../pages/frontdesk/transferModalPage");
const { CheckoutPatientPage } = require("../../pages/frontdesk/checkoutPatientPage");
const devUrl = "https://dev.indigoemr.com/login";

test("TC1.016 Check Out a patient from Patient Listing Page", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const selectLocation = new ModuleSelectorPage(page, "Front Desk");
    const navbar = new NavigationSideBarComponent(page);
    const patientListing = new FrontdeskPatientListingPage(page);
    const transferModal = new TransferModalPage(page);
    const checkoutPage = new CheckoutPatientPage(page);

    // Step 1: Login and navigate
    await page.goto(devUrl);
    await loginPage.selectLocation();
    await page.waitForURL("**/modules");
    await selectLocation.selectFrontDeskModule();
    await navbar.clickOnPatientsNavBar();

    // Step 2: Check In patient
    const patientName = await patientListing.getFirstPatientWithCheckIn();
    console.log("Patient selected:", patientName);

    await patientListing.clickFirstPatientWithCheckIn();
    await expect(await transferModal.isModalOpen()).toBeTruthy();

    await transferModal.clickOnConsultant();
    await transferModal.selectTimeSlot();
    await transferModal.selectReason();
    await transferModal.clickSubmitBtn();

    // Verify button changed to "Check Out"
    const btnText = await patientListing.isCheckoutBtnVisible(patientName);
    //expect.soft(btnText).toBe("Check Out");

    // Checkout same patient
    await checkoutPage.clickCheckoutBtn(patientName);

})

    test("TC1.017 Check Out a patient from Patient details Page", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const selectLocation = new ModuleSelectorPage(page, "Front Desk");
    const navbar = new NavigationSideBarComponent(page);
    const patientListing = new FrontdeskPatientListingPage(page);
    const transferModal = new TransferModalPage(page);
    const checkoutPage = new CheckoutPatientPage(page);

    // Login and navigate to Patients listing page
    await page.goto(devUrl);
    await loginPage.selectLocation();
    await page.waitForURL("**/modules");
    await selectLocation.selectFrontDeskModule();
    await navbar.clickOnPatientsNavBar();
    
    // Step 2: Check In patient
    const patientName = await patientListing.getFirstPatientWithCheckIn();
    console.log("Patient selected:", patientName);

    await patientListing.clickFirstPatientWithCheckIn();
    await expect(await transferModal.isModalOpen()).toBeTruthy();

    await transferModal.clickOnConsultant();
    await transferModal.selectTimeSlot();
    await transferModal.selectReason();
    await transferModal.clickSubmitBtn();
    await checkoutPage.clickPatientbtn();
    await checkoutPage.clickCheckoutBtn2();
    
});