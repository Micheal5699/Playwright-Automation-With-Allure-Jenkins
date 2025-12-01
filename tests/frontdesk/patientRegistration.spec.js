import { expect } from "@playwright/test";
import { test } from "../../fixture/fixture-loader";
import { DashboardPage } from "../../pages/frontdesk/dashboardPage";
import { RegistratormFormComponent } from "../../pages/frontdesk/registrationFormComponent";
import { LoginPage } from "../../pages/loginPage";
import { ModuleSelectorPage } from "../../pages/moduleSelectorPage";
import { da, tr } from "@faker-js/faker";
import { NavigationSideBarComponent } from "../../pages/navigationSideBarComponet";
import { FrontdeskPatientListingPage } from "../../pages/frontdesk/frontdeskListingPage";
import { TransferModalPage } from "../../pages/frontdesk/transferModalPage";
import { InpatientDashboardPage } from "../../pages/inpatient/dashboardPage";
import { AdmissionFormModal } from "../../pages/inpatient/admissionFormModal";  
import { PrescriptionModalPage } from "../../pages/prescriptionModalPage";
import { PharmarcyDashbordPage } from "../../pages/pharmarcy/pharmDashbordPage";


const devUrl = "https://dev.indigoemr.com";


test('TC2.001 Test patient Registration from the frontdesk dashboard', async ({ page, user }) => {
const loginPage  = new LoginPage(page);
    const selectLocation = new ModuleSelectorPage(page, "Front Desk");
    const dashboardPage = new DashboardPage(page);
    const resgistrationModalPage = new RegistratormFormComponent(page);
    await page.goto(devUrl);
    console.log(user.firstName, user.lastName, user.gender, user.DOB, user.year, user.month, user.day, user.phoneNumber, user.email, user.nokEmail, user.nokRelationship, user.title, user.nokName)
      await loginPage.selectLocation();
      await page.waitForTimeout(5000);
       expect.soft(page.url()).toBe('https://dev.indigoemr.com/modules');
      await selectLocation.selectFrontDeskModule();
   // await dashboardPage.clcikOnSurportCloseIcon();
    await dashboardPage.clickRegisterPatientBtn(resgistrationModalPage.headerTextLocator)
    //check that the registration page is open
    const isOpen =await resgistrationModalPage.isModalOpen();
    expect.soft(isOpen).toBe(true);
    //select the patient's plan
    const selectPlanText =await resgistrationModalPage.selectPlan(Math.floor(Math.random() * 5) + 1);
    await resgistrationModalPage.selectTitle(user.title);
    //Enter the patient's name
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
    await resgistrationModalPage.fillNokName(user.nokName);
    //Select next of kin relationship
    await resgistrationModalPage.selectNokRelationship(user.nokRelationship);
    await resgistrationModalPage.fillNokPhoneNumber(user.nokPhoneNumber);
    await resgistrationModalPage.fillNokEmail(user.nokEmail);
    await resgistrationModalPage.clickReceivedEmail();
    await resgistrationModalPage.clickReceiveSms();
    await resgistrationModalPage.clickRegisterPatientBtn()
    await expect.soft(resgistrationModalPage.successMessageLocator).toBeVisible();
    //Check that the patient is registered successfully
    const successMessage = await resgistrationModalPage.successMessageLocator.textContent();
    expect.soft(successMessage).toContain("Patient registered successfully.");
    
    

  

})
test('TC2.002 Test patient Registration from the frontdesk patient listing', async ({ page, user }) => {
    const loginPage  = new LoginPage(page);
    const selectLocation = new ModuleSelectorPage(page, "Front Desk");
    const dashboardPage = new DashboardPage(page);
    const resgistrationModalPage = new RegistratormFormComponent(page);
    const navbarPage = new NavigationSideBarComponent(page);
    const frontdeskPage = new FrontdeskPatientListingPage(page);
    await page.goto(devUrl);
    console.log(user.firstName, user.lastName, user.gender, user.DOB, user.year, user.month, user.day, user.phoneNumber, user.email, user.nokEmail, user.nokRelationship, user.title, user.nokName, user.nokPhoneNumber)
      await loginPage.selectLocation();
      await page.waitForTimeout(5000);
       expect.soft(page.url()).toBe('https://dev.indigoemr.com/modules');
      await selectLocation.selectFrontDeskModule();
      await navbarPage.clickOnPatientsNavBar();
      await dashboardPage.clickRegisterPatientBtn(resgistrationModalPage.headerTextLocator)
    //check that the registration page is open
    const isOpen =await resgistrationModalPage.isModalOpen();
    expect.soft(isOpen).toBe(true);
    //select the patient's plan
    const selectPlanText =await resgistrationModalPage.selectPlan(Math.floor(Math.random() * 5) + 1);
    await resgistrationModalPage.selectTitle(user.title);
    //Enter the patient's name
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
    await resgistrationModalPage.fillNokName(user.nokName);
    //Select next of kin relationship
    await resgistrationModalPage.selectNokRelationship(user.nokRelationship);
    await resgistrationModalPage.fillNokPhoneNumber(user.nokPhoneNumber);
    await resgistrationModalPage.fillNokEmail(user.nokEmail);
    await resgistrationModalPage.clickReceivedEmail();
    await resgistrationModalPage.clickReceiveSms();
    await resgistrationModalPage.clickRegisterPatientBtn()
    await expect.soft(resgistrationModalPage.successMessageLocator).toBeVisible();
    //Check that the patient is registered successfully
    const successMessage = await resgistrationModalPage.successMessageLocator.textContent();
    expect.soft(successMessage).toContain("Patient registered successfully.");
    //Check that the patient is added to the patient listing
    const patientName = `${user.firstName} ${user.lastName}`;
    const isPatientListed = await frontdeskPage.isPatientListed(patientName);
    expect.soft(isPatientListed).toBe(true);
   
})
test('TC2.003 Test patient Registration from the frontdesk patient listing with existing patient', async ({ page, user }) => {
 const loginPage  = new LoginPage(page);
    const selectLocation = new ModuleSelectorPage(page, "Front Desk");
    const dashboardPage = new DashboardPage(page);
    const resgistrationModalPage = new RegistratormFormComponent(page);
    const navbarPage = new NavigationSideBarComponent(page);
    const frontdeskPage = new FrontdeskPatientListingPage(page);
    const transferModalPage = new TransferModalPage(page);
    await page.goto(devUrl);
    console.log(user.firstName, user.lastName, user.gender, user.DOB, user.year, user.month, user.day, user.phoneNumber, user.email, user.nokEmail, user.nokRelationship, user.title, user.nokName, user.nokPhoneNumber)
      await loginPage.selectLocation();
      await page.waitForTimeout(5000);
      // expect.soft(page.url()).toBe('https://dev.indigoemr.com/select-branch');
      await selectLocation.selectFrontDeskModule();
      await navbarPage.clickOnPatientsNavBar();
      await dashboardPage.clickRegisterPatientBtn(resgistrationModalPage.headerTextLocator)
    //check that the registration page is open
    const isOpen =await resgistrationModalPage.isModalOpen();
    expect.soft(isOpen).toBe(true);
    //select the patient's plan
    const selectPlanText =await resgistrationModalPage.selectPlan(Math.floor(Math.random() * 5) + 1);
    await resgistrationModalPage.selectTitle(user.title);
    //Enter the patient's name
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
    await resgistrationModalPage.fillNokName(user.nokName);
    //Select next of kin relationship
    await resgistrationModalPage.selectNokRelationship(user.nokRelationship);
    await resgistrationModalPage.fillNokPhoneNumber(user.nokPhoneNumber);
    await resgistrationModalPage.fillNokEmail(user.nokEmail);
    await resgistrationModalPage.clickReceivedEmail();
    await resgistrationModalPage.clickReceiveSms();
    await resgistrationModalPage.clickRegisterPatientBtn({force: true});
    await expect.soft(resgistrationModalPage.successMessageLocator).toBeVisible();
    //Check that the patient is registered successfully
    const successMessage = await resgistrationModalPage.successMessageLocator.textContent();
    expect.soft(successMessage).toContain("Patient registered successfully.");
    //Check that the patient is added to the patient listing
    const patientName = `${user.firstName} ${user.lastName}`;
    const isPatientListed = await frontdeskPage.isPatientListed(patientName);
    expect.soft(isPatientListed).toBe(true);
    await page.waitForTimeout(5000);
    //Check that the patient transfer modal is open
    const isTransferModalOpen = await transferModalPage.isModalOpen();
    expect.soft(isTransferModalOpen).toBe(true);
    await page.reload();
    //Close the patient transfer modal
   // await transferModalPage.closeModalAndReturnToListing();
    //Register the same patient with the same details
    await frontdeskPage.openRegistrationForm();
    await resgistrationModalPage.selectPlan(Math.floor(Math.random() * 5) + 1);
    await resgistrationModalPage.selectTitle(user.title);
    //Enter the patient's name
    await resgistrationModalPage.fillGivenName(user.firstName);
    await resgistrationModalPage.fillLastName(user.lastName);
    await resgistrationModalPage.selectGender()
    await resgistrationModalPage.fillDOB(user.year, user.month.toString(), user.day  );
    await resgistrationModalPage.fillPhoneNumber(user.phoneNumber);
    await resgistrationModalPage.fillEmail();
    await resgistrationModalPage.fillLocation();
    await dashboardPage.clickOnSupportCloseIcon();
    //await resgistrationModalPage.selectConsultant()
    await resgistrationModalPage.fillExactLocation();
    //Click on the submit button
    await resgistrationModalPage.clickRegisterPatientBtn();
    await page.waitForTimeout(5000);
    //Verify that the phone number error message is visible
    const isPhoneNoErrorMessage = await resgistrationModalPage.isPhoneNoErrorMessageVisible();
    expect.soft(isPhoneNoErrorMessage).toContain("already");

})
test('TC2.004 Test patient Registration from the frontdesk patient listing with existing patient with family tag', async ({ page, user }) => {
const loginPage  = new LoginPage(page);
    const selectLocation = new ModuleSelectorPage(page, "Front Desk");
    const dashboardPage = new DashboardPage(page);
    const resgistrationModalPage = new RegistratormFormComponent(page);
    const navbarPage = new NavigationSideBarComponent(page);
    const frontdeskPage = new FrontdeskPatientListingPage(page);
    const transferModalPage = new TransferModalPage(page);
    await page.goto(devUrl);
    console.log(user.firstName, user.lastName, user.gender, user.DOB, user.year, user.month, user.day, user.phoneNumber, user.email, user.nokEmail, user.nokRelationship, user.title, user.nokName, user.nokPhoneNumber)
      await loginPage.selectLocation();
      //await page.waitForTimeout(5000);
      // expect.soft(page.url()).toBe('https://dev.indigoemr.com/select-branch');
      await selectLocation.selectFrontDeskModule();
      await navbarPage.clickOnPatientsNavBar();
      await frontdeskPage.clickRegisterPatientBtn()
    //check that the registration page is open
    const isOpen =await resgistrationModalPage.isModalOpen();
    expect.soft(isOpen).toBe(true);
    //select the patient's plan
    const selectPlanText =await resgistrationModalPage.selectPlan(Math.floor(Math.random() * 5) + 1);
    await resgistrationModalPage.selectTitle(user.title);
    await resgistrationModalPage.selectFamilyTag();
    //Enter the patient's name
    await resgistrationModalPage.fillGivenName(user.firstName);
    await resgistrationModalPage.fillLastName(user.lastName);
    //Check the gender ration button
    await resgistrationModalPage.selectGender()
    await resgistrationModalPage.fillDOB(user.year, user.month.toString(), user.day  );
    await resgistrationModalPage.fillPhoneNumber(user.phoneNumber);
    await resgistrationModalPage.fillEmail();
    await resgistrationModalPage.fillLocation();
    await dashboardPage.clickOnSupportCloseIcon();
    //await resgistrationModalPage.selectConsultant()
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
   // await resgistrationModalPage.clickNokHeader();
    //await resgistrationModalPage.fillNokName(user.nokName);
    //Select next of kin relationship
    //await resgistrationModalPage.selectNokRelationship(user.nokRelationship);
    //await resgistrationModalPage.fillNokPhoneNumber(user.nokPhoneNumber);
   // await resgistrationModalPage.fillNokEmail(user.nokEmail);
    //await resgistrationModalPage.clickReceivedEmail();
    //await resgistrationModalPage.clickReceiveSms();
    await resgistrationModalPage.clickRegisterPatientBtn({force: true});
    await expect.soft(resgistrationModalPage.successMessageLocator).toBeVisible();
    //Check that the patient is registered successfully
    const successMessage = await resgistrationModalPage.successMessageLocator.textContent();
    expect.soft(successMessage).toContain("Patient registered successfully.");
    //Check that the patient is added to the patient listing
    const patientName = `${user.firstName} ${user.lastName}`;
    const isPatientListed = await frontdeskPage.isPatientListed(patientName);
    expect.soft(isPatientListed).toBe(true);
    await page.waitForTimeout(5000);
    //Check that the patient transfer modal is open
    const isTransferModalOpen = await transferModalPage.isModalOpen();
    expect.soft(isTransferModalOpen).toBe(true);
    await page.reload();
    //Close the patient transfer modal
   // await transferModalPage.closeModalAndReturnToListing();
    //Register the same patient with the same details
    await frontdeskPage.openRegistrationForm();
    await resgistrationModalPage.selectPlan(Math.floor(Math.random() * 5) + 1);
    await resgistrationModalPage.selectTitle(user.title);
    //Enter the patient's name
    await resgistrationModalPage.fillGivenName(user.firstName1);
    await resgistrationModalPage.fillLastName(user.lastName1);
    await resgistrationModalPage.selectGender()
    await resgistrationModalPage.fillDOB(user.year, user.month.toString(), user.day  );
    await resgistrationModalPage.fillPhoneNumber(user.phoneNumber);
    await resgistrationModalPage.fillEmail();
    await resgistrationModalPage.fillLocation();
    await dashboardPage.clickOnSupportCloseIcon();
   // await resgistrationModalPage.selectConsultant()
    await resgistrationModalPage.fillExactLocation();
    //Click on the submit button
    await resgistrationModalPage.clickRegisterPatientBtn();
     await resgistrationModalPage.clickRegisterPatientBtn({force: true});
    await expect.soft(resgistrationModalPage.successMessageLocator).toBeVisible();
    //Check that the patient is registered successfully
    const successMessage1 = await resgistrationModalPage.successMessageLocator.textContent();
    expect.soft(successMessage1).toContain("Patient registered successfully.");
    //Check that the patient is added to the patient listing
    const patientName1 = `${user.firstName1} ${user.lastName1}`;
    const isPatient1Listed = await frontdeskPage.isPatientListed(patientName1);
    expect.soft(isPatient1Listed).toBe(true);

  })
