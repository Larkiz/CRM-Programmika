import { monthFilterReducer } from "@/adminPanel/reducers/filters/monthFilterReducer";
import { useReducer } from "react";

export const useMonthControl = () => {
  const [filterDate, dispatchMonthFilter] = useReducer(monthFilterReducer, {
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });
  return [filterDate, dispatchMonthFilter];
};
