import  { expect, request } from "@playwright/test";
import { LoginPage } from "../../pages/loginPage";
import { test } from "../../fixture/fixture-loader";
import { ModuleSelectorPage } from "../../pages/moduleSelectorPage";
import { DashboardPage } from "../../pages/frontdesk/dashboardPage";
import { AppointmentModalPage } from "../../pages/frontdesk/appointmentModalPage";
import { PatientDetailsPage } from "../../pages/frontdesk/patientDetailsPage";
import { NavigationSideBarComponent } from "../../pages/navigationSideBarComponet";
import { FrontdeskPatientListingPage } from "../../pages/frontdesk/frontdeskListingPage";
import { TransferModalPage } from "../../pages/frontdesk/transferModalPage";
import { formatTimeRange, getDateParts } from "../../utils/dateutils";
const { CheckoutPatientPage } = require("../../pages/frontdesk/checkoutPatientPage");
const devUrl = 'https://dev.indigoemr.com';


test("TC1.001 Quick book with valid data GP appointmnent dashboard", async ({page}) => {
    const loginPage  = new LoginPage(page);
    const selectLocation = new ModuleSelectorPage(page, "Front Desk");
    const dashboardPage = new DashboardPage(page);
    const appointmentModalPage = new AppointmentModalPage(page);
    await page.goto(devUrl);
     await loginPage.selectLocation();
     await page.waitForTimeout(5000);
     // expect(page.url()).toBe('https://dev.indigoemr.com/modules');
     await selectLocation.selectFrontDeskModule();
      await dashboardPage.clickQuickBookAppointmentBtn();
      await dashboardPage.clickOnSupportCloseIcon();
      const headerText=await appointmentModalPage.getModalHeaderText(); 
       expect(headerText).toBe("Book Appointment")
      await appointmentModalPage.fillMrnField("1234567890");
      await appointmentModalPage.selectMrnSuggestion();
      const patientName = await appointmentModalPage.getPatientName();
      await appointmentModalPage.selectSpeciality("GP");
      await appointmentModalPage.selectTime(0);
      await dashboardPage.clickOnSupportCloseIcon();
      await appointmentModalPage.selectReasonForVisit();
      //Get consultantion fee
      const consultationFee = await appointmentModalPage.getConsultationFee();
      console.log("Consultation Fee: ", consultationFee);
      
      await appointmentModalPage.clickBookAppointmentBtn();
      // Verify that the appointment was successfully booked
      const notificationMessage =await dashboardPage.getAppointmentNotificationText();
       expect(notificationMessage).toContain("New Appointment");

      await page.waitForTimeout(5000);
    
})
test("TC1.002 Quick book with missing mandatory fields GP appointment => dashboard", async ({ page }) => {
    const loginPage  = new LoginPage(page);
    const selectLocation = new ModuleSelectorPage(page, "Front Desk");
    const dashboardPage = new DashboardPage(page);
    const appointmentModalPage = new AppointmentModalPage(page);
    await page.goto(devUrl);
      await loginPage.selectLocation();
      await page.waitForTimeout(5000);
      // expect(page.url()).toBe('https://dev.indigoemr.com/modules');
      await selectLocation.selectFrontDeskModule();
            await dashboardPage.clickOnSupportCloseIcon();

      await dashboardPage.clickQuickBookAppointmentBtn();
      const headerText=await appointmentModalPage.getModalHeaderText(); 
       expect(headerText).toBe("Book Appointment")
      await appointmentModalPage.fillMrnField("1234567890");
      await appointmentModalPage.selectMrnSuggestion();
      const patientName = await appointmentModalPage.getPatientName();
      console.log("Patient Name: ", patientName);
      // Attempt to book without selecting a time
      await appointmentModalPage.selectSpeciality("GP");
      await dashboardPage.clickOnSupportCloseIcon();
      await appointmentModalPage.selectReasonForVisit();
      //Verify tthat the book appointment button is disabled
      const isBookButtonDisabled = await appointmentModalPage.isBookButtonDisabled();
      expect(isBookButtonDisabled).toBe(true);
      
})
test("TC1.003 Book appointment for a future date with valid data GP appointment => dashboard", async ({ page }) => {
    const loginPage  = new LoginPage(page);
    const selectLocation = new ModuleSelectorPage(page, "Front Desk");
    const dashboardPage = new DashboardPage(page);
    const appointmentModalPage = new AppointmentModalPage(page);
    const patientDetailsPage = new PatientDetailsPage(page);
    await page.goto(devUrl);
      await loginPage.selectLocation();
      await page.waitForURL('**/modules');
      // expect(page.url()).toBe('https://dev.indigoemr.com/modules');
      await selectLocation.selectFrontDeskModule();
      await dashboardPage.clickOnSupportCloseIcon();
      await dashboardPage.clickBookFutureAppointmentBtn();
      const headerText=await appointmentModalPage.getModalHeaderText(); 
       expect(headerText).toBe("Schedule Future Appointment")
      await appointmentModalPage.fillMrnField("1234567890");
      await appointmentModalPage.selectMrnSuggestion();
      const patientName = await appointmentModalPage.getPatientName();
      console.log("Patient Name: ", patientName);
      const selectedSpeciality = await appointmentModalPage.selectSpeciality("GP");
      console.log("Selected Speciality: ", selectedSpeciality);
      await appointmentModalPage.selectDate();
      // get the selected date
  
      const appointmentDate = await appointmentModalPage.selectDate();
      console.log("Appointment Date: ", appointmentDate);
      const formatedDate = `${appointmentDate.tomorrowdate}-0${Number(appointmentDate.month) }-${appointmentDate.year}`;
      await appointmentModalPage.selectWhomToSee();
      let selectedTime = await appointmentModalPage.selectTime(1);
      console.log("Selected Time: ", selectedTime);
      await dashboardPage.clickOnSupportCloseIcon();
      const reasonText = await appointmentModalPage.selectReasonForVisit();
      console.log("Selected Reason: ", reasonText);
      const FormattedText = reasonText.match(/^\S+/)
      //Get consultantion fee
      const consultationFee = await appointmentModalPage.getConsultationFee();
      console.log("Consultation Fee: ", consultationFee);
      //click book appointment button to submit the appointment
      await appointmentModalPage.clickBookAppointmentBtn();

      const maxRetries = 5;
      for (let i = 0; i < maxRetries; i++) {
        const errorToast = page.locator(".Toastify__toast--error");
        try {
          // Wait for an error toast. If it doesn't appear within the timeout, we assume success.
          await errorToast.waitFor({ state: 'visible', timeout: 3000 });
        } catch (e) {
          // Error toast did not appear, so we can break the loop.
          console.log("Appointment booked successfully.");
          break;
        }

        // If we're here, an error toast was found.
        console.log(`Attempt ${i + 1} of ${maxRetries}: Invalid appointment slot. Retrying...`);
        if (i === maxRetries - 1) {
          throw new Error(`Failed to book appointment after ${maxRetries} retries. Last error: ${await errorToast.textContent()}`);
        }

        const newTime = Math.floor(Math.random() * (9 - 2 + 1)) + 3; // Select a new random time slot
        selectedTime = await appointmentModalPage.selectTime(newTime);
        console.log("New Time Slot Selected: ", selectedTime);
        await appointmentModalPage.clickBookAppointmentBtn();
      }
      const formattedTime = selectedTime.replace(/\b(\d{1}):/g, '0$1:');
      console.log("Formatted time for assertion: " + formattedTime);
      await page.waitForTimeout(5000);
      //search for the patient in the dashboard & click on the patient name
      await dashboardPage.searchPatient(patientName);
      await dashboardPage.patientNameSearchResultLocator.waitFor({ state: 'visible' });
      const isPatientFound = await dashboardPage.patientNameSearchResultLocator.isVisible();  
      await page.locator(`//span[text()='${patientName}']`).click();
      // Verify that the patient details page is displayed
      await page.waitForTimeout(5000);
       expect(patientDetailsPage.verifyPatientDetailsPage).toBeTruthy();
      //verify the patient name | Mrn in the patient details page
      const patientNameInDetails = await patientDetailsPage.getPatientNameAndMrn();
      expect(patientNameInDetails).toContain(patientName);
      await patientDetailsPage.clickAppointmentNavigation();
      await page.waitForTimeout(5000);
      
      // Get the details from the appointment card
      const cardDetails = await dashboardPage.fetchAppointCardOnDashboard(patientName);
      console.log(cardDetails.state, cardDetails.status, cardDetails.date, cardDetails.time, cardDetails.reason, cardDetails.consultantName, cardDetails.specialty);
      // Verify that the appointment date,state,status, time, reason,consultantName and specialty are correct
      expect.soft(cardDetails.state.toLowerCase()).toBe("scheduled");
      expect.soft(cardDetails.status.toLowerCase()).toBe("vitals");
      expect.soft(cardDetails.date).toBe(formatedDate);
      expect.soft(cardDetails.time).toBe(formattedTime);
      expect.soft(cardDetails.reason).toContain(FormattedText[0]);
      expect.soft(cardDetails.consultantName).toBe("Adeolu1 Ogungbesan");
      expect.soft(cardDetails.specialty).toBe(selectedSpeciality);
})
test("TC1.004  Quick book with valid data Opthalmology  appointmnent -dashboard", async({page, user}) => {
 const loginPage  = new LoginPage(page);
    const selectLocation = new ModuleSelectorPage(page, "Front Desk");
    const dashboardPage = new DashboardPage(page);
    const appointmentModalPage = new AppointmentModalPage(page);
    await page.goto(devUrl);
      await loginPage.selectLocation();
      await page.waitForTimeout(5000);
      // expect.soft(page.url()).toBe('https://dev.indigoemr.com/modules');
      await selectLocation.selectFrontDeskModule();
      await dashboardPage.clickOnSupportCloseIcon();
      
      await dashboardPage.clickQuickBookAppointmentBtn();
      const headerText=await appointmentModalPage.getModalHeaderText(); 
      expect.soft(headerText).toBe("Book Appointment")
      await appointmentModalPage.fillMrnField("1234567890");
      await appointmentModalPage.selectMrnSuggestion();
      const patientName = await appointmentModalPage.getPatientName();
      const selectedSpeciality = await appointmentModalPage.selectSpeciality("Ophthalmology");
      //Grab the appointment date
      const appointment = await appointmentModalPage.getAppointmentDate();
      console.log("Appointment Date: ", appointment);
      const formatedDate = `${appointment.day }/0${Number(appointment.month)}/${appointment.year}`;
      const selectedTime= await appointmentModalPage.selectTime(0);
      await dashboardPage.clickOnSupportCloseIcon();
      const appointmentPurpose=await appointmentModalPage.selectReasonForVisit();
      const FormattedText = appointmentPurpose.match(/^\S+/)
      console.log("Selected Time: ", selectedTime);
      //Get consultantion fee
      const consultationFee = await appointmentModalPage.getConsultationFee();
      console.log("Consultation Fee: ", consultationFee);
      
      await appointmentModalPage.clickBookAppointmentBtn();
      //verify that the select section modal is dislayed.
      
      //select section to transfer patient.
      const selectedSection = await appointmentModalPage.selectSection("vitals");
      await appointmentModalPage.clickConfirmSectionBtn();
      await page.waitForTimeout(5000);
      
      const formattedTime = selectedTime.replace(/\b(\d{1}):/g, '0$1:');
      console.log("Formatted time for assertion: " + formattedTime);
      await page.waitForTimeout(5000);
      // Verify that the appointment was successfully booked
      //Verify that the appointment card is visible on the dashboard
      const cardDetails = await dashboardPage.fetchAppointCardOnDashboard(patientName);
      console.log(cardDetails.state, cardDetails.status, cardDetails.date, cardDetails.time, cardDetails.reason, cardDetails.consultantName, cardDetails.specialty, cardDetails.patientName);

      //Verify that the appointment card details are correct.
      //const cardDetails = await appointmentCardDetails.getAppointmentCardDetails();
      expect.soft(cardDetails.state.toLowerCase()).toBe(selectedSection);
      expect.soft(cardDetails.status.toLowerCase()).toBe("checkedin");
      expect.soft(cardDetails.date).toBe(formatedDate);
      expect.soft(cardDetails.time).toBe(formattedTime);
      expect.soft(cardDetails.reason).toContain(FormattedText[0]);
      expect.soft(cardDetails.consultantName).toBe("Adeolu1 Ogungbesan");
      expect.soft(cardDetails.specialty).toBe(selectedSpeciality);
      expect.soft(cardDetails.patientName).toBe(patientName)
    })

    test(" TC1.005 Book appointment for a future date with valid data Opthalmology appointment => dashboard", async ({ page }) => {
      const loginPage  = new LoginPage(page);
    const selectLocation = new ModuleSelectorPage(page, "Front Desk");
    const dashboardPage = new DashboardPage(page);
    const appointmentModalPage = new AppointmentModalPage(page);
    const patientDetailsPage = new PatientDetailsPage(page);
    await page.goto(devUrl);
      await loginPage.selectLocation();
      await page.waitForURL('**/modules');
       //expect.soft(page.url()).toBe('https://dev.indigoemr.com/modules');
      await selectLocation.selectFrontDeskModule();
      await dashboardPage.clickOnSupportCloseIcon();
      await dashboardPage.clickBookFutureAppointmentBtn();
      const headerText=await appointmentModalPage.getModalHeaderText(); 
       expect.soft(headerText).toBe("Schedule Future Appointment")
      await appointmentModalPage.fillMrnField("1234567890");
      await appointmentModalPage.selectMrnSuggestion();
      const patientName = await appointmentModalPage.getPatientName();
      console.log("Patient Name: ", patientName);
      const selectedSpeciality = await appointmentModalPage.selectSpeciality("Ophthalmology");
      console.log("Selected Speciality: ", selectedSpeciality);
      await appointmentModalPage.selectDate();
      // get the selected date
      const appointmentDate = await appointmentModalPage.selectDate();
      console.log("Appointment Date: ", appointmentDate);
      const formatedDate = `${appointmentDate.tomorrowdate}/0${Number(appointmentDate.month)}/${appointmentDate.year}`;
      await appointmentModalPage.selectWhomToSee();
      let selectedTime = await appointmentModalPage.selectTime(1);
      console.log("Selected Time: ", selectedTime);
      await dashboardPage.clickOnSupportCloseIcon();
      const reasonText = await appointmentModalPage.selectReasonForVisit();
      console.log("Selected Reason: ", reasonText);
      const FormattedText = reasonText.match(/^\S+/)
      //Get consultantion fee
      const consultationFee = await appointmentModalPage.getConsultationFee();
      console.log("Consultation Fee: ", consultationFee);
      //click book appointment button to submit the appointment
      await appointmentModalPage.clickBookAppointmentBtn();

      const maxRetries = 5;
      for (let i = 0; i < maxRetries; i++) {
        const errorToast = page.locator(".Toastify__toast--error");
        try {
          // Wait for an error toast. If it doesn't appear within the timeout, we assume success.
          await errorToast.waitFor({ state: 'visible', timeout: 3000 });
        } catch (e) {
          // Error toast did not appear, so we can break the loop.
          console.log("Appointment booked successfully.");
          break;
        }

        // If we're here, an error toast was found.
        console.log(`Attempt ${i + 1} of ${maxRetries}: Invalid appointment slot. Retrying...`);
        if (i === maxRetries - 1) {
          throw new Error(`Failed to book appointment after ${maxRetries} retries. Last error: ${await errorToast.textContent()}`);
        }

        const newTime = Math.floor(Math.random() * (20 - 13 + 1)) + 3; // Select a new random time slot
        selectedTime = await appointmentModalPage.selectTime(newTime);
        console.log("New Time Slot Selected: ", selectedTime);
        await appointmentModalPage.clickBookAppointmentBtn();
      }
      const formattedTime = selectedTime.replace(/\b(\d{1}):/g, '0$1:');
      console.log("Formatted time for assertion: " + formattedTime);
      await page.waitForTimeout(5000);
      //search for the patient in the dashboard & click on the patient name
      await dashboardPage.searchPatient(patientName);
      await dashboardPage.patientNameSearchResultLocator.waitFor({ state: 'visible' });
      const isPatientFound = await dashboardPage.patientNameSearchResultLocator.isVisible();  
      await page.locator(`//span[text()='${patientName}']`).click();
      // Verify that the patient details page is displayed
      await page.waitForTimeout(5000);
       expect.soft(patientDetailsPage.verifyPatientDetailsPage).toBeTruthy();
      //verify the patient name | Mrn in the patient details page
      const patientNameInDetails = await patientDetailsPage.getPatientNameAndMrn();
      expect.soft(patientNameInDetails).toContain(patientName);
      await patientDetailsPage.clickAppointmentNavigation();
      await page.waitForTimeout(5000);
      
      // Get the details from the appointment card
      const cardDetails = await dashboardPage.fetchAppointCardOnDashboard(patientName);
      // Verify that the appointment date,state,status, time, reason,consultantName and specialty are correct
      expect.soft(cardDetails.state.toLowerCase()).toBe("vitals");
      expect.soft(cardDetails.status.toLowerCase()).toBe("scheduled");
      expect.soft(cardDetails.date).toBe(formatedDate);
      expect.soft(cardDetails.time).toContain(formattedTime);
      expect.soft(cardDetails.reason).toContain(FormattedText[0]);
      expect.soft(cardDetails.consultantName).toBe("Adeolu1 Ogungbesan");
      expect.soft(cardDetails.specialty).toBe(selectedSpeciality);

    })

  test("TC 1.006 Check in patient for appointment from the listing page GP", async ({ page }) => { 
  const loginPage  = new LoginPage(page);
    const selectLocation = new ModuleSelectorPage(page, "Front Desk");
    const navbar = new NavigationSideBarComponent(page);
    const patientListing = new FrontdeskPatientListingPage(page);
    const transferMaodal = new TransferModalPage(page);
    const patientDetailsPage = new PatientDetailsPage(page);
    const dashboardPage = new DashboardPage(page);
    
    await page.goto(devUrl);
      await loginPage.selectLocation();
      await page.waitForURL('**/modules');
      // expect.soft(page.url()).toBe('https://dev.indigoemr.com/modules');
      await selectLocation.selectFrontDeskModule();
      //navigate to the listing page
      await navbar.clickOnPatientsNavBar()
      //click on the first check in button
      const patientName =await patientListing.getFirstPatientWithCheckIn()
      console.log("Patient Name: ", patientName);
      await patientListing.clickFirstPatientWithCheckIn();
      //verify that the transfer modal is open
      const modalIsOpen = await transferMaodal.isModalOpen();
      expect.soft(modalIsOpen).toBe(true);
      // await transferMaodal.clickSpecialtyDropdown();
      const selectedSpeciality = await transferMaodal.selectSpeciality('General Practice')
      await transferMaodal.clickOnConsultant()
      const selectedTimeSlot = await transferMaodal.selectTimeSlot()
      console.log("Selected Time Slot: ", selectedTimeSlot);
      const formattedTime = formatTimeRange(selectedTimeSlot)
      console.log("Formatted Time: ", formattedTime);
      //const formattedTime = selectedTimeSlot.replace(/\b(\d{1}):/g, '0$1:');
      console.log("Formatted time for assertion: " + formattedTime);
     const selectReason  =await transferMaodal.selectReason()
     console.log("Selected Reason: ", selectReason);
     const FormattedText = selectReason.match(/^\s*(\w+)/)
     const firstWorld =  FormattedText? FormattedText[1] : null
     console.log("First word of the reason: ", firstWorld);
      await transferMaodal.isConsultationFeeVisible()
      await transferMaodal.clickSubmitBtn();
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(10000);
      //verify that the success toast is visible
      const isSuccessToastVisible = await patientListing.isSuccessToastVisible();
    // expect.soft(isSuccessToastVisible).toBeTruthy();
     //check if modal is still open and then close it
     await transferMaodal.closeModalAndReturnToListing();
      //verify that the btn text of the patient was change to check out
      const btnText = await patientListing.isCheckoutBtnVisible(patientName)
      expect.soft(btnText).toBe("Check Out")
      await page.waitForTimeout(5000);
      //Navigate to the patient detail page
      await patientListing.clickThePatientLinkText(patientName);
      //Check the the patient detail page is opened
      await patientDetailsPage.verifyPatientDetailsPage(patientName)
      //Navigate to the appointment tab
      await patientDetailsPage.clickAppointmentNavigation();
      //Fetch the details on the appointment card
      const cardDetails = await patientDetailsPage.fetchAppointCardOnPatientDetailsPage(patientName); 
      console.log(cardDetails)
      //validate data on the card
      expect.soft(cardDetails.state.toLowerCase()).toBe("vitals");
      expect.soft(cardDetails.status.toLowerCase()).toBe("checkedin");
      expect.soft(cardDetails.date).toBe(getDateParts().day + "/" + getDateParts().month + "/" + getDateParts().year);
      expect.soft(cardDetails.time).toContain(formattedTime);
      expect.soft(cardDetails.reason).toContain(firstWorld);
      expect.soft(cardDetails.consultantName).toBe("Adeolu1 Ogungbesan");
      expect.soft(cardDetails.specialty).toBe(selectedSpeciality);
      //Verify the appointment card is visible on the dashboard
      await navbar.clickOnDashboardNavBar();
      
      //verify the appointment card details on the dashboard
      const cardDetailsDashboard=   await dashboardPage.fetchAppointCardOnDashboard(patientName)
      console.log(cardDetailsDashboard);
      expect.soft(cardDetailsDashboard.state.toLowerCase()).toBe("vitals");
      expect.soft(cardDetailsDashboard.status.toLowerCase()).toBe("checkedin");
      expect.soft(cardDetailsDashboard.date).toBe(`${getDateParts().day}/${getDateParts().month}/${getDateParts().year}`);
      expect.soft(cardDetailsDashboard.time).toContain(formattedTime);
      expect.soft(cardDetailsDashboard.consultantName).toBe("Adeolu1 Ogungbesan");
      expect.soft(cardDetails.reason).toContain(FormattedText[1]);
      expect.soft(cardDetails.specialty).toBe(selectedSpeciality)



    
  })
  test("TC 1.007 Check in patient for appointment from the listing page Opthalmology", async ({ page }) => { 
    const loginPage = new LoginPage(page);
    const selectLocation = new ModuleSelectorPage(page, "Front Desk");
    const navbar = new NavigationSideBarComponent(page);
    const patientListing = new FrontdeskPatientListingPage(page);
    const transferMaodal = new TransferModalPage(page);
    const patientDetailsPage = new PatientDetailsPage(page);
    const dashboardPage = new DashboardPage(page);
    const appointmentModalPage = new AppointmentModalPage(page);
    
    await page.goto(devUrl);
      await loginPage.selectLocation();
      await page.waitForURL('**/modules');
      // expect.soft(page.url()).toBe('https://dev.indigoemr.com/modules');
      await selectLocation.selectFrontDeskModule();
      //navigate to the listing page
      await navbar.clickOnPatientsNavBar()
      //click on the first check in button
      const patientName =await patientListing.getFirstPatientWithCheckIn()
      console.log("Patient Name: ", patientName);
      await patientListing.clickFirstPatientWithCheckIn();
      //verify that the transfer modal is open
      const modalIsOpen = await transferMaodal.isModalOpen();
      expect.soft(modalIsOpen).toBe(true);
      // await transferMaodal.clickSpecialtyDropdown();
      const selectedSpeciality = await transferMaodal.selectSpeciality('Ophthalmology')
      await transferMaodal.clickOnConsultant()
      const selectedTimeSlot = await transferMaodal.selectTimeSlot()
      console.log("Selected Time Slot: ", selectedTimeSlot);
      const formattedTime = formatTimeRange(selectedTimeSlot)
      console.log("Formatted Time: ", formattedTime);
      //const formattedTime = selectedTimeSlot.replace(/\b(\d{1}):/g, '0$1:');
      console.log("Formatted time for assertion: " + formattedTime);
     const selectReason  =await transferMaodal.selectReason()
     console.log("Selected Reason: ", selectReason);
     const FormattedText = selectReason.match(/^\s*(\w+)/)
     const firstWorld =  FormattedText? FormattedText[1] : null
     console.log("First word of the reason: ", firstWorld);
      await transferMaodal.isConsultationFeeVisible()
      await transferMaodal.clickSubmitBtn();
      //verify that the select section modal is dislayed.
      const selectModal =await appointmentModalPage.isSelectSectionVisible()
       expect.soft(selectModal).toBeTruthy()
       //select section to transfer patient.
      const selectedSection = await appointmentModalPage.selectSection("vitals");
      expect.soft(selectedSection).toBe("vitals")
      await appointmentModalPage.clickConfirmSectionBtn();
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(10000);
        //verify that the success toast is visible
      const isSuccessToastVisible = await patientListing.isSuccessToastVisible();
     // expect.soft(isSuccessToastVisible).toBeTruthy();
     //check if modal is still open and then close it
     await transferMaodal.closeModalAndReturnToListing();
      //verify that the btn text of the patient was change to check out
      const btnText = await patientListing.isCheckoutBtnVisible(patientName)
      expect.soft(btnText).toBe("Check Out")
      await page.waitForTimeout(5000);
      //Navigate to the patient detail page
      await patientListing.clickThePatientLinkText(patientName);
      //Check the the patient detail page is opened
      await patientDetailsPage.verifyPatientDetailsPage(patientName)
      //Navigate to the appointment tab
      await patientDetailsPage.clickAppointmentNavigation();
      //Fetch the details on the appointment card
      const cardDetails = await patientDetailsPage.fetchAppointCardOnPatientDetailsPage(patientName); 
      console.log(cardDetails)
      //validate data on the card
      expect.soft(cardDetails.state.toLowerCase()).toBe(selectedSection);
      expect.soft(cardDetails.status.toLowerCase()).toBe("checkedin");
      expect.soft(cardDetails.date).toBe(getDateParts().day + "/" + getDateParts().month + "/" + getDateParts().year);
      expect.soft(cardDetails.time).toContain(formattedTime);
      expect.soft(cardDetails.reason).toContain(firstWorld);
      expect.soft(cardDetails.consultantName).toBe("Adeolu1 Ogungbesan");
      expect.soft(cardDetails.specialty).toBe(selectedSpeciality);
      //Verify the appointment card is visible on the dashboard
      await navbar.clickOnDashboardNavBar();
      
      //verify the appointment card details on the dashboard
      const cardDetailsDashboard=   await dashboardPage.fetchAppointCardOnDashboard(patientName)
      console.log(cardDetailsDashboard);
      expect.soft(cardDetailsDashboard.state.toLowerCase()).toBe(selectedSection);
      expect.soft(cardDetailsDashboard.status.toLowerCase()).toBe("checkedin");
      expect.soft(cardDetailsDashboard.date).toBe(`${getDateParts().day}/${getDateParts().month}/${getDateParts().year}`);
      expect.soft(cardDetailsDashboard.time).toContain(formattedTime);
      expect.soft(cardDetailsDashboard.consultantName).toBe("Adeolu1 Ogungbesan");
      expect.soft(cardDetails.reason).toContain(FormattedText[1]);
      expect.soft(cardDetails.specialty).toBe(selectedSpeciality)

  })
   test("TC 1.008 Check in patient for appointment from the listing page Opthalmology and transfer for Consultation", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const selectLocation = new ModuleSelectorPage(page, "Front Desk");
    const navbar = new NavigationSideBarComponent(page);
    const patientListing = new FrontdeskPatientListingPage(page);
    const transferMaodal = new TransferModalPage(page);
    const patientDetailsPage = new PatientDetailsPage(page);
    const dashboardPage = new DashboardPage(page);
    const appointmentModalPage = new AppointmentModalPage(page);
    
    await page.goto(devUrl);
      await loginPage.selectLocation();
      await page.waitForURL('**/modules');
       //expect.soft(page.url()).toBe('https://dev.indigoemr.com/modules');
      await selectLocation.selectFrontDeskModule();
      //navigate to the listing page
      await navbar.clickOnPatientsNavBar()
      //click on the first check in button
      const patientName =await patientListing.getFirstPatientWithCheckIn()
      console.log("Patient Name: ", patientName);
      await patientListing.clickFirstPatientWithCheckIn();
      //verify that the transfer modal is open
      const modalIsOpen = await transferMaodal.isModalOpen();
      expect.soft(modalIsOpen).toBe(true);
      // await transferMaodal.clickSpecialtyDropdown();
      const selectedSpeciality = await transferMaodal.selectSpeciality('Ophthalmology')
      await transferMaodal.clickOnConsultant()
      const selectedTimeSlot = await transferMaodal.selectTimeSlot()
      console.log("Selected Time Slot: ", selectedTimeSlot);
      const formattedTime = formatTimeRange(selectedTimeSlot)
      console.log("Formatted Time: ", formattedTime);
      //const formattedTime = selectedTimeSlot.replace(/\b(\d{1}):/g, '0$1:');
      console.log("Formatted time for assertion: " + formattedTime);
     const selectReason  =await transferMaodal.selectReason()
     console.log("Selected Reason: ", selectReason);
     const FormattedText = selectReason.match(/^\s*(\w+)/)
     const firstWorld =  FormattedText? FormattedText[1] : null
     console.log("First word of the reason: ", firstWorld);
      await transferMaodal.isConsultationFeeVisible()
      await transferMaodal.clickSubmitBtn();
      //verify that the select section modal is dislayed.
      const selectModal =await appointmentModalPage.isSelectSectionVisible()
       expect.soft(selectModal).toBeTruthy()
       //select section to transfer patient.
      const selectedSection = await appointmentModalPage.selectSection("Consultant");
      expect.soft(selectedSection).toContain("consultant");
      await appointmentModalPage.clickConfirmSectionBtn();
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(10000);
        //verify that the success toast is visible
      const isSuccessToastVisible = await patientListing.isSuccessToastVisible();
    // expect.soft(isSuccessToastVisible).toBeTruthy();
     //check if modal is still open and then close it
     await transferMaodal.closeModalAndReturnToListing();
      //verify that the btn text of the patient was change to check out
      const btnText = await patientListing.isCheckoutBtnVisible(patientName)
      expect.soft(btnText).toBe("Check Out")
      await page.waitForTimeout(5000);
      //Navigate to the patient detail page
      await patientListing.clickThePatientLinkText(patientName);
      //Check the the patient detail page is opened
      await patientDetailsPage.verifyPatientDetailsPage(patientName)
      //Navigate to the appointment tab
      await patientDetailsPage.clickAppointmentNavigation();
      //Fetch the details on the appointment card
      const cardDetails = await patientDetailsPage.fetchAppointCardOnPatientDetailsPage(patientName); 
      console.log(cardDetails)
      //validate data on the card
      expect.soft(cardDetails.state.toLowerCase()).toBe("consulting");
      expect.soft(cardDetails.status.toLowerCase()).toBe("checkedin");
      expect.soft(cardDetails.date).toBe(getDateParts().day + "/" + getDateParts().month + "/" + getDateParts().year);
      expect.soft(cardDetails.time).toBe(formattedTime);
      expect.soft(cardDetails.reason).toContain(firstWorld);
      expect.soft(cardDetails.consultantName).toBe("Adeolu1 Ogungbesan");
      expect.soft(cardDetails.specialty).toBe(selectedSpeciality);
      //Verify the appointment card is visible on the dashboard
      await navbar.clickOnDashboardNavBar();
      
      //verify the appointment card details on the dashboard
      const cardDetailsDashboard=   await dashboardPage.fetchAppointCardOnDashboard(patientName)
      console.log(cardDetailsDashboard);
      expect.soft(cardDetailsDashboard.state.toLowerCase()).toBe("consulting");
      expect.soft(cardDetailsDashboard.status.toLowerCase()).toBe("checkedin");
      expect.soft(cardDetailsDashboard.date).toBe(`${getDateParts().day}/${getDateParts().month}/${getDateParts().year}`);
      expect.soft(cardDetailsDashboard.time).toBe(formattedTime);
      expect.soft(cardDetailsDashboard.consultantName).toBe("Adeolu1 Ogungbesan");
      expect.soft(cardDetails.reason).toContain(FormattedText[1]);
      expect.soft(cardDetails.specialty).toBe(selectedSpeciality)
  })
   test("TC 1.009 Check in patient for appointment from the listing page Opthalmology and transfer to Outpatient Procedure", async ({ page }) => { 
    const loginPage = new LoginPage(page);
    const selectLocation = new ModuleSelectorPage(page, "Front Desk");
    const navbar = new NavigationSideBarComponent(page);
    const patientListing = new FrontdeskPatientListingPage(page);
    const transferMaodal = new TransferModalPage(page);
    const patientDetailsPage = new PatientDetailsPage(page);
    const dashboardPage = new DashboardPage(page);
    const appointmentModalPage = new AppointmentModalPage(page);
    
    await page.goto(devUrl);
      await loginPage.selectLocation();
      await page.waitForURL('**/modules');
      // expect.soft(page.url()).toBe('https://dev.indigoemr.com/modules');
      await selectLocation.selectFrontDeskModule();
      //navigate to the listing page
      await navbar.clickOnPatientsNavBar()
      //click on the first check in button
      const patientName =await patientListing.getFirstPatientWithCheckIn()
      console.log("Patient Name: ", patientName);
      await patientListing.clickFirstPatientWithCheckIn();
      //verify that the transfer modal is open
      const modalIsOpen = await transferMaodal.isModalOpen();
      expect.soft(modalIsOpen).toBe(true);
      // await transferMaodal.clickSpecialtyDropdown();
      const selectedSpeciality = await transferMaodal.selectSpeciality('Ophthalmology')
      await transferMaodal.clickOnConsultant()
      const selectedTimeSlot = await transferMaodal.selectTimeSlot()
      console.log("Selected Time Slot: ", selectedTimeSlot);
      const formattedTime = formatTimeRange(selectedTimeSlot)
      console.log("Formatted Time: ", formattedTime);
      //const formattedTime = selectedTimeSlot.replace(/\b(\d{1}):/g, '0$1:');
      console.log("Formatted time for assertion: " + formattedTime);
     const selectReason  =await transferMaodal.selectReason()
     console.log("Selected Reason: ", selectReason);
     const FormattedText = selectReason.match(/^\s*(\w+)/)
     const firstWorld =  FormattedText? FormattedText[1] : null
     console.log("First word of the reason: ", firstWorld);
      await transferMaodal.isConsultationFeeVisible()
      await transferMaodal.clickSubmitBtn();
      //verify that the select section modal is dislayed.
      const selectModal =await appointmentModalPage.isSelectSectionVisible()
       expect.soft(selectModal).toBeTruthy()
       //select section to transfer patient.
      const selectedSection = await appointmentModalPage.selectSection("Outpatient Procedure");
      expect.soft(selectedSection).toContain("outpatient procedure");
      await appointmentModalPage.clickConfirmSectionBtn();
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(10000);
        //verify that the success toast is visible
      const isSuccessToastVisible = await patientListing.isSuccessToastVisible();
     //expect.soft(isSuccessToastVisible).toBeTruthy();
     //check if modal is still open and then close it
     await transferMaodal.closeModalAndReturnToListing();
      //verify that the btn text of the patient was change to check out
      const btnText = await patientListing.isCheckoutBtnVisible(patientName)
      expect.soft(btnText).toBe("Check Out")
      await page.waitForTimeout(5000);
      //Navigate to the patient detail page
      await patientListing.clickThePatientLinkText(patientName);
      //Check the the patient detail page is opened
      await patientDetailsPage.verifyPatientDetailsPage(patientName)
      //Navigate to the appointment tab
      await patientDetailsPage.clickAppointmentNavigation();
      //Fetch the details on the appointment card
      const cardDetails = await patientDetailsPage.fetchAppointCardOnPatientDetailsPage(patientName); 
      console.log(cardDetails)
      //validate data on the card
      expect.soft(cardDetails.state.toLowerCase()).toBe(selectedSection.toLocaleLowerCase());
      expect.soft(cardDetails.status.toLowerCase()).toBe("checkedin");
      expect.soft(cardDetails.date).toBe(getDateParts().day + "/" + getDateParts().month + "/" + getDateParts().year);
      expect.soft(cardDetails.time).toBe(formattedTime);
      expect.soft(cardDetails.reason).toContain(firstWorld);
      expect.soft(cardDetails.consultantName).toBe("Adeolu1 Ogungbesan");
      expect.soft(cardDetails.specialty).toBe(selectedSpeciality);
      //Verify the appointment card is visible on the dashboard
      await navbar.clickOnDashboardNavBar();
      
      //verify the appointment card details on the dashboard
      const cardDetailsDashboard=   await dashboardPage.fetchAppointCardOnDashboard(patientName)
      console.log(cardDetailsDashboard);
      expect.soft(cardDetailsDashboard.state.toLowerCase()).toBe(selectedSection.toLocaleLowerCase());
      expect.soft(cardDetailsDashboard.status.toLowerCase()).toBe("checkedin");
      expect.soft(cardDetailsDashboard.date).toBe(`${getDateParts().day}/${getDateParts().month}/${getDateParts().year}`);
      expect.soft(cardDetailsDashboard.time).toBe(formattedTime);
      expect.soft(cardDetailsDashboard.consultantName).toBe("Adeolu1 Ogungbesan");
      expect.soft(cardDetails.reason).toContain(FormattedText[1]);
      expect.soft(cardDetails.specialty).toBe(selectedSpeciality)
   })
   test("TC 1.010 Check in patient for appointment from the patient details page GP", async ({ page }) => {
     const loginPage = new LoginPage(page);
    const selectLocation = new ModuleSelectorPage(page, "Front Desk");
    const navbar = new NavigationSideBarComponent(page);
    const patientListing = new FrontdeskPatientListingPage(page);
    const transferMaodal = new TransferModalPage(page);
    const patientDetailsPage = new PatientDetailsPage(page);
    const dashboardPage = new DashboardPage(page);
    const appointmentModalPage = new AppointmentModalPage(page);
    
    await page.goto(devUrl);
      await loginPage.selectLocation();
      await page.waitForURL('**/modules');
      //expect.soft(page.url()).toBe('https://dev.indigoemr.com/modules');
      await selectLocation.selectFrontDeskModule();
      //navigate to the listing page
      await navbar.clickOnPatientsNavBar()
      //click on the first check in button
      const patientName =await patientListing.getFirstPatientWithCheckIn()
      console.log("Patient Name: ", patientName);
      await patientListing.clickThePatientLinkText(patientName);
      //verify that the patient details page is opened
      await patientDetailsPage.verifyPatientDetailsPage(patientName);
      await patientDetailsPage.clickCheckinCheckoutBtn();
      //verify that the transfer modal is open
     const modalIsOpen = await transferMaodal.isModalOpen();
      expect.soft(modalIsOpen).toBe(true);
      // await transferMaodal.clickSpecialtyDropdown();
      const selectedSpeciality = await transferMaodal.selectSpeciality('General Practice')
      await transferMaodal.clickOnConsultant()
      const selectedTimeSlot = await transferMaodal.selectTimeSlot()
      console.log("Selected Time Slot: ", selectedTimeSlot);
      const formattedTime = formatTimeRange(selectedTimeSlot)
      console.log("Formatted Time: ", formattedTime);
      //const formattedTime = selectedTimeSlot.replace(/\b(\d{1}):/g, '0$1:');
      console.log("Formatted time for assertion: " + formattedTime);
     const selectReason  =await transferMaodal.selectReason()
     console.log("Selected Reason: ", selectReason);
     const FormattedText = selectReason.match(/^\s*(\w+)/)
     const firstWorld =  FormattedText? FormattedText[1] : null
     console.log("First word of the reason: ", firstWorld);
      await transferMaodal.isConsultationFeeVisible()
      await transferMaodal.clickSubmitBtn();
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(10000);
      //verify that the success toast is visible
      const isSuccessToastVisible = await patientListing.isSuccessToastVisible();
     expect.soft(isSuccessToastVisible).toBeTruthy();
     //check if modal is still open and then close it
     await transferMaodal.closeModalAndReturnToListing();
     await page.waitForTimeout(5000);
      await page.reload();
      //verify that the btn text of the patient was change to check out
      await patientDetailsPage.verifyCheckinCheckoutBtnText("Check Out");
     // const btnText = await patientDetailsPage.verifyCheckinCheckoutBtnText("Check Out");
      //veify that the appointment card is visible on the patient details page    
       //Navigate to the appointment tab
      await patientDetailsPage.clickAppointmentNavigation();
      //Fetch the details on the appointment card
      const cardDetails = await patientDetailsPage.fetchAppointCardOnPatientDetailsPage(patientName); 
      console.log(cardDetails)
      //validate data on the card
      expect.soft(cardDetails.state.toLowerCase()).toBe("vitals");
      expect.soft(cardDetails.status.toLowerCase()).toBe("checkedin");
      expect.soft(cardDetails.date).toBe(getDateParts().day + "/" + getDateParts().month + "/" + getDateParts().year);
      expect.soft(cardDetails.time).toBe(formattedTime);
      expect.soft(cardDetails.reason).toContain(firstWorld);
      expect.soft(cardDetails.consultantName).toBe("Adeolu1 Ogungbesan");
      expect.soft(cardDetails.specialty).toBe(selectedSpeciality);
      //Verify the appointment card is visible on the dashboard
      await navbar.clickOnDashboardNavBar();
      
      //verify the appointment card details on the dashboard
      const cardDetailsDashboard=   await dashboardPage.fetchAppointCardOnDashboard(patientName)
      console.log(cardDetailsDashboard);
      expect.soft(cardDetailsDashboard.state.toLowerCase()).toBe("vitals");
      expect.soft(cardDetailsDashboard.status.toLowerCase()).toBe("checkedin");
      expect.soft(cardDetailsDashboard.date).toBe(`${getDateParts().day}/${getDateParts().month}/${getDateParts().year}`);
      expect.soft(cardDetailsDashboard.time).toBe(formattedTime);
      expect.soft(cardDetailsDashboard.consultantName).toBe("Adeolu1 Ogungbesan");
      expect.soft(cardDetails.reason).toContain(FormattedText[1]);
      expect.soft(cardDetails.specialty).toBe(selectedSpeciality)

   })
   test("TC 1.011 Check in patient for appointment from the patient details page Opthalmology", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const selectLocation = new ModuleSelectorPage(page, "Front Desk");
    const navbar = new NavigationSideBarComponent(page);
    const patientListing = new FrontdeskPatientListingPage(page);
    const transferMaodal = new TransferModalPage(page);
    const patientDetailsPage = new PatientDetailsPage(page);
    const dashboardPage = new DashboardPage(page);
    const appointmentModalPage = new AppointmentModalPage(page);
    
    await page.goto(devUrl);
      await loginPage.selectLocation();
      await page.waitForURL('**/modules');
       //expect.soft(page.url()).toBe('https://dev.indigoemr.com/modules');
      await selectLocation.selectFrontDeskModule();
      //navigate to the listing page
      await navbar.clickOnPatientsNavBar()
      //click on the first check in button
      const patientName =await patientListing.getFirstPatientWithCheckIn()
      console.log("Patient Name: ", patientName);
      await patientListing.clickThePatientLinkText(patientName);
      //verify that the patient details page is opened
      await patientDetailsPage.verifyPatientDetailsPage(patientName);
      await patientDetailsPage.clickCheckinCheckoutBtn();
       //verify that the transfer modal is open
      const modalIsOpen = await transferMaodal.isModalOpen();
      expect.soft(modalIsOpen).toBe(true);
      // await transferMaodal.clickSpecialtyDropdown();
      const selectedSpeciality = await transferMaodal.selectSpeciality('Ophthalmology')
      await transferMaodal.clickOnConsultant()
      const selectedTimeSlot = await transferMaodal.selectTimeSlot()
      console.log("Selected Time Slot: ", selectedTimeSlot);
      const formattedTime = formatTimeRange(selectedTimeSlot)
      console.log("Formatted Time: ", formattedTime);
      //const formattedTime = selectedTimeSlot.replace(/\b(\d{1}):/g, '0$1:');
      console.log("Formatted time for assertion: " + formattedTime);
     const selectReason  =await transferMaodal.selectReason()
     console.log("Selected Reason: ", selectReason);
     const FormattedText = selectReason.match(/^\s*(\w+)/)
     const firstWorld =  FormattedText? FormattedText[1] : null
     console.log("First word of the reason: ", firstWorld);
      await transferMaodal.isConsultationFeeVisible()
      await transferMaodal.clickSubmitBtn();
      //verify that the select section modal is dislayed.
      const selectModal =await appointmentModalPage.isSelectSectionVisible()
       expect.soft(selectModal).toBeTruthy()
       //select section to transfer patient.
      const selectedSection = await appointmentModalPage.selectSection("vitals");
      expect.soft(selectedSection).toBe("vitals");
      await appointmentModalPage.clickConfirmSectionBtn();
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(10000);
        //verify that the success toast is visible
      const isSuccessToastVisible = await patientListing.isSuccessToastVisible();
     //expect.soft(isSuccessToastVisible).toBeTruthy();
     //check if modal is still open and then close it
     await transferMaodal.closeModalAndReturnToListing();
          await page.waitForTimeout(5000);

       //verify that the btn text of the patient was change to check out
      const btnText = await patientDetailsPage.verifyCheckinCheckoutBtnText("Check Out");
      expect.soft(btnText).toBe("check out")
      await page.waitForTimeout(5000);  
      //veify that the appointment card is visible on the patient details page    
       //Navigate to the appointment tab
      await patientDetailsPage.clickAppointmentNavigation();
      //Fetch the details on the appointment card
      const cardDetails = await patientDetailsPage.fetchAppointCardOnPatientDetailsPage(patientName); 
      console.log(cardDetails)
      //validate data on the card
      expect.soft(cardDetails.state.toLowerCase()).toBe(selectedSection);
      expect.soft(cardDetails.status.toLowerCase()).toBe("checkedin");
      expect.soft(cardDetails.date).toBe(getDateParts().day + "/" + getDateParts().month + "/" + getDateParts().year);
      expect.soft(cardDetails.time).toBe(formattedTime);
      expect.soft(cardDetails.reason).toContain(firstWorld);
      expect.soft(cardDetails.consultantName).toBe("Adeolu1 Ogungbesan");
      expect.soft(cardDetails.specialty).toBe(selectedSpeciality);
      //Verify the appointment card is visible on the dashboard
      await navbar.clickOnDashboardNavBar();
      
      //verify the appointment card details on the dashboard
      const cardDetailsDashboard=   await dashboardPage.fetchAppointCardOnDashboard(patientName)
      console.log(cardDetailsDashboard);
      expect.soft(cardDetailsDashboard.state.toLowerCase()).toBe(selectedSection);
      expect.soft(cardDetailsDashboard.status.toLowerCase()).toBe("checkedin");
      expect.soft(cardDetailsDashboard.date).toBe(`${getDateParts().day}/${getDateParts().month}/${getDateParts().year}`);
      expect.soft(cardDetailsDashboard.time).toBe(formattedTime);
      expect.soft(cardDetailsDashboard.consultantName).toBe("Adeolu1 Ogungbesan");
      expect.soft(cardDetails.reason).toContain(FormattedText[1]);
      expect.soft(cardDetails.specialty).toBe(selectedSpeciality);


    

   })
   test("TC 1.012 Check in patient for appointment from the patient details page Opthalmology and transfer for Consultation", async ({ page }) => {
 const loginPage = new LoginPage(page);
    const selectLocation = new ModuleSelectorPage(page, "Front Desk");
    const navbar = new NavigationSideBarComponent(page);
    const patientListing = new FrontdeskPatientListingPage(page);
    const transferMaodal = new TransferModalPage(page);
    const patientDetailsPage = new PatientDetailsPage(page);
    const dashboardPage = new DashboardPage(page);
    const appointmentModalPage = new AppointmentModalPage(page);
    
    await page.goto(devUrl);
      await loginPage.selectLocation();
      await page.waitForURL('**/modules');
      // expect.soft(page.url()).toBe('https://dev.indigoemr.com/modules');
      await selectLocation.selectFrontDeskModule();
      //navigate to the listing page
      await navbar.clickOnPatientsNavBar()
      //click on the first check in button
      const patientName =await patientListing.getFirstPatientWithCheckIn()
      console.log("Patient Name: ", patientName);
      await patientListing.clickThePatientLinkText(patientName);
      //verify that the patient details page is opened
      await patientDetailsPage.verifyPatientDetailsPage(patientName);
      await patientDetailsPage.clickCheckinCheckoutBtn();
       //verify that the transfer modal is open
      const modalIsOpen = await transferMaodal.isModalOpen();
      expect.soft(modalIsOpen).toBe(true);
      // await transferMaodal.clickSpecialtyDropdown();
      const selectedSpeciality = await transferMaodal.selectSpeciality('Ophthalmology')
      await transferMaodal.clickOnConsultant()
      const selectedTimeSlot = await transferMaodal.selectTimeSlot()
      console.log("Selected Time Slot: ", selectedTimeSlot);
      const formattedTime = formatTimeRange(selectedTimeSlot)
      console.log("Formatted Time: ", formattedTime);
      //const formattedTime = selectedTimeSlot.replace(/\b(\d{1}):/g, '0$1:');
      console.log("Formatted time for assertion: " + formattedTime);
     const selectReason  =await transferMaodal.selectReason()
     console.log("Selected Reason: ", selectReason);
     const FormattedText = selectReason.match(/^\s*(\w+)/)
     const firstWorld =  FormattedText? FormattedText[1] : null
     console.log("First word of the reason: ", firstWorld);
      await transferMaodal.isConsultationFeeVisible()
      await transferMaodal.clickSubmitBtn();
      //verify that the select section modal is dislayed.
      const selectModal =await appointmentModalPage.isSelectSectionVisible()
       expect.soft(selectModal).toBeTruthy()
       //select section to transfer patient.
      const selectedSection = await appointmentModalPage.selectSection("Consultant");
      expect.soft(selectedSection).toBe("consultant");
      await appointmentModalPage.clickConfirmSectionBtn();
      await page.waitForLoadState('networkidle');
      //await page.waitForTimeout(10000);
        //verify that the success toast is visible
      const isSuccessToastVisible = await patientListing.isSuccessToastVisible();
     //expect.soft(isSuccessToastVisible).toBeTruthy();
     //check if modal is still open and then close it
     await transferMaodal.closeModalAndReturnToListing();
          await page.waitForTimeout(5000);

       //verify that the btn text of the patient was change to check out
      const btnText = await patientDetailsPage.verifyCheckinCheckoutBtnText("Check Out");
      expect.soft(btnText).toBe("check out")
      await page.waitForTimeout(5000);  
      //veify that the appointment card is visible on the patient details page    
       //Navigate to the appointment tab
      await patientDetailsPage.clickAppointmentNavigation();
      //Fetch the details on the appointment card
      const cardDetails = await patientDetailsPage.fetchAppointCardOnPatientDetailsPage(patientName); 
      console.log(cardDetails)
      //validate data on the card
       expect.soft(cardDetails.state.toLowerCase()).toBe("consulting");
      expect.soft(cardDetails.status.toLowerCase()).toBe("checkedin");
      expect.soft(cardDetails.date).toBe(getDateParts().day + "/" + getDateParts().month + "/" + getDateParts().year);
      expect.soft(cardDetails.time).toContain(formattedTime);
      expect.soft(cardDetails.reason).toContain(firstWorld);
      expect.soft(cardDetails.consultantName).toBe("Adeolu1 Ogungbesan");
      expect.soft(cardDetails.specialty).toBe(selectedSpeciality);
      //Verify the appointment card is visible on the dashboard
      await navbar.clickOnDashboardNavBar();
      
      //verify the appointment card details on the dashboard
      const cardDetailsDashboard=   await dashboardPage.fetchAppointCardOnDashboard(patientName)
      console.log(cardDetailsDashboard);
      expect.soft(cardDetailsDashboard.state.toLowerCase()).toBe("consulting");
      expect.soft(cardDetailsDashboard.status.toLowerCase()).toBe("checkedin");
      expect.soft(cardDetailsDashboard.date).toBe(`${getDateParts().day}/${getDateParts().month}/${getDateParts().year}`);
      expect.soft(cardDetailsDashboard.time).toBe(formattedTime);
      expect.soft(cardDetailsDashboard.consultantName).toBe("Adeolu1 Ogungbesan");
      expect.soft(cardDetails.reason).toContain(FormattedText[1]);
      expect.soft(cardDetails.specialty).toBe(selectedSpeciality);

    
   })
   test("TC 1.013 Check in patient for appointment from the patient details page Opthalmology and transfer for Outpatient Procedure", async ({ page }) => {
     const loginPage = new LoginPage(page);
    const selectLocation = new ModuleSelectorPage(page, "Front Desk");
    const navbar = new NavigationSideBarComponent(page);
    const patientListing = new FrontdeskPatientListingPage(page);
    const transferMaodal = new TransferModalPage(page);
    const patientDetailsPage = new PatientDetailsPage(page);
    const dashboardPage = new DashboardPage(page);
    const appointmentModalPage = new AppointmentModalPage(page);
    
    await page.goto(devUrl);
      await loginPage.selectLocation();
      await page.waitForURL('**/modules');
      // expect.soft(page.url()).toBe('https://dev.indigoemr.com/modules');
      await selectLocation.selectFrontDeskModule();
      //navigate to the listing page
      await navbar.clickOnPatientsNavBar()
      //click on the first check in button
      const patientName =await patientListing.getFirstPatientWithCheckIn()
      console.log("Patient Name: ", patientName);
      await patientListing.clickThePatientLinkText(patientName);
      //verify that the patient details page is opened
      await patientDetailsPage.verifyPatientDetailsPage(patientName);
      await patientDetailsPage.clickCheckinCheckoutBtn();
       //verify that the transfer modal is open
      const modalIsOpen = await transferMaodal.isModalOpen();
      expect.soft(modalIsOpen).toBe(true);
      // await transferMaodal.clickSpecialtyDropdown();
      const selectedSpeciality = await transferMaodal.selectSpeciality('Ophthalmology')
      await transferMaodal.clickOnConsultant()
      const selectedTimeSlot = await transferMaodal.selectTimeSlot()
      console.log("Selected Time Slot: ", selectedTimeSlot);
      const formattedTime = formatTimeRange(selectedTimeSlot)
      console.log("Formatted Time: ", formattedTime);
      //const formattedTime = selectedTimeSlot.replace(/\b(\d{1}):/g, '0$1:');
      console.log("Formatted time for assertion: " + formattedTime);
     const selectReason  =await transferMaodal.selectReason()
     console.log("Selected Reason: ", selectReason);
     const FormattedText = selectReason.match(/^\s*(\w+)/)
     const firstWorld =  FormattedText? FormattedText[1] : null
     console.log("First word of the reason: ", firstWorld);
      await transferMaodal.isConsultationFeeVisible()
      await transferMaodal.clickSubmitBtn();
      //verify that the select section modal is dislayed.
      const selectModal =await appointmentModalPage.isSelectSectionVisible()
       expect.soft(selectModal).toBeTruthy()
       //select section to transfer patient.
      const selectedSection = await appointmentModalPage.selectSection("Outpatient Procedure");
      expect.soft(selectedSection).toBe("outpatient procedure");
      await appointmentModalPage.clickConfirmSectionBtn();
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(10000);
        //verify that the success toast is visible
      const isSuccessToastVisible = await patientListing.isSuccessToastVisible();
     //expect.soft(isSuccessToastVisible).toBeTruthy();
     //check if modal is still open and then close it
     await transferMaodal.closeModalAndReturnToListing();
      await page.waitForTimeout(5000);
       //verify that the btn text of the patient was change to check out
      const btnText = await patientDetailsPage.verifyCheckinCheckoutBtnText("Check Out");
      expect.soft(btnText).toBe("check out")
      await page.waitForTimeout(5000);  
      //veify that the appointment card is visible on the patient details page    
       //Navigate to the appointment tab
      await patientDetailsPage.clickAppointmentNavigation();
      //Fetch the details on the appointment card
      const cardDetails = await patientDetailsPage.fetchAppointCardOnPatientDetailsPage(patientName); 
      console.log(cardDetails)
     //validate data on the card
      expect.soft(cardDetails.state.toLowerCase()).toBe(selectedSection.toLocaleLowerCase());
      expect.soft(cardDetails.status.toLowerCase()).toBe("checkedin");
      expect.soft(cardDetails.date).toBe(getDateParts().day + "/" + getDateParts().month + "/" + getDateParts().year);
      expect.soft(cardDetails.time).toBe(formattedTime);
      expect.soft(cardDetails.reason).toContain(firstWorld);
      expect.soft(cardDetails.consultantName).toBe("Adeolu1 Ogungbesan");
      expect.soft(cardDetails.specialty).toBe(selectedSpeciality);
      //Verify the appointment card is visible on the dashboard
      await navbar.clickOnDashboardNavBar();
      
      //verify the appointment card details on the dashboard
      const cardDetailsDashboard=   await dashboardPage.fetchAppointCardOnDashboard(patientName)
      console.log(cardDetailsDashboard);
      expect.soft(cardDetailsDashboard.state.toLowerCase()).toBe(selectedSection.toLocaleLowerCase());
      expect.soft(cardDetailsDashboard.status.toLowerCase()).toBe("checkedin");
      expect.soft(cardDetailsDashboard.date).toBe(`${getDateParts().day}/${getDateParts().month}/${getDateParts().year}`);
      expect.soft(cardDetailsDashboard.time).toBe(formattedTime);
      expect.soft(cardDetailsDashboard.consultantName).toBe("Adeolu1 Ogungbesan");
      expect.soft(cardDetails.reason).toContain(FormattedText[1]);
      expect.soft(cardDetails.specialty).toBe(selectedSpeciality)

    

   })
   test('TC 1.014 Filter and search by patient name and opens details', async ({
  page,
}) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  const patientDetailsPage = new PatientDetailsPage(page);
  const selectLocation = new ModuleSelectorPage(page, 'Front Desk');
  const patientName = 'Helen Apar';
  await page.goto(devUrl);
  await loginPage.selectLocation();
  await page.waitForURL('**/modules');
  // expect.soft(page.url()).toBe('https://dev.indigoemr.com/modules');
  await selectLocation.selectFrontDeskModule();
  //search for the patient in the dashboard & click on the patient name
  await dashboardPage.filterByName();
  await dashboardPage.searchPatient(patientName);
  await dashboardPage.patientNameSearchResultLocator.waitFor({
    state: 'visible',
  });
  const isPatientFound =
    await dashboardPage.patientNameSearchResultLocator.isVisible();
  await page.locator(`//span[text()='${patientName}']`).click();
  // Verify that the patient details page is displayed
  await page.waitForTimeout(5000);
  expect(patientDetailsPage.verifyPatientDetailsPage).toBeTruthy();
  //verify the patient name | Mrn in the patient details page
  const patientNameInDetails = await patientDetailsPage.getPatientNameAndMrn();
  expect(patientNameInDetails).toContain(patientName);
  await patientDetailsPage.clickAppointmentNavigation();
  await page.waitForTimeout(5000);

  })   
