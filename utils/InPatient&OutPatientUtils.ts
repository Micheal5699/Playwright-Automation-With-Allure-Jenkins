import { faker } from '@faker-js/faker';

export function generateInpatientDrugData() {
  const drugType = "m";
  const dosage = faker.number.int({ min: 1, max: 10 }).toString();
  const unitOptions = ["Cup", "Capsules", "Cup", "Drops", "Gram", "Gel", "FTU"];
  const routeOptions = ["Mouth", "InterMuscular/Injection", "Intravenous/Injection", "Intravenous Push", "Subcutaneous"];
  const frequencyOptions = ["Once a day", "Twice a day", "three times a day", "Immediately", "4 hourly", "8 hourly", "10 hourly"];
  const durationOptions = ["1","2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30"];
  const note = faker.lorem.words(3);

  return {
    drugType,
    dosage,
    unit: faker.helpers.arrayElement(unitOptions),
    route: faker.helpers.arrayElement(routeOptions),
    frequency: faker.helpers.arrayElement(frequencyOptions),
    duration: faker.helpers.arrayElement(durationOptions),
    note
  };
}
