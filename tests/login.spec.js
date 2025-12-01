const { expect } = require('@playwright/test');
import { test } from '../fixture/fixture-loader';
import { LoginPage } from '../pages/loginPage';
;
const devUrl = "https://dev.indigoemr.com";

test.skip()

test('test', async ({ page, user, context }) => {
  context.clearCookies();
  const loginPage  = new LoginPage(page);
await page.goto(devUrl);
  await loginPage.login(user.email,user.password)
  await loginPage.selectLocation();
  await page.waitForTimeout(5000);
   expect.soft(page.url()).toBe('https://dev.indigoemr.com/modules');

});
test("Login with invalid credentials", async ({ page, context }) => {
  context.clearCookies();
  const loginPage = new LoginPage(page);
  await page.goto(devUrl);
  await loginPage.login('adeolu@summitect.io','wrongpassword');
   expect.soft(page.url()).toBe('https://dev.indigoemr.com/login');
});