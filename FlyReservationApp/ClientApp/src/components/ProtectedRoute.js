import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Login from "./Login";

const ProtectedRoute = ({ user, role }) => {
  console.log(user.role);
  console.log(role);
  return user && user.role == role ? <Outlet /> : <Login />;
};

export default ProtectedRoute;
