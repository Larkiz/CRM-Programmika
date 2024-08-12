import { useState } from "react";
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
  const [lessonData, setLesson] = useState({
    course: data.course,
    time: data.time,
  });

  return (
    <tr
      style={{ cursor: "pointer" }}
      onClick={() => onClick(lessonData.course)}
      key={data.id}
    >
      <td style={{ fontSize: 18 }}>{lessonData.course} </td>
      <td style={{ fontSize: 18 }} colSpan={2}>
        {lessonTime(lessonData.time)}
      </td>
      <td className="button-control-cont" style={{ fontSize: 25 }} colSpan={2}>
        <button
          className="ni ni-fat-remove button-control red"
          onClick={(e) => {
            e.stopPropagation();
            if (window.confirm("Удалить урок из расписания?")) {
              deleteSchedule().then(toast.success("Урок удалён"));
            }
          }}
        ></button>
      </td>
    </tr>
  );
};
