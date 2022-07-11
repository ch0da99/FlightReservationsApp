import React, { Component, useState } from "react";
import { Route, Routes } from "react-router";
import Layout from "./components/Layout";
import { FetchData } from "./components/FetchData";
import { Counter } from "./components/Counter";
import { connect } from "react-redux";
import {
  Login,
  ProtectedRoute,
  CustomerPanel,
  AdministratorPanel,
  AgentPanel,
  Home,
} from "./components/index";

import "./custom.css";

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/signIn" element={<Login />} />
        <Route path="/fetch-data" element={<FetchData />} />
        {/* <Route element={<ProtectedRoute user={user} role={"agent"} />}>
          <Route element={<Home />} path="/home"></Route>
        </Route> */}
        {/* <Route element={<ProtectedRoute requiredRole={"administrator"} />}>
          <Route path="/homeAdmin" element={<AdministratorPanel />} />
        </Route>
        <Route element={<ProtectedRoute requiredRole={"agent"} />}>
          <Route path="/homeAgent" element={<AgentPanel />} />
        </Route>
        <Route element={<ProtectedRoute requiredRole={"customer"} />}>
          <Route path="/homeCustomer" element={<CustomerPanel />} />
        </Route>
      </Routes> */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </Layout>
  );
};
export default App;
