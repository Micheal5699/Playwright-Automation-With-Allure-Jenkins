import {test, request, expect} from '@playwright/test';
import {LoginPage} from '../../pages/loginPage';
import {ModuleSelectorPage} from '../../pages/moduleSelectorPage';
import {DashboardPage} from '../../pages/frontdesk/dashboardPage';
import {AppointmentModalPage} from '../../pages/frontdesk/appointmentModalPage';
import {OutPatientDashboardPage} from '../../pages/outpatient/outpatientDashboardPage';

const devUrl = 'https://dev.indigoemr.com';

test('Start patient session for GP', async ({page}) => {
  const loginPage = new LoginPage(page);
  const moduleSelector = new ModuleSelectorPage(page, 'OutPatients');
  const dashboardPage = new DashboardPage(page);
  const selectLocation = new ModuleSelectorPage(page, 'Front Desk');
  const appointmentModalPage = new AppointmentModalPage(page);
  const outpatientDashboard = new OutPatientDashboardPage(page);

  await page.goto(devUrl);
  await loginPage.selectLocation();
  await page.waitForTimeout(5000);
  // expect(page.url()).toBe('https://dev.indigoemr.com/modules');
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
  await selectLocation.selectOutpatientModule();
  await page.waitForTimeout(5000);
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveURL(
    'https://dev.indigoemr.com/out-patient/dashboard'
  );
  // await outpatientDashboard.clickAcceptPatientBtn(patientName);
  await expect(outpatientDashboard.startSessionBtnLocator).toBeVisible();
  const firstName = patientName.split(' ')[0];
  // await outpatientDashboard.getStartSessionBtnLocator('Adeshola').click();
  await outpatientDashboard.clickPatientCard(firstName);
  await page.waitForTimeout(5000);
  await expect(
    patientDetailsPage.appointmentNavigationBtnLocator
  ).toBeVisible();
  await page.pause();
});
test('Start Session for ophthamology vitals', async ({page}) => {
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
  const selectedSection = await appointmentModalPage.selectSection('vitals');
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

  // await outpatientDashboard.clickAcceptPatientBtn(patientName);
  await expect(outpatientDashboard.startSessionBtnLocator).toBeVisible();
  const firstName = patientName.split(' ')[0];
  // await outpatientDashboard.getStartSessionBtnLocator('Adeshola').click();
  await outpatientDashboard.clickPatientCard(firstName);
  await page.waitForTimeout(5000);
  await expect(
    patientDetailsPage.appointmentNavigationBtnLocator
  ).toBeVisible();
  await page.pause();
});
