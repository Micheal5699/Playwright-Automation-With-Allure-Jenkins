import { expect, Locator, Page } from "@playwright/test";
import { th } from "@faker-js/faker";
import { AssertionError } from "assert";
import {getFutureDate} from "../../utils/dateutils";

export class PrescriptionPage{
   
    readonly page: Page;
    readonly headertextLocator: Locator 
    readonly addPrescriptionLocator: Locator
    readonly addPrescriptionModalHeaderLocator: Locator
    readonly prescriptionTypelocator: Locator
    readonly drugLocator: Locator
    readonly selectDrugSearchLocator: Locator
    readonly lonart100Locator: Locator
    readonly doseLocator: Locator
    readonly unitSearchLocator: Locator
    readonly capsulesLocator: Locator
    readonly routesearchLocator: Locator
    readonly oralLocator: Locator
    readonly frequencyLocator: Locator
    readonly TIdLocator: Locator
    readonly durationLocator: Locator
    readonly selectdays: Locator
    readonly addItemLocator: Locator
    readonly submitBtnLocator: Locator
    readonly lensLocator: Locator
    readonly sphereRightEyeLocator: Locator
    readonly sphereLeftEyeLocator: Locator
    readonly SphereRightOptionLocator: Locator
    readonly SphereLeftOptionLocator: Locator
    readonly axisRightEyeLocator: Locator
    readonly axisLeftEyeLocator: Locator
    readonly axisRightOptionLocator: Locator
    readonly axisLeftOptionLocator: Locator
    readonly prismRightEyeLocator: Locator
    readonly prismLeftEyeLocator: Locator
    readonly prismRightOptionLocator: Locator
    readonly prismLeftOptionLocator: Locator
    readonly lensTypeLocator: Locator
    readonly lensTypeOptionLocator: Locator
    readonly lensCoatingLocator: Locator
    readonly lensCoatingOptionLocator: Locator
    readonly buyNewFrameLocator: Locator
    readonly selectProductLocator: Locator
    readonly selectProductOptionLocator: Locator
    readonly typeMaterialLocator: Locator
    readonly heightLocator: Locator
    readonly noPrescriptionLocator: Locator
    readonly appointmentDateLocator: Locator
    readonly raiseBilLocator: Locator
    readonly finalSubmitButtonLocator: Locator
    readonly contactLensLocator: Locator
    readonly sphereRightEyeCLensLocator: Locator
    readonly sphereRightCLOptionLocator: Locator
    readonly sphereLeftEyeCLensLocator: Locator
    readonly sphereLeftEyeCLOptionLocator: Locator
    readonly cylinderRightEyeCLensLocator: Locator
    readonly cylinderRightCLoptionLocator: Locator
    readonly cylinderLeftEyeCLensLocator: Locator
    readonly cylinderLeftCLOptionLocator: Locator
    readonly axisRightEyeCLensLocator: Locator
    readonly axisRightCLOptionLocator: Locator
    readonly axisLeftEyeCLensLocator: Locator
    readonly axisLeftCLOptionLocator: Locator
    readonly cLensTypeLocator: Locator
    readonly cLensTypeOptionLocator: Locator
    readonly cLensCoatingLocator: Locator
    readonly cLensCoatingOptionLocator: Locator
    readonly cLensMaterialLocator: Locator
    readonly cLensRaiseBillLocator: Locator
    readonly tempReadingLocator: Locator
    readonly tempReadingOptionLocator: Locator
    readonly temperatureLocator: Locator
    readonly confrimationLocator: Locator

    






