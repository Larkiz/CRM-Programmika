import { Container } from "reactstrap";
import { Chart, registerables } from "chart.js";
import { useChartData } from "./hooks/useChartData";

import { MonthController } from "adminPanel/components/MonthController/MonthController";
import { StudentStats } from "./StudentsStats/StudentStats";
import { getMonthYear } from "./Earnings/functions/dateFunctions";
import { Earnings } from "./Earnings/Earnings";
import { ucFirst } from "functions/uppercaseFirst";

Chart.register(...registerables);

export const AdminIndex = () => {
  const [
    chartEarningsData,
    chartDebtsData,
    options,
    filterDate,
    dispatchMonthFilter,
  ] = useChartData();

  return (
    <Container style={{ marginBottom: "90px" }} className="mt-5" fluid>
      <h1>{ucFirst(getMonthYear(filterDate.month, filterDate.year))}</h1>
      <Earnings
        chartEarningsData={chartEarningsData}
        chartDebtsData={chartDebtsData}
        options={options}
        filterDate={filterDate}
        dispatchMonthFilter={dispatchMonthFilter}
      />
      <StudentStats filterDate={filterDate} />
      <MonthController
        fixedBottom
        filterDate={filterDate}
        dispatch={dispatchMonthFilter}
      />
    </Container>
  );
};
