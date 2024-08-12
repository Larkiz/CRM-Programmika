import { UserIndex } from "userPanel/views/Index/Index";
import { Schedule } from "userPanel/views/schedule/Schedule";

const userRoutes = [
  {
    path: "/index",
    name: "Личный кабинет",
    icon: "ni ni-key-25 text-info",
    component: <UserIndex />,
    layout: "/user",
  },
  {
    path: "/schedule",
    name: "Расписание",
    icon: "ni ni-calendar-grid-58",
    component: <Schedule />,
    layout: "/user",
  },
];
export default userRoutes;
