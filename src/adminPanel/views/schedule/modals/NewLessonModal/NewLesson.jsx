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

const baseData = { time: null, course: null, students: [] };

export const NewLessonModal = ({
  handleClose,
  show,
  date,

  handleAdd,
}) => {
  const [data, setData] = useState(baseData);
  const [students, setStudents] = useState(null);

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
      fetch(`${process.env.REACT_APP_API_HOST}/api/schedule`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
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
      fetch(`${process.env.REACT_APP_API_HOST}/api/groups/${data.course}`, {
        method: "get",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((fetchData) => {
          setStudents(fetchData);
        });
    }
  }, [data.course]);

  function clearData() {
    setData(baseData);
    setStudents(null);
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
          <ScheduleInput data={data} handleChange={setData} />

          <Container className="mt-3 mb-3 border border-secondary rounded">
            <Row style={{ fontSize: "20px" }}>
              <Col></Col>

              <Col>Имя</Col>
              <Col>Фамилия</Col>
            </Row>
            <Container style={{ height: "300px", overflowY: "scroll" }}>
              {students ? (
                students.map((student) => {
                  return (
                    <label
                      className="row student-row-modal"
                      style={{ cursor: "pointer" }}
                      key={student.id}
                    >
                      <Col>
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
                })
              ) : (
                <Row> Выберите курс</Row>
              )}
            </Container>
          </Container>
          <Button onClick={add}>Добавить</Button>
        </Container>
      </ModalBody>
    </Modal>
  );
};
