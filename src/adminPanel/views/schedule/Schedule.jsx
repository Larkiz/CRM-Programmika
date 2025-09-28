import { useEffect, useRef } from "react";

import { Lesson } from "./Lesson";
import { useScheduleFetch } from "./hooks/useScheduleFetch";

import { compare, getMonth } from "./functions/dateFunctions";

import { GroupModal } from "./modals/GroupModal/GroupModal";
import { NewLessonModal } from "./modals/NewLessonModal/NewLesson";
import { MonthController } from "@/commonComponents/MonthController/MonthController";
import { useModalControl } from "@/commonComponents/Modal/useModal";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid2,
  Paper,
  Stack,
  Typography,
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

      150
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

      <Stack spacing={4.5}>
        {schedule &&
          schedule.map((scheduleItem) => {
            return (
              <Paper elevation={6} key={scheduleItem.id}>
                <Grid2 container>
                  <Grid2
                    size={12}
                    sx={{ backgroundColor: "#2979d4", p: 2 }}
                    ref={
                      currentDate === scheduleItem.date ? currentDateRef : null
                    }
                  >
                    <Typography
                      sx={{
                        fontSize: { xs: 16, sm: 18 },
                        color: "#fff",
                        fontWeight: 600,
                      }}
                    >
                      {getMonth(scheduleItem.date)}
                    </Typography>
                  </Grid2>
                  <Grid2 size={12}>
                    {scheduleItem.schedule.length !== 0 ? (
                      scheduleItem.schedule.sort(compare).map((item, key) => {
                        return (
                          <Box key={item.id}>
                            <Lesson
                              onClick={(course) =>
                                handleLessonModalShow(
                                  course,
                                  scheduleItem.date + " " + item.time
                                )
                              }
                              data={item}
                              date={scheduleItem.date}
                              deleteSchedule={() =>
                                deleteSchedule(scheduleItem.date, item.id)
                              }
                            />
                            {key !== scheduleItem.schedule.length - 1 && (
                              <Divider sx={{ borderColor: "#ddddddff" }} />
                            )}
                          </Box>
                        );
                      })
                    ) : (
                      <Grid2 size={12} sx={{ p: 2 }} key={scheduleItem.id}>
                        <Typography
                          sx={{ color: "#8a8a8aff" }}
                          colSpan={3}
                          style={{ fontSize: 16 }}
                        >
                          Нет расписания
                        </Typography>
                      </Grid2>
                    )}
                    <Grid2 sx={{ p: 2 }} size={12}>
                      <Button
                        variant="contained"
                        onClick={() =>
                          newLessonModalOpen({ date: scheduleItem.date })
                        }
                      >
                        Добавить
                      </Button>
                    </Grid2>
                  </Grid2>
                </Grid2>
              </Paper>
            );
          })}
      </Stack>
      <MonthController
        fixedBottom
        filterDate={filterDate}
        dispatch={dispatchMonthFilter}
      />
    </Container>
  );
};
