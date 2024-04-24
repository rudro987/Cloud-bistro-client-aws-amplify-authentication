import {
  createBrowserRouter,
} from "react-router-dom";
import DashBoardLayout from "../Layout/DashBoardLayout";
import MainLayout from "../Layout/MainLayout";
import ConfirmSignUp from "../Pages/Authentication/ConfirmSignUp";
import Login from "../Pages/Authentication/Login";
import SignUp from "../Pages/Authentication/SignUp";
import AddItem from '../Pages/DashBoardPages/AdminDashBoardPages/AddItem';
import AdminHome from '../Pages/DashBoardPages/AdminDashBoardPages/AdminHome';
import AllUsers from '../Pages/DashBoardPages/AdminDashBoardPages/AllUsers';
import ManageBookings from '../Pages/DashBoardPages/AdminDashBoardPages/ManageBookings';
import ManageItems from '../Pages/DashBoardPages/AdminDashBoardPages/ManageItems';
import DashboardHome from "../Pages/DashBoardPages/DashboardHome/DashboardHome";
import Home from "../Pages/Home/Home/Home";
import Menu from "../Pages/Menu/Menu/Menu";
import Order from "../Pages/Order/Order/Order";
import Secrets from "../Pages/Secrets/Secrets";
import PrivateRoutes from "./PrivateRoutes";
import UserCart from "../Pages/DashBoardPages/UserDashboardPages/UserCart";
import UserHome from "../Pages/DashBoardPages/UserDashboardPages/UserHome";
import UserReservations from "../Pages/DashBoardPages/UserDashboardPages/UserReservations";
import UserBookings from "../Pages/DashBoardPages/UserDashboardPages/UserBookings";
import AddReview from "../Pages/DashBoardPages/UserDashboardPages/AddReview";


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
        // User dashboard routes
        {
          path: 'user-home',
          element: <UserHome></UserHome>
        },
        {
          path: 'reservation',
          element: <UserReservations></UserReservations>
        },
        {
          path: 'cart',
          element: <UserCart></UserCart>
        },
        {
          path: 'add-review',
          element: <AddReview></AddReview>
        },
        {
          path: 'bookings',
          element: <UserBookings></UserBookings>
        },

        // Admin dashboard routes
        {
          path:'admin-home',
          element: <AdminHome></AdminHome>
        },
        {
          path:'add-items',
          element: <AddItem></AddItem>
        },
        {
          path:'manage-items',
          element: <ManageItems></ManageItems>
        },
        {
          path:'manage-bookings',
          element: <ManageBookings></ManageBookings>
        },
        {
          path:'all-users',
          element: <AllUsers></AllUsers>
        },
      ]
    }
  ]);