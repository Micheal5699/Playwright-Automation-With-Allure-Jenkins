import  { expect, request } from "@playwright/test";
import { LoginPage } from "../../pages/loginPage";
import { test } from "../../fixture/fixture-loader";
import { ModuleSelectorPage } from "../../pages/moduleSelectorPage";
const {ExtendPrivatePatientPage} = require("../../pages/inpatient/extendPrivatePatient");
const { getRandomPrivateName } = require("../../utils/PrivateAndHMOutils");
const devUrl = 'https://dev.indigoemr.com';


test("TC1.001 Discharge an Private Patient successfully", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const selectLocation = new ModuleSelectorPage(page, "Front Desk");
        const extendPrivatePatientPage = new ExtendPrivatePatientPage(page);
        const randomPrivate = getRandomPrivateName();
        // Step 1: Login and navigate
        await page.goto(devUrl);
        await loginPage.selectLocation();
        await page.waitForURL("**/modules");
        await selectLocation.selectInpatientModule();
        await extendPrivatePatientPage.clickAdmissionCardBtn();
        await extendPrivatePatientPage.clickTopPatient();
        await extendPrivatePatientPage.clickAdmittedCardElipsisBtn();
        await extendPrivatePatientPage.clickExtendAdmissionBtn();
        await extendPrivatePatientPage.enterCheckOutDate();
        await extendPrivatePatientPage.clickAdmitPatientBtn();
        await expect(page.getByText("Admission Successfully edited.").first()).toBeVisible();

})