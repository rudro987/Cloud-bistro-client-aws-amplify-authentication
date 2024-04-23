import {
    createBrowserRouter,
  } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home/Home";
import Menu from "../Pages/Menu/Menu/Menu";
import Order from "../Pages/Order/Order/Order";
import Login from "../Pages/Authentication/Login";
import SignUp from "../Pages/Authentication/SignUp";
import ConfirmSignUp from "../Pages/Authentication/ConfirmSignUp";
import Secrets from "../Pages/Secrets/Secrets"
import PrivateRoutes from "./PrivateRoutes";
import DashBoardLayout from "../Layout/DashBoardLayout";
import DashboardHome from "../Pages/DashBoardPages/UserDashboardPages/DashboardHome/DashboardHome";
import DashboardCart from "../Pages/DashBoardPages/UserDashboardPages/DashboardCart/DashboardCart";


  export const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
          path: 'menu',
          element: <Menu></Menu>
        },
        {
          path: 'order/:category',
          element: <Order></Order>
        },
        {
          path: 'login',
          element: <Login></Login>
        },
        {
          path: 'signup',
          element: <SignUp></SignUp>
        },
        {
          path: 'confirm-sign-up',
          element: <ConfirmSignUp></ConfirmSignUp>
        },
        {
          path: 'secrets',
          element: <PrivateRoutes><Secrets></Secrets></PrivateRoutes>
        }
      ]
    },
    {
      path: 'dashboard',
      element: <PrivateRoutes><DashBoardLayout></DashBoardLayout></PrivateRoutes>,
      children: [
        {
          path:'/dashboard',
          element: <DashboardHome></DashboardHome>
        },
        {
          path: 'cart',
          element: <DashboardCart></DashboardCart>
        }
      ]
    }
  ]);