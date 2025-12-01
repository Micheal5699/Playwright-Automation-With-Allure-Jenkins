// @ts-check
const { expect } = require('@playwright/test');
import { test } from '../fixture/fixture-loader';
import { LoginPage } from '../pages/login.util';


const onboardingUrl = "https://sales.indigoemr.com/pricing";

test.skip();
test.use({  storageState: 'noAuth.json'});
test('Test login to indigo onbaording landing page', async ({ page }) => {
  await page.goto(onboardingUrl);
  await expect(page).toHaveTitle(/Indigo/);
});

// Generate Email and User Name 
// test('Generate Hospital Email and Username ', async ({generateHospitalData})=>{ 
//   generateHospitalData.email ;
//   generateHospitalData.name 
// });

test.use({  storageState: 'noAuth.json'});
test ('Test onboarding for a new-Hospital on a 0-100 plan without auto-renewal',async ({ page,hospitalData})=>{
      
  const hospitalEmail = hospitalData.data.email ;
  const hospitalName = hospitalData.data.name


  await page.goto(onboardingUrl);
  await page.locator('.pricing__details-plan > .btn').first().click();
  await page.getByPlaceholder('John Doe').click();
  await page.getByPlaceholder('John Doe').fill(hospitalName);

  await page.getByPlaceholder('john@example.com').click();
  await page.getByPlaceholder('john@example.com').fill(hospitalEmail);

  await page.getByPlaceholder('Indigo Hospitals').click();
  await page.getByPlaceholder('Indigo Hospitals').fill(hospitalName);

  await page.getByPlaceholder('123, Jane Doe Street, Antartica').click();
  await page.getByPlaceholder('123, Jane Doe Street, Antartica').fill(hospitalData.hospitalAddress);

  await page.getByPlaceholder('+234 801 234 5678').click();
  await page.getByPlaceholder('+234 801 234 5678').fill(hospitalData.phoneNumber);

  await page.getByLabel('I have read the terms of use and privacy policy and agree to continue').check();
  await page.getByRole('button', { name: 'Proceed To The Next Step' }).click();
  await page.getByLabel('Auto Top Up').check();
  await expect(page.getByLabel('Auto Top Up')).toBeChecked();

  await page.getByLabel('Auto Top Up').uncheck();
  await expect(page.getByLabel('Auto Top Up')).not.toBeChecked();

  await page.getByRole('button', { name: 'Subscribe' }).click();
  await expect( page.getByText('Successful')).toContainText("Successful");

  await page.waitForTimeout(5000);

});


 // Password Reset for First Time Hospital User
 test.use({  storageState: 'noAuth.json'});

test ('Test Password Reset',async ({ page,hospitalData,user,})=>{

  const hospitalEmail = hospitalData.data.email ;
  const loginPage =  new LoginPage(page);


  await loginPage.newUserlogin(hospitalEmail,user.password);

  await expect(page.getByText('Password Reset Successful')).toContainText("Successful");
  await page.waitForTimeout(3000);

});


test.use({  storageState: 'noAuth.json'});

