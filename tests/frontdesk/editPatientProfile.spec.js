//1. Edit and Save Patient Profile Successfully
/*
Precondition: Patient profile exists.

Steps:
Navigate to Patient Details → Profile Details.
Click Edit.
Update fields (e.g., Address, Email, Phone Number).
Click Update Profile.
Expected Result: Profile updates are saved, success message displayed, updated values reflected in the profile.


2. Undo Edit Action
Steps:
Click Edit.
Modify patient information.
Click Undo Edit.
Expected Result: All changes are discarded, fields revert to the original values.

3.   Mandatory Fields Validation
Steps:
Click Edit.
Leave mandatory fields (e.g., Name, Email) empty.
Click Update Profile.
Expected Result: Error messages are displayed for mandatory fields, and profile is not updated.

4. Invalid Email Address Format
Steps:
Click Edit.
Enter an invalid email format (e.g., "invalidemail.com").
Click Update Profile.
Expected Result: Error message indicating invalid email format is displayed, and profile is not updated.

5. Phone Number Format Validation
Steps:
Click Edit.
Enter an invalid phone number (e.g., "12345").
Click Update Profile.
Expected Result: Error message indicating invalid phone number format is displayed, and profile is not updated.

6. Next of Kin Details Update
Steps:
Click Edit.
Update Next of Kin details (e.g., Name, Relationship, Phone Number).
Click Update Profile.
Expected Result: Next of Kin details are updated successfully, and a success message is displayed.

7. Preferred Consultant Selection
Steps:
Click Edit.
Select a Preferred Consultant from the dropdown.
Click Update Profile.
Expected Result: Preferred Consultant is updated successfully, and a success message is displayed.

8. Communication Preferences Update
Steps:
Click Edit.
Change communication preferences (e.g., Email, SMS).
Click Update Profile.
Expected Result: Communication preferences are updated successfully, and a success message is displayed.

9. Check Data Persistence after relogin
Steps:
Click Edit.
Update any field (e.g., Address, Email).
Click Update Profile.
Logout and log back in.
Expected Result: Updated profile information is still displayed correctly.

10. HMO / Corporate Details Update
Steps:
Click Edit.
Update HMO / Corporate details (e.g., Name, Policy Number).
Click Update Profile.
Expected Result: HMO / Corporate details are updated successfully, and a success message is displayed.

11. All data are fatched fromt the backend
Steps:
Navigate to Patient Details → Profile Details.
Expected Result: All profile data is correctly fetched and displayed from the backend.  


*/

import  { expect } from "@playwright/test";
import {test} from "../../fixture/fixture-loader";
import { LoginPage } from "../../pages/loginPage";
import { DashboardPage } from "../../pages/frontdesk/dashboardPage";
import { NavigationSideBarComponent } from "../../pages/navigationSideBarComponet";
import { ModuleSelectorPage } from "../../pages/moduleSelectorPage";
import { FrontdeskPatientListingPage } from "../../pages/frontdesk/frontdeskListingPage";
import { TransferModalPage } from "../../pages/frontdesk/transferModalPage";
import { AppointmentModalPage } from "../../pages/frontdesk/appointmentModalPage";
import { PatientDetailsPage } from "../../pages/frontdesk/patientDetailsPage";
import { EditPatientProfilePage } from "../../pages/frontdesk/editPatientProfilePage";
const devUrl = "https://dev.indigoemr.com/login";





