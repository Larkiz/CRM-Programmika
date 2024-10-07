import { authFetch } from "adminPanel/views/Index/functions/authFetch";
import { createContext, useEffect, useState } from "react";

export const GroupsContext = createContext();

export const GroupsContextProvider = ({ children }) => {
  const [groups, setGroups] = useState({ data: null, coursesNames: null });
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
  return (
    <GroupsContext.Provider value={groups}>{children}</GroupsContext.Provider>
  );
};
