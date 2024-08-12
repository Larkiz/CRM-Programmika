import { AdminIndex } from "adminPanel/views/Index/Index";
import { Schedule } from "adminPanel/views/schedule/Schedule";

import Icons from "adminPanel/views/examples/Icons";
import Login from "auth/Login";
import { GroupsContextProvider } from "adminPanel/Context/GroupsContext";
import { StudentsTable } from "adminPanel/views/Tables/Students/StudentsTable";
import { Debts } from "adminPanel/views/Debts/Debts";

const adminRoutes = [
  {
    path: "/index",
    name: "Главная",
    icon: "ni ni-app icon-blue",
    component: (
      <GroupsContextProvider>
        <AdminIndex />
      </GroupsContextProvider>
    ),
    layout: "/admin",
  },
  {
    path: "/schedule",
    name: "Расписание",
    icon: "ni ni-calendar-grid-58 icon-blue",
    component: (
      <GroupsContextProvider>
        <Schedule />
      </GroupsContextProvider>
    ),
    layout: "/admin",
  },
  {
    path: "/students",
    name: "Студенты",
    icon: "fa-solid fa-graduation-cap icon-blue",
    component: (
      <GroupsContextProvider>
        <StudentsTable />
      </GroupsContextProvider>
    ),
    layout: "/admin",
  },
  {
    path: "/debts",
    name: "Задолженности",
    icon: "ni ni-credit-card icon-blue",
    component: (
      <GroupsContextProvider>
        <Debts />
      </GroupsContextProvider>
    ),
    layout: "/admin",
  },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "ni ni-planet text-blue",
  //   component: <Icons />,
  //   layout: "/admin",
  // },

  {
    path: "/",
    name: "Авторизация",
    icon: "ni ni-key-25 text-info",
    component: <Login />,
    layout: "/auth",
  },
];
export default adminRoutes;
