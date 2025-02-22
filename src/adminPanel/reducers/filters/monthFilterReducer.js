export const monthFilterReducer = (state, action) => {
  let year = state.year;
  let month = state.month;

  switch (action) {
    case "prevMonth":
      month -= 1;

      if (month < 1) {
        month = 12;
        year -= 1;
      }

      return { month: month, year: year };
    case "nextMonth":
      month += 1;
      if (month > 12) {
        month = 1;
        year += 1;
      }

      return { month: month, year: year };
    case "nextYear":
      year += 1;

      return { month: month, year: year };
    case "prevYear":
      year -= 1;

      return { month: month, year: year };

    default:
      return state;
  }
};
