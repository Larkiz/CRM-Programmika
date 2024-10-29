import { Button, Container, Stack } from "@mui/material";
import { CoursePicker } from "adminPanel/components/FormElements/CoursePicker";
import { FormElement } from "adminPanel/components/FormElements/FormElement";
import { GroupsContext } from "adminPanel/Context/GroupsContext";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Grid from "@mui/material/Grid2";
export const NewStudent = ({ onSubmit }) => {
  const { coursesNames } = useContext(GroupsContext);
  const { register, handleSubmit } = useForm();

  const [course, setCourse] = useState([]);

  return (
    <Container maxWidth="sx">
      {/* <Stack sx={{ width: 415 }} gap={2}> */}
      <Grid spacing={2} sx={{ width: 415 }} container>
        <Grid size={5}>
          <FormElement
            required
            register={{ ...register("first_name", { required: true }) }}
          >
            Имя
          </FormElement>
        </Grid>
        <Grid size={5}>
          <FormElement
            required
            register={{ ...register("last_name", { required: true }) }}
          >
            Фамилия
          </FormElement>
        </Grid>

        <Grid size={12}>
          <CoursePicker
            courses={coursesNames}
            multiple
            value={course}
            onChange={(e) => {
              setCourse(e.target.value);
            }}
          />
        </Grid>
        <Grid size={5}>
          <FormElement register={{ ...register("phone_number") }}>
            Номер телефона
          </FormElement>
        </Grid>
        <Grid size={5}>
          <FormElement register={{ ...register("parent_phone") }}>
            Тел. родитилей
          </FormElement>
        </Grid>
        <Grid size={5}>
          <FormElement register={{ ...register("city") }}>Город</FormElement>
        </Grid>
        <Grid size={5}>
          <FormElement register={{ ...register("birthday") }}>
            Дата рождения
          </FormElement>
        </Grid>

        <Button
          variant="contained"
          onClick={handleSubmit((data) =>
            onSubmit({ ...data, course: course })
          )}
        >
          Добавить
        </Button>
      </Grid>
    </Container>
  );
};
