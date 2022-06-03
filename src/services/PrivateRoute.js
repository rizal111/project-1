import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider.js";

const ProtectedRoute = ({ component: RouteComponent }) => {
  const { currentUser } = useAuth();
  return currentUser ? <RouteComponent /> : <Navigate to="/" />;
};

export default ProtectedRoute;
