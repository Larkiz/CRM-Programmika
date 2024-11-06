import { CoursePicker } from "@/adminPanel/components/FormElements/CoursePicker";
import { GroupsContext } from "@/adminPanel/Context/GroupsContextProvider";

import { useContext } from "react";

export const CourseEdit = ({ value, onValueChange }) => {
  const courses = useContext(GroupsContext).coursesNames;
  const defaultValue = value ? value.split(", ") : [];
  return (
    <CoursePicker
      multiple
      value={defaultValue}
      courses={courses}
      onChange={({ target: { value } }) => onValueChange(value.join(", "))}
    />
  );
};