   constructor(page: Page) {
        this.page = page;
        this.headertextLocator= page.getByRole('heading', { name: 'Prescriptions' });
        this.addPrescriptionLocator = page.locator("(//button[normalize-space()='Add Prescription'])[1]");
        this.addPrescriptionModalHeaderLocator = page.locator("(//h3[normalize-space()='Add Prescription'])[1]");
        this.prescriptionTypelocator= page.locator("(//div[@class='modal-select__input-container css-19bb58m'])[2]");
        this.drugLocator = page.getByRole('option', { name: 'Drug' });
        this.selectDrugSearchLocator= page.locator('.modal-select__control.css-13cymwt-control > .modal-select__value-container > .modal-select__input-container').first()
        this.lonart100Locator= page.getByRole('option', { name: 'lonart 1000g [387 in Stock]' })
        this.doseLocator= page.getByRole('textbox', { name: '0' });
        this.unitSearchLocator= page.locator('.tw-col-span-3 > .tw-relative > .form__select > .modal-select__control > .modal-select__value-container > .modal-select__input-container').first();
        this.capsulesLocator = page.getByRole('option', { name: 'Capsules' });
        this.routesearchLocator=  page.locator('div:nth-child(3) > .tw-relative > .form__select > .modal-select__control > .modal-select__value-container > .modal-select__input-container');
        this.oralLocator = page.getByRole('option', { name: 'Mouth/oral' });
        this.frequencyLocator= page.locator('div:nth-child(4) > .tw-relative > .form__select > .modal-select__control > .modal-select__value-container > .modal-select__input-container');
        this.TIdLocator= page.getByRole('option', { name: 'three times a day (TID)' });
        this.durationLocator= page.locator('div:nth-child(5) > .tw-relative > .form__select > .modal-select__control > .modal-select__value-container > .modal-select__input-container').first();
        this.selectdays = page.getByRole('option', { name: '5', exact: true });
        this.addItemLocator= page.getByRole('button', { name: ' Add Item' });
        this.submitBtnLocator= page.getByRole('button', { name: 'Submit' });
        this.lensLocator =page.getByRole('option', { name: 'Lenses', exact: true });
        this.sphereRightEyeLocator = page.locator('.modal-select__control.css-163tuk4-control > .modal-select__value-container > .modal-select__input-container').first();
        this.sphereLeftEyeLocator= page.locator('.tw-align-middle > .tw-space-y-2 > .form__select > .modal-select__control > .modal-select__value-container > .modal-select__input-container').first();
        this.SphereRightOptionLocator= page.getByRole('option', { name: '+0.50Ds' });
        this.SphereLeftOptionLocator = page.getByRole('option', { name: '+0.50Ds' });
        this.axisRightEyeLocator = page.locator('tr:nth-child(3) > td:nth-child(2) > div > .tw-space-y-2 > .form__select > .modal-select__control > .modal-select__value-container > .modal-select__input-container');
        this.axisLeftEyeLocator = page.locator('tr:nth-child(3) > td:nth-child(3) > .tw-space-y-2 > .form__select > .modal-select__control > .modal-select__value-container > .modal-select__input-container');
        this.axisRightOptionLocator= page.getByRole('option', { name: '1', exact: true });
        this.axisLeftOptionLocator = page.getByRole('option', { name: '1', exact: true });
        this.prismRightEyeLocator = page.locator('tr:nth-child(5) > td:nth-child(2) > div > .tw-space-y-2 > .form__select > .modal-select__control > .modal-select__value-container > .modal-select__input-container');
        this.prismLeftEyeLocator = page.locator('tr:nth-child(5) > td:nth-child(3) > .tw-space-y-2 > .form__select > .modal-select__control > .modal-select__value-container > .modal-select__input-container');
        this.prismRightOptionLocator= page.getByRole('option', { name: '4.00' });
        this.prismLeftOptionLocator = page.getByRole('option', { name: '4.00' });
        this.lensTypeLocator= page.locator('.modal-select__control.css-13cymwt-control > .modal-select__value-container > .modal-select__input-container').first();
        this.lensTypeOptionLocator = page.getByRole('option', { name: 'paraq' });
        this.lensCoatingLocator = page.locator('div:nth-child(2) > .tw-relative.tw-w-full.tw-overflow-auto > .tw-w-full.tw-caption-bottom > .\\[\\&_tr\\:last-child\\]\\:tw-border-0 > .tw-border-b > td:nth-child(2) > div > div > .tw-relative');
        this.lensCoatingOptionLocator = page.getByRole('option', { name: 'CELLUVISC UDV' });
        this.buyNewFrameLocator= page.locator('#buy_new');
        this.selectProductLocator = page.locator('.tw-relative.tw-w-full.tw-px-5.tw-bg-white.tw-py-3.tw-border > .form__select > .modal-select__control > .modal-select__value-container > .modal-select__input-container').first();
        this.selectProductOptionLocator = page.getByRole('option', { name: 'POST OP DARK GLASSES' });
        this.typeMaterialLocator= page.getByRole('textbox', { name: 'Enter Text here' });
        this.heightLocator= page.locator('input[name="opticalLens.details.height"]');
        this.noPrescriptionLocator= page.locator('label').filter({ hasText: 'No prescription necessary' }).locator('span');
        this.appointmentDateLocator = page.locator('button').filter({ hasText: 'Next Appointment Date *yyyy-' });
        this.raiseBilLocator= page.getByRole('checkbox', { name: 'Raise bill for lenses' });
        this.finalSubmitButtonLocator = page.locator('div').filter({ hasText: /^Submit$/ }).getByRole('button');
        this.contactLensLocator= page.getByRole('option', { name: 'Contact Lenses' });
        this.sphereRightEyeCLensLocator= page.locator('.modal-select__control.css-163tuk4-control > .modal-select__value-container > .modal-select__input-container').first();
        this.sphereRightCLOptionLocator=page.getByRole('option', { name: '+0.75Ds' });
        this.sphereLeftEyeCLensLocator= page.locator('.tw-align-middle > .tw-space-y-2 > .form__select > .modal-select__control > .modal-select__value-container').first();
        this.sphereLeftEyeCLOptionLocator= page.getByRole('option', { name: '+0.75Ds' });
        this.cylinderRightEyeCLensLocator= page.getByRole('row', { name: 'Cylinder Select Option Select' }).getByRole('cell').nth(1);
        this.cylinderRightCLoptionLocator= page.getByRole('option', { name: 'Assumenda' });
        this.cylinderLeftEyeCLensLocator =page.locator('tr:nth-child(2) > td:nth-child(3) > .tw-space-y-2 > .form__select > .modal-select__control > .modal-select__value-container > .modal-select__input-container');
        this.cylinderLeftCLOptionLocator= page.getByRole('option', { name: 'Assumenda' });
        this.axisRightEyeCLensLocator= page.locator('tr:nth-child(3) > td:nth-child(2) > div > .tw-space-y-2 > .form__select > .modal-select__control > .modal-select__value-container > .modal-select__input-container');
        this.axisRightCLOptionLocator= page.getByRole('option', { name: 'Aliquam ut' });
        this.axisLeftEyeCLensLocator= page.locator('tr:nth-child(3) > td:nth-child(3) > .tw-space-y-2 > .form__select > .modal-select__control > .modal-select__value-container > .modal-select__input-container');
        this.axisLeftCLOptionLocator= page.getByRole('option', { name: 'Aliquam ut' });
        this.cLensTypeLocator = page.locator('.modal-select__control.css-13cymwt-control > .modal-select__value-container > .modal-select__input-container').first();
        this.cLensTypeOptionLocator= page.getByRole('option', { name: 'paraq' });
        this.cLensCoatingLocator = page.locator('.modal-select__value-container.modal-select__value-container--is-multi.css-hlgwow > .modal-select__input-container').first();
        this.cLensCoatingOptionLocator= page.getByRole('option', { name: 'CELLUVISC UDV' });
        this.cLensMaterialLocator = page.getByRole('textbox', { name: 'Enter Text here' });
        this.cLensRaiseBillLocator= page.locator("(//button[@id='raiseBill'])[1]");
        this.tempReadingLocator= page.locator('.modal-select__control.css-13cymwt-control > .modal-select__value-container > .modal-select__input-container').first();
        this.tempReadingOptionLocator= page.getByRole('option', { name: 'Armpit' });
        this.temperatureLocator = page.locator('input[name="temperature"]');
        this.confrimationLocator = page.getByRole('button', { name: 'Proceed' });

    
    }
     