test ('Test First time Login - Tour ',async ({ page,hospitalData,user,})=>{  

  const hospitalEmail = hospitalData.data.email ;
  const loginPage =  new LoginPage(page);
  const hospitalName = hospitalData.data.name

  await loginPage.login(hospitalEmail,user.password);
  await page.getByRole('button', { name: 'Continue' }).click();


  await expect(page.getByText("Hi " + hospitalName + " - Welcome to Indigo",{exact:true},)).toContainText("Hi " + hospitalName);
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('button', { name: 'tour' }).click();


  await expect(page.getByRole('heading', { name: 'Hospital Setup' })).toContainText('Hospital Setup');
  await page.getByRole('button', { name: 'next' }).click();

  await expect(page.getByRole('heading', { name: 'Branch', exact: true })).toContainText('Branch');
  await page.getByRole('button', { name: 'next' }).click();

  await expect(page.getByRole('heading', { name: 'Department', exact: true })).toContainText('Department');
  await page.getByRole('button', { name: 'next' }).click();

  await expect(page.getByRole('heading', { name: 'Staffs', exact: true })).toContainText('Staffs');
  await page.getByRole('button', { name: 'next' }).click();

  await expect(page.getByRole('heading', { name: 'More Options', exact: true })).toContainText('More Options');
  await page.getByRole('button', { name: 'next' }).click();


  await expect(page.getByRole('heading', { name: 'Appointment Configuration', exact: true })).toContainText('Appointment Configuration');
  await page.getByRole('button', { name: 'next' }).click();

  await expect(page.locator('h2')).toContainText('HMO'); 
  await page.getByRole('button', { name: 'next' }).click();

  await expect(page.getByRole('heading', { name: 'InventorySettings Settings', exact: true })).toContainText('InventorySettings Settings');
  await page.getByRole('button', { name: 'next' }).click();

  await expect(page.getByRole('heading', { name: 'Patient List', exact: true })).toContainText('Patient List');
  await page.getByRole('button', { name: 'next' }).click();

  await expect(page.locator('h2')).toContainText('Branch Configuration');
  await page.getByRole('button', { name: 'next' }).click();

  await expect(page.getByRole('heading', { name: 'Patient Plans', exact: true })).toContainText('Patient Plans');
  await page.getByRole('button', { name: 'next' }).click();

  await expect(page.locator('h2')).toContainText('Bank');
  await page.getByRole('button', { name: 'next' }).click();

  await expect(page.locator('h2')).toContainText('Categories');
  await page.getByRole('button', { name: 'next' }).click();

  await expect(page.getByRole('heading', { name: 'Registration Customization' }).first()).toContainText('Registration Customization');
  await page.getByRole('button', { name: 'next' }).click();

  await expect(page.locator('h2')).toContainText('Medical Standards');
  await page.getByRole('button', { name: 'next' }).click();

  await expect(page.locator('h2')).toContainText('Admission Management')
  await page.getByRole('button', { name: 'next' }).click();

  await expect(page.locator('h2')).toContainText('Roles')
  await page.getByRole('button', { name: 'done' }).click();

});

