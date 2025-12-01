import { expect, Locator, Page } from "@playwright/test";
import { th } from "@faker-js/faker";
import { AssertionError } from "assert";
import {getFutureDate} from "../../utils/dateutils";

export class PatientDetailPage{
   
    readonly page: Page;
    readonly appointmentLocator: Locator
    readonly prescriptionLocator: Locator
    readonly vitalsLocator: Locator



constructor(page: Page) {
        this.page = page;
        this.appointmentLocator = page.getByRole('link', { name: 'Appointments' });
        this.prescriptionLocator= page.getByRole('button', { name: ' Prescription' });
        this.vitalsLocator = page.getByRole('button', { name: ' Vital Signs' });
}



async clickAppointment()
    {
        await this.appointmentLocator.click();
    }

    async clickPrescription()
    {
        await this.prescriptionLocator.click();
    }

    async clickVitals()
    {
        await this.vitalsLocator.click();
    }



    
}