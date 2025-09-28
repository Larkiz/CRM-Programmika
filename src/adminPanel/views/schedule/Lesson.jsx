import { Grid2, IconButton, Typography } from "@mui/material";
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
    <Grid2
      container
      sx={{
        cursor: "pointer",
        p: 1.5,
        pt: 2,
        ":hover": {
          backgroundColor: "#e7e7e7ff",
          transition: "0.2s cubic-bezier(0.4, 0, 0.2, 1)",
        },
      }}
      onClick={() => onClick(data.course)}
      key={data.id}
      alignItems={"center"}
    >
      <Grid2 size={6}>
        <Typography sx={{ fontSize: { xs: 14, sm: 16 } }}>
          {data.course}
        </Typography>
      </Grid2>
      <Grid2 size={4} sx={{ fontSize: { xs: 14, sm: 16 } }}>
        <Typography sx={{ fontSize: { xs: 12, sm: 16 } }}>
          {lessonTime(data.time)}
        </Typography>
      </Grid2>
      <Grid2 size={2} className="button-control-cont" sx={{ fontSize: 25 }}>
        <IconButton
          className="ni ni-fat-remove button-control red"
          onClick={(e) => {
            e.stopPropagation();
            if (window.confirm("Удалить урок из расписания?")) {
              deleteSchedule().then(toast.success("Урок удалён"));
            }
          }}
        ></IconButton>
      </Grid2>
    </Grid2>
  );
};
