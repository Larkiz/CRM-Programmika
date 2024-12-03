import { Button, Container } from "@mui/material";
import { CoursePicker } from "@/adminPanel/components/FormElements/CoursePicker";
import { GroupsContext } from "@/adminPanel/Context/GroupsContextProvider";
import { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import Grid from "@mui/material/Grid2";
import { ControlledFormElement } from "@/adminPanel/components/FormElements/FormElement";

export const NewStudent = ({ onSubmit }) => {
  const {
    groups: { coursesNames },
  } = useContext(GroupsContext);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  return (
    <Container maxWidth="sx">
      <Grid spacing={2} sx={{ width: 415 }} container>
        <Grid size={5}>
          <ControlledFormElement
            control={control}
            label={"Имя"}
            name={"first_name"}
            error={!!errors.first_name}
            required
          />
        </Grid>
        <Grid size={5}>
          <ControlledFormElement
            control={control}
            label={"Фамилия"}
            name={"last_name"}
            error={!!errors.last_name}
            required
          />
        </Grid>

        <Grid size={12}>
          <Controller
            name={"course"}
            control={control}
            rules={{ required: "required" }}
            render={({ field: { onChange, value = [] } }) => {
              return (
                <CoursePicker
                  courses={coursesNames}
                  multiple
                  value={value}
                  required
                  error={!!errors.course}
                  onChange={onChange}
                />
              );
            }}
          />
        </Grid>
        <Grid size={5}>
          <ControlledFormElement
            control={control}
            label={"Номер телефона"}
            name={"phone_number"}
          />
        </Grid>
        <Grid size={5}>
          <ControlledFormElement
            control={control}
            label={"Тел. родитилей"}
            name={"parent_phone"}
          />
        </Grid>
        <Grid size={5}>
          <ControlledFormElement
            control={control}
            label={"Город"}
            name={"city"}
          />
        </Grid>
        <Grid size={5}>
          <ControlledFormElement
            control={control}
            label={"Дата рождения"}
            name={"birthday"}
          />
        </Grid>

        <Button
          variant="contained"
          onClick={handleSubmit((data) => onSubmit(data))}
        >
          Добавить
        </Button>
      </Grid>
    </Container>
  );
};
