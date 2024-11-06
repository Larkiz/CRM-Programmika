import { monthFilterReducer } from "@/adminPanel/reducers/filters/monthFilterReducer";
import { authFetch } from "@/adminPanel/functions/authFetch";
import { useEffect, useReducer, useState } from "react";
const options = {
  barPercentage: 0.4,

  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      min: 0,
      ticks: {
        stepSize: 800,
      },
    },
  },
};
function chartDataGenerate(label, data) {
  return {
    labels: data.map((row) => row.grouping),
    datasets: [
      {
        label: label,
        data: data.map((row) => row.amount),
        backgroundColor: data.map(() => getRandomColor()),
      },
    ],
  };
}

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export const useChartData = () => {
  const [data, setChartData] = useState(null);
  const [filterDate, dispatchMonthFilter] = useReducer(monthFilterReducer, {
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });

  useEffect(() => {
    const earningsFetch = authFetch(
      `/payments/earnings?month=${filterDate.month}&year=${filterDate.year}`
    ).then((res) => res.json());

    const debtFetch = authFetch(
      `/payments/earnings?month=${filterDate.month}&year=${filterDate.year}&payment_status=0`
    ).then((res) => res.json());

    Promise.all([earningsFetch, debtFetch]).then(([earnings, debts]) => {
      setChartData({ earnings: earnings, debts: debts });
    });
  }, [filterDate]);

  const chartEarningsData = data && chartDataGenerate("Выручка", data.earnings);
  const chartDebtsData = data && chartDataGenerate("Не оплачено", data.debts);

  return [
    chartEarningsData,
    chartDebtsData,
    options,
    filterDate,
    dispatchMonthFilter,
  ];
};
