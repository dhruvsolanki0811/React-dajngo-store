import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../../context/AuthContext";

const RestrictAuth = () => {
  const { userState } = useAuthContext();
  const location = useLocation();
  return userState.id ? (
    <Navigate to="/" state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
};

export { RestrictAuth };