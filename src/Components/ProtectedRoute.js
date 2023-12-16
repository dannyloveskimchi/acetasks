import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
    const apiToken = localStorage.getItem("apiToken");
    const location = useLocation();

    return (
        JSON.parse(apiToken)
            ? <Outlet />
            : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default ProtectedRoute;