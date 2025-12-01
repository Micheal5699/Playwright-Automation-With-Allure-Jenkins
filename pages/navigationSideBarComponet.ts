import { Locator, Page } from "@playwright/test";

export class NavigationSideBarComponent{

    readonly page: Page;
    readonly navigationSideBarLocator: Locator;
    readonly navigationSwitchersLocator: Locator;
    readonly dasbbordNavBarLocator: Locator;
    readonly patientsNavBarLocator: Locator;
    readonly appointmentsNavBarLocator: Locator;
    readonly luthBranchNavBarLocator: Locator;
    readonly pharmacyNavBarLocator: Locator;
    readonly inventoryNavBarLocator: Locator;
    readonly billingNavBarLocator: Locator;
    readonly outpatientNavBarLocator: Locator;
    readonly labNavBarLocator: Locator;
    readonly inPatientNavBarLocator: Locator;
    readonly frontDeskNavBarLocator: Locator;
    readonly reportsNavBarLocator: Locator;
    


    






    constructor(page: Page) {
        this.page = page;
        this.navigationSideBarLocator = page.locator(".navigation-sidebar");
        this.navigationSwitchersLocator = page.locator(".navigation-switcher");
        this.dasbbordNavBarLocator = page.getByTitle("Dashboard");
        this.patientsNavBarLocator = page.getByTitle("Patients");
        this.appointmentsNavBarLocator = page.getByTitle("Appointments");
        this.luthBranchNavBarLocator = page.locator("//span[text()='Luth']//parent::li");
        this.pharmacyNavBarLocator = page.locator("//div[text()='frontdesk']//parent::li")
        this.billingNavBarLocator = page.locator("//div[text()='billing']//parent::li")
        this.outpatientNavBarLocator = page.locator("//div[text()='outpatient']//parent::li")
        this.frontDeskNavBarLocator=page.locator("//div[text()='frontdesk']//parent::li")
        this.inventoryNavBarLocator = page.locator("//div[text()='inventory']//parent::li")
        this.labNavBarLocator = page.locator("//div[text()='laboratory']//parent::li")
        this.inPatientNavBarLocator = page.locator("//div[text()='in-patient']//parent::li")
        this.outpatientNavBarLocator=page.locator("//div[text()='out-patient']//parent::li")
        this.reportsNavBarLocator = page.locator("//div[text()='report']//parent::li")

        


    }
    async clickOnDashboardNavBar() {
        await this.navigationSideBarLocator.hover();
        await this.dasbbordNavBarLocator.click();
    }
    async clickOnPatientsNavBar() {
        await this.navigationSideBarLocator.hover();
        await this.patientsNavBarLocator.click();

    }
    async clickOnAppointmentsNavBar(){
        await this.navigationSideBarLocator.hover();
        await this.appointmentsNavBarLocator.click();

    }

        
}