import { ucFirst } from "functions/uppercaseFirst";
import { useRef } from "react";

export const MonthController = ({
  filterDate,
  dispatch,
  fixedBottom = false,
}) => {
  const fixed = fixedBottom ? "fixed-bottom-custom" : null;
  const ref = useRef(null);
  const posCenter =
    ref.current && ref.current.parentElement.clientWidth / 2 - 150;

  return (
    <div
      style={{ right: posCenter + "px" }}
      className={"month-controller " + fixed}
      ref={ref}
    >
      <button
        className="ni ni-bold-left"
        onClick={() => dispatch("prevMonth")}
      ></button>

      {ucFirst(
        new Date(filterDate.year, filterDate.month, 0).toLocaleString(
          "default",
          { month: "long" }
        )
      )}

      <button
        className="ni ni-bold-right"
        onClick={() => dispatch("nextMonth")}
      ></button>
    </div>
  );
};
