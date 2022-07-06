import React, { Component, useState } from "react";
import { Route, Routes } from "react-router";
import Layout from "./components/Layout";
import { Home } from "./components/Home";
import { FetchData } from "./components/FetchData";
import { Counter } from "./components/Counter";
import {
  Login,
  ProtectedRoute,
  CustomerPanel,
  AdministratorPanel,
  AgentPanel,
} from "./components/index";

import "./custom.css";

const App = () => {
  const [user, setuser] = useState({ role: "agent" });
  return (
    <Layout>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/fetch-data" element={<FetchData />} />
        {/* <Route element={<ProtectedRoute user={user} role={"agent"} />}>
          <Route element={<Home />} path="/home"></Route>
        </Route> */}
        <Route element={<ProtectedRoute user={user} role={"administrator"} />}>
          <Route path="/homeAdmin" element={<AdministratorPanel />} />
        </Route>
        <Route element={<ProtectedRoute user={user} role={"agent"} />}>
          <Route path="/homeAgent" element={<AgentPanel />} />
        </Route>
        <Route element={<ProtectedRoute user={user} role={"customer"} />}>
          <Route path="/homeCustomer" element={<CustomerPanel />} />
        </Route>
      </Routes>
    </Layout>
  );
};

export default App;
