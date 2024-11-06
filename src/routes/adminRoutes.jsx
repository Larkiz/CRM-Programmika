import { AdminIndex } from "@/adminPanel/views/Index/Index";
import { Schedule } from "@/adminPanel/views/Schedule/Schedule";

import { StudentsTable } from "@/adminPanel/views/Tables/Students/StudentsTable";
import { Debts } from "@/adminPanel/views/Debts/Debts";
import { Finance } from "@/adminPanel/views/Finance/Finance";
import { Statistics } from "@/adminPanel/views/Statistics/Statistics";
import { GroupsContextProvider } from "@/adminPanel/Context/GroupsContextProvider";

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
    path: "/statistics",
    name: "Статистика",
    icon: "fa-solid fa-chart-simple icon-blue",
    component: (
      <GroupsContextProvider>
        <Statistics />
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
