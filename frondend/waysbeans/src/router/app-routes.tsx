import { createBrowserRouter, RouterProvider,RouteObject } from "react-router-dom";
import Register from "../component/auth/register";
import Login from "../component/auth/login";
import Home from "../pages/home";
import Detail from "../pages/detail";
import Profile from "../pages/profile";
import EditProfile from "../pages/editProfile";

const routes: RouteObject[] = [
    {
      path: "register",
      element: <Register />,
    },
    {
      path: "login",
      element: <Login />
    },
    {
      path: "home",
      element: <Home />
    },
    {
      path: "detail",
      element: <Detail />
    },
    {
      path: "profile",
      element: <Profile />
    },
    {
      path: "editprofile",
      element: <EditProfile />
    },
    
    
];
export default function Router() {
    return <RouterProvider router={createBrowserRouter(routes)} />;
  }