import { ucFirst } from "@/functions/uppercaseFirst";
import { Typography } from "@mui/material";
import moment from "moment";
import { useRef } from "react";

export const MonthController = ({
  filterDate,
  dispatch,
  fixedBottom = false,
  style,
  onlyYear,
}) => {
  const fixed = fixedBottom ? "fixed-bottom-custom" : null;
  const ref = useRef(null);
  const posCenter =
    ref.current && ref.current.parentElement.clientWidth / 2 - 150;
  const [disptachNamePrev, dispatchNameNext] = onlyYear
    ? ["prevYear", "nextYear"]
    : ["prevMonth", "nextMonth"];
  return (
    <div
      style={{ right: posCenter + "px", marginBottom: 5, ...style }}
      className={"month-controller " + fixed}
      ref={ref}
    >
      <button
        className="ni ni-bold-left"
        style={{ cursor: "pointer" }}
        onClick={() => dispatch(disptachNamePrev)}
      ></button>
      <Typography sx={{ fontSize: 23 }}>
        {onlyYear
          ? filterDate.year
          : ucFirst(
              moment(
                `${filterDate.year}.${filterDate.month}`,
                "YYYY.MM"
              ).format("MMMM")
            )}
      </Typography>
      <button
        className="ni ni-bold-right"
        style={{ cursor: "pointer" }}
        onClick={() => dispatch(dispatchNameNext)}
      ></button>
    </div>
  );
};
