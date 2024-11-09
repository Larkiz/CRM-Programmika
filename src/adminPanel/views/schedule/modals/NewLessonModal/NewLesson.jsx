import { ScheduleInput } from "./ScheduleInput";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FormElement } from "@/adminPanel/components/FormElements/FormElement";
import { authFetch } from "@/adminPanel/functions/authFetch";
import { Box, Button, Chip, Dialog, Stack } from "@mui/material";
import { ModalTitle } from "@/commonComponents/Modal/ModalTemplate";
import { ModalBody } from "@/commonComponents/Modal/ModalTemplate";

import { GroupsContext } from "@/adminPanel/Context/GroupsContextProvider";
import { StudentsSelect } from "@/adminPanel/components/FormElements/StudentSelect";
import { studentsFilter } from "@/adminPanel/functions/studentsFilter";

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
            <Stack gap={1} useFlexGap flexWrap={"wrap"} direction={"row"}>
              {data.students &&
                data.students.map((student) => {
                  return (
                    <Chip
                      key={student.id}
                      sx={{ maxWidth: { xs: 135, sx: 180 } }}
                      label={student.first_name + " " + student.last_name}
                      onClick={() => onDeleteChip(student)}
                      onDelete={() => onDeleteChip(student)}
                    />
                  );
                })}
            </Stack>
          </Stack>
          <StudentsSelect
            students={studentsFilter(students, filter.name)}
            value={data.students}
            onChange={(e, student) => checkboxHandle(e, student)}
          />
        </Box>
        <Button variant="contained" onClick={add}>
          Добавить
        </Button>
      </ModalBody>
    </Dialog>
  );
};
