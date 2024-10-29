/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useRef, useState } from "react";

import { Lesson } from "./Lesson";
import { useScheduleFetch } from "./hooks/useScheduleFetch";

import { compare, getMonth } from "./functions/dateFunctions";
import { GroupsContext } from "adminPanel/Context/GroupsContext";
import { GroupModal } from "./GroupModal";
import { MonthController } from "commonComponents/MonthController/MonthController";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useModalControl } from "commonComponents/Modal/useModal";

export const Schedule = () => {
  const currentDateRef = useRef(null);
  const [schedule, filterDate, dispatchMonthFilter] = useScheduleFetch();

  const currentDate = `${new Date().getFullYear()}.${(
    "0" +
    (new Date().getMonth() + 1)
  ).slice(-2)}.${new Date().getDate()}`;

  useEffect(() => {
    currentDateRef.current && currentDateRef.current.scrollIntoView();
  }, [currentDateRef.current]);
  const { modalData, modalClose, modalOpen } = useModalControl();

  return (
    <Container maxWidth={false}>
      <GroupModal
        id={modalData.data?.id}
        handleClose={modalClose}
        show={modalData.show}
      />

      <MonthController
        fixedBottom
        filterDate={filterDate}
        dispatch={dispatchMonthFilter}
      />

      {schedule &&
        schedule.map((scheduleItem) => {
          return (
            <Table className="shadow mb-4" key={scheduleItem.id}>
              <TableHead
                ref={currentDate === scheduleItem.date ? currentDateRef : null}
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
                        onClick={() => modalOpen(item)}
                        key={item.id}
                        data={item}
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
              </TableBody>
            </Table>
          );
        })}
    </Container>
  );
};
