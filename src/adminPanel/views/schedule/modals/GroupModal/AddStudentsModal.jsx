import {
  Button,
  Col,
  Container,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FormElement } from "adminPanel/components/FormElements/FormElement";
import { authFetch } from "adminPanel/views/Index/functions/authFetch";

const baseData = (course = null, date = null) => {
  return { course: course, date: date, students: [] };
};

function studentFilter(student, filterName) {
  const name = new RegExp(filterName, "i");
  const fullName = student.first_name + " " + student.last_name;

  if (filterName === "" || (filterName !== "" && name.test(fullName)))
    return true;
}

export const AddStudentsModal = ({
  toggle,
  isOpen,
  date,
  course,
  handleAdd,
}) => {
  const [data, setData] = useState(baseData(course, date));
  const [students, setStudents] = useState([]);
  const [filter, setFilter] = useState({ name: "", allStudents: false });

  function checkboxHandle(e, student) {
    if (e.target.checked) {
      setData({
        ...data,
        students: [...data.students, { ...student, payment_status: 0 }],
      });
    } else {
      setData({
        ...data,
        students: data.students.filter((item) => item.id !== student.id),
      });
    }
  }

  useEffect(() => {
    setData({ ...data, course: course, date: date });
  }, [date, course]);

  useEffect(() => {
    if (isOpen) {
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
  }, [isOpen]);

  function clearData() {
    setData({ ...data, students: [] });
    setStudents([]);
  }

  return (
    <Modal
      onClosed={() => clearData()}
      size="lg"
      isOpen={isOpen}
      toggle={toggle}
      backdrop={true}
    >
      <ModalHeader toggle={toggle}>Добавление студентов на {date}</ModalHeader>
      <ModalBody>
        <Container>
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
          <Button onClick={() => handleAdd(data)}>Добавить</Button>
        </Container>
      </ModalBody>
    </Modal>
  );
};
