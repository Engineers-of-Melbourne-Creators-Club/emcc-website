// Event dates are plain "YYYY-MM-DD" strings. Reading the parts directly avoids timezone
// shifts, and fixed month lists avoid locale quirks (en-AU writes September as "Sept").
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const parts = (date: string) => {
  const [year, month, day] = date.split("-").map(Number);
  return { year, month: MONTHS[month - 1], day };
};

export const eventDay = (date: string) =>
  String(parts(date).day).padStart(2, "0");
export const eventMonth = (date: string) => parts(date).month.slice(0, 3);
export const eventMonthYear = (date: string) => {
  const { year, month } = parts(date);
  return `${month} ${year}`;
};
