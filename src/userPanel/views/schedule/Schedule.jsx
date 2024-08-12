/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useRef, useState } from "react";
import { Container, Table } from "reactstrap";

import { Lesson } from "./Lesson";
import { useScheduleFetch } from "./hooks/useScheduleFetch";

import { compare, getMonth } from "./functions/dateFunctions";
import { GroupsContext } from "adminPanel/Context/GroupsContext";
import { GroupModal } from "./GroupModal";
import { MonthController } from "adminPanel/components/MonthController/MonthController";

export const Schedule = () => {
  const currentDateRef = useRef(null);
  const [schedule, filterDate, dispatchMonthFilter] = useScheduleFetch();
  const groups = useContext(GroupsContext);
  const [show, setShow] = useState({
    status: false,
    course: null,
    date: null,
  });

  const handleClose = () => setShow({ status: false, course: null });
  const handleShow = (course, date) =>
    setShow({
      status: true,
      course: course,
      date: date,
    });

  const currentDate = `${new Date().getFullYear()}.${(
    "0" +
    (new Date().getMonth() + 1)
  ).slice(-2)}.${new Date().getDate()}`;

  useEffect(() => {
    currentDateRef.current && currentDateRef.current.scrollIntoView();
  }, [currentDateRef.current]);

  return (
    <Container fluid>
      <GroupModal
        handleClose={handleClose}
        show={show.status}
        course={show.course}
        date={show.date}
      />

      <MonthController
        fixedBottom
        filterDate={filterDate}
        dispatch={dispatchMonthFilter}
      />

      {schedule &&
        schedule.map((scheduleItem) => {
          return (
            <Table
              innerRef={
                currentDate === scheduleItem.date ? currentDateRef : undefined
              }
              className="shadow mb-4"
              key={scheduleItem.id}
              responsive
              hover
            >
              <thead
                style={{ backgroundColor: "rgb(58 130 214)", width: 100 + "%" }}
              >
                <tr>
                  <th
                    colSpan={4}
                    style={{ fontSize: 18, color: "#fff", fontWeight: 700 }}
                  >
                    {getMonth(scheduleItem.date)}
                  </th>
                </tr>
              </thead>
              <tbody>
                {scheduleItem.schedule.length !== 0 ? (
                  scheduleItem.schedule.sort(compare).map((item) => {
                    return (
                      <Lesson
                        onClick={() =>
                          handleShow(
                            item.course,
                            scheduleItem.date + " " + item.time
                          )
                        }
                        key={item.id}
                        data={item}
                        date={scheduleItem.date}
                        groups={groups}
                      />
                    );
                  })
                ) : (
                  <tr key={scheduleItem.id}>
                    <td colSpan={3} style={{ fontSize: 16 }}>
                      нет расписания
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          );
        })}
    </Container>
  );
};
