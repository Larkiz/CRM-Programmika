import { useContext, useEffect, useReducer, useState } from "react";

import { paymentReducer } from "@/adminPanel/reducers/finance/paymentReducer";

import { ModalStudent } from "./ModalStudent";
import { toast } from "react-toastify";
import { AddStudentsModal } from "./AddStudentsModal";
import { authFetch } from "@/adminPanel/functions/authFetch";
import { Button, Dialog, Stack } from "@mui/material";
import { ModalTitle } from "@/commonComponents/Modal/ModalTemplate";
import { ModalBody } from "@/commonComponents/Modal/ModalTemplate";
import { useModalControl } from "@/commonComponents/Modal/useModal";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { GroupsContext } from "@/adminPanel/Context/GroupsContextProvider";

export const GroupModal = ({ handleClose, show, course, date }) => {
  const [students, paymentDispatch] = useReducer(paymentReducer, null);
  const [deletePending, setDeletePending] = useState(false);

  const { copyLesson } = useContext(GroupsContext);
  function copyLessonHandle() {
    copyLesson({
      course: course,
      students: students,
      time: date?.split(" ")[1],
    });
  }

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

  function handleCloseLesson() {
    handleClose();
    setDeletePending(false);
    paymentDispatch({ type: "clear" });
  }

  const {
    modalData: addStudentsModalData,
    modalClose: addStudentsModalClose,
    modalOpen: addStudentsModalOpen,
  } = useModalControl();

  function handleAdd(data) {
    if (!data.length) {
      toast.error("Студенты не выбраны!");
    } else {
      authFetch("/schedule/insertStudents", {
        method: "post",
        body: JSON.stringify({ course: course, date: date, students: data }),
      })
        .then((res) => res.json())
        .then((resData) => {
          addStudentsModalClose();
          toast.success("Студенты добавлены");
          paymentDispatch({ type: "addDebts", students: resData });
        });
    }
  }
  return (
    <>
      <AddStudentsModal
        show={addStudentsModalData.show}
        handleClose={addStudentsModalClose}
        date={date}
        course={course}
        backdrop={true}
        handleAdd={handleAdd}
      />

      <Dialog  fullWidth open={show} onClose={handleCloseLesson}>
        <ModalTitle sx={{paddingLeft:2}} toggle={handleCloseLesson}>
          <Stack  >
            {course}
            <Stack gap={1} direction={"row"}>
              {!deletePending ? (
                <>
                  <Button
                    style={{ fontSize: 10 }}
                    type="button"
                    variant="contained"
                    className="green-bg"
                    color="success"
                    onClick={addStudentsModalOpen}
                  >
                    Добавить
                  </Button>
                  <Button
                    onClick={() => {
                      setDeletePending(true);
                    }}
                    style={{ fontSize: 10 }}
                    type="button"
                    className="red-bg"
                    color="error"
                    variant="contained"
                  >
                    Удалить
                  </Button>
                  <Button
                    style={{ fontSize: 5 }}
                    type="button"
                    variant="contained"
                    onClick={copyLessonHandle}
                  >
                    <ContentCopyIcon color="rgb(25, 118, 210)" />
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => setDeletePending(false)}
                  style={{ fontSize: 14 }}
                  variant="contained"
                >
                  Отменить
                </Button>
              )}
            </Stack>
          </Stack>
        </ModalTitle>

        <ModalBody  sx={{ marginTop: 2,paddingLeft: 1 }}>
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
        </ModalBody>
      </Dialog>
    </>
  );
};
