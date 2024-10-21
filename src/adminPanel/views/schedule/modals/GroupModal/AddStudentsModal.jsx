import { useEffect, useState } from "react";

import { FormElement } from "adminPanel/components/FormElements/FormElement";
import { authFetch } from "adminPanel/views/Index/functions/authFetch";
import { Box, Button, Container, Dialog, Stack } from "@mui/material";
import { ModalTitle } from "commonComponents/Modal/ModalTemplate";
import { ModalBody } from "commonComponents/Modal/ModalTemplate";

function studentFilter(student, filterName) {
  const name = new RegExp(filterName, "i");
  const fullName = student.first_name + " " + student.last_name;

  if (filterName === "" || (filterName !== "" && name.test(fullName)))
    return true;
}

export const AddStudentsModal = ({
  handleClose,
  show,
  date,
  course,
  handleAdd,
}) => {
  const [data, setData] = useState([]);
  const [students, setStudents] = useState([]);
  const [filter, setFilter] = useState({ name: "", allStudents: false });

  function checkboxHandle(e, student) {
    if (e.target.checked) {
      setData([...data, { ...student, payment_status: 0 }]);
    } else {
      setData(data.filter((item) => item.id !== student.id));
    }
  }

  useEffect(() => {
    if (show) {
      authFetch("/students")
        .then((res) => res.json())
        .then((fetchData) => {
          fetchData = fetchData.filter((student, index) => {
            if (
              fetchData.findIndex(
                (el) =>
                  el.first_name === student.first_name &&
                  el.last_name === student.last_name
              ) === index
            ) {
              return true;
            }
            return false;
          });
          setStudents(fetchData);
        });
    }
  }, [show]);

  function clearData() {
    handleClose();
    setData([]);
    setStudents([]);
  }

  return (
    <Dialog fullWidth open={show} onClose={clearData}>
      <ModalTitle toggle={clearData}>Добавление студентов на {date}</ModalTitle>

      <ModalBody>
        <Box>
          <FormElement
            style={{ padding: 0 }}
            onChange={(e) => {
              setFilter({ ...filter, name: e.target.value });
            }}
            label={false}
          >
            Поиск студентов
          </FormElement>
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
            <Stack style={{ height: "300px", overflowY: "scroll" }}>
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

        <Button variant="contained" onClick={() => handleAdd(data)}>
          Добавить
        </Button>
      </ModalBody>
    </Dialog>
  );
};
