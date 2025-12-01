import {Page} from "@playwright/test";
export const  getRandomName= async (page: Page) => 
    {
        //locate table
       const selector = "table[class='tw-w-full tw-caption-bottom tw-text-[14px]']" ;
       await page.waitForSelector(selector);
         //read the first child data(NAMES)
       const names = await page.$$eval(`${selector} tbody tr td:first-child`,cells => 
       cells.map(cell => cell.textContent?.trim() || ""));
        if (names.length == 0) 
           {
             throw new Error("No names found in the table");
           }
           //get random names(3) letters
     const randomIndex = Math.floor(Math.random() * names.length);
     const randomName = names[randomIndex];
     console.log(randomName)
     return randomName.slice(0,3)


//kkii


    }