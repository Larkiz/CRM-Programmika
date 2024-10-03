import moment from "moment";

export function getMonthYear(month, year) {
  const date = moment(`${year}.${month}`, "YYYY.MM").format("MMMM YYYY");
  return date.toUpperCase();
}
