import {test, request, expect} from '@playwright/test';
import {LoginPage} from '../../pages/loginPage';
import {ModuleSelectorPage} from '../../pages/moduleSelectorPage';
import {DashboardPage} from '../../pages/frontdesk/dashboardPage';
import {AppointmentModalPage} from '../../pages/frontdesk/appointmentModalPage';
import {OutPatientDashboardPage} from '../../pages/outpatient/outpatientDashboardPage';
import {NavigationSideBarComponent} from '../../pages/navigationSideBarComponet';
import {PatientDetailsPage} from '../../pages/frontdesk/patientDetailsPage';
import {APIUtils} from '../../utils/APIUtils';

const devUrl = 'https://dev.indigoemr.com';
const appointmentPayLoad = {
  appointmentDate: '2025-10-02',
  appointmentPurpose: {
    name: 'Appt Test Mode',
    _id: 'appt_pu_62b59d6eaca8017d3a256840',
    price: 300000,
  },
  name: 'Appt Test Mode',
  price: 300000,
  _id: 'appt_pu_62b59d6eaca8017d3a256840',
  appointmentSlot: '16:27 - 16:34',
  appointmentState: {
    state: 'vitals',
    staffId: '63889bba61dce4734caf725a',
    staffName: 'Adeolu1 Ogungbesan',
  },
  staffId: '63889bba61dce4734caf725a',
  staffName: 'Adeolu1 Ogungbesan',
  state: 'vitals',
  branchId: '5fe0a45f0de6b9d5e097f1dd',
  consultant: '63889bba61dce4734caf725a',
  patient: {
    name: 'Helen Apar',
    mrn: 'Luth01261',
    _id: '68b962c4e63399d90f486cf1',
  },
  mrn: 'Luth01261',
  name: 'Helen Apar',
  _id: '68b962c4e63399d90f486cf1',
  section: 'vitals',
  specialty: 'generalPractice',
};
const loginPayload = {
  username: 'adeolu@summitech.io',
  password: 'Password1@',
  type: 'clientStaff',
};