test('TC 6.001 Edit and Save Patient Profile Successfully', async ({ page, user }) => {
     const loginPage = new LoginPage(page);
        const selectLocation = new ModuleSelectorPage(page, "Front Desk");
        const navbar = new NavigationSideBarComponent(page);
        const patientListing = new FrontdeskPatientListingPage(page);
        const patientDetailsPage = new PatientDetailsPage(page);
        const dashboardPage = new DashboardPage(page);
        const appointmentModalPage = new AppointmentModalPage(page);
        const editPatientProfile = new EditPatientProfilePage(page);
        
        await page.goto(devUrl);
          await loginPage.selectLocation();
          await page.waitForURL('**/modules');
           expect.soft(page.url()).toBe('https://dev.indigoemr.com/modules');
          await selectLocation.selectFrontDeskModule();
          //navigate to the listing page
          await navbar.clickOnPatientsNavBar()
          await patientListing.clickPatientLink(2);
           expect.soft(patientDetailsPage.verifyPatientDetailsPage).toBeTruthy();
          await patientDetailsPage.clickEditProfileBtn();
           expect.soft(editPatientProfile.verifyEditPatientProfilePage()).toBeTruthy();
           const updatedGivenName =   await editPatientProfile.updateGivenName(user.firstName);
           const updatedLastName =   await editPatientProfile.updateLastName(user.lastName);
           const updatedEmail =   await editPatientProfile.updateEmail(user.email);
           const updatedPhoneNumber =   await editPatientProfile.updatePhoneNumber(user.phoneNumber);
          // editPatientProfile.updatePatientProfile(user.firstName, user.lastName, user.email, user.phoneNumber, user.address);
          await editPatientProfile.clickUpdateProfileBtn();
          const isSuccessMessageVisible = await  editPatientProfile.isSuccessMessageVisible();
          expect.soft(isSuccessMessageVisible).toContain("updated");
          const updatedPatientProfileDetails =  await patientDetailsPage.getPatientProfileDetails();

           expect.soft(updatedPatientProfileDetails.givenName).toBe(updatedGivenName);
           expect.soft(updatedPatientProfileDetails.lastName).toBe(updatedLastName);
           expect.soft(updatedPatientProfileDetails.email).toBe(updatedEmail);
           expect.soft(updatedPatientProfileDetails.phoneNumber).toBe(updatedPhoneNumber.replace(/\D/g, ''));
           

}

/*
          await patientDetailsPage.updatePatientProfile();
          await patientDetailsPage.clickUpdateProfileBtn();
          await expect.soft(patientDetailsPage.isSuccessMessageVisible()).toBeTruthy();
          await expect.soft(patientDetailsPage.getUpdatedAddress()).toBe("New Address 123");
          await expect.soft(patientDetailsPage.getUpdatedEmail()).toBe("newemail@example.com");

          */
)

