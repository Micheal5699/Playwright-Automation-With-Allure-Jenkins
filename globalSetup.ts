import { request,chromium, expect, Page } from'@playwright/test';
import { LoginPage } from './pages/loginPage';


const loginPayload = {
  username: "adeolu@summitech.io",
  password: "Password1@",
  type: "clientStaff"
}


// async function globalSetup() {

/*  const apiContext = await request.newContext();
   const loginResponse = await apiContext.post('https://dev-api.indigoemr.com/v2/login', {
    headers: {
      'Content-Type': 'application/json; charset=utf-8'

  },
  data: loginPayload  
});
// expect.soft(loginResponse.ok()).toBeTruthy();
  const loginResponseJson = await loginResponse.json();
 
  const storageState = await apiContext.storageState({path: './login-setup.json'});
  console.log('Login cookies:', storageState);
  console.log('Login response:', loginResponseJson);
  await apiContext.dispose();
  // fs.writeFileSync('./login-setup.json', JSON.stringify(loginCookies, null, 2));
  console.log('Login cookies saved to login-setup.json');
 
  
},
*/
async function globalSetup() {
  const browser = await chromium.launch({headless: true});
  const context = await browser.newContext();
  const page: Page = await context.newPage();
  const loginPage = new LoginPage(page);
  await page.goto("https://dev.indigoemr.com/login");
  await page.waitForTimeout(5000);
  await loginPage.login("adeolu@summitech.io", "Password1@");
  await page.waitForLoadState('networkidle');
 // expect.soft(page.url()).toBe("https://dev.indigoemr.com/select-branch");
  
  //save the storage state to a file
  await context.storageState({ path: './login-setup.json' });
  await page.waitForTimeout(5000);
  await browser.close()
} 

export default globalSetup
