import React from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider.js";

const ProtectedRoute = ({ component: RouteComponent }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, currentUserInfo } = useAuth();

  const verification = () => {
    if (!currentUserInfo.emailVerified) {
      if (location.pathname !== "/emailverification")
        return <Navigate to="/emailverification" />;
      return <RouteComponent />;
    } else if (location.pathname === "/emailverification") {
      return <Navigate to="/dashboard" />;
    }
    return <RouteComponent />;
  };
  return currentUser ? verification() : <Navigate to="/" />;
};

export default ProtectedRoute;
