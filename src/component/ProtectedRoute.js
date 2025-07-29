import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    return decoded.exp * 1000 > Date.now();
  } catch {
    return false;
  }
};

const getUserRole = () => localStorage.getItem("role");

const ProtectedRoute = ({ children, allowedRoles }) => {
  const auth = isAuthenticated();
  const role = getUserRole();

  if (!auth) {
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/not-found" replace />;
  }

  return children;
};

export default ProtectedRoute;
