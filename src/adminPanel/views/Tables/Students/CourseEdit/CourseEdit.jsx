import { CoursePicker } from "@/adminPanel/components/FormElements/CoursePicker";
import { GroupsContext } from "@/adminPanel/Context/GroupsContextProvider";

import { useContext } from "react";

export const CourseEdit = ({ value, onValueChange }) => {
  const {
    groups: { coursesNames },
  } = useContext(GroupsContext);

  const defaultValue = typeof value !== "string" ? value : value.split(", ");

  return (
    <CoursePicker
      multiple
      // value={defaultValue}
      value={defaultValue ? defaultValue : []}
      courses={coursesNames}
      onChange={({ target: { value } }) => onValueChange(value.join(", "))}
    />
  );
};