test("TC1.015 Cancel Appointment - Verify user can successfully cancel an appointment", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const selectLocation = new ModuleSelectorPage(page, "Front Desk");
        const navbar = new NavigationSideBarComponent(page);
        const patientListing = new FrontdeskPatientListingPage(page);
        const transferModal = new TransferModalPage(page);
        const checkoutPage = new CheckoutPatientPage(page);
        const appointmentModalPage = new AppointmentModalPage(page);
    
        // Step 1: Login and navigate
        await page.goto(devUrl);
        await loginPage.selectLocation();
        await page.waitForURL("**/modules");
        await selectLocation.selectFrontDeskModule();
        await navbar.clickOnPatientsNavBar();
        await checkoutPage.clickPatientbtn();
        await checkoutPage.clickAppointmentTab();
        await checkoutPage.handleAppointment();
        await checkoutPage.verifySuccessMessage();
//           })   
// test("TC1.015 Cancel Appointment - Verify that the appointment card is labeled 'Canceled' after successful cancelation", async ({ page }) => {
//         const loginPage = new LoginPage(page);
//         const selectLocation = new ModuleSelectorPage(page, "Front Desk");
//         const navbar = new NavigationSideBarComponent(page);
//         const patientListing = new FrontdeskPatientListingPage(page);
//         const transferModal = new TransferModalPage(page);
//         const checkoutPage = new CheckoutPatientPage(page);
//         const appointmentModalPage = new AppointmentModalPage(page);
    
//         // Step 1: Login and navigate
//         await page.goto(devUrl);
//         await loginPage.selectLocation();
//         await page.waitForURL("**/modules");
//         await selectLocation.selectFrontDeskModule();
//         await navbar.clickOnPatientsNavBar();
//         await checkoutPage.clickPatientbtn();
//         await checkoutPage.clickAppointmentTab();
//         await checkoutPage.handleAppointment();
//         await checkoutPage.verifySuccessMessage();
//         await checkoutPage.verifyCanceledShowsOnCard();
})   
test("TC1.016 Cancel Appointment - Verify cancellation confirmation modal/pop-up is displayed", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const selectLocation = new ModuleSelectorPage(page, "Front Desk");
        const navbar = new NavigationSideBarComponent(page);
        const patientListing = new FrontdeskPatientListingPage(page);
        const transferModal = new TransferModalPage(page);
        const checkoutPage = new CheckoutPatientPage(page);
        const appointmentModalPage = new AppointmentModalPage(page);
    
        // Step 1: Login and navigate
        await page.goto(devUrl);
        await loginPage.selectLocation();
        await page.waitForURL("**/modules");
        await selectLocation.selectFrontDeskModule();
        await navbar.clickOnPatientsNavBar();
        await checkoutPage.clickPatientbtn();
        await checkoutPage.clickAppointmentTab();
        await checkoutPage.clickAppointmentCard();
        await checkoutPage.cickCancelAppointmentBtn();
        await checkoutPage.cancelationConfirmation();
})   
test("TC1.017 Cancel Appointment - Verify user can decline/click “Cancel” on cancel confirmation", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const selectLocation = new ModuleSelectorPage(page, "Front Desk");
        const navbar = new NavigationSideBarComponent(page);
        const patientListing = new FrontdeskPatientListingPage(page);
        const transferModal = new TransferModalPage(page);
        const checkoutPage = new CheckoutPatientPage(page);
        const appointmentModalPage = new AppointmentModalPage(page);
    
        // Step 1: Login and navigate
        await page.goto(devUrl);
        await loginPage.selectLocation();
        await page.waitForURL("**/modules");
        await selectLocation.selectFrontDeskModule();
        await navbar.clickOnPatientsNavBar();
        await checkoutPage.clickPatientbtn();
        await checkoutPage.clickAppointmentTab();
        await checkoutPage.clickAppointmentCard();
        await checkoutPage.cickCancelAppointmentBtn();
        await checkoutPage.cancelationConfirmation();
        await checkoutPage.clickCancelAppointmentModalBtn();

})   
test("TC1.018 Edit Appointment when specialty changes", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const selectLocation = new ModuleSelectorPage(page, "Front Desk");
        const navbar = new NavigationSideBarComponent(page);
        const patientListing = new FrontdeskPatientListingPage(page);
        const transferModal = new TransferModalPage(page);
        const checkoutPage = new CheckoutPatientPage(page);
        const appointmentModalPage = new AppointmentModalPage(page);
    
        // Step 1: Login and navigate
        await page.goto(devUrl);
        await loginPage.selectLocation();
        await page.waitForURL("**/modules");
        await selectLocation.selectFrontDeskModule();
        await navbar.clickOnPatientsNavBar();
        await checkoutPage.clickPatientbtn()
        await checkoutPage.clickAppointmentTab()
        await checkoutPage.accessAppointmentCard()
        await checkoutPage.clickRescheduleBtn()
        await checkoutPage.selectSpecialtyDropdown("General Practice")
        await checkoutPage.selectWhomToSeeDropdown("Okonkwo mercy")
        await checkoutPage.selectTimeDropdown()
        await checkoutPage.updateAppointment()
})   
test("TC1.019 Edit Appointment when date of appointment changes", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const selectLocation = new ModuleSelectorPage(page, "Front Desk");
        const navbar = new NavigationSideBarComponent(page);
        const patientListing = new FrontdeskPatientListingPage(page);
        const transferModal = new TransferModalPage(page);
        const checkoutPage = new CheckoutPatientPage(page);
        const appointmentModalPage = new AppointmentModalPage(page);
    
        // Step 1: Login and navigate
        await page.goto(devUrl);
        await loginPage.selectLocation();
        await page.waitForURL("**/modules");
        await selectLocation.selectFrontDeskModule();
        await navbar.clickOnPatientsNavBar();
        await checkoutPage.clickPatientbtn()
        await checkoutPage.clickAppointmentTab()
        await checkoutPage.accessAppointmentCard()
        await checkoutPage.clickRescheduleBtn()
        await checkoutPage.selectSpecialtyDropdown("General Practice")
        await checkoutPage.selectMonthDropdown()
        await checkoutPage.selectWhomToSeeDropdown("Okonkwo mercy")
        await checkoutPage.selectTimeDropdown()
        await checkoutPage.updateAppointment()
})   
test("TC1.020 User should not be able to Edit Appointment when Update button is disabled", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const selectLocation = new ModuleSelectorPage(page, "Front Desk");
        const navbar = new NavigationSideBarComponent(page);
        const patientListing = new FrontdeskPatientListingPage(page);
        const transferModal = new TransferModalPage(page);
        const checkoutPage = new CheckoutPatientPage(page);
        const appointmentModalPage = new AppointmentModalPage(page);
    
        // Step 1: Login and navigate
        await page.goto(devUrl);
        await loginPage.selectLocation();
        await page.waitForURL("**/modules");
        await selectLocation.selectFrontDeskModule();
        await navbar.clickOnPatientsNavBar();
        await checkoutPage.clickPatientbtn()
        await checkoutPage.clickAppointmentTab()
        await checkoutPage.accessAppointmentCard()
        await checkoutPage.clickRescheduleBtn()
        await checkoutPage.selectSpecialtyDropdown("General Practice")
        await checkoutPage.selectMonthDropdown()
        await appointmentModalPage.verifyUpdateButtonIsDisabled()
        })   
