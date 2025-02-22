import { monthFilterReducer } from "@/adminPanel/reducers/filters/monthFilterReducer";
import { authFetch } from "@/userPanel/functions/authFetch";
import { useEffect, useReducer, useState } from "react";

export const useScheduleFetch = () => {
  const [schedule, setSchedule] = useState();
  const [filterDate, dispatchMonthFilter] = useReducer(monthFilterReducer, {
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });

  useEffect(() => {
    authFetch(`/schedule?year=${filterDate.year}&month=${filterDate.month}`)
      .then((res) => res.json())
      .then((data) => {
        setSchedule(data);
      });
  }, [filterDate]);

  return [schedule, filterDate, dispatchMonthFilter];
};
