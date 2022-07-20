import React, { useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Login from "./Login";
import { connect } from "react-redux";

const ProtectedRoute = ({ user, requiredRole = null }) => {
  const location = useLocation();
  console.log(requiredRole);
  return user && (requiredRole == null || requiredRole == user.role) ? (
    <Outlet />
  ) : (
    <Navigate to={"/signIn"} state={{ from: location }} replace />
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.LoginReducer.user ? state.LoginReducer.user : null,
  };
};

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute);
