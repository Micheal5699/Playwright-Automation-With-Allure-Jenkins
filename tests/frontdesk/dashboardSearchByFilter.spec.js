import {expect, request} from '@playwright/test';
import {LoginPage} from '../../pages/loginPage';
import {test} from '../../fixture/fixture-loader';
import {ModuleSelectorPage} from '../../pages/moduleSelectorPage';
import {DashboardPage} from '../../pages/frontdesk/dashboardPage';
import {AppointmentModalPage} from '../../pages/frontdesk/appointmentModalPage';
import {PatientDetailsPage} from '../../pages/frontdesk/patientDetailsPage';
import {NavigationSideBarComponent} from '../../pages/navigationSideBarComponet';
const devUrl = 'https://dev.indigoemr.com';

test('TC 3.001 Filter and search by patient name and opens details', async ({
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
  expect.soft(page.url()).toBe('https://dev.indigoemr.com/modules');
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
});
test('TC 3.002 Filter and search by patient MRN and opens details', async ({
  page,
}) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  const patientDetailsPage = new PatientDetailsPage(page);
  const moduleSelector = new ModuleSelectorPage(page, 'Front Desk');
  const mrnNumber = 'Luth01261';

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
    await dashboardPage.searchPatient(mrnNumber);
    // Wait for and validate search results contain the exact patient
    await expect(dashboardPage.patientNameSearchResultLocator).toBeVisible();
    await expect(dashboardPage.patientNameSearchResultLocator).toContainText(
      mrnNumber
    );
    // await page.locator(`//span[text()='${mrnNumber}']`).click();
    await page.getByText(`Luth012061 • ${mrnNumber} |`).click();
    const patientNameInDetails =
      await patientDetailsPage.getPatientNameAndMrn();
    expect(patientNameInDetails).toContain(mrnNumber);
    await patientDetailsPage.clickAppointmentNavigation();
    await page.waitForTimeout(5000);
  });
});
test('TC 3.003 Filter and search by patient phone number and opens details', async ({
  page,
}) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  const patientDetailsPage = new PatientDetailsPage(page);
  const moduleSelector = new ModuleSelectorPage(page, 'Front Desk');
  const phoneNumber = '2347035812645';

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

  await test.step('Filter by Phone and open patient details', async () => {
    await dashboardPage.filterByPhone();
    await dashboardPage.searchPatient(phoneNumber);
    // Wait for and validate search results contain the exact patient
    await expect(dashboardPage.patientNameSearchResultLocator).toBeVisible();
    await expect(dashboardPage.patientNameSearchResultLocator).toContainText(
      phoneNumber
    );
    await page.getByText(`${phoneNumber}`).first().click();
    // await page.getByText(`Luth01261 • ${phoneNumber} |`).click();
    const patientNameInDetails = page.locator('.content-table');
    expect(patientNameInDetails).toContainText(phoneNumber);
    await patientDetailsPage.clickAppointmentNavigation();
    await page.waitForTimeout(5000);
  });
});
test('TC 3.004 Filter and search by patient email and opens details', async ({
  page,
}) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  const patientDetailsPage = new PatientDetailsPage(page);
  const moduleSelector = new ModuleSelectorPage(page, 'Front Desk');
  const email = 'helen.lee@inboxkitten.com';

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

  await test.step('Filter by Email and open patient details', async () => {
    await dashboardPage.filterByPhone();
    await dashboardPage.searchPatient(email);
    // Wait for and validate search results contain the exact patient
    await expect(dashboardPage.patientNameSearchResultLocator).toBeVisible();
    await expect(dashboardPage.patientNameSearchResultLocator).toContainText(
      email
    );
    await page.getByText(`${email}`).first().click();
    // await page.getByText(`Luth01261 • ${email} |`).click();
    const patientNameInDetails = page.locator('.content-table');
    expect(patientNameInDetails).toContainText(email);
    await patientDetailsPage.clickAppointmentNavigation();
    await page.waitForTimeout(5000);
  });
});

test('TC 3.005 Appointment card search by patient name or mrn and opens details', async ({
  page,
}) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  const patientDetailsPage = new PatientDetailsPage(page);
  const moduleSelector = new ModuleSelectorPage(page, 'Front Desk');
  const name = 'Emmanuel';

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

  await test.step('Search by name ', async () => {
    await page.getByRole('textbox', {name: 'Search by name or mrn'}).fill(name);
    await expect(
      page.locator('div.tw-rounded-lg.tw-border', {hasText: name}).nth(1)
    ).toBeVisible();
    await page.waitForTimeout(5000);
  });
});
