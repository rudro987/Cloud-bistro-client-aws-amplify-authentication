import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useAdmin from "../Hooks/useAdmin";
import HeadBodyGrid from "../Components/Loader/HeadBodyLoader";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  const { isAdminLoading } = useAdmin();
  const location = useLocation();

  if (user) {
    return children;
  }

  if (loading || isAdminLoading) {
    return <HeadBodyGrid />;
  }

  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoutes;
