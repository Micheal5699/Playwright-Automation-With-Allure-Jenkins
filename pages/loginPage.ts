import { expect, Locator, Page } from "@playwright/test";
const  baseUrl = "https://dev.indigoemr.com/login";
const  onboardUrl =  "https://staging.indigoemr.com/reset-password?";



export class LoginPage {
  readonly page: Page;
  readonly emailLocator: Locator;
  readonly passwordLocator: Locator;
  readonly loginLocator: Locator;
  readonly selectLocationLocator: Locator;
  readonly luthLocator: Locator;
  readonly continueLocator: Locator;

constructor(page: Page) {
    this.page = page;
    this.emailLocator = page.getByPlaceholder('johndoe@gmail.com');
    this.passwordLocator = page.getByPlaceholder('********');
    this.loginLocator = page.getByRole('button', { name: 'Login' });
    this.selectLocationLocator=page.getByText('Select Location', { exact: true })
    this.luthLocator = page.getByText('Luth', { exact: true });
    this.continueLocator = page.getByRole('button', { name: 'Continue' });
}
async login(email: string, password: string) {
    await this.page.goto(baseUrl);
    await this.emailLocator.click()
    await this.emailLocator.fill(email);
    await this.passwordLocator.click()
    await this.passwordLocator.fill(password);
    await this.loginLocator.click();
 
}
async selectLocation() {
   await this.selectLocationLocator.click({force:true});
    await this.luthLocator.click();
    await this.continueLocator.click();
}
}