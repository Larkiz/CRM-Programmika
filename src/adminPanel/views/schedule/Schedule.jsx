import { useEffect, useRef } from "react";

import { Lesson } from "./Lesson";
import { useScheduleFetch } from "./hooks/useScheduleFetch";

import { compare, getMonth } from "./functions/dateFunctions";

import { GroupModal } from "./modals/GroupModal/GroupModal";
import { NewLessonModal } from "./modals/NewLessonModal/NewLesson";
import { MonthController } from "@/commonComponents/MonthController/MonthController";
import { useModalControl } from "@/commonComponents/Modal/useModal";
import {
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

export const Schedule = () => {
  const currentDateRef = useRef(null);
  const [schedule, handleAdd, deleteSchedule, filterDate, dispatchMonthFilter] =
    useScheduleFetch();

  const currentDate = `${new Date().getFullYear()}.${(
    "0" +
    (new Date().getMonth() + 1)
  ).slice(-2)}.${new Date().getDate()}`;

  useEffect(() => {
    setTimeout(
      () =>
        currentDateRef.current &&
        currentDateRef.current.scrollIntoView({
          block: "center",
          behavior: "smooth",
        }),

      100
    );
  }, []);

  const {
    modalData: lessonModalData,
    modalClose: lessonModalClose,
    modalOpen: lessonModalOpen,
  } = useModalControl();

  const handleLessonModalShow = (course, date) =>
    lessonModalOpen({
      show: true,
      course: course,
      date: date,
    });

  const {
    modalData: newLessonModalData,
    modalClose: newLessonModalClose,
    modalOpen: newLessonModalOpen,
  } = useModalControl();

  return (
    <Container sx={{ mt: 3 }} maxWidth={false}>
      <GroupModal
        handleClose={lessonModalClose}
        show={lessonModalData.show}
        course={lessonModalData.data?.course}
        date={lessonModalData.data?.date}
      />
      <NewLessonModal
        handleClose={newLessonModalClose}
        show={newLessonModalData.show}
        date={newLessonModalData.data?.date}
        handleAdd={handleAdd}
      />

      {schedule &&
        schedule.map((scheduleItem) => {
          return (
            <Paper elevation={6} key={scheduleItem.id}>
              <Table sx={{ mb: 4 }}>
                <TableHead
                  ref={
                    currentDate === scheduleItem.date ? currentDateRef : null
                  }
                >
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      sx={{ fontSize: { xs: 16, sm: 18 }, color: "#fff" }}
                    >
                      {getMonth(scheduleItem.date)}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {scheduleItem.schedule.length !== 0 ? (
                    scheduleItem.schedule.sort(compare).map((item) => {
                      return (
                        <Lesson
                          onClick={(course) =>
                            handleLessonModalShow(
                              course,
                              scheduleItem.date + " " + item.time
                            )
                          }
                          key={item.id}
                          data={item}
                          date={scheduleItem.date}
                          deleteSchedule={() =>
                            deleteSchedule(scheduleItem.date, item.id)
                          }
                        />
                      );
                    })
                  ) : (
                    <TableRow key={scheduleItem.id}>
                      <TableCell colSpan={3} style={{ fontSize: 16 }}>
                        Нет расписания
                      </TableCell>
                    </TableRow>
                  )}
                  <TableRow>
                    <TableCell colSpan={3}>
                      <Button
                        variant="contained"
                        onClick={() =>
                          newLessonModalOpen({ date: scheduleItem.date })
                        }
                      >
                        Добавить
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Paper>
          );
        })}
      <MonthController
        fixedBottom
        filterDate={filterDate}
        dispatch={dispatchMonthFilter}
      />
    </Container>
  );
};
