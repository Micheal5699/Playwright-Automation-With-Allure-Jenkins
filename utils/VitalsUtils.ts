export function generateRandomNumber(length: number): string {
  let result = '';
  const digits = '0123456789';
  for (let i = 0; i < length; i++) {
    result += digits.charAt(Math.floor(Math.random() * digits.length));
  }
  return result;
}

export function generateRandomString(length: number): string {
  let result = '';
  const chars = 'abcdefghijklmnopqrstuvwxyz';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function generateRandomEmail(): string {
  const name = generateRandomString(6);
  const domain = generateRandomString(4);
  return `${name}@${domain}.com`;
}

export function generateRandomComment(): string {
  const randomText = generateRandomString(8);
  return `This is a test purpose - ${randomText}`;
}

export function generateRandomVitals() {
  return {
    temperature: (36 + Math.random()).toFixed(1),  // 36.0 - 37.0
    heightFt: (Math.floor(Math.random() * 2) + 5).toString(), // 5 - 6 ft
    heightInch: (Math.floor(Math.random() * 12)).toString(),  // 0 - 11 inches
    weight: (Math.floor(Math.random() * 20) + 60).toString(), // 60 - 80 kg
    systolic: (Math.floor(Math.random() * 20) + 100).toString(), 
    diastolic: (Math.floor(Math.random() * 20) + 70).toString(),
    pulse: (Math.floor(Math.random() * 30) + 60).toString(),
    respiratory: (Math.floor(Math.random() * 10) + 20).toString(),
    spo2: (Math.floor(Math.random() * 5) + 95).toString(),
    bloodGlucose: (Math.floor(Math.random() * 50) + 70).toString(),
    heartRate: (Math.floor(Math.random() * 30) + 70).toString(),
    oxygenAmount: (Math.floor(Math.random() * 20) + 60).toString(),
    oxygenLevel: (Math.floor(Math.random() * 10) + 30).toString(),
    comment: generateRandomComment()
  };
}
