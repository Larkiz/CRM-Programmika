import { monthFilterReducer } from "adminPanel/reducers/filters/monthFilterReducer";
import { useEffect, useReducer, useState } from "react";

export const useScheduleFetch = () => {
  const [schedule, setSchedule] = useState();
  const [filterDate, dispatchMonthFilter] = useReducer(monthFilterReducer, {
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });

  function handleAdd(newData) {
    setSchedule(
      schedule.map((item) => {
        if (item.date === newData.date) {
          item.schedule.push(newData);
          return item;
        }
        return item;
      })
    );
  }

  function deleteSchedule(date, id) {
    return fetch(`${process.env.REACT_APP_API_HOST}/api/schedule/${id}`, {
      method: "delete",
      headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
    }).then(() =>
      setSchedule(
        schedule.map((item) => {
          if (item.date === date) {
            const newScheduleItem = item.schedule.filter(
              (scheduleItem) => scheduleItem.id !== id
            );
            return { ...item, schedule: newScheduleItem };
          }
          return item;
        })
      )
    );
  }

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_API_HOST}/api/schedule?year=${filterDate.year}&month=${filterDate.month}`,
      {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setSchedule(data);
      });
  }, [filterDate]);

  return [schedule, handleAdd, deleteSchedule, filterDate, dispatchMonthFilter];
};
