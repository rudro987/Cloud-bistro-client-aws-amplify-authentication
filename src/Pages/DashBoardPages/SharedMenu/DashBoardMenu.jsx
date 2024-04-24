import { NavLink } from "react-router-dom";
import {
  FaAd,
  FaBook,
  FaCalendar,
  FaEnvelope,
  FaHome,
  FaList,
  FaSearch,
  FaShoppingCart,
  FaUsers,
  FaUtensils,
} from "react-icons/fa";
import useCart from "../../../Hooks/useCart";

const DashBoardMenu = () => {
  const { cart } = useCart();
  const isAdmin = true;

  return (
    <ul className="menu">
      {isAdmin ? (
        <>
          {/* Sidebar menu for Admin Dashboard */}
          <li>
            <NavLink to="/dashboard/admin-home">
              <FaHome></FaHome> Admin Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/add-items">
              <FaUtensils></FaUtensils> Add items
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/manage-items">
              <FaList></FaList> Manage Items
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/manage-bookings">
              <FaBook></FaBook> Manage Bookings
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/all-users">
              <FaUsers></FaUsers> All users
            </NavLink>
          </li>
        </>
      ) : (
        <>
          {/* Sidebar menu for user Dashboard */}
          <li>
            <NavLink to="/dashboard/user-home">
              <FaHome></FaHome> User Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/reservation">
              <FaCalendar></FaCalendar> Reservation
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/cart">
              <FaShoppingCart></FaShoppingCart> My Cart ({cart.length})
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/add-review">
              <FaAd></FaAd> Add Review
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/bookings">
              <FaList></FaList> My Bookings
            </NavLink>
          </li>
        </>
      )}

      <div className="divider"></div>

      {/* Shared navlinks for dashboard sidebar */}

      <li>
        <NavLink to="/">
          <FaHome></FaHome> Home
        </NavLink>
      </li>

      <li>
        <NavLink to="/menu">
          <FaSearch></FaSearch> Menu
        </NavLink>
      </li>
      <li>
        <NavLink to="/contact">
          <FaEnvelope></FaEnvelope> Contact
        </NavLink>
      </li>
    </ul>
  );
};

export default DashBoardMenu;
