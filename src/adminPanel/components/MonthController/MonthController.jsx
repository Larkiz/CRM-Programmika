import { ucFirst } from "functions/uppercaseFirst";
import moment from "moment";
import { useRef } from "react";

export const MonthController = ({
  filterDate,
  dispatch,
  fixedBottom = false,
  style,
}) => {
  const fixed = fixedBottom ? "fixed-bottom-custom" : null;
  const ref = useRef(null);
  const posCenter =
    ref.current && ref.current.parentElement.clientWidth / 2 - 150;

  return (
    <div
      style={{ right: posCenter + "px", ...style }}
      className={"month-controller " + fixed}
      ref={ref}
    >
      <button
        className="ni ni-bold-left"
        onClick={() => dispatch("prevMonth")}
      ></button>

      {ucFirst(
        moment(`${filterDate.year}.${filterDate.month}`, "YYYY.MM").format(
          "MMMM"
        )
      )}

      <button
        className="ni ni-bold-right"
        onClick={() => dispatch("nextMonth")}
      ></button>
    </div>
  );
};
