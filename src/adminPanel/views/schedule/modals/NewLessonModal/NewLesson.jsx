import { ScheduleInput } from "./ScheduleInput";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FormElement } from "adminPanel/components/FormElements/FormElement";
import { authFetch } from "adminPanel/views/Index/functions/authFetch";
import { Box, Button, Chip, Container, Dialog, Stack } from "@mui/material";
import { ModalTitle } from "commonComponents/Modal/ModalTemplate";
import { ModalBody } from "commonComponents/Modal/ModalTemplate";
import Grid from "@mui/material/Grid2";
import { GroupsContext } from "adminPanel/Context/GroupsContext";
function studentFilter(student, filterName) {
  const name = new RegExp(filterName, "i");
  const fullName = student.first_name + " " + student.last_name;

  if (filterName === "" || (filterName !== "" && name.test(fullName)))
    return true;
}

export const NewLessonModal = ({ handleClose, show, date, handleAdd }) => {
  const [data, setData] = useState({ time: null, course: null, students: [] });
  const [students, setStudents] = useState([]);
  const [filter, setFilter] = useState({ name: "", allStudents: false });

  const courses = useContext(GroupsContext);

  function checkboxHandle(e, student) {
    if (e.target.checked) {
      setData({ ...data, students: [...data.students, student] });
    } else {
      setData({
        ...data,
        students: data.students.filter((item) => item.id !== student.id),
      });
    }
  }

  function onDeleteChip(student) {
    setData({
      ...data,
      students: data.students.filter((item) => item.id !== student.id),
    });
  }

  function close() {
    handleClose();
    setFilter({ name: "", allStudents: false });
    setData({ time: null, course: null, students: [] });
    setStudents([]);
  }

  function add() {
    if (data.time === null || data.course === null || !data.students.length) {
      return toast.error("Заполните все поля");
    } else {
      authFetch(`/schedule`, {
        method: "post",
        body: JSON.stringify({ ...data, date: date }),
      })
        .then((res) => res.json())
        .then((fetchData) => {
          handleAdd({
            ...data,
            shortCourse:
              courses.data[
                courses.data.findIndex((i) => i.name === data.course)
              ].short_name,
            students: data.students.reduce(
              (acc, i) => [...acc, { id: i.id }],
              []
            ),
            date: date,
            id: fetchData.insertedId,
          });
          close();
          toast.success("Урок добавлен");
        });
    }
  }

  useEffect(() => {
    if (data.course) {
      let endpoint = ``;

      if (filter.allStudents && data.course !== "*") {
        endpoint += "/students";
      } else {
        endpoint += `/groups/${data.course}`;
      }

      authFetch(`${endpoint}`)
        .then((res) => res.json())
        .then((fetchData) => {
          setStudents(fetchData);
        });
    }
  }, [data.course, filter.allStudents]);

  function checkStudentOnAdd(student) {
    return data.students.findIndex((i) => i.id === student.id) >= 0
      ? true
      : false;
  }

  return (
    <Dialog fullWidth open={show} onClose={close}>
      <ModalTitle toggle={close}>Добавление урока на {date}</ModalTitle>

      <ModalBody>
        <Box>
          <Stack gap={1}>
            <ScheduleInput data={data} handleChange={setData} />
            <FormElement
              style={{ padding: 0, gap: 5 }}
              onChange={(e) => {
                setFilter({ ...filter, allStudents: e.target.checked });
              }}
              type="checkbox"
            >
              Включить всех студентов
            </FormElement>
            <FormElement
              style={{ padding: 0 }}
              onChange={(e) => {
                setFilter({ ...filter, name: e.target.value });
              }}
              label={false}
            >
              Поиск студентов
            </FormElement>
            <Grid rowGap={1} container>
              {data.students &&
                data.students.map((student) => {
                  return (
                    <Grid key={student.id} size={6}>
                      <Chip
                        label={student.first_name + " " + student.last_name}
                        onClick={() => onDeleteChip(student)}
                        onDelete={() => onDeleteChip(student)}
                      />
                    </Grid>
                  );
                })}
            </Grid>
          </Stack>
          <Container
            className="mt-3 mb-3 border border-secondary rounded"
            maxWidth="sm"
          >
            <Stack direction={"row"}>
              <Box flexGrow={1}></Box>
              <Box sx={{ flexBasis: 0 }} flexGrow={2}>
                Имя
              </Box>
              <Box sx={{ flexBasis: 0 }} flexGrow={2}>
                Фамилия
              </Box>
            </Stack>
            <Stack
              sx={{ height: { xs: 200, sm: 300 } }}
              style={{ overflowY: "scroll" }}
            >
              {students.length ? (
                students.map((student) => {
                  if (studentFilter(student, filter.name)) {
                    return (
                      <label style={{ cursor: "pointer" }} key={student.id}>
                        <Stack direction={"row"}>
                          <Box flexGrow={1}>
                            <input
                              onChange={(e) => checkboxHandle(e, student)}
                              style={{ fontSize: "30px" }}
                              type="checkbox"
                              checked={checkStudentOnAdd(student)}
                            />
                          </Box>
                          <Box sx={{ flexBasis: 0 }} flexGrow={2}>
                            {student.first_name}
                          </Box>
                          <Box sx={{ flexBasis: 0 }} flexGrow={2}>
                            {student.last_name}
                          </Box>
                        </Stack>
                      </label>
                    );
                  } else {
                    return false;
                  }
                })
              ) : (
                <Box>Список студентов пуст</Box>
              )}
            </Stack>
          </Container>
        </Box>
        <Button variant="contained" onClick={add}>
          Добавить
        </Button>
      </ModalBody>
    </Dialog>
  );
};
