import React from "react";
import { connectionSignalR } from "../api/signalR/config.js";
import { SIGNALR_AGENT_ALL_RESERVATIONS_REQUEST } from "../api/signalR/remoteProcedures.js";
import { connect } from "react-redux";

import { getAllReservationsForAgent } from "../redux/actions/agentActions.js";

const AgentPanel = ({ user, reservations, fetchReservations }) => {
  console.log(connectionSignalR.state);
  if (connectionSignalR.state === "Disconnected") {
    connectionSignalR
      .start()
      .then(() => {
        connectionSignalR
          .invoke("IDresponse", user.id)
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  }
  connectionSignalR.on("IsConnected", (connected) => {
    connectionSignalR
      .invoke(SIGNALR_AGENT_ALL_RESERVATIONS_REQUEST)
      .catch((error) => console.log("greska"));
  });
  connectionSignalR.on("AllReservations", (reservations) => {
    console.log(reservations);
    fetchReservations(reservations);
  });

  return <div>Agent</div>;
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    user: state.LoginReducer.user ? state.LoginReducer.user : null,
    reservations: state.AgentReducer.agent ? state.AgentReducer.agent : [],
  };
};

const mapDispatchToProps = {
  fetchReservations: (reservations) => getAllReservationsForAgent(reservations),
};
export default connect(mapStateToProps, mapDispatchToProps)(AgentPanel);
