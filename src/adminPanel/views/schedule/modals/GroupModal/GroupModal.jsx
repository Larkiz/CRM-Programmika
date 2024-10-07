import { useEffect, useReducer, useState } from "react";
import {
  Button,
  Container,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";

import { paymentReducer } from "adminPanel/reducers/finance/paymentReducer";

import { ModalStudent } from "./ModalStudent";
import { toast } from "react-toastify";
import { AddStudentsModal } from "./AddStudentsModal";
import { authFetch } from "adminPanel/views/Index/functions/authFetch";

export const GroupModal = ({ handleClose, show, course, date }) => {
  const [students, paymentDispatch] = useReducer(paymentReducer, null);
  const [deletePending, setDeletePending] = useState(false);

  useEffect(() => {
    if (show) {
      authFetch(`/payments/debt/${course}?date=${date}`)
        .then((res) => res.json())
        .then((data) => paymentDispatch({ type: "set", data }));
    }
    // eslint-disable-next-line
  }, [show]);

  function deleteStudent(id) {
    if (window.confirm("Удалить?")) {
      authFetch(`/schedule/deleteStudent/${id}`, { method: "delete" })
        .then((res) => res.json())
        .then(() => {
          paymentDispatch({ type: "deleteDebt", id: id });
          toast.success("Студент удалён");
          setDeletePending(false);
        });
    }
  }

  function onClosed() {
    setDeletePending(false);
    paymentDispatch({ type: "clear" });
  }

  const [addStudentOpen, setAddStudentOpen] = useState(false);

  const handleStudentModalToggle = () => setAddStudentOpen(!addStudentOpen);

  function handleAdd(data) {
    if (!data.students.length) {
      toast.error("Студенты не выбраны!");
    } else {
      authFetch("/schedule/insertStudents", {
        method: "post",
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((resData) => {
          handleStudentModalToggle();
          toast.success("Студенты добавлены");
          paymentDispatch({ type: "addDebts", students: resData });
        });
    }
  }
  return (
    <>
      <AddStudentsModal
        isOpen={addStudentOpen}
        toggle={handleStudentModalToggle}
        date={date}
        course={course}
        backdrop={true}
        handleAdd={handleAdd}
      />

      <Modal
        onClosed={onClosed}
        isOpen={show}
        toggle={handleClose}
        backdrop={true}
      >
        <ModalHeader toggle={handleClose}>
          {course}
          <Container>
            <Row className="gap-5">
              {!deletePending ? (
                <>
                  <Button
                    style={{ fontSize: 14 }}
                    type="button"
                    className="green-bg"
                    onClick={handleStudentModalToggle}
                  >
                    Добавить
                  </Button>
                  <Button
                    onClick={() => {
                      setDeletePending(true);
                    }}
                    style={{ fontSize: 14 }}
                    type="button"
                    className="red-bg"
                  >
                    Удалить
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => setDeletePending(false)}
                  style={{ fontSize: 14 }}
                >
                  Отменить
                </Button>
              )}
            </Row>
          </Container>
        </ModalHeader>

        <ModalBody>
          <Container>
            {students &&
              students.map((i, key) => {
                return (
                  <div
                    key={key}
                    onClick={() => deletePending && deleteStudent(i.id)}
                    className={deletePending === true ? "grey-bg" : null}
                  >
                    <ModalStudent
                      disableControls={deletePending}
                      student={i}
                      paymentDispatch={paymentDispatch}
                    />
                  </div>
                );
              })}
          </Container>
        </ModalBody>
      </Modal>
    </>
  );
};