test("TC1.021 User should not be able to Edit Appointment when slot is 0", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const selectLocation = new ModuleSelectorPage(page, "Front Desk");
        const navbar = new NavigationSideBarComponent(page);
        const patientListing = new FrontdeskPatientListingPage(page);
        const transferModal = new TransferModalPage(page);
        const checkoutPage = new CheckoutPatientPage(page);
        const appointmentModalPage = new AppointmentModalPage(page);
    
        // Step 1: Login and navigate
        await page.goto(devUrl);
        await loginPage.selectLocation();
        await page.waitForURL("**/modules");
        await selectLocation.selectFrontDeskModule();
        await navbar.clickOnPatientsNavBar();
        await checkoutPage.clickPatientbtn()
        await checkoutPage.clickAppointmentTab()
        await checkoutPage.accessAppointmentCard()
        await checkoutPage.clickRescheduleBtn()
        await appointmentModalPage.selectPreferredBranch('Demola Dental')
        await checkoutPage.selectSpecialtyDropdown("General Practice")
        await checkoutPage.selectMonthDropdown()
        await checkoutPage.selectWhomToSeeDropdown("Lemon Barry");
        await appointmentModalPage.verifyNoSlotsAvailableMessage()
});
test('TC 1.022 Filter and search by patient MRN and opens details', async ({
  page,
}) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  const patientDetailsPage = new PatientDetailsPage(page);
  const moduleSelector = new ModuleSelectorPage(page, 'Front Desk');
  const patientName = 'Helen Apar';

  await test.step('Login and open Front Desk module', async () => {
    await page.goto(devUrl);
    await loginPage.selectLocation();
    // await expect(page.url()).toBe("https://dev.indigoemr.com/modules");
    await moduleSelector.selectFrontDeskModule();
    await expect(page).toHaveURL(
      'https://dev.indigoemr.com/frontdesk/dashboard'
    );
    // await expect(dashboardPage.header).toBeVisible();
  });

  await test.step('Filter by MRN and open patient details', async () => {
    await dashboardPage.filterByMRN();
    await dashboardPage.searchPatient(patientName);
    // Wait for and validate search results contain the exact patient
    await expect(dashboardPage.patientNameSearchResultLocator).toBeVisible();
    await expect(dashboardPage.patientNameSearchResultLocator).toContainText(
      patientName
    );
    await page.locator(`//span[text()='${patientName}']`).click();
    const patientNameInDetails =
      await patientDetailsPage.getPatientNameAndMrn();
    expect(patientNameInDetails).toContain(patientName);
    await patientDetailsPage.clickAppointmentNavigation();
    await page.waitForTimeout(5000);

    const { test, expect } = require("@playwright/test");

  
  });
});