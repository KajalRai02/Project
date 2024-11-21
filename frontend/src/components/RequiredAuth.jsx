import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";


function RequiredAuth({ allowedRoles }) {
  const location = useLocation();

  const auth = useSelector((state) => state.auth);

  if (auth?.isAuthenticated) {
    if (allowedRoles?.includes(auth.user.role)) {
      return <Outlet />;
    } else {
      return <Navigate to="/unauthorized" state={{ from: location }} replace />;
 
    }
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
}

export default RequiredAuth;