test('Accept patient for GP', async ({page}) => {
  const loginPage = new LoginPage(page);
  const moduleSelector = new ModuleSelectorPage(page, 'OutPatients');
  const dashboardPage = new DashboardPage(page);
  const selectLocation = new ModuleSelectorPage(page, 'Front Desk');
  const appointmentModalPage = new AppointmentModalPage(page);
  const navbar = new NavigationSideBarComponent(page);
  const outpatientDashboard = new OutPatientDashboardPage(page);

  await page.goto(devUrl);
  await loginPage.selectLocation();
  await page.waitForTimeout(5000);
  expect(page.url()).toBe('https://dev.indigoemr.com/modules');
  await selectLocation.selectFrontDeskModule();
  await dashboardPage.clickQuickBookAppointmentBtn();
  await dashboardPage.clickOnSupportCloseIcon();
  const headerText = await appointmentModalPage.getModalHeaderText();
  expect(headerText).toBe('Book Appointment');
  await appointmentModalPage.fillMrnField('1234567890');
  await appointmentModalPage.selectMrnSuggestion();
  const patientName = await appointmentModalPage.getPatientName();
  await appointmentModalPage.selectSpeciality('GP');
  await appointmentModalPage.selectTime(0);
  await dashboardPage.clickOnSupportCloseIcon();
  await appointmentModalPage.selectReasonForVisit();
  //Get consultantion fee
  const consultationFee = await appointmentModalPage.getConsultationFee();
  console.log('Consultation Fee: ', consultationFee);
  await appointmentModalPage.clickBookAppointmentBtn();
  // Verify that the appointment was successfully booked
  const notificationMessage =
    await dashboardPage.getAppointmentNotificationText();
  expect(notificationMessage).toContain('New Appointment');
  await page.waitForTimeout(5000);

  await page.goto('https://dev.indigoemr.com/out-patient/dashboard');
  await page.waitForTimeout(5000);
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveURL(
    'https://dev.indigoemr.com/out-patient/dashboard'
  );
  await navbar.outpatientNavBarLocator.click();
  await expect(
    outpatientDashboard.getAcceptPatientBtnLocator('Marquise Boehm')
  ).toBeVisible();
  await outpatientDashboard.clickAcceptPatientBtn('Marquise Boehm');
  await expect(
    outpatientDashboard.getAcceptPatientBtnLocator('Marquise Boehm')
  ).toBeVisible();
  await expect(
    page.locator(
      "//div[contains(@class, 'Toastify__toast--success') and contains(., 'Appointment Accepted')]"
    )
  ).toBeVisible();
  await expect(
    outpatientDashboard.getAcceptPatientBtnLocator(patientName)
  ).toBeVisible();
  await outpatientDashboard.clickAcceptPatientBtn(patientName);
  await expect(
    outpatientDashboard.getAcceptedPatientLocator(patientName)
  ).toBeVisible();
});
test('Verify success toast notification after "Accept"', async ({page}) => {
  const loginPage = new LoginPage(page);
  const moduleSelector = new ModuleSelectorPage(page, 'OutPatients');
  const dashboardPage = new DashboardPage(page);
  const selectLocation = new ModuleSelectorPage(page, 'Front Desk');
  const appointmentModalPage = new AppointmentModalPage(page);
  const navbar = new NavigationSideBarComponent(page);
  const outpatientDashboard = new OutPatientDashboardPage(page);

  await page.goto(devUrl);
  await loginPage.selectLocation();
  await page.waitForTimeout(5000);
  expect(page.url()).toBe('https://dev.indigoemr.com/modules');
  await selectLocation.selectFrontDeskModule();
  await dashboardPage.clickQuickBookAppointmentBtn();
  await dashboardPage.clickOnSupportCloseIcon();
  const headerText = await appointmentModalPage.getModalHeaderText();
  expect(headerText).toBe('Book Appointment');
  await appointmentModalPage.fillMrnField('1234567890');
  await appointmentModalPage.selectMrnSuggestion();
  const patientName = await appointmentModalPage.getPatientName();
  await appointmentModalPage.selectSpeciality('GP');
  await appointmentModalPage.selectTime(0);
  await dashboardPage.clickOnSupportCloseIcon();
  await appointmentModalPage.selectReasonForVisit();
  //Get consultantion fee
  const consultationFee = await appointmentModalPage.getConsultationFee();
  console.log('Consultation Fee: ', consultationFee);
  await appointmentModalPage.clickBookAppointmentBtn();
  // Verify that the appointment was successfully booked
  const notificationMessage =
    await dashboardPage.getAppointmentNotificationText();
  expect(notificationMessage).toContain('New Appointment');
  await page.waitForTimeout(5000);

  await page.goto('https://dev.indigoemr.com/out-patient/dashboard');
  await page.waitForTimeout(5000);
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveURL(
    'https://dev.indigoemr.com/out-patient/dashboard'
  );
  await expect(
    outpatientDashboard.getAcceptPatientBtnLocator(patientName)
  ).toBeVisible();
  await outpatientDashboard.clickAcceptPatientBtn(patientName);
  await expect(
    outpatientDashboard.getAcceptedPatientLocator(patientName)
  ).toBeVisible();
  await expect(
    page.locator(
      "//div[contains(@class, 'Toastify__toast--success') and contains(., 'Appointment Accepted')]"
    )
  ).toBeVisible();
});
test('Verify Appointment Card Details', async ({page}) => {
  const loginPage = new LoginPage(page);
  const moduleSelector = new ModuleSelectorPage(page, 'OutPatients');
  const dashboardPage = new DashboardPage(page);
  const selectLocation = new ModuleSelectorPage(page, 'Front Desk');
  const appointmentModalPage = new AppointmentModalPage(page);
  const navbar = new NavigationSideBarComponent(page);
  const outpatientDashboard = new OutPatientDashboardPage(page);

  await page.goto(devUrl);
  await loginPage.selectLocation();
  await page.waitForTimeout(5000);
  expect(page.url()).toBe('https://dev.indigoemr.com/modules');
  await selectLocation.selectFrontDeskModule();
  await dashboardPage.clickQuickBookAppointmentBtn();
  await dashboardPage.clickOnSupportCloseIcon();
  const headerText = await appointmentModalPage.getModalHeaderText();
  expect(headerText).toBe('Book Appointment');
  await appointmentModalPage.fillMrnField('1234567890');
  await appointmentModalPage.selectMrnSuggestion();
  const patientName = await appointmentModalPage.getPatientName();
  await appointmentModalPage.selectSpeciality('GP');
  await appointmentModalPage.selectTime(0);
  await dashboardPage.clickOnSupportCloseIcon();
  await appointmentModalPage.selectReasonForVisit();
  //Get consultantion fee
  const consultationFee = await appointmentModalPage.getConsultationFee();
  console.log('Consultation Fee: ', consultationFee);
  await appointmentModalPage.clickBookAppointmentBtn();
  // Verify that the appointment was successfully booked
  const notificationMessage =
    await dashboardPage.getAppointmentNotificationText();
  expect(notificationMessage).toContain('New Appointment');
  await page.waitForTimeout(5000);

  await page.goto('https://dev.indigoemr.com/out-patient/dashboard');
  await page.waitForTimeout(5000);
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveURL(
    'https://dev.indigoemr.com/out-patient/dashboard'
  );
  await navbar.outpatientNavBarLocator.click();
  await expect(
    outpatientDashboard.getAcceptPatientBtnLocator('Marquise Boehm')
  ).toBeVisible();
  await outpatientDashboard.clickAcceptPatientBtn('Marquise Boehm');
  await expect(
    outpatientDashboard.getAcceptPatientBtnLocator('Marquise Boehm')
  ).toBeVisible();
  await expect(
    page.locator(
      "//div[contains(@class, 'Toastify__toast--success') and contains(., 'Appointment Accepted')]"
    )
  ).toBeVisible();
  await expect(
    outpatientDashboard.getAcceptPatientBtnLocator(patientName)
  ).toBeVisible();
  await outpatientDashboard.clickAcceptPatientBtn(patientName);
  await expect(
    outpatientDashboard.getAcceptedPatientLocator(patientName)
  ).toBeVisible();
  await expect(
    page.locator(
      "//div[contains(@class, 'Toastify__toast--success') and contains(., 'Appointment Accepted')]"
    )
  ).toBeVisible();
  await expect(outpatientDashboard.startSessionBtnLocator).toBeVisible();
  const firstName = patientName.split(' ')[0];
  await outpatientDashboard.fetchAppointCardOnDashboard(firstName);
});
test('Accept patient for ophthamology consultation', async ({page}) => {
  const loginPage = new LoginPage(page);
  const selectLocation = new ModuleSelectorPage(page, 'Front Desk');
  const dashboardPage = new DashboardPage(page);
  const appointmentModalPage = new AppointmentModalPage(page);
  const outpatientDashboard = new OutPatientDashboardPage(page);

  await page.goto(devUrl);
  await loginPage.selectLocation();
  await page.waitForTimeout(5000);
  // expect.soft(page.url()).toBe('https://dev.indigoemr.com/modules');
  await selectLocation.selectFrontDeskModule();
  await dashboardPage.clickOnSupportCloseIcon();

  await dashboardPage.clickQuickBookAppointmentBtn();
  const headerText = await appointmentModalPage.getModalHeaderText();
  expect.soft(headerText).toBe('Book Appointment');
  await appointmentModalPage.fillMrnField('1234567890');
  await appointmentModalPage.selectMrnSuggestion();
  const patientName = await appointmentModalPage.getPatientName();
  const selectedSpeciality = await appointmentModalPage.selectSpeciality(
    'Ophthalmology'
  );
  //Grab the appointment date
  const appointment = await appointmentModalPage.getAppointmentDate();
  console.log('Appointment Date: ', appointment);
  const formatedDate = `${appointment.day}/0${Number(appointment.month)}/${
    appointment.year
  }`;
  const selectedTime = await appointmentModalPage.selectTime(0);
  await dashboardPage.clickOnSupportCloseIcon();
  const appointmentPurpose = await appointmentModalPage.selectReasonForVisit();
  const FormattedText = appointmentPurpose.match(/^\S+/);
  console.log('Selected Time: ', selectedTime);
  //Get consultantion fee
  const consultationFee = await appointmentModalPage.getConsultationFee();
  console.log('Consultation Fee: ', consultationFee);

  await appointmentModalPage.clickBookAppointmentBtn();
  //verify that the select section modal is dislayed.

  //select section to transfer patient.
  const selectedSection = await appointmentModalPage.selectSection(
    'Consultant'
  );
  await appointmentModalPage.clickConfirmSectionBtn();
  await page.waitForTimeout(5000);

  const formattedTime = selectedTime.replace(/\b(\d{1}):/g, '0$1:');
  console.log('Formatted time for assertion: ' + formattedTime);
  await page.waitForTimeout(5000);
  await page.goto('https://dev.indigoemr.com/out-patient/dashboard');
  await page.waitForTimeout(5000);
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveURL(
    'https://dev.indigoemr.com/out-patient/dashboard'
  );
  await expect(
    outpatientDashboard.getAcceptPatientBtnLocator(patientName)
  ).toHaveCount(0);
});
test('Accept patient for ophthamology outpatient procedure', async ({page}) => {
  const loginPage = new LoginPage(page);
  const selectLocation = new ModuleSelectorPage(page, 'Front Desk');
  const dashboardPage = new DashboardPage(page);
  const appointmentModalPage = new AppointmentModalPage(page);
  const outpatientDashboard = new OutPatientDashboardPage(page);

  await page.goto(devUrl);
  await loginPage.selectLocation();
  await page.waitForTimeout(5000);
  // expect.soft(page.url()).toBe('https://dev.indigoemr.com/modules');
  await selectLocation.selectFrontDeskModule();
  await dashboardPage.clickOnSupportCloseIcon();

  await dashboardPage.clickQuickBookAppointmentBtn();
  const headerText = await appointmentModalPage.getModalHeaderText();
  expect.soft(headerText).toBe('Book Appointment');
  await appointmentModalPage.fillMrnField('1234567890');
  await appointmentModalPage.selectMrnSuggestion();
  const patientName = await appointmentModalPage.getPatientName();
  const selectedSpeciality = await appointmentModalPage.selectSpeciality(
    'Ophthalmology'
  );
  //Grab the appointment date
  const appointment = await appointmentModalPage.getAppointmentDate();
  console.log('Appointment Date: ', appointment);
  const formatedDate = `${appointment.day}/0${Number(appointment.month)}/${
    appointment.year
  }`;
  const selectedTime = await appointmentModalPage.selectTime(0);
  await dashboardPage.clickOnSupportCloseIcon();
  const appointmentPurpose = await appointmentModalPage.selectReasonForVisit();
  const FormattedText = appointmentPurpose.match(/^\S+/);
  console.log('Selected Time: ', selectedTime);
  //Get consultantion fee
  const consultationFee = await appointmentModalPage.getConsultationFee();
  console.log('Consultation Fee: ', consultationFee);

  await appointmentModalPage.clickBookAppointmentBtn();
  //verify that the select section modal is dislayed.

  //select section to transfer patient.
  const selectedSection = await appointmentModalPage.selectSection(
    'Outpatient Procedure'
  );
  await appointmentModalPage.clickConfirmSectionBtn();
  await page.waitForTimeout(5000);

  const formattedTime = selectedTime.replace(/\b(\d{1}):/g, '0$1:');
  console.log('Formatted time for assertion: ' + formattedTime);
  await page.waitForTimeout(5000);
  await page.goto('https://dev.indigoemr.com/out-patient/dashboard');
  await page.waitForTimeout(5000);
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveURL(
    'https://dev.indigoemr.com/out-patient/dashboard'
  );
  await expect(
    outpatientDashboard.getAcceptPatientBtnLocator(patientName)
  ).toHaveCount(0);
});
// Verify that the “Accept” button is visible only for appointments in Pending status.
// Verify that clicking “Accept” opens a confirmation modal or prompt. in progress 2 done
// Verify that the appointment details displayed on the confirmation modal are correct. 1
// Accept a valid pending appointment. 3
// Verify that accepted appointments no longer show an “Accept” button. 4
