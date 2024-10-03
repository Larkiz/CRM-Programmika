import { Container } from "reactstrap";
import { Chart, registerables } from "chart.js";

import { MonthController } from "adminPanel/components/MonthController/MonthController";
import { StudentStats } from "./StudentsStats/StudentStats";

import { ucFirst } from "functions/uppercaseFirst";
import { useMonthControl } from "adminPanel/components/MonthController/useMonthControl";
import { getMonthYear } from "./functions/dateFunctions";

Chart.register(...registerables);

export const AdminIndex = () => {
  const [filterDate, dispatchMonthFilter] = useMonthControl();
  return (
    <Container style={{ marginBottom: "90px" }} className="mt-5" fluid>
      <h1 className="mb-5">
        {ucFirst(getMonthYear(filterDate.month, filterDate.year))}
      </h1>

      <StudentStats filterDate={filterDate} />
      <MonthController
        style={{ margin: "0 auto" }}
        filterDate={filterDate}
        dispatch={dispatchMonthFilter}
      />
    </Container>
  );
};
