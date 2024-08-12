export function getMonth(date) {
  date = new Date(date);

  const monthName = date.toLocaleString("default", { month: "long" });
  return `${getDay(date)}, ${date.getDate()} ${monthName}`;
}

export function getDay(date) {
  date = new Date(date);
  let days = [
    "Воскресенье",
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
  ];

  return days[date.getDay()];
}

export function compare(a, b) {
  var timeA = a.time.replace(":", ".");
  var timeB = b.time.replace(":", ".");
  return timeA - timeB;
}
