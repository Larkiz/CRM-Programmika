import { Chart, registerables } from "chart.js";

import { StudentStats } from "./StudentsStats/StudentStats";

import { ucFirst } from "@/functions/uppercaseFirst";

import { getMonthYear } from "./functions/dateFunctions";
import { Container, Typography } from "@mui/material";
import { MonthController } from "@/commonComponents/MonthController/MonthController";
import { useMonthControl } from "@/commonComponents/MonthController/useMonthControl";
import { Notes } from "@/adminPanel/components/Notes/Notes";

Chart.register(...registerables);

export const AdminIndex = () => {
  const [filterDate, dispatchMonthFilter] = useMonthControl();
  return (
    <Container sx={{ mt: 3 }} maxWidth={false}>
      <Typography sx={{ mb: 2 }} variant="h5">
        Заметки
      </Typography>
      <Notes sitePath="index" />
      <Typography sx={{ mb: 5 }} variant="h4">
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
