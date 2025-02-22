import { useEffect, useState } from "react";

import { FormElement } from "@/adminPanel/components/FormElements/FormElement";
import { authFetch } from "@/adminPanel/functions/authFetch";
import { Box, Button, Dialog } from "@mui/material";
import { ModalTitle } from "@/commonComponents/Modal/ModalTemplate";
import { ModalBody } from "@/commonComponents/Modal/ModalTemplate";
import { StudentsSelect } from "@/adminPanel/components/FormElements/StudentSelect";
import { studentsFilter } from "@/adminPanel/functions/studentsFilter";

export const AddStudentsModal = ({ handleClose, show, date, handleAdd }) => {
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
            onChange={(e) => {
              setFilter({ ...filter, name: e.target.value });
            }}
            label={false}
            value={filter.name}
            sx={{ mt: 1 }}
          >
            Поиск студентов
          </FormElement>
          <StudentsSelect
            students={studentsFilter(students, filter.name)}
            value={data}
            onChange={(e, student) => checkboxHandle(e, student)}
          />
        </Box>

        <Button variant="contained" onClick={() => handleAdd(data)}>
          Добавить
        </Button>
      </ModalBody>
    </Dialog>
  );
};
