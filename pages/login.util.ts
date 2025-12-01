import { expect, Locator, Page } from '@playwright/test';
import { Md5 } from 'ts-md5';
import fetch from 'node-fetch';



const  baseUrl = "https://dev.indigoemr.com/login";
const  onboardUrl =  "https://dev.indigoemr.com/reset-password?";


export class LoginPage {
  readonly page: Page;
  readonly emailLocator: Locator;
  readonly passwordLocator: Locator;
  readonly loginLocator: Locator;


  readonly newPasswordLocator: Locator;
  readonly ConfirmPasswordLocator: Locator;
  readonly changePasswordLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailLocator = page.getByPlaceholder('johndoe@gmail.com');
    this.passwordLocator = page.getByPlaceholder('********');
    this.loginLocator = page.getByRole('button', { name: 'Login' });

    this.newPasswordLocator = page.getByLabel('New Password');
    this.ConfirmPasswordLocator = page.getByLabel('Confirm Password');
    this.changePasswordLocator = page.getByRole('button', { name: 'Change' });

  }

  async login( email, password) {
    await this.page.goto(baseUrl);
    await this.emailLocator.click()
    await this.emailLocator.fill(email);
    await this.passwordLocator.click()
    await this.passwordLocator.fill(password);
    await this.loginLocator.click();
  }

  async newUserlogin(email, password) {

    var hashed_email_address = Md5.hashStr(email);
    console.log(email);
    console.log(hashed_email_address);
    

    var requestOptions: RequestInit = {
        method: 'GET',
        redirect: 'follow',
        headers: {

            "apikey": "Wi0vYemHot6vNPr7X9WSeQpGGQY41fY7"
        }
    }

    const response = await fetch("https://api.apilayer.com/temp_mail/mail/id/"+hashed_email_address, requestOptions)


    const dataJson = await response.json()

    const data = JSON.stringify(dataJson);

    const dataText : string = data;

    const rExp : RegExp =/token=[\s\S]*?(?=[>])/m

    const datatoken = rExp.exec(dataText);

    if (datatoken !== null) {
        console.log (datatoken[0]);
        const token =  datatoken[0];
        await this.page.goto(onboardUrl+token);

    } else console.log ("no Token found")
    
    await this.newPasswordLocator.click()
    await this.newPasswordLocator.fill(password);
    await this.ConfirmPasswordLocator.click()
    await this.ConfirmPasswordLocator.fill(password);
    await this.changePasswordLocator.click();

    }


}