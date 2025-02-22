import { TableCell, TableRow } from "@mui/material";
import { useState } from "react";

function addTime(inputTime) {
  const timeParts = inputTime.split(":");

  let hours = parseInt(timeParts[0]);
  let minutes = parseInt(timeParts[1]);
  hours += 1;
  minutes += 30;
  if (minutes >= 60) {
    minutes = minutes - 60;
    hours += 1;
  }
  return hours + ":" + ("0" + minutes).slice(-2);
}
function lessonTime(time) {
  return time + " - " + addTime(time);
}
export const Lesson = ({ data, onClick }) => {
  const [lessonData, setLesson] = useState({
    course: data.course,
    time: data.time,
  });

  return (
    <TableRow hover sx={{ cursor: "pointer" }} onClick={onClick} key={data.id}>
      <TableCell sx={{ fontSize: { xs: 15, sm: 17 } }}>
        {lessonData.course}
      </TableCell>
      <TableCell colSpan={2} sx={{ fontSize: { xs: 15, sm: 17 } }}>
        {lessonTime(lessonData.time)}
      </TableCell>
    </TableRow>
  );
};
