import { Navbar } from "reactstrap";

export const MonthController = ({
  filterDate,
  dispatch,
  fixedBottom = false,
}) => {
  const fixed = fixedBottom ? "fixed-bottom-custom" : null;
  return (
    <Navbar className={"month-controller " + fixed} dark>
      <div>
        <button
          className="ni ni-bold-left"
          onClick={() => dispatch("prevMonth")}
        ></button>
        {new Date(filterDate.year, filterDate.month, 0).toLocaleString(
          "default",
          { month: "long" }
        )}
        <button
          className="ni ni-bold-right"
          onClick={() => dispatch("nextMonth")}
        ></button>
      </div>
    </Navbar>
  );
};