test('TC 6.002 Undo Edit Action', async ({ page, user }) => {
    // Test implementation for Undo Edit Action
     const loginPage = new LoginPage(page);
        const selectLocation = new ModuleSelectorPage(page, "Front Desk");
        const navbar = new NavigationSideBarComponent(page);
        const patientListing = new FrontdeskPatientListingPage(page);
        const patientDetailsPage = new PatientDetailsPage(page);
        const dashboardPage = new DashboardPage(page);
        const appointmentModalPage = new AppointmentModalPage(page);
        const editPatientProfile = new EditPatientProfilePage(page);
        
        await page.goto(devUrl);
          await loginPage.selectLocation();
          await page.waitForURL('**/modules');
           expect.soft(page.url()).toBe('https://dev.indigoemr.com/modules');
          await selectLocation.selectFrontDeskModule();
          //navigate to the listing page
          await navbar.clickOnPatientsNavBar()
          await patientListing.clickPatientLink(2);
           expect.soft(patientDetailsPage.verifyPatientDetailsPage).toBeTruthy();
           const initialPatientProfileDetails = await patientDetailsPage.getPatientProfileDetails();
          await patientDetailsPage.clickEditProfileBtn();
           expect.soft(editPatientProfile.verifyEditPatientProfilePage()).toBeTruthy();
           const updatedGivenName =   await editPatientProfile.updateGivenName(user.firstName);
           const updatedLastName =   await editPatientProfile.updateLastName(user.lastName);
           const updatedEmail =   await editPatientProfile.updateEmail(user.email);
           const updatedPhoneNumber =   await editPatientProfile.updatePhoneNumber(user.phoneNumber);
          // editPatientProfile.updatePatientProfile(user.firstName, user.lastName, user.email, user.phoneNumber, user.address);
          await editPatientProfile.clickUndoEditBtn();
          //const isSuccessMessageVisible = await  editPatientProfile.isSuccessMessageVisible();
          //)expect.soft(isSuccessMessageVisible).toContain("updated");
          const updatedPatientProfileDetails =  await patientDetailsPage.getPatientProfileDetails();

           expect.soft(updatedPatientProfileDetails.givenName).toBe(initialPatientProfileDetails.givenName);
           expect.soft(updatedPatientProfileDetails.lastName).toBe(initialPatientProfileDetails.lastName);
           expect.soft(updatedPatientProfileDetails.email).toBe(initialPatientProfileDetails.email);
           expect.soft(updatedPatientProfileDetails.phoneNumber).toBe(initialPatientProfileDetails.phoneNumber.replace(/\D/g, ''));
           

})
test('TC 6.003 Mandatory Fields Validation', async ({ page, user }) => {
    // Test implementation for Mandatory Fields Validation
    const selectLocation = new ModuleSelectorPage(page, "Front Desk");
        const navbar = new NavigationSideBarComponent(page);
        const patientListing = new FrontdeskPatientListingPage(page);
        const patientDetailsPage = new PatientDetailsPage(page);
        const dashboardPage = new DashboardPage(page);
        const appointmentModalPage = new AppointmentModalPage(page);
        const editPatientProfile = new EditPatientProfilePage(page);
        const loginPage = new LoginPage(page);
        
        await page.goto(devUrl);
          await loginPage.selectLocation();
          await page.waitForURL('**/modules');
           expect.soft(page.url()).toBe('https://dev.indigoemr.com/modules');
          await selectLocation.selectFrontDeskModule();
          //navigate to the listing page
          await navbar.clickOnPatientsNavBar()
          await patientListing.clickPatientLink(2);
           expect.soft(patientDetailsPage.verifyPatientDetailsPage).toBeTruthy();
          await patientDetailsPage.clickEditProfileBtn();
           expect.soft(editPatientProfile.verifyEditPatientProfilePage()).toBeTruthy();
           const updatedGivenName =   await editPatientProfile.updateGivenName("");
           await editPatientProfile.clickUpdateProfileBtn()
           const alertMessage =await editPatientProfile.getAlertMessage();
            expect.soft(alertMessage).toContain("givenName");
            console.log("Alert message: " + alertMessage);
            await editPatientProfile.clickCloseBtn();
            await editPatientProfile.updateGivenName(user.firstName);
            await editPatientProfile.updateLastName("");
            await editPatientProfile.clickUpdateProfileBtn()
           const alertMessage1 =await editPatientProfile.getAlertMessage();
            expect.soft(alertMessage1).toContain("lastName");
            console.log("Alert message: " + alertMessage1);
            await editPatientProfile.clickCloseBtn();


})
test('TC 6.004 Invalid Email Address Format', async ({ page, user }) => {
    // Test implementation for Invalid Email Address Format

     const selectLocation = new ModuleSelectorPage(page, "Front Desk");
        const navbar = new NavigationSideBarComponent(page);
        const patientListing = new FrontdeskPatientListingPage(page);
        const patientDetailsPage = new PatientDetailsPage(page);
        const dashboardPage = new DashboardPage(page);
        const appointmentModalPage = new AppointmentModalPage(page);
        const editPatientProfile = new EditPatientProfilePage(page);
        const loginPage = new LoginPage(page);
        
        await page.goto(devUrl);
          await loginPage.selectLocation();
          await page.waitForURL('**/modules');
           expect.soft(page.url()).toBe('https://dev.indigoemr.com/modules');
          await selectLocation.selectFrontDeskModule();
          //navigate to the listing page
          await navbar.clickOnPatientsNavBar()
          await patientListing.clickPatientLink(2);
           expect.soft(patientDetailsPage.verifyPatientDetailsPage).toBeTruthy();
          await patientDetailsPage.clickEditProfileBtn();
           expect.soft(editPatientProfile.verifyEditPatientProfilePage()).toBeTruthy();
           const updatedGivenName =   await editPatientProfile.updateEmail("adeolu@gmail");
           await expect.soft(editPatientProfile.invalidEmailMessageLocator).toBeVisible();
           await expect.soft(editPatientProfile.updateProfileBtnLocator).toBeDisabled();
          
})
test('TC 6.005 Phone Number Format Validation', async ({ page, user }) => {
    // Test implementation for Phone Number Format Validation
})
test('TC 6.006 Next of Kin Details Update', async ({ page, user }) => {
    // Test implementation for Next of Kin Details Update
        const loginPage = new LoginPage(page);
        const selectLocation = new ModuleSelectorPage(page, "Front Desk");
        const navbar = new NavigationSideBarComponent(page);
        const patientListing = new FrontdeskPatientListingPage(page);
        const patientDetailsPage = new PatientDetailsPage(page);
        const dashboardPage = new DashboardPage(page);
        const appointmentModalPage = new AppointmentModalPage(page);
        const editPatientProfile = new EditPatientProfilePage(page);
        
        await page.goto(devUrl);
          await loginPage.selectLocation();
          await page.waitForURL('**/modules');
           expect.soft(page.url()).toBe('https://dev.indigoemr.com/modules');
          await selectLocation.selectFrontDeskModule();
          //navigate to the listing page
          await navbar.clickOnPatientsNavBar()
          await patientListing.clickPatientLink(2);
           expect.soft(patientDetailsPage.verifyPatientDetailsPage).toBeTruthy();
          await patientDetailsPage.clickEditProfileBtn();
           expect.soft(editPatientProfile.verifyEditPatientProfilePage()).toBeTruthy();
           await editPatientProfile.updateNokDetails(user.nokName,  user.nokEmail, user.nokRelationship);
           
          await editPatientProfile.clickUpdateProfileBtn();
          const isSuccessMessageVisible = await  editPatientProfile.isSuccessMessageVisible();
          expect.soft(isSuccessMessageVisible).toContain("updated");
          const updatedPatientProfileDetails =  await patientDetailsPage.getPatientProfileDetails();

           expect.soft(updatedPatientProfileDetails.noKName).toBe(user.nokName);
        //    expect.soft(updatedPatientProfileDetails.noKPhone).toBe(user.nokPhoneNumber.replace(/\D/g, ''));
           expect.soft(updatedPatientProfileDetails.nokEmail).toBe(user.nokEmail);
           expect.soft(updatedPatientProfileDetails.relationship).toBe(user.nokRelationship);

})
test('TC 6.007 Preferred Consultant Selection', async ({ page, user }) => {
    // Test implementation for Preferred Consultant selection
    const loginPage = new LoginPage(page);
        const selectLocation = new ModuleSelectorPage(page, "Front Desk");
        const navbar = new NavigationSideBarComponent(page);
        const patientListing = new FrontdeskPatientListingPage(page);
        const patientDetailsPage = new PatientDetailsPage(page);
        const dashboardPage = new DashboardPage(page);
        const appointmentModalPage = new AppointmentModalPage(page);
        const editPatientProfile = new EditPatientProfilePage(page);
        
        await page.goto(devUrl);
          await loginPage.selectLocation();
          await page.waitForURL('**/modules');
           expect.soft(page.url()).toBe('https://dev.indigoemr.com/modules');
          await selectLocation.selectFrontDeskModule();
          //navigate to the listing page
          await navbar.clickOnPatientsNavBar()
          await patientListing.clickPatientLink(2);
           expect.soft(patientDetailsPage.verifyPatientDetailsPage).toBeTruthy();
          const patientDetails = await patientDetailsPage.getPatientProfileDetails();
          console.log("Preferred Consultant before update: " + patientDetails.prefferedConsultant); 
          await patientDetailsPage.clickEditProfileBtn();
           expect.soft(editPatientProfile.verifyEditPatientProfilePage()).toBeTruthy();
           const prefferedConsultant =await editPatientProfile.updatePrefferedConsultant();
          await editPatientProfile.clickUpdateProfileBtn();
          const isSuccessMessageVisible = await  editPatientProfile.isSuccessMessageVisible();
          expect.soft(isSuccessMessageVisible).toContain("updated");
          const updatedPatientProfileDetails =  await patientDetailsPage.getPatientProfileDetails();

           expect.soft(updatedPatientProfileDetails.prefferedConsultant).toBe(prefferedConsultant);
           

    
})
test('TC 6.008 Communication Preferences Update', async ({ page, user }) => {
    // Test implementation for Communication Preferences Update
    const loginPage = new LoginPage(page);
        const selectLocation = new ModuleSelectorPage(page, "Front Desk");
        const navbar = new NavigationSideBarComponent(page);
        const patientListing = new FrontdeskPatientListingPage(page);
        const patientDetailsPage = new PatientDetailsPage(page);
        const dashboardPage = new DashboardPage(page);
        const appointmentModalPage = new AppointmentModalPage(page);
        const editPatientProfile = new EditPatientProfilePage(page);
        
        await page.goto(devUrl);
          await loginPage.selectLocation();
          await page.waitForURL('**/modules');
           expect.soft(page.url()).toBe('https://dev.indigoemr.com/modules');
          await selectLocation.selectFrontDeskModule();
          //navigate to the listing page
          await navbar.clickOnPatientsNavBar()
          await patientListing.clickPatientLink(2);
           expect.soft(patientDetailsPage.verifyPatientDetailsPage).toBeTruthy();
          const patientDetails = await patientDetailsPage.getPatientProfileDetails();
          console.log("SMS Consent before update: " + patientDetails.smsConsent?.valueOf() || "false");
          console.log("Email Consent before update: " + patientDetails.emailConsent?.valueOf() || "false");
          await patientDetailsPage.clickEditProfileBtn();
           expect.soft(editPatientProfile.verifyEditPatientProfilePage()).toBeTruthy();
           
        await editPatientProfile.toggleEmailConsent();
        await editPatientProfile.toggleSmsConsent();
          await editPatientProfile.clickUpdateProfileBtn();
          const isSuccessMessageVisible = await  editPatientProfile.isSuccessMessageVisible();
          expect.soft(isSuccessMessageVisible).toContain("updated");
          const updatedPatientProfileDetails =  await patientDetailsPage.getPatientProfileDetails();

           expect.soft(updatedPatientProfileDetails.smsConsent).toBe(patientDetails.smsConsent === false ? true : false);
           expect.soft(updatedPatientProfileDetails.emailConsent).toBe(patientDetails.emailConsent === false ? true : false);
           

})
