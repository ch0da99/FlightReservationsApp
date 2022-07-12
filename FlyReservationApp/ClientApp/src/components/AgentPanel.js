import React from "react";
import { connectionSignalR } from "../api/signalR/config.js";
import { SIGNALR_AGENT_ALL_RESERVATIONS_REQUEST } from "../api/signalR/remoteProcedures.js";
import { connect } from "react-redux";
import "./AgentPanel.css";
import {
  getAllReservationsForAgent,
  approveReservation,
} from "../redux/actions/agentActions.js";

const AgentPanel = ({
  user,
  reservations,
  fetchReservations,
  approveCustomerReservation,
}) => {
  console.log(reservations);
  const ApproveReservationClick = (idReservation) => {
    connectionSignalR.invoke("ApproveReservationRequest", idReservation);
  };
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
    fetchReservations(reservations);
  });
  connectionSignalR.on("NewReservationApprove", (id) => {
    if (id !== 0) {
      approveCustomerReservation(id);
    } else {
      alert(
        `Error with approving reservation with id: ${id} for user: ${
          reservations.filter((r) => r.id == id)[0].customer.username
        }. Please try again later.`
      );
    }
  });

  return (
    <div>
      <h1>Pending reservations</h1>
      {reservations
        .filter((r) => !r.approved)
        .map((reservation) => (
          <div className="reservation" key={reservation.id}>
            <ul className="list-inline">
              <li>
                {reservation.flight.startingCity.name} ---{">"}{" "}
                {reservation.flight.destinationCity.name}
              </li>
              <li>
                {reservation.flight.departureTime} ---
                {">"} {reservation.flight.arrivalTime}
              </li>
              <li>
                {reservation.customer.username}: {reservation.quantity} ticket/s
              </li>
              <li>
                <button
                  onClick={() => {
                    console.log(reservation.id);
                    ApproveReservationClick(reservation.id);
                  }}
                >
                  Approve
                </button>
              </li>
            </ul>
          </div>
        ))}
      <hr></hr>
      <h1>Approved reservations</h1>
      {reservations
        .filter((r) => r.approved)
        .map((reservation) => (
          <div className="reservation approved" key={reservation.id}>
            <ul className="list-inline">
              <li>
                {reservation.flight.startingCity.name} ---{">"}{" "}
                {reservation.flight.destinationCity.name}
              </li>
              <li>
                {reservation.flight.departureTime} ---
                {">"} {reservation.flight.arrivalTime}
              </li>
              <li>
                {reservation.customer.username}: {reservation.quantity} ticket/s
              </li>
            </ul>
          </div>
        ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    user: state.LoginReducer.user ? state.LoginReducer.user : null,
    reservations: state.AgentReducer.reservations
      ? state.AgentReducer.reservations
      : [],
  };
};

const mapDispatchToProps = {
  fetchReservations: (reservations) => getAllReservationsForAgent(reservations),
  approveCustomerReservation: (id) => approveReservation(id),
};
export default connect(mapStateToProps, mapDispatchToProps)(AgentPanel);
