import { Outlet } from "react-router-dom";
import DashBoardMenu from "../Pages/DashBoardPages/SharedMenu/DashBoardMenu";

const DashBoardLayout = () => {
  return (
    <div className="flex">
    {/* Sidebar menu items */}
      <div className="w-72 min-h-screen bg-orange-400">
        <DashBoardMenu></DashBoardMenu>
      </div>

      {/* Dashboard content */}
      <div className="flex-1 p-8">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DashBoardLayout;
