import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../../context/AuthContext";
import { useEffect, useState } from "react";

const RequireAuth = () => {
  const { userState } = useAuthContext();
  const location = useLocation();
  
  
  return userState.id ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
export {RequireAuth}
