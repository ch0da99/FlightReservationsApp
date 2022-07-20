import React from "react";
import { Navigate, useLocation } from "react-router";
import CustomerPanel from "./CustomerPanel";
import { connect, useSelector } from "react-redux";
import AdministratorPanel from "./AdministratorPanel";
import AgentPanel from "./AgentPanel";

const Home = ({ user }) => {
  const location = useLocation();
  return user?.role == "Customer" ? (
    <CustomerPanel />
  ) : user.role == "Administrator" ? (
    <AdministratorPanel />
  ) : user.role == "Agent" ? (
    <AgentPanel />
  ) : (
    <Navigate to={"/signIn"} state={{ from: location }} />
  );
  // if (role == "Customer") {
  //   return <CustomerPanel />;
  // } else if (role == "Administrator") {
  //   return <AdministratorPanel />;
  // } else if (role == "Agent") {
  //   return <AgentPanel />;
  // } else {
  //   return <Navigate to={"/signIn"} state={{ from: location }} />;
  // }
};

const mapStateToProps = (state) => {
  return {
    user: state.LoginReducer.user ? state.LoginReducer.user : [],
  };
};

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(Home);

// export default Home;
