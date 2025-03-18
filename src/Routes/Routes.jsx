import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import Register from "../Pages/Authentication/Register";
import Login from "../Pages/Authentication/Login";
import Quizzes from "../Pages/Quizzes/Quizzes";
import PrivateRoutes from "./PrivateRoutes/PrivateRoutes";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/login",
        element:<Login></Login>
      },
      {
        path:"/quizzes",
        element:<PrivateRoutes>
          <Quizzes/></PrivateRoutes>
      }
    ],
  },
]);
export default router;
