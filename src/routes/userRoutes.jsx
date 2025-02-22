import { UserIndex } from "@/userPanel/views/Index/Index";
import { Schedule } from "@/userPanel/views/schedule/Schedule";

const userRoutes = [
  {
    path: "/index",
    name: "Личный кабинет",
    icon: "ni ni-key-25 icon-blue",
    component: <UserIndex />,
    layout: "/user",
  },
  {
    path: "/schedule",
    name: "Расписание",
    icon: "ni ni-calendar-grid-58 icon-blue",
    component: <Schedule />,
    layout: "/user",
  },
];
export default userRoutes;
