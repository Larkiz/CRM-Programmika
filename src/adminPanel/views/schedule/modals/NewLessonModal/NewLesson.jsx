import {
  Button,
  Col,
  Container,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import { ScheduleInput } from "./ScheduleInput";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FormElement } from "adminPanel/components/FormElements/FormElement";
import { authFetch } from "adminPanel/views/Index/functions/authFetch";

const baseData = { time: null, course: null, students: [] };

function studentFilter(student, filterName) {
  const name = new RegExp(filterName, "i");
  const fullName = student.first_name + " " + student.last_name;

  if (filterName === "" || (filterName !== "" && name.test(fullName)))
    return true;
}

export const NewLessonModal = ({
  handleClose,
  show,
  date,

  handleAdd,
}) => {
  const [data, setData] = useState(baseData);
  const [students, setStudents] = useState([]);
  const [filter, setFilter] = useState({ name: "", allStudents: false });

  function checkboxHandle(e, student) {
    if (e.target.checked) {
      setData({ ...data, students: [...data.students, { id: student.id }] });
    } else {
      setData({
        ...data,
        students: data.students.filter((item) => item.id !== student.id),
      });
    }
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
          handleAdd({ ...data, date: date, id: fetchData.insertedId });
          handleClose();
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
  }, [data.course, filter.allStudents]);

  function clearData() {
    setData(baseData);
    setStudents([]);
  }

  return (
    <Modal
      onClosed={() => clearData()}
      size="lg"
      isOpen={show}
      toggle={handleClose}
      backdrop={true}
    >
      <ModalHeader toggle={handleClose}>Добавление урока на {date}</ModalHeader>
      <ModalBody>
        <Container>
          <ScheduleInput data={data} handleChange={setData} />{" "}
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
          <Container className="mt-3 mb-3 border border-secondary rounded">
            <Row style={{ fontSize: "20px" }}>
              <Col xs={2}></Col>
              <Col style={{ paddingLeft: 0 }}>Имя</Col>
              <Col style={{ paddingLeft: 0 }}>Фамилия</Col>
            </Row>
            <Container style={{ height: "300px", overflowY: "scroll" }}>
              {students.length ? (
                students.map((student) => {
                  if (studentFilter(student, filter.name)) {
                    return (
                      <label
                        className="row student-row-modal"
                        style={{ cursor: "pointer" }}
                        key={student.id}
                      >
                        <Col xs={1}>
                          <input
                            onChange={(e) => checkboxHandle(e, student)}
                            style={{ fontSize: "30px" }}
                            type="checkbox"
                          />
                        </Col>

                        <Col>{student.first_name}</Col>
                        <Col>{student.last_name}</Col>
                      </label>
                    );
                  } else {
                    return false;
                  }
                })
              ) : (
                <Row>Список студентов пуст</Row>
              )}
            </Container>
          </Container>
          <Button onClick={add}>Добавить</Button>
        </Container>
      </ModalBody>
    </Modal>
  );
};
