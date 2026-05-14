import { createBrowserRouter } from "react-router";
import Register from "./src/pages/RegisterPage";
import Login from "./src/pages/LoginPage";

export const routes = createBrowserRouter([
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
