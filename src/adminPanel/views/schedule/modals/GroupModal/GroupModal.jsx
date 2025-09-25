import { useContext, useEffect, useReducer, useState } from "react";

import { paymentReducer } from "@/adminPanel/reducers/finance/paymentReducer";

import { ModalStudent } from "./ModalStudent";
import { toast } from "react-toastify";
import { AddStudentsModal } from "./AddStudentsModal";
import { authFetch } from "@/adminPanel/functions/authFetch";
import {
  Box,
  Button,
  Dialog,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { ModalTitle } from "@/commonComponents/Modal/ModalTemplate";
import { ModalBody } from "@/commonComponents/Modal/ModalTemplate";
import { useModalControl } from "@/commonComponents/Modal/useModal";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { GroupsContext } from "@/adminPanel/Context/GroupsContextProvider";
import CircularProgress from "@mui/material/CircularProgress";

const ModalActionButton = ({ sx, children, ...props }) => {
  return (
    <Button
      sx={{ fontSize: 10, width: "fit-content", p: 0.6, ...sx }}
      type="button"
      variant="contained"
      {...props}
    >
      {children}
    </Button>
  );
};

export const GroupModal = ({ handleClose, show, course, date }) => {
  const [students, paymentDispatch] = useReducer(paymentReducer, []);
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

      <Dialog fullWidth open={show} onClose={handleCloseLesson}>
        <ModalTitle sx={{ paddingLeft: 2 }} toggle={handleCloseLesson}>
          <Stack>
            <Typography sx={{ fontSize: 18 }}>{course}</Typography>
            <Stack spacing={1} direction={"row"}>
              {!deletePending ? (
                <>
                  <ModalActionButton
                    className="green-bg"
                    onClick={addStudentsModalOpen}
                  >
                    Добавить
                  </ModalActionButton>

                  <ModalActionButton
                    className="red-bg"
                    onClick={() => {
                      setDeletePending(true);
                    }}
                  >
                    Удалить
                  </ModalActionButton>
                  <IconButton
                    sx={{
                      fontSize: 5,
                      width: "fit-content",
                      backgroundColor: "rgb(25, 118, 210)",
                      p: 1,
                      ":hover": { backgroundColor: "rgba(20, 103, 187, 1)" },
                    }}
                    onClick={copyLessonHandle}
                  >
                    <ContentCopyIcon
                      sx={{
                        fontSize: 16,
                        color: "#fff",
                      }}
                    />
                  </IconButton>
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

        <ModalBody sx={{ marginTop: 2, paddingLeft: 1 }}>
          {students.length ? (
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
                  {key !== students.length - 1 && (
                    <Divider sx={{ borderColor: "#d6d6d6ff" }} />
                  )}
                </div>
              );
            })
          ) : (
            <Box
              sx={{ display: "flex", justifyContent: "center", minHeight: 100 }}
            >
              <CircularProgress />
            </Box>
          )}
        </ModalBody>
      </Dialog>
    </>
  );
};
