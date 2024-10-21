import { Chart, registerables } from "chart.js";

import { StudentStats } from "./StudentsStats/StudentStats";

import { ucFirst } from "functions/uppercaseFirst";

import { getMonthYear } from "./functions/dateFunctions";
import { Container, Typography } from "@mui/material";
import { MonthController } from "commonComponents/MonthController/MonthController";
import { useMonthControl } from "commonComponents/MonthController/useMonthControl";

Chart.register(...registerables);

export const AdminIndex = () => {
  const [filterDate, dispatchMonthFilter] = useMonthControl();
  return (
    <Container maxWidth="sx">
      <Typography className="mb-5" variant="h4">
        {ucFirst(getMonthYear(filterDate.month, filterDate.year))}
      </Typography>
      <StudentStats filterDate={filterDate} />{" "}
      <MonthController
        style={{ margin: "0 auto" }}
        filterDate={filterDate}
        dispatch={dispatchMonthFilter}
      />
    </Container>
  );
};
