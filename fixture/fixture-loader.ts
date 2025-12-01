import { test as base, Page } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { reloadOn404 } from '../utils/browserHelpers';

// --- Types ---
type GeneratedHospitalDataValue = {
  email: string;
  name: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  title: string;
  gender: string;
  DOB: string;
  year: string;
  month: string;
  day: string;
};

type HospitalDataValue = {
  name: string;
  data: {
    email: string;
    name: string;
  };
  hospitalAddress: string;
  phoneNumber: string;
  gender: string;
  DOB: string;
  title: string;
  year: string;
  month: string;
  day: string;
};

type UserDataValue = {
  title: string[];
  email: string;
  firstName: string;
  lastName: string;
  name: string;
  password: string;
  phoneNumber: string;
  role: string[];
  gender: string;
  DOB: string;
  year: string;
  month: string;
  day: string;
  nokName: string;
  nokPhoneNumber: string;
  nokEmail: string;
  nokAddress: string;
  nokRelationship: string;
  providerId?: string;
};

type CustomFixtures = {
  generateHospitalData: GeneratedHospitalDataValue;
  hospitalData: HospitalDataValue;
  user: UserDataValue;
};

// --- Constants ---
const roles = [
  'Can View Any Record', 'Can Add Any Record', 'Can Edit Any Record', 'Can Deactivate Any Record', 'Can View Audit Trail',
  // ... (rest of your roles)
  'Can Create Branch', 'Can View Branches'
];

// --- Combined Fixtures ---
export const test = base.extend<CustomFixtures & { page: Page }>({
  // Page fixture with reloadOn404 integration
  page: async ({ page }, use) => {
    page.on('framenavigated', async (frame) => {
      if (frame === page.mainFrame()) {
        await reloadOn404(page);
      }
    });
    await use(page);
  },

  generateHospitalData: [async ({}, use) => {
    const titleOptions = ['Mr', 'Mrs', 'Miss', 'Ms', 'Dr'];
    const selectedTitle = faker.helpers.arrayElement(titleOptions);
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const name = `${firstName} ${lastName}`;
    const email = faker.internet.email({ firstName, lastName }).toLowerCase();
    const phoneNumber = faker.phone.number({ style: 'national' });
    const gender = faker.person.sex();
    const birthDate = faker.date.birthdate();
    const year = birthDate.getFullYear().toString();
    const month = (birthDate.getMonth() + 1).toString();
    const day = birthDate.getDate().toString();
    const DOB = `${year}-${month}-${day}`;

    await use({
      title: selectedTitle,
      email,
      name,
      firstName,
      lastName,
      phoneNumber,
      gender,
      year,
      month,
      day,
      DOB,
    });
  }, { scope: 'test' }],

  hospitalData: async ({ generateHospitalData }, use) => {
    await use({
      name: generateHospitalData.name,
      data: {
        email: generateHospitalData.email,
        name: generateHospitalData.name,
      },
      hospitalAddress: "123, Jane Doe street",
      phoneNumber: generateHospitalData.phoneNumber,
      gender: generateHospitalData.gender,
      DOB: generateHospitalData.DOB,
      title: generateHospitalData.title,
      year: generateHospitalData.year,
      month: generateHospitalData.month,
      day: generateHospitalData.day,
    });
  },

  user: (() => {
    const birthDate = faker.date.birthdate();
    const year = birthDate.getFullYear().toString();
    const month = (birthDate.getMonth() + 1).toString();
    const day = birthDate.getDate().toString();
    const DOB = `${year}-${month}-${day}`;
    return {
      name: "Nelson",
      email: faker.internet.email({ firstName: "Nelson", lastName: "Test" }).toLowerCase(),
      password: "Password1@",
      phoneNumber: faker.phone.number({ style: 'national' }),
      role: roles,
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      title: [faker.helpers.arrayElement(['MR.', 'MRS.', 'Miss', 'MISS.', 'Dr.', 'ENGR.', 'BARR.', 'PROF', 'REV.'])],
      gender: faker.person.sex(),
      DOB,
      year,
      month,
      day,
      nokName: faker.person.firstName() + " " + faker.person.lastName(),
      nokPhoneNumber: faker.phone.number({ style: 'national' }),
      nokEmail: faker.internet.email({ firstName: faker.person.firstName(), lastName: faker.person.lastName() }).toLowerCase(),
      nokAddress: faker.location.streetAddress(),
      providerId: faker.string.uuid(),
      nokRelationship: faker.helpers.arrayElement(['Father', 'Mother', 'Relation', 'Sibling', 'Spouse', 'Cousin', 'Friend']),
    };
  })(),
});