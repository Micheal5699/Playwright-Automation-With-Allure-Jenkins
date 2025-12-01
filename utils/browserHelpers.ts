import { Page } from '@playwright/test';

export async function reloadOn404(page: Page) {
  if (await page.getByRole('button', { name: 'Refresh Page' }).first().isVisible()) {
    await page.getByRole('button', { name: 'Refresh Page' }).click();
    await page.waitForLoadState('networkidle');
  
     await reloadOn404(page);
  }
}