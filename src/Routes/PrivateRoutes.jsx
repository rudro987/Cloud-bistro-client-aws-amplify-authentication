import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import Loader from "../Components/Loader/Loader";
import useAdmin from "../Hooks/useAdmin";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  const { isAdminLoading } = useAdmin();
  const location = useLocation();

  if (user) {
    return children;
  }

  if (loading || isAdminLoading) {
    return <Loader></Loader>;
  }

  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoutes;
