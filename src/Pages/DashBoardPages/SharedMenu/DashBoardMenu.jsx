import { NavLink } from "react-router-dom";
import { FaAd, FaCalendar, FaHome, FaList, FaSearch, FaShoppingCart } from "react-icons/fa";

const DashBoardMenu = () => {
  return (
    <ul className="menu">
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
          <FaShoppingCart></FaShoppingCart> My Cart
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
      <div className="divider"></div>

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
    </ul>
  );
};

export default DashBoardMenu;
