import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();
    return auth?.accessToken ? <Outlet /> : <Navigate to="/user/sign-in" state={{ from: location }} replace />;
}

export default RequireAuth;