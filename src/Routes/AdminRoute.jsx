import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";
import useAuth from "../Hooks/useAuth";
import Loader from "../Components/Loader/Loader";

const AdminRoute = ({ children }) => {
    const { user } = useAuth();
    const { isAdmin, isAdminLoading} = useAdmin();
    const location = useLocation();

    if(isAdminLoading) {
        return <Loader></Loader>;
    }

    if(user && isAdmin){
        return children;
    }


    return <Navigate to="/" state={{from: location}} replace></Navigate>
};

export default AdminRoute;