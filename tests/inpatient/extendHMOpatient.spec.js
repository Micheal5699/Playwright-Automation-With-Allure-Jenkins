import  { expect, request } from "@playwright/test";
import { LoginPage } from "../../pages/loginPage";
import { test } from "../../fixture/fixture-loader";
import { ModuleSelectorPage } from "../../pages/moduleSelectorPage";
const {ExtendHMOPatientPage} = require("../../pages/inpatient/extendHMOpatient");
const devUrl = 'https://dev.indigoemr.com';


test("TC1.001 Discharge an Private Patient successfully", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const selectLocation = new ModuleSelectorPage(page, "Front Desk");
        const extendHMOPatientPage = new ExtendHMOPatientPage(page);
        // Step 1: Login and navigate
        await page.goto(devUrl);
        await loginPage.selectLocation();
        await page.waitForURL("**/modules");
        await selectLocation.selectInpatientModule();
        await extendHMOPatientPage.clickAdmissionCardBtn();
        await extendHMOPatientPage.clickFilterDropdown();
        await extendHMOPatientPage.clickSponsorsHMOdropdown();
        await extendHMOPatientPage.clickAnchorHmo();
        await extendHMOPatientPage.clickApplyfilterBtn();
        await extendHMOPatientPage.clickTopPatient();
        await extendHMOPatientPage.clickAdmittedCardElipsisBtn();
        await extendHMOPatientPage.clickExtendAdmissionBtn();
        await extendHMOPatientPage.enterCheckOutDate();
        await extendHMOPatientPage.clickAdmitPatientBtn();
        await expect(page.getByText("Admission Successfully edited.").first()).toBeVisible();

})