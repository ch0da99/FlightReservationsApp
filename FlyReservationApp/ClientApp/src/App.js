import React from "react";
import { Route, Routes } from "react-router";
import Layout from "./components/Layout";
import {
  Login,
  ProtectedRoute,
  Home,
  NewFlight,
  NewReservation,
  NewUser,
} from "./components/index";

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/signIn" element={<Login />} />
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
          <Route element={<ProtectedRoute requiredRole={"Agent"} />}>
            <Route path="/addNewFlight" element={<NewFlight />} />
          </Route>
          <Route element={<ProtectedRoute requiredRole={"Customer"} />}>
            <Route path="/addNewReservation" element={<NewReservation />} />
          </Route>
          <Route element={<ProtectedRoute requiredRole={"Administrator"} />}>
            <Route path="/addNewUser" element={<NewUser />} />
          </Route>
        </Route>
      </Routes>
    </Layout>
  );
};
export default App;
