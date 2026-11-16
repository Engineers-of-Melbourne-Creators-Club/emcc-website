// Event dates are plain "YYYY-MM-DD" strings. Reading the parts directly avoids timezone
// shifts, and a fixed month list avoids locale quirks (en-AU writes September as "Sept").
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const parts = (date: string) => {
  const [year, month, day] = date.split("-").map(Number);
  return { year, month: MONTHS[month - 1], day };
};

export const eventDay = (date: string) => String(parts(date).day);
export const eventMonth = (date: string) => parts(date).month;
export const eventFullDate = (date: string) => {
  const { year, month, day } = parts(date);
  return `${day} ${month} ${year}`;
};
