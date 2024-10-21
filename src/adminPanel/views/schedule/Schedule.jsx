/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { Button, Container, Table } from "reactstrap";

import { Lesson } from "./Lesson";
import { useScheduleFetch } from "./hooks/useScheduleFetch";

import { compare, getMonth } from "./functions/dateFunctions";

import { GroupModal } from "./modals/GroupModal/GroupModal";
import { NewLessonModal } from "./modals/NewLessonModal/NewLesson";
import { MonthController } from "commonComponents/MonthController/MonthController";
import { useModalControl } from "commonComponents/Modal/useModal";

export const Schedule = () => {
  const currentDateRef = useRef(null);
  const [schedule, handleAdd, deleteSchedule, filterDate, dispatchMonthFilter] =
    useScheduleFetch();

  const [groupModal, setGroupModal] = useState({
    status: false,
    course: null,
    date: null,
  });
  const [lessonModal, setLessonModal] = useState({
    status: false,
    date: null,
  });

  const handleLessonModalClose = () => {
    setLessonModal({ status: false, date: null });
  };
  // const handleLessonModalShow = (date) => {
  //   setLessonModal({ status: true, date: date });
  // };

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
    <Container style={{ marginBottom: "70px" }} fluid>
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
            <Table
              className="shadow mb-4"
              key={scheduleItem.id}
              responsive
              hover
            >
              <thead
                ref={currentDate === scheduleItem.date ? currentDateRef : null}
              >
                <tr>
                  <th colSpan={4} style={{ fontSize: 18 }}>
                    {getMonth(scheduleItem.date)}
                  </th>
                </tr>
              </thead>
              <tbody>
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
                  <tr key={scheduleItem.id}>
                    <td colSpan={3} style={{ fontSize: 16 }}>
                      Нет расписания
                    </td>
                  </tr>
                )}
                <tr>
                  <td colSpan={3}>
                    <Button
                      color="primary"
                      onClick={() =>
                        newLessonModalOpen({ date: scheduleItem.date })
                      }
                    >
                      Добавить
                    </Button>
                  </td>
                </tr>
              </tbody>
            </Table>
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
