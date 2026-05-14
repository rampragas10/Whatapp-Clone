import { createBrowserRouter } from "react-router";
import Register from "./src/pages/RegisterPage";
import Login from "./src/pages/LoginPage";
import ChatPage from "./src/pages/ChatPage";

export const routes = createBrowserRouter([
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <ChatPage />,
  },
]);