    async pageIsOpen()
    {
        await this.headertextLocator.isVisible();
    }
    async addPrescription()
    {
        await this.addPrescriptionLocator.click();
    }
    
    async popupisvissble()
    {
        await this.addPrescriptionModalHeaderLocator.isVisible();
    }
    
    async selectprescription()
    {
        await this.prescriptionTypelocator.click();
    }
    
    async clickDrug()
    {
        await this.drugLocator.click();
    }
    
    async typedrug()
    {
        await this.selectDrugSearchLocator.click();
        await this.selectDrugSearchLocator.type("lonart");
        //await this.page.waitForLoadState('networkidle');
        await this.lonart100Locator.click();
    
    }

    async assigndose()
    {
      await this.doseLocator.fill("6");
    
    }

    async selectUnit()
    {
      await this.unitSearchLocator.click();
      await this.capsulesLocator.click();
    
    }
    
    async selectRoute()
    {
      await this.routesearchLocator.click();
      await this.oralLocator.click();
    
    }
    
    async selectFrequency()
    {
      await this.frequencyLocator.click();
      await this.TIdLocator.click();
    
    }
    
    async selectDuration()
    {
      await this.durationLocator.click();
      await this.selectdays.click();
    }
    async addItem()
    {
      await this.addItemLocator.click();
    }
    
    async submit()
    {
      await this.submitBtnLocator.click();
    }
    