test('TC2.005 Test patient Registration from the frontdesk patient listing with new appointment', async ({ page, user }) => {
  const loginPage  = new LoginPage(page);
    const selectLocation = new ModuleSelectorPage(page, "Front Desk");
    const dashboardPage = new DashboardPage(page);
    const resgistrationModalPage = new RegistratormFormComponent(page);
    const navbarPage = new NavigationSideBarComponent(page);
    const frontdeskPage = new FrontdeskPatientListingPage(page);
    const transferModalPage = new TransferModalPage(page);
    await page.goto(devUrl);
    console.log(user.firstName, user.lastName, user.gender, user.DOB, user.year, user.month, user.day, user.phoneNumber, user.email, user.nokEmail, user.nokRelationship, user.title, user.nokName, user.nokPhoneNumber)
      await loginPage.selectLocation();
      await page.waitForTimeout(5000);
     //  expect.soft(page.url()).toBe('https://dev.indigoemr.com/select-branch');
      await selectLocation.selectFrontDeskModule();
      await navbarPage.clickOnPatientsNavBar();
      await frontdeskPage.clickRegisterPatientBtn()
    //check that the registration page is open
    const isOpen =await resgistrationModalPage.isModalOpen();
    expect.soft(isOpen).toBe(true);
    //select the patient's plan
    const selectPlanText =await resgistrationModalPage.selectPlan(Math.floor(Math.random() * 5) + 1);
    await resgistrationModalPage.selectTitle(user.title);
    //Enter the patient's name
    await resgistrationModalPage.fillGivenName(user.firstName);
    await resgistrationModalPage.fillLastName(user.lastName);
    //Check the gender ration button
    await resgistrationModalPage.selectGender()
    await resgistrationModalPage.fillDOB(user.year, user.month.toString(), user.day  );
    await resgistrationModalPage.fillPhoneNumber(user.phoneNumber);
    await resgistrationModalPage.fillEmail();
    await resgistrationModalPage.fillLocation();
    await dashboardPage.clickOnSupportCloseIcon();
    //await resgistrationModalPage.selectConsultant()
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
    await resgistrationModalPage.fillNokName(user.nokName);
    //Select next of kin relationship
    await resgistrationModalPage.selectNokRelationship(user.nokRelationship);
    await resgistrationModalPage.fillNokPhoneNumber(user.nokPhoneNumber);
    await resgistrationModalPage.fillNokEmail(user.nokEmail);
    await resgistrationModalPage.clickReceivedEmail();
    await resgistrationModalPage.clickReceiveSms();
    await resgistrationModalPage.clickRegisterPatientBtn()
    await expect.soft(resgistrationModalPage.successMessageLocator).toBeVisible();
    //Check that the patient is registered successfully
    const successMessage = await resgistrationModalPage.successMessageLocator.textContent();
    expect.soft(successMessage).toContain("Patient registered successfully.");
    //Check that the patient is added to the patient listing
    const patientName = `${user.firstName} ${user.lastName}`;
    const isPatientListed = await frontdeskPage.isPatientListed(patientName);
    expect.soft(isPatientListed).toBe(true);
    //check that the transfer modal is open
    const isTransferModalOpen = await transferModalPage.isModalOpen();
    expect.soft(isTransferModalOpen).toBe(true);
    //transfer the patient to a new appointment
    await transferModalPage.clickOnConsultant();
    await transferModalPage.selectTimeSlot();
    await transferModalPage.selectReason();
    await transferModalPage.clickSubmitBtn();
     await page.waitForLoadState('networkidle');
      await page.waitForTimeout(10000);
      //verify that the success toast is visible
      const isSuccessToastVisible = await frontdeskPage.isSuccessToastVisible();
     expect.soft(isSuccessToastVisible).toBeTruthy();
     //check if modal is still open and then close it
     await transferModalPage.clickCloseBtn();

})
test('TC2.006 Test patient Registration from the frontdesk dashboard with new appointment', async ({ page, user }) => {
  const loginPage  = new LoginPage(page);
    const selectLocation = new ModuleSelectorPage(page, "Front Desk");
    const dashboardPage = new DashboardPage(page);
    const resgistrationModalPage = new RegistratormFormComponent(page);
    const transferModalPage = new TransferModalPage(page);
    const patientListing = new FrontdeskPatientListingPage(page);
    await page.goto(devUrl);
    console.log(user.firstName, user.lastName, user.gender, user.DOB, user.year, user.month, user.day, user.phoneNumber, user.email, user.nokEmail, user.nokRelationship, user.title, user.nokName)
      await loginPage.selectLocation();
      await page.waitForTimeout(5000);
     //  expect.soft(page.url()).toBe('https://dev.indigoemr.com/select-branch');
      await selectLocation.selectFrontDeskModule();
   // await dashboardPage.clcikOnSurportCloseIcon();
    await dashboardPage.clickRegisterPatientBtn(resgistrationModalPage.registrationModalHeaderLocator)
    //check that the registration page is open
    const isOpen =await resgistrationModalPage.isModalOpen();
    expect.soft(isOpen).toBe(true);
    //select the patient's plan
    const selectPlanText =await resgistrationModalPage.selectPlan(Math.floor(Math.random() * 5) + 1);
    await resgistrationModalPage.selectTitle(user.title);
    //Enter the patient's name
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
    await resgistrationModalPage.fillNokName(user.nokName);
    //Select next of kin relationship
    await resgistrationModalPage.selectNokRelationship(user.nokRelationship);
    await resgistrationModalPage.fillNokPhoneNumber(user.nokPhoneNumber);
    await resgistrationModalPage.fillNokEmail(user.nokEmail);
    await resgistrationModalPage.clickReceivedEmail();
    await resgistrationModalPage.clickReceiveSms();
    await resgistrationModalPage.clickRegisterPatientBtn()
    await expect.soft(resgistrationModalPage.successMessageLocator).toBeVisible();
    //Check that the patient is registered successfully
    const successMessage = await resgistrationModalPage.successMessageLocator.textContent();
    expect.soft(successMessage).toContain("Patient registered successfully.");
    //check that the transfer modal is open
    const isTransferModalOpen = await transferModalPage.isModalOpen();
    expect.soft(isTransferModalOpen).toBe(true);
    //transfer the patient to a new appointment
    await transferModalPage.clickOnConsultant();
    await transferModalPage.selectTimeSlot();
    await transferModalPage.selectReason();
    await transferModalPage.clickSubmitBtn();
     await page.waitForLoadState('networkidle');
      await page.waitForTimeout(10000);
      //verify that the success toast is visible
      const isSuccessToastVisible = await patientListing.isSuccessToastVisible();
     expect.soft(isSuccessToastVisible).toBeTruthy();
     //check if modal is still open and then close it
     await transferModalPage.clickCloseBtn();

})
test('TC2.007 Test patient Registration from the inpatient admission form', async ({ page, user }) => {
  const loginPage  = new LoginPage(page);
    const selectLocation = new ModuleSelectorPage(page, "Front Desk");
    const dashboardPage = new InpatientDashboardPage(page);
    const resgistrationModalPage = new RegistratormFormComponent(page);
    const admissionFormModal = new AdmissionFormModal(page);
    await page.goto(devUrl);
    console.log(user.firstName, user.lastName, user.gender, user.DOB, user.year, user.month, user.day, user.phoneNumber, user.email, user.nokEmail, user.nokRelationship, user.title, user.nokName)
      await loginPage.selectLocation();
      await page.waitForTimeout(5000);
     //  expect.soft(page.url()).toBe('https://dev.indigoemr.com/select-branch');
      await selectLocation.selectInpatientModule();
      await dashboardPage.clickAdmitPatientBtn(admissionFormModal.headerTextLocator);
    //check that the admission form modal is open
    const isOpen =await admissionFormModal.isAdmissionFormModalVisible();
    expect.soft(isOpen).toBe(true);
    await admissionFormModal.clickRegisterANewPatientBtn();
    //check that the registration page is open
    const isRegistrationOpen =await resgistrationModalPage.isModalOpen();
    expect.soft(isRegistrationOpen).toBe(true);
    //select the patient's plan $
    const selectPlanText =await resgistrationModalPage.selectInaptientPaln(Math.floor(Math.random() * 5) + 1);
    await resgistrationModalPage.selectTitle(user.title);
    //Enter the patient's name
    await resgistrationModalPage.fillGivenName(user.firstName);
    await resgistrationModalPage.fillLastName(user.lastName);
    //Check the gender ration button
    await resgistrationModalPage.selectGender()
    await resgistrationModalPage.fillDOB(user.year, user.month.toString(), user.day  );
    await resgistrationModalPage.fillPhoneNumber(user.phoneNumber);
    await resgistrationModalPage.fillEmail();
    await resgistrationModalPage.fillLocation();
await resgistrationModalPage.clickRegisterPatientBtn()
  await expect.soft(resgistrationModalPage.successMessageLocator).toBeVisible();
    //Check that the patient is registered successfully
    const successMessage = await resgistrationModalPage.successMessageLocator.textContent();
    expect.soft(successMessage).toContain("Patient registered successfully.");
})
test('TC2.008 Test patient Registration from the pharmacy sell item- precription item', async ({ page, user }) => {
  const loginPage  = new LoginPage(page);
    const selectLocation = new ModuleSelectorPage(page, "Front Desk");
    const dashboardPage = new InpatientDashboardPage(page);
    const resgistrationModalPage = new RegistratormFormComponent(page);
    const prescriptionModalPage = new PrescriptionModalPage(page);
    const pharmDashboard = new PharmarcyDashbordPage(page);
    const frontDashboardePage = new DashboardPage(page);
    const admissionFormModal = new AdmissionFormModal(page);
    await page.goto(devUrl);
    console.log(user.firstName, user.lastName, user.gender, user.DOB, user.year, user.month, user.day, user.phoneNumber, user.email, user.nokEmail, user.nokRelationship, user.title, user.nokName)
      await loginPage.selectLocation();
      await page.waitForTimeout(5000);
    //   expect.soft(page.url()).toBe('https://dev.indigoemr.com/select-branch');
    await selectLocation.selectPharmacyModule();
    //click on the prescription item sell button
    await pharmDashboard.clickToSellPrescriptionItem();
    await prescriptionModalPage.verifyPrescriptionModal();
    await prescriptionModalPage.clickRegisterANewPatientBtn();
   
    //check that the registration page is open
    const isRegistrationOpen =await resgistrationModalPage.isModalOpen();
    expect.soft(isRegistrationOpen).toBe(true);
    //select the patient's plan $
    const selectPlanText =await resgistrationModalPage.selectPlan();
    await resgistrationModalPage.selectTitle(user.title);
    //Enter the patient's name
    await resgistrationModalPage.fillGivenName(user.firstName);
    await resgistrationModalPage.fillLastName(user.lastName); 
    await resgistrationModalPage.selectGender();
    await frontDashboardePage.clickOnSupportCloseIcon();
    await resgistrationModalPage.fillDOB(user.year, user.month.toString(), user.day  );
    await resgistrationModalPage.fillPhoneNumber(user.phoneNumber);
    await resgistrationModalPage.fillEmail();
    await resgistrationModalPage.fillLocation();
await resgistrationModalPage.clickRegisterPatientBtn()
  await expect.soft(resgistrationModalPage.successMessageLocator).toBeVisible();
    //Check that the patient is registered successfully
    const successMessage = await resgistrationModalPage.successMessageLocator.textContent();
    expect.soft(successMessage).toContain("Patient registered successfully.");

})
test.skip("TC2.009 Test patient Registration from the pharmacy sell item- retail item", async ({ page, user }) => {
})