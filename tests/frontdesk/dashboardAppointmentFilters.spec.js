import {test, expect} from '@playwright/test';
import {LoginPage} from '../../pages/loginPage';
import {ModuleSelectorPage} from '../../pages/moduleSelectorPage';
import {DashboardPage} from '../../pages/frontdesk/dashboardPage';

const devUrl = 'https://dev.indigoemr.com';

test.describe('Dashboard Appointment Filters', () => {
  test.beforeEach(async ({page}) => {
    const loginPage = new LoginPage(page);
    const moduleSelector = new ModuleSelectorPage(page, 'Front Desk');

    await page.goto(devUrl);
    await loginPage.selectLocation();
    await moduleSelector.selectFrontDeskModule();
    await expect(page).toHaveURL(
      'https://dev.indigoemr.com/frontdesk/dashboard'
    );
  });

  test('filters by Reason', async ({page}) => {
    const dashboard = new DashboardPage(page);

    // Select first available Reason (or pass a specific option string)
    const chosenReason = await dashboard.selectFilterByLabel(
      'Reason',
      'Appointment'
    ); // e.g. 'Follow Up'
    const cards = dashboard.getAppointmentCards();

    await expect(cards.first()).toBeVisible();
    const count = await cards.count();
    for (let i = 0; i < count; i++) {
      const card = cards.nth(i);
      const reason = await dashboard.getCardField(card, 'REASON');
      expect(reason?.toLowerCase()).toContain(chosenReason.toLowerCase());
    }
  });

  test('filters by Whom To See', async ({page}) => {
    const dashboard = new DashboardPage(page);

    const chosenConsultant = await dashboard.selectFilterByLabel(
      'Whom To See',
      'Test Indigo'
    ); // or pass 'Adeolu1 Ogungbesan'
    const cards = dashboard.getAppointmentCards();
    await expect(cards.first()).toBeVisible();
    const count = await cards.count();
    for (let i = 0; i < count; i++) {
      const card = cards.nth(i);
      const consultant = await dashboard.getCardField(card, 'CONSULTANT');
      expect(consultant?.toLowerCase()).toContain(
        chosenConsultant.toLowerCase()
      );
    }
  });

  test('filters by Specialty', async ({page}) => {
    const dashboard = new DashboardPage(page);

    const chosenSpecialty = await dashboard.filterAppointmentBySpecialty(); // or pass 'Ophthalmology'
    const cards = dashboard.getAppointmentCards();

    await expect(cards.first()).toBeVisible();
    const count = await cards.count();
    for (let i = 0; i < count; i++) {
      const card = cards.nth(i);
      const specialty = await dashboard.getCardField(card, 'SPECIALTY');
      expect(specialty?.toLowerCase()).toContain(chosenSpecialty.toLowerCase());
    }
  });

  test('combines filters (Specialty + Whom To See)', async ({page}) => {
    const dashboard = new DashboardPage(page);

    const chosenSpecialty = await dashboard.filterBySpecialty();
    const chosenConsultant = await dashboard.filterByWhomToSee();

    const cards = dashboard.getAppointmentCards();
    await expect(cards.first()).toBeVisible();

    const count = await cards.count();
    for (let i = 0; i < count; i++) {
      const card = cards.nth(i);
      const specialty = await dashboard.getCardField(card, 'SPECIALTY');
      const consultant = await dashboard.getCardField(card, 'CONSULTANT');
      expect(specialty?.toLowerCase()).toContain(chosenSpecialty.toLowerCase());
      expect(consultant?.toLowerCase()).toContain(
        chosenConsultant.toLowerCase()
      );
    }
  });
});
