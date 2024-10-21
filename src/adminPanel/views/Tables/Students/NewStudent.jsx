import { Button, Container, Stack } from "@mui/material";
import { CoursePicker } from "adminPanel/components/FormElements/CoursePicker";
import { FormElement } from "adminPanel/components/FormElements/FormElement";
import { GroupsContext } from "adminPanel/Context/GroupsContext";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";

export const NewStudent = ({ onSubmit }) => {
  const { coursesNames } = useContext(GroupsContext);
  const { register, handleSubmit } = useForm();

  const [course, setCourse] = useState([]);

  return (
    <Container maxWidth="sx">
      <Stack sx={{ width: 415 }} gap={2}>
        <Stack direction={"row"}>
          <FormElement
            required
            register={{ ...register("first_name", { required: true }) }}
          >
            Имя
          </FormElement>
          <FormElement
            required
            register={{ ...register("last_name", { required: true }) }}
          >
            Фамилия
          </FormElement>
        </Stack>

        <CoursePicker
          courses={coursesNames}
          multiple
          value={course}
          onChange={(e) => {
            setCourse(e.target.value);
          }}
        />

        <Stack direction={"row"}>
          <FormElement register={{ ...register("phone_number") }}>
            Номер телефона
          </FormElement>
          <FormElement register={{ ...register("parent_phone") }}>
            Тел. родитилей
          </FormElement>
        </Stack>
        <Stack direction={"row"}>
          <FormElement register={{ ...register("city") }}>Город</FormElement>
          <FormElement register={{ ...register("birthday") }}>
            Дата рождения
          </FormElement>
        </Stack>

        <Button
          variant="contained"
          onClick={handleSubmit((data) =>
            onSubmit({ ...data, course: course })
          )}
        >
          Добавить
        </Button>
      </Stack>
    </Container>
  );
};
