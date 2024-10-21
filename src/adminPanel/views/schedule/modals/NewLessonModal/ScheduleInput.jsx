import { CoursePicker } from "adminPanel/components/FormElements/CoursePicker";
import { FormElement } from "adminPanel/components/FormElements/FormElement";
import { GroupsContext } from "adminPanel/Context/GroupsContext";
import { useContext } from "react";
import Grid from "@mui/material/Grid2";
export const ScheduleInput = ({ handleChange, data }) => {
  const { coursesNames } = useContext(GroupsContext);

  return (
    <Grid alignItems={"end"} spacing={3} container>
      <Grid size={6}>
        <CoursePicker
          sx={{ width: "100%" }}
          courses={coursesNames}
          onChange={(e) => {
            handleChange({ ...data, course: e.target.value });
          }}
        />
      </Grid>
      <Grid size={6}>
        <FormElement
          sx={{ width: "100%" }}
          type="time"
          required
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
