import moment from "moment";

export function getMonth(date) {
  return moment(date, "YYYY.MM.DD").format("dddd, Do MMMM").toUpperCase();
}

export function compare(a, b) {
  var timeA = a.time.replace(":", ".");
  var timeB = b.time.replace(":", ".");
  return timeA - timeB;
}