     async raiseBillSubmit()
     {
      await this.finalSubmitButtonLocator.click();
     }
   
    
   async clickOnLensOption()
   {
    await this.lensLocator.click();

   }

   async fillSphereRightEye()
   {
    await this.sphereRightEyeLocator.click();
    await this.SphereRightOptionLocator.click();
   }

   async fillSphereLeftEye()
   {
    await this.sphereLeftEyeLocator.click();
    await this.SphereLeftOptionLocator.click();
   }

   async fillAxisRightEye()
   {
    await this.axisRightEyeLocator.click();
    await this.axisRightOptionLocator.click();
   }

   async fillAxisLeftEye()
   {
    await this.axisLeftEyeLocator.click();
    await this.axisLeftOptionLocator.click();
   }

   async fillPrismRightEye()
   {
    await this.prismRightEyeLocator.click();
    await this.prismRightOptionLocator.click();
   }

   async fillPrismLeftEye()
   {
    await this.prismLeftEyeLocator.click();
    await this.prismLeftOptionLocator.click();
   }

   async fillLensType()
   {
    await this.lensTypeLocator.click();
    await this.lensTypeLocator.type('paraq')
    await this.lensTypeOptionLocator.click();
   }

   async fillLensCoating()
   {
    await this.lensCoatingLocator.click();
    await this.lensCoatingLocator.type("UV");
    await this.lensCoatingOptionLocator.click();
   }
   
   async clickOnBuyNewFrame()
   {
      await this.buyNewFrameLocator.click();
   }

   async fillProduct()
   {
    await this.selectProductLocator.click();
    await this.selectProductLocator.type("POST OP DARK GLASSES");
    await this.selectProductOptionLocator.click();
   }

    async fillMaterial()
    {
      await this.typeMaterialLocator.click();
      await this.typeMaterialLocator.type("plastic");
    }

    async fillHeight()
    {
      await  this.heightLocator.click();
      await this.heightLocator.type("3");
    }

    async clickOnNoPrescription()
    {
      await this.noPrescriptionLocator.click();
    }

    async setNextAppointmentDate()
    {
       const date = getFutureDate();
       await this.appointmentDateLocator.click();
       const selectDate = this.page.getByRole('button', { name: date });
       await selectDate.click();
    }
    
    async clickOnRaiseBill()
    {
      await this.raiseBilLocator.click();
    }   
    
    async clickOnContactLens()
    {
      await this.contactLensLocator.click();
    }
   
    async fillSphereRightEyeCLens()
    {
      await this.sphereRightEyeCLensLocator.click();
      await this.sphereRightCLOptionLocator.click();
    }

    async fillSphereLeftEyeCLens()
    {
      await this.sphereLeftEyeCLensLocator.click();
      await this.sphereLeftEyeCLOptionLocator.click();
    }

    async fillCylinderRightEyeCLens()
    {
      await this.cylinderRightEyeCLensLocator.click();
      await this.cylinderRightCLoptionLocator.click();
    }

    async fillCylinderLeftEyeCLens()
    {
      await this.cylinderLeftEyeCLensLocator.click();
      await this.cylinderLeftCLOptionLocator.click();
    }

    async fillAxisRightEyeCLens()
    {
      await this.axisRightEyeCLensLocator.click();
      await this.axisRightCLOptionLocator.click();
    }

    async fillAxisLeftEyeCLens()
    {
      await this.axisLeftEyeCLensLocator.click();
      await this.axisLeftCLOptionLocator.click();
    }


    async fillContactLensType()
    {
      await this.cLensTypeLocator.click();
      await this.cLensTypeLocator.type('paraq');
      await this.cLensTypeOptionLocator.click();
    }

    async fillContactLensCoating()
    {
      await this.cLensCoatingLocator.click();
      await this.cLensCoatingLocator.type('UV');
      await this.cLensCoatingOptionLocator.click();
    }

    async fillContactLensMaterial()
    {
      await this.cLensMaterialLocator.click();
      await this.cLensMaterialLocator.type('soft hydrogel');
    }

    async clickOnContactLensRaiseBill()
    {
      await this.cLensRaiseBillLocator.check();
    }
     
    async fillTempReading()
    {
      await this.tempReadingLocator.click();
      await this.tempReadingOptionLocator.click();
    }

    async enterTemperature()
    {
      await this.temperatureLocator.click();
      await this.temperatureLocator.type("36");
    }  

    async proceed()
    {
      await this.confrimationLocator.click();
    }
}   
