import { TableCell, TableRow } from "@mui/material";
import { toast } from "react-toastify";

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
export const Lesson = ({ deleteSchedule, data, onClick }) => {
  return (
    <TableRow
      hover
      sx={{ cursor: "pointer" }}
      onClick={() => onClick(data.course)}
      key={data.id}
    >
      <TableCell sx={{ fontSize: { xs: 15, sm: 17 } }}>
        {data.course.length > 15 ? data.shortCourse : data.course}
      </TableCell>
      <TableCell sx={{ fontSize: { xs: 15, sm: 17 } }} colSpan={2}>
        {lessonTime(data.time)}
      </TableCell>
      <TableCell
        className="button-control-cont"
        sx={{ fontSize: 25 }}
        colSpan={2}
      >
        <button
          className="ni ni-fat-remove button-control red"
          onClick={(e) => {
            e.stopPropagation();
            if (window.confirm("Удалить урок из расписания?")) {
              deleteSchedule().then(toast.success("Урок удалён"));
            }
          }}
        ></button>
      </TableCell>
    </TableRow>
  );
};
