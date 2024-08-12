import { FormGroup, Label } from "reactstrap";

export const CoursePicker = ({ courses, onChange, register, className }) => {
  let classNames = "form-control ";
  if (className) {
    classNames += className;
  }
  return (
    <FormGroup>
      <Label for="course">Направление</Label>
      <select
        id="course"
        className={classNames}
        name="select"
        {...(register ? { ...register } : null)}
        onClick={(e) => e.stopPropagation()}
        onChange={onChange}
        type="select"
      >
        {courses && (
          <>
            <option value={"*"} key={-1}>
              Все
            </option>
            {courses.map((group, key) => {
              return (
                <option value={group} key={key}>
                  {group}
                </option>
              );
            })}
          </>
        )}
      </select>
    </FormGroup>
  );
};
