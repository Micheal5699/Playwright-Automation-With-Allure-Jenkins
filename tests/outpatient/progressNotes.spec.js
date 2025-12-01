import {test, request, expect} from '@playwright/test';
import {LoginPage} from '../../pages/loginPage';
import {ModuleSelectorPage} from '../../pages/moduleSelectorPage';
import {DashboardPage} from '../../pages/frontdesk/dashboardPage';
import {AppointmentModalPage} from '../../pages/frontdesk/appointmentModalPage';
import {OutPatientDashboardPage} from '../../pages/outpatient/outpatientDashboardPage';
import {PatientDetailsPage} from '../../pages/outpatient/progressNotes';

const devUrl = 'https://dev.indigoemr.com';

test('Add delivery form', async ({page}) => {
  const loginPage = new LoginPage(page);
  const moduleSelector = new ModuleSelectorPage(page, 'OutPatients');
  const dashboardPage = new DashboardPage(page);
  const selectLocation = new ModuleSelectorPage(page, 'Front Desk');
  const appointmentModalPage = new AppointmentModalPage(page);
  const outpatientDashboard = new OutPatientDashboardPage(page);
  const patientDetailsPage = new PatientDetailsPage(page);
  const progressNotes = new PatientDetailsPage(page);

  await page.goto(devUrl);
  await loginPage.selectLocation();
  await page.waitForTimeout(5000);
  // expect(page.url()).toBe('https://dev.indigoemr.com/modules');
  await selectLocation.selectFrontDeskModule();
  // await dashboardPage.clickQuickBookAppointmentBtn();
  // await dashboardPage.clickOnSupportCloseIcon();
  // const headerText = await appointmentModalPage.getModalHeaderText();
  // expect(headerText).toBe('Book Appointment');
  // await appointmentModalPage.fillMrnField('1234567890');
  // await appointmentModalPage.selectMrnSuggestion();
  // const patientName = await appointmentModalPage.getPatientName();
  // await appointmentModalPage.selectSpeciality('GP');
  // await appointmentModalPage.selectTime(0);
  // await dashboardPage.clickOnSupportCloseIcon();
  // await appointmentModalPage.selectReasonForVisit();
  // //Get consultantion fee
  // const consultationFee = await appointmentModalPage.getConsultationFee();
  // console.log('Consultation Fee: ', consultationFee);
  // await appointmentModalPage.clickBookAppointmentBtn();
  // // Verify that the appointment was successfully booked
  // const notificationMessage =
  //   await dashboardPage.getAppointmentNotificationText();
  // expect(notificationMessage).toContain('New Appointment');
  // await page.waitForTimeout(5000);

  await page.goto('https://dev.indigoemr.com/out-patient/dashboard');
  await page.waitForTimeout(5000);
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveURL(
    'https://dev.indigoemr.com/out-patient/dashboard'
  );
  // await outpatientDashboard.clickAcceptPatientBtn(patientName);
  // await expect(outpatientDashboard.startSessionBtnLocator).toBeVisible();
  // const firstName = patientName.split(' ')[0];
  // await outpatientDashboard.clickPatientCard(firstName);

  // await expect(
  //   outpatientDashboard.getStartSessionBtnLocator('Ramon')
  // ).toBeVisible();
  await outpatientDashboard.clickPatientCard('Ramon');
  // await page.locator("//h3[contains(text(), 'Ramon Shanah')]").click();

  await page.waitForTimeout(5000);
  await expect(
    patientDetailsPage.appointmentNavigationBtnLocator
  ).toBeVisible();
  await patientDetailsPage.progressNoteBtnLocator.click();
  await page.waitForTimeout(5000);
  await patientDetailsPage.addEntryBtnLocator.click();
  await patientDetailsPage.selectEntryType('deliveryForm');
  await patientDetailsPage.nameInput.fill('Test');
  await patientDetailsPage.commentInput.fill(
    'Patient reported mild headache and fatigue.'
  );
  await patientDetailsPage.describeResultInput.fill(
    'Blood pressure within normal range. No abnormalities detected.'
  );
  await patientDetailsPage.employeeNameCell.fill('Dr. Chinedu Eze');
  await patientDetailsPage.attachmentNameInput.fill('Lab_Report_Oct2025.pdf');

  await patientDetailsPage.selectDate();
  await patientDetailsPage.submitButtonLocator.click();
});
test('Add progress Note Lemon', async ({page}) => {
  const loginPage = new LoginPage(page);
  const moduleSelector = new ModuleSelectorPage(page, 'OutPatients');
  const dashboardPage = new DashboardPage(page);
  const selectLocation = new ModuleSelectorPage(page, 'Front Desk');
  const appointmentModalPage = new AppointmentModalPage(page);
  const outpatientDashboard = new OutPatientDashboardPage(page);
  const patientDetailsPage = new PatientDetailsPage(page);
  const progressNotes = new PatientDetailsPage(page);

  await page.goto(devUrl);
  await loginPage.selectLocation();
  await page.waitForTimeout(5000);
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
  await outpatientDashboard.clickAcceptPatientBtn(patientName);
  await expect(outpatientDashboard.startSessionBtnLocator).toBeVisible();
  const firstName = patientName.split(' ')[0];
  await outpatientDashboard.clickPatientCard(firstName);
  await page.waitForTimeout(5000);
  await expect(
    patientDetailsPage.appointmentNavigationBtnLocator
  ).toBeVisible();
  await patientDetailsPage.progressNoteBtnLocator.click();
  await page.waitForTimeout(5000);
  await patientDetailsPage.addEntryBtnLocator.click();
  await patientDetailsPage.selectEntryType('progressNoteLemon');
  await patientDetailsPage.titleInput.fill('Patient Intake Summary');
  await patientDetailsPage.selectInput.fill('Option A');
  await patientDetailsPage.submitButtonLocator.click();
  //expect toast notification
  await expect(
    page.locator("//h3[contains(text(), 'progress Note Lemon')]").first()
  ).toBeVisible();
  // await expect(
  //   page.locator("h3[contains(text(), 'patient intake summary')]").first()
  // ).toBeVisible();
});
test('Add progress Note Kol', async ({page}) => {
  const loginPage = new LoginPage(page);
  const moduleSelector = new ModuleSelectorPage(page, 'OutPatients');
  const dashboardPage = new DashboardPage(page);
  const selectLocation = new ModuleSelectorPage(page, 'Front Desk');
  const appointmentModalPage = new AppointmentModalPage(page);
  const outpatientDashboard = new OutPatientDashboardPage(page);
  const patientDetailsPage = new PatientDetailsPage(page);
  const progressNotes = new PatientDetailsPage(page);

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
  await page.waitForTimeout(5000);
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveURL(
    'https://dev.indigoemr.com/out-patient/dashboard'
  );
  await outpatientDashboard.clickAcceptPatientBtn(patientName);
  await expect(outpatientDashboard.startSessionBtnLocator).toBeVisible();
  const firstName = patientName.split(' ')[0];
  await outpatientDashboard.clickPatientCard(firstName);
  // await outpatientDashboard.clickPatientCard('Ramon');
  // await expect(
  //   outpatientDashboard.getStartSessionBtnLocator('Marquise')
  // ).toBeVisible();
  // await outpatientDashboard.clickPatientCard('Marquise');

  await page.waitForTimeout(5000);
  await expect(
    patientDetailsPage.appointmentNavigationBtnLocator
  ).toBeVisible();
  await patientDetailsPage.progressNoteBtnLocator.click();
  await page.waitForTimeout(5000);
  await patientDetailsPage.addEntryBtnLocator.click();
  await patientDetailsPage.selectEntryType('progressNoteKol');
  await patientDetailsPage.progressNoteKolNameInput.fill('Sample Type');
  await patientDetailsPage.submitButtonLocator.click();
  //expect toast notification
  page.waitForLoadState('networkidle');
  await expect(
    page.locator("//h3[contains(text(), 'PROGRESS NOTE KOL')]").first()
  ).toBeVisible();
  // await expect(
  //   page.locator("h3[contains(text(), 'Sample Type')]").first()
  // ).toBeVisible();
});
test('Add progress Note', async ({page}) => {
  const loginPage = new LoginPage(page);
  const moduleSelector = new ModuleSelectorPage(page, 'OutPatients');
  const dashboardPage = new DashboardPage(page);
  const selectLocation = new ModuleSelectorPage(page, 'Front Desk');
  const appointmentModalPage = new AppointmentModalPage(page);
  const outpatientDashboard = new OutPatientDashboardPage(page);
  const patientDetailsPage = new PatientDetailsPage(page);
  const progressNotes = new PatientDetailsPage(page);

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
  await page.waitForTimeout(5000);
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveURL(
    'https://dev.indigoemr.com/out-patient/dashboard'
  );
  await outpatientDashboard.clickAcceptPatientBtn(patientName);
  await expect(outpatientDashboard.startSessionBtnLocator).toBeVisible();
  const firstName = patientName.split(' ')[0];
  await outpatientDashboard.clickPatientCard(firstName);

  // await expect(
  //   outpatientDashboard.getStartSessionBtnLocator('Marquise')
  // ).toBeVisible();
  // await outpatientDashboard.clickPatientCard('Ramon');

  await page.waitForTimeout(5000);
  await expect(
    patientDetailsPage.appointmentNavigationBtnLocator
  ).toBeVisible();
  await patientDetailsPage.progressNoteBtnLocator.click();
  await page.waitForTimeout(5000);
  await patientDetailsPage.addEntryBtnLocator.click();
  await patientDetailsPage.selectEntryType('progressNote');
  await patientDetailsPage.progressNoteTitleInput.fill(
    'Patient Progress Update'
  );
  await patientDetailsPage.progressNoteObservationInput.fill(
    'Patient reported mild dizziness and fatigue.'
  );
  await patientDetailsPage.progressNoteOutcomeInput.fill(
    'Vitals stabilized. Recommended rest and hydration.'
  );
  await patientDetailsPage.saveButtonLocator.click();
  //expect toast notification
  await expect(
    page.locator("//p[contains(text(), 'Progress Note')]").first()
  ).toBeVisible();
});
test('Filter by Date Range', async ({page}) => {
  const loginPage = new LoginPage(page);
  const moduleSelector = new ModuleSelectorPage(page, 'OutPatients');
  const dashboardPage = new DashboardPage(page);
  const selectLocation = new ModuleSelectorPage(page, 'Front Desk');
  const appointmentModalPage = new AppointmentModalPage(page);
  const outpatientDashboard = new OutPatientDashboardPage(page);
  const patientDetailsPage = new PatientDetailsPage(page);
  const progressNotes = new PatientDetailsPage(page);

  await page.goto(devUrl);
  await loginPage.selectLocation();
  await page.waitForTimeout(5000);
  // expect(page.url()).toBe('https://dev.indigoemr.com/modules');
  await selectLocation.selectFrontDeskModule();
  // await dashboardPage.clickQuickBookAppointmentBtn();
  // await dashboardPage.clickOnSupportCloseIcon();
  // const headerText = await appointmentModalPage.getModalHeaderText();
  // expect(headerText).toBe('Book Appointment');
  // await appointmentModalPage.fillMrnField('1234567890');
  // await appointmentModalPage.selectMrnSuggestion();
  // const patientName = await appointmentModalPage.getPatientName();
  // await appointmentModalPage.selectSpeciality('GP');
  // await appointmentModalPage.selectTime(0);
  // await dashboardPage.clickOnSupportCloseIcon();
  // await appointmentModalPage.selectReasonForVisit();
  // //Get consultantion fee
  // const consultationFee = await appointmentModalPage.getConsultationFee();
  // console.log('Consultation Fee: ', consultationFee);
  // await appointmentModalPage.clickBookAppointmentBtn();
  // // Verify that the appointment was successfully booked
  // const notificationMessage =
  //   await dashboardPage.getAppointmentNotificationText();
  // expect(notificationMessage).toContain('New Appointment');
  // await page.waitForTimeout(5000);

  await page.goto('https://dev.indigoemr.com/out-patient/dashboard');
  await page.waitForTimeout(5000);
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveURL(
    'https://dev.indigoemr.com/out-patient/dashboard'
  );
  // await outpatientDashboard.clickAcceptPatientBtn(patientName);
  // await expect(outpatientDashboard.startSessionBtnLocator).toBeVisible();
  // const firstName = patientName.split(' ')[0];
  // await outpatientDashboard.clickPatientCard(firstName);

  // await expect(
  //   outpatientDashboard.getStartSessionBtnLocator('Marquise')
  // ).toBeVisible();
  await outpatientDashboard.clickPatientCard('Ramon');

  await page.waitForTimeout(5000);
  await expect(
    patientDetailsPage.appointmentNavigationBtnLocator
  ).toBeVisible();
  await patientDetailsPage.progressNoteBtnLocator.click();
  await page.waitForTimeout(5000);
  await patientDetailsPage.selectDateRange(
    page,
    'Sunday, October 5th, 2025',
    'Wednesday, October 15th, 2025'
  );
});
test('Search by Name', async ({page}) => {
  const loginPage = new LoginPage(page);
  const moduleSelector = new ModuleSelectorPage(page, 'OutPatients');
  const dashboardPage = new DashboardPage(page);
  const selectLocation = new ModuleSelectorPage(page, 'Front Desk');
  const appointmentModalPage = new AppointmentModalPage(page);
  const outpatientDashboard = new OutPatientDashboardPage(page);
  const patientDetailsPage = new PatientDetailsPage(page);
  const progressNotes = new PatientDetailsPage(page);

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
  await page.waitForTimeout(5000);
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveURL(
    'https://dev.indigoemr.com/out-patient/dashboard'
  );
  await outpatientDashboard.clickAcceptPatientBtn(patientName);
  await expect(outpatientDashboard.startSessionBtnLocator).toBeVisible();
  const firstName = patientName.split(' ')[0];
  await outpatientDashboard.clickPatientCard(firstName);

  // await expect(
  //   outpatientDashboard.getStartSessionBtnLocator('Marquise')
  // ).toBeVisible();
  // await outpatientDashboard.clickPatientCard('Marquise');

  await page.waitForTimeout(5000);
  await expect(
    patientDetailsPage.appointmentNavigationBtnLocator
  ).toBeVisible();
  await patientDetailsPage.progressNoteBtnLocator.click();
  await page.waitForTimeout(5000);
  await patientDetailsPage.addEntryBtnLocator.click();
  await patientDetailsPage.searchBar.fill('Progress Note');
});
