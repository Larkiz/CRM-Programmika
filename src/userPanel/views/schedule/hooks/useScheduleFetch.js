import { monthFilterReducer } from "adminPanel/reducers/filters/monthFilterReducer";
import { useEffect, useReducer, useState } from "react";

export const useScheduleFetch = () => {
  const [schedule, setSchedule] = useState();
  const [filterDate, dispatchMonthFilter] = useReducer(monthFilterReducer, {
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_API_HOST_COMMON}/api/schedule?year=${filterDate.year}&month=${filterDate.month}`,
      {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setSchedule(data);
      });
  }, [filterDate]);

  return [schedule, filterDate, dispatchMonthFilter];
};
