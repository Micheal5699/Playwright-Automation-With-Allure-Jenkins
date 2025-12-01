export function getTodaysDate(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
export function getTomorrowDate(): string {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const year = tomorrow.getFullYear();
  const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
  const day = String(tomorrow.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
export function getDateParts(): { day: string; month: string; year: string; tomorrowdate: string } {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const day = String(today.getDate()).padStart(2, '0');
  const tomorrowdate = String(today.getDate() + 1).padStart(2, '0');

  return {day: String(day), month: String(month), year: String(year), tomorrowdate: String(tomorrowdate) };
}
export function getFormattedDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const day = String(date.getDate()).padStart(2, '0');
  return `${day}-${month}-${year}`;
}
export function getFormattedTime(date: Date): string {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}
export function formatTimeRange(input: string) {
  return input.replace(/(\b\d{1})(:\d{2})(AM|PM)/g, '0$1$2 $3');
}


export function formatDate(): string {
  const today = getTodaysDate()
  const date = new Date(today);

  // Get weekday and month names
  const weekday = date.toLocaleString('en-US', { weekday: 'long' });
  const month = date.toLocaleString('en-US', { month: 'long' });

  // Get day and add ordinal suffix
  const day = date.getDate();
  const dayWithSuffix = addOrdinalSuffix(day);

  return `${weekday}, ${month} ${dayWithSuffix},`;
}

function addOrdinalSuffix(day: number): string {
  if (day > 3 && day < 21) return `${day}th`; // special rule for 11th–19th
  switch (day % 10) {
    case 1: return `${day}st`;
    case 2: return `${day}nd`;
    case 3: return `${day}rd`;
    default: return `${day}th`;
  }
}

export function getDateDMY() {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  const formatted = `${day}/${month}/${year}`;
  console.log(formatted); 

  return formatted;
}
export function getDateYMD() {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const formatted = `${year}-${month}-${day}`;
  return formatted;
}
export function getFutureDate() {
  const today = new Date();
  today.setDate(today.getDate() + 3);

  const array = { weekday: 'long', month: 'long', day: 'numeric' };
  const formattedDate = today.toLocaleDateString('en-US', array );
  const day = today.getDate();
  let suffix = 'th';
  if (day % 10 === 1 && day !== 11) suffix = 'st';
  else if (day % 10 === 2 && day !== 12) suffix = 'nd';
  else if (day % 10 === 3 && day !== 13) suffix = 'rd';

  return formattedDate.replace(/\d+/, `${day}${suffix}`);
}



 

