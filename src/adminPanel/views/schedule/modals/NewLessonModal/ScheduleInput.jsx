import { CoursePicker } from "@/adminPanel/components/FormElements/CoursePicker";
import { FormElement } from "@/adminPanel/components/FormElements/FormElement";
import { GroupsContext } from "@/adminPanel/Context/GroupsContextProvider";
import { useContext } from "react";
import Grid from "@mui/material/Grid2";
export const ScheduleInput = ({
  handleChange,
  data,
  time = "",
  course = "",
}) => {
  const {
    groups: { coursesNames },
  } = useContext(GroupsContext);

  return (
    <Grid sx={{ mt: 1 }} alignItems={"end"} spacing={2} container>
      <Grid size={{ xs: 12, sm: 6 }}>
        <CoursePicker
          sx={{ width: "100%" }}
          courses={coursesNames}
          value={course}
          onChange={(e) => {
            handleChange({ ...data, course: e.target.value });
          }}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <FormElement
          sx={{ width: "100%" }}
          type="time"
          required
          value={time}
          onChange={(e) => {
            handleChange({ ...data, time: e.target.value });
          }}
          inputStyle={{ height: 56, width: "100%" }}
        >
          Время
        </FormElement>
      </Grid>
    </Grid>
  );
};
