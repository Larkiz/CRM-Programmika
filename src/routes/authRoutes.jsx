import { Login } from "@/auth/Login";

const adminRoutes = [
  {
    path: "/",
    name: "Авторизация",
    icon: "ni ni-key-25 text-info",
    component: <Login />,
    layout: "/auth",
  },
];
export default adminRoutes;
