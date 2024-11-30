export type Inspection = {
    investigationNumber: number;
    examinerName: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    faxNumber: string;
    unit: string;
    idNumber: string;
    status: string;
    inspectionDate: Date;
    nextInspectionDate: Date;
  };
// Hebrew first names
const hebrewFirstNames = [
  "אחמד", "שרה", "מוחמד", "רחל", "יוסף", "מרים", "דוד", "לאה", 
  "אברהם", "נועה", "עלי", "תמר", "יעקב", "שושנה", "כרים", "אסתר"
];

// Hebrew last names
const hebrewLastNames = [
  "כהן", "לוי", "מועלם", "חסן", "אבו", "דאהר", "נחמני", "סלאמה", 
  "זועבי", "עזאם", "שמעוני", "מסארווה", "בוקר", "אזולאי", "חדד"
];

// Units
const units = [
  "יחידת בקרה", "יחידת איכות", "יחידת פיקוח", "יחידת מחקר", 
  "יחידת תכנון", "יחידת ביצוע", "יחידת בטחון", "יחידת פרויקטים"
];

// Statuses
const statuses = ["פעיל", "מושעה", "בהכשרה", "בחופשה", "בפרישה"];

// Function to generate a random phone number
function generatePhoneNumber(): string {
  const prefixes = ["050", "052", "054", "055", "058"];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const rest = Math.floor(Math.random() * 10000000).toString().padStart(7, '0');
  return `${prefix}-${rest.slice(0, 3)}-${rest.slice(3)}`;
}

// Function to generate a random fax number
function generateFaxNumber(): string {
  const prefixes = ["03", "02", "04", "09"];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const rest = Math.floor(Math.random() * 10000000).toString().padStart(7, '0');
  return `${prefix}-${rest.slice(0, 3)}-${rest.slice(3)}`;
}

// Function to generate a random ID number
function generateIdNumber(): string {
  const prefix = "צ-";
  const randomNumber = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
  return `${prefix}${randomNumber}`;
}

// Function to generate a random date within a range
function randomDate(start: Date, end: Date): Date {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

// Main function to generate random inspection data
export function generateInspectionData(count: number = 50): Inspection[] {
  const currentYear = new Date().getFullYear();
  const startDate = new Date(currentYear, 0, 1);
  const endDate = new Date(currentYear, 11, 31);

  return Array.from({ length: count }, (_, index) => {
    const firstName = hebrewFirstNames[Math.floor(Math.random() * hebrewFirstNames.length)];
    const lastName = hebrewLastNames[Math.floor(Math.random() * hebrewLastNames.length)];
    const inspectionDate = randomDate(startDate, endDate);
    const nextInspectionDate = new Date(inspectionDate);
    nextInspectionDate.setMonth(nextInspectionDate.getMonth() + 6); // 6 months later

    return {
      investigationNumber: 1000 + index + 1,
      examinerName: `${firstName} ${lastName}`,
      firstName: firstName,
      lastName: lastName,
      phoneNumber: generatePhoneNumber(),
      faxNumber: generateFaxNumber(),
      unit: units[Math.floor(Math.random() * units.length)],
      idNumber: generateIdNumber(),
      status: statuses[Math.floor(Math.random() * statuses.length)],
      inspectionDate: inspectionDate,
      nextInspectionDate: nextInspectionDate
    };
  });
}

// Example usage
export const reportsLoader = async () => {
  return generateInspectionData(5000);
};