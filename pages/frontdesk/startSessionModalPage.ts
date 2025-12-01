import {expect, Locator, Page} from '@playwright/test';
export class StartSessionModalPage {
  readonly page: Page;
  readonly startSessionHeader: Locator;
  readonly startButton: Locator;
  readonly skipButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.startSessionHeader = page.locator("//h3[text()='Start Session']");
    this.startButton = page.getByRole('button', {name: 'Start'});
    this.skipButton = page.getByRole('button', {name: 'Skip'});
  }

  async handleSessionModal(action: 'Start' | 'Skip') {
    const button = this.page.getByRole('button', {name: action, exact: true});
    await button.click();

    if (action === 'Start') {
      await expect(
        this.page.locator("//h4[text()='Vital Signs']")
      ).toBeVisible();
    }
  }
}
