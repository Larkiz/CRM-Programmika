import { AdminIndex } from "adminPanel/views/Index/Index";
import { Schedule } from "adminPanel/views/Schedule/Schedule";

import Login from "auth/Login";
import { GroupsContextProvider } from "adminPanel/Context/GroupsContext";
import { StudentsTable } from "adminPanel/views/Tables/Students/StudentsTable";
import { Debts } from "adminPanel/views/Debts/Debts";
import { Finance } from "adminPanel/views/Finance/Finance";

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
    name: "Оплата",
    icon: "ni ni-credit-card icon-blue",
    component: (
      <GroupsContextProvider>
        <Debts />
      </GroupsContextProvider>
    ),
    layout: "/admin",
  },
  {
    path: "/finance",
    name: "Финансы",
    icon: "fa-solid fa-coins icon-blue",
    component: (
      <GroupsContextProvider>
        <Finance />
      </GroupsContextProvider>
    ),
    layout: "/admin",
  },
];
export default adminRoutes;
