import React, { useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Login from "./Login";
import { connect } from "react-redux";

const ProtectedRoute = ({ user }) => {
  const location = useLocation();
  return user ? (
    <Outlet />
  ) : (
    <Navigate to={"/signIn"} state={{ from: location }} replace />
  );
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    user: state.LoginReducer.user ? state.LoginReducer.user : null,
  };
};

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute);
