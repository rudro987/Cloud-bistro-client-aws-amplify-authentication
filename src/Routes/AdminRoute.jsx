import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";
import useAuth from "../Hooks/useAuth";
import Loader from "../Components/Loader/Loader";

const AdminRoute = ({ children }) => {
    const { user } = useAuth();
    const { isAdmin, isAdminLoading} = useAdmin();
    const location = useLocation();

    if(user && isAdmin){
        return children;
    }

    if(isAdminLoading) {
        return <Loader></Loader>;
    }


    return <Navigate to="/" state={{from: location}} replace></Navigate>
};

export default AdminRoute;