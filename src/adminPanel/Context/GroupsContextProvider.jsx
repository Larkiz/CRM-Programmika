import { authFetch } from "@/adminPanel/functions/authFetch";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const GroupsContext = createContext();

export const GroupsContextProvider = ({ children }) => {
  const [groups, setGroups] = useState({ data: null, coursesNames: null });
  const [copiedLesson, setCopiedLesson] = useState({
    data: null,
    snackBarOpened: false,
  });

  useEffect(() => {
    authFetch("/groups")
      .then((res) => res.json())
      .then((data) => {
        setGroups({
          data: data,
          coursesNames: data.map((course) => course.name),
        });
      });
  }, []);

  function copyLesson(lesson) {
    const tst = {
      data: {
        ...lesson,
        students: lesson.students.map((student) => {
          return {
            id: student.student_id,
            first_name: student.first_name,
            last_name: student.last_name,
          };
        }),
      },
      snackBarOpened: true,
    };
    setCopiedLesson(tst);
    toast.success("Урок скопирован");
  }

  function snackBarOpen() {
    setCopiedLesson({ ...copiedLesson, snackBarOpened: true });
  }
  function snackBarClose() {
    setCopiedLesson({ ...copiedLesson, snackBarOpened: false });
  }

  return (
    <GroupsContext.Provider
      value={{
        groups,
        copiedLesson: copiedLesson.data,
        snackBarOpened: copiedLesson.snackBarOpened,
        copyLesson,
        snackBarControl: { close: snackBarClose, open: snackBarOpen },
      }}
    >
      {children}
    </GroupsContext.Provider>
  );
};
