import { useEffect, useRef } from "react";

import { Lesson } from "./Lesson";
import { useScheduleFetch } from "./hooks/useScheduleFetch";

import { compare, getMonth } from "./functions/dateFunctions";
import { GroupModal } from "./GroupModal";
import { MonthController } from "@/commonComponents/MonthController/MonthController";
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useModalControl } from "@/commonComponents/Modal/useModal";

export const Schedule = () => {
  const currentDateRef = useRef(null);
  const [schedule, filterDate, dispatchMonthFilter] = useScheduleFetch();

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
            </Paper>
          );
        })}
    </Container>
  );
};
