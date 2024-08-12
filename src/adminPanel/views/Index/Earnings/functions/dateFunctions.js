export function getMonthYear(month, year) {
  const date = new Date(year, month - 1);

  const monthName = date.toLocaleString("default", { month: "long" });
  return `${monthName} ${date.getFullYear()}  `;
}