test.use({  storageState: 'noAuth.json'});
test ('Test First time  Login - Setup ',async ({ page,hospitalData,user,})=>{  

  const hospitalEmail = hospitalData.data.email ;
  const loginPage =  new LoginPage(page);
  const hospitalName = hospitalData.data.name

  await loginPage.login(hospitalEmail,user.password);
  await page.getByRole('button', { name: 'Continue' }).click();

  await expect(page.getByText("Hi " + hospitalName + " - Welcome to Indigo",{exact:true},)).toContainText("Hi " + hospitalName);
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('button', { name: 'start' }).click();

  await test.step ('Test Upload Hospital Logo ', async()=>{

    await page.locator('input[name="hospital setup"]').setInputFiles('assets/logo_avatar_1.png');

    //remove logo
    await page.getByRole('heading', { name: 'remove logo' }).click();

    await expect(page.getByRole('img', { name: 'User Avatar' })).toHaveAttribute('src',"/static/media/camera.81797903.svg");


    await page.locator('input[name="hospital setup"]').setInputFiles('assets/logo_avatar_2.jpeg');
      
  });

  await test.step ('Test Change Hospital Primary and Secondary Colour ', async()=>{
    
    await page.locator('#secondary-color').nth(1).click();
    await page.locator('#secondary-color').nth(1).fill('#0f34a3');
    await page.locator('#primary-color').nth(1).click();
    await page.locator('#primary-color').nth(1).fill('#66b3c7');

    await page.getByRole('button', { name: 'Continue' }).click();

    //pending assertions
  });


  await test.step ('Test Add Branch Setup ', async()=>{

    await page.getByRole('button', { name: 'add branch' }).click();
    await page.getByPlaceholder('Enter branch name').fill(hospitalName + "_Branch");
    await page.getByPlaceholder('e.g johndoe@gmail.com').click();
    await page.getByPlaceholder('e.g johndoe@gmail.com').fill(hospitalName+"_branch@nuclene.com" );
    await page.getByPlaceholder('Enter phone number').click();
    await page.getByPlaceholder('Enter phone number').fill(user.phoneNumber);
    await page.getByText('Select Currency').click();
    await page.getByText('NGN', { exact: true }).click();
    await page.getByText('Type address here').click();
    await page.locator('#react-select-2-input').nth(1).fill('123 William');
    await page.getByText('123 William Street, New York, NY, USA', { exact: true }).click();
    await page.locator('i').nth(2).click();
    await page.locator('i').nth(3).click();
    await page.getByRole('button', { name: 'Save' }).click();

    await expect(page.getByText('Branch successfully added')).toContainText("Branch successfully added");
    await page.getByRole('button', { name: 'Continue' }).click();
    
    //await expect(page.getByText('Branches Setup Successfully')).toContainText("Branches Setup Successfully");


  });


  await test.step ('Test Add Department Setup ', async()=>{

    await page.getByRole('button', { name: 'Add departments' }).click();
    await page.getByPlaceholder('Enter department name').click();
    await page.getByPlaceholder('Enter department name').fill('Admin');
    await page.getByRole('button', { name: ' Add Another Department' }).click();
    await page.getByPlaceholder('Enter department name').click();
    await page.getByPlaceholder('Enter department name').fill('Sales');
    await page.getByRole('button', { name: ' Add Another Department' }).click();

    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText('Department(s) successfully added')).toContainText("Department(s) successfully added");

    await page.getByRole('button', { name: 'Continue' }).click();

  });

  await test.step ('Test Add Roles Setup ', async()=>{

    await page.getByRole('link', { name: 'Roles' }).click()
    await page.getByRole('button', { name: 'Add Role' }).click(); 
    await page.getByPlaceholder('Enter role title').click();
    await page.getByPlaceholder('Enter role title').press('CapsLock');
    await page.getByPlaceholder('Enter role title').fill('Superuser');

    await page.locator('div').filter({ hasText: 'Search...' }).nth(2).click();
    //await page.locator('form svg').click()
  

    await page.getByText('Can View Any Record', { exact: true }).click();
    await page.getByText('Can Add Any Record', { exact: true }).click();
    await page.getByText('Can Edit Any Record', { exact: true }).click();
    await page.getByText('Can Deactivate Any Record', { exact: true }).click(); 

    await page.locator('div').filter({ hasText: 'Add RoleCreate a new role' }).nth(2).click(); 
    
    await page.getByRole('button', { name: 'Save' }).click();

    await expect(page.getByText('Role successfully added')).toContainText("Role successfully added");

    await page.getByRole('button', { name: 'Continue' }).click();

  });

  await test.step ('Test Add Staff Setup ', async()=>{

    await page.getByRole('button', { name: 'Add staff' }).click();
    await page.getByPlaceholder('Enter staff name').fill(hospitalName + "  staff");
    await page.getByPlaceholder('johndoe@gmail.com').click();
    await page.getByPlaceholder('johndoe@gmail.com').fill(hospitalName + '-staff@nuclene.com');
    await page.getByPlaceholder('Enter phone number').click();
    await page.getByPlaceholder('Enter phone number').fill(user.phoneNumber);
    
    await page.getByText('Select departments').click();
    await page.locator('#react-select-2-option-0').click();
    
    await page.locator('div').filter({ hasText: 'Select locations' }).nth(2).click();
    await page.locator('div:nth-child(5) > .settings__form-group > .modal-select > .modal-select__control > .modal-select__indicators > .modal-select__indicator > .css-8mmkcg').click();
    await page.locator('#react-select-3-option-0').click();
    
    await page.locator('div').filter({ hasText: 'Select sections' }).nth(2).click(); 
    await page.locator('div:nth-child(6) > .settings__form-group > .modal-select > .modal-select__control > .modal-select__indicators > .modal-select__indicator > .css-8mmkcg').click(); //locator('div').filter({ hasText: 'Select sections' }).nth(1)
    await page.getByText('Consultant', { exact: true }).click();
   
   
    await page.locator('div').filter({ hasText: 'Select role' }).nth(2).click(); 
    await page.locator('.mt-0 > .row > .col-md-6 > div > .modal-select > .modal-select__control > .modal-select__indicators').first().click(); 
    await page.locator('#react-select-5-option-0').click();
    
    await page.locator('div').filter({ hasText: 'Select module' }).nth(2).click();
    await page.locator('div:nth-child(3) > .modal-select > .modal-select__control > .modal-select__indicators').click();
    await page.getByText('Frontdesk', { exact: true }).click();

    await page.locator('div:nth-child(3) > .modal-select > .modal-select__control > .modal-select__indicators').click();
    await page.getByText('Billing', { exact: true }).click();

    
    await page.locator('div:nth-child(3) > .modal-select > .modal-select__control > .modal-select__indicators').click();
    await page.getByText('Pharmacy', { exact: true }).click();
    
    await page.locator('div').filter({ hasText: 'Select specialty' }).nth(2).click();
    await page.locator('div:nth-child(5) > .modal-select > .modal-select__control > .modal-select__indicators').click();

    await page.getByText('General Practice', { exact: true }).click();
    await page.locator('div:nth-child(5) > .modal-select > .modal-select__control > .modal-select__indicators').click();
    await page.getByText('Ophthalmology', { exact: true }).click();
    await page.getByRole('button', { name: 'Save' }).click();

    await expect(page.getByText('Staff successfully added')).toContainText("Staff successfully added");

    await page.getByRole('button', { name: 'Finish' }).click();

  });

});
