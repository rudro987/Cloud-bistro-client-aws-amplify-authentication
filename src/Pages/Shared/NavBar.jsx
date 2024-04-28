import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { FaShoppingCart } from "react-icons/fa";
import useCart from "../../Hooks/useCart";
import useAdmin from "../../Hooks/useAdmin";

const NavBar = () => {
  const { user, handleSignOut, loading } = useAuth();
  const { isAdmin } = useAdmin();
  const { cart } = useCart();

  const handleLogOut = async () => {
    try {
      await handleSignOut();
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };
  const navOptions = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/menu">Our Menu</Link>
      </li>
      <li>
        <Link to="/order/salad">Order Food</Link>
      </li>
      {
        user && isAdmin && <li>
        <Link to="/dashboard/admin-home"> Admin Dashboard</Link>
      </li>
      }
      {
        user && !isAdmin && <li>
        <Link to="/dashboard/user-home">User Dashboard</Link>
      </li>
      }
      <li>
        <Link to="/dashboard">
          <div className="flex gap-2 items-center badge badge-secondary">
            <FaShoppingCart />
            <p>+{cart.length}</p>
          </div>
        </Link>
      </li>
    </>
  );

  return (
    <div className="navbar fixed z-10 bg-opacity-30 bg-black text-white max-w-screen-2xl ">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navOptions}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">Cloud Bistro</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navOptions}</ul>
      </div>
      <div className="navbar-end">
        <div className="flex gap-5">
          {
            loading ? (
              <span className="loading loading-dots loading-lg"></span>
            ) : (
              user === null ? (
            <>
              <Link to="/login">
                <button className="btn btn-accent">Login</button>
              </Link>
              <Link to="/signup">
                <button className="btn btn-info">Sign up</button>
              </Link>
            </>
          ) : (
            <button className="btn btn-success" onClick={handleLogOut}>
              Logout
            </button>
          )
            )
          }
        </div>
      </div>
    </div>
  );
};

export default NavBar;
