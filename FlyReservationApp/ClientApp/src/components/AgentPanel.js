import React, { useEffect } from "react";
import { connectionSignalR } from "../api/signalR/config.js";
import {
  SIGNALR_AGENT_ALL_RESERVATIONS_REQUEST,
  SIGNALR_AGENT_APPROVE_RESERVATION_REQUEST,
  ID_REQUEST,
} from "../api/signalR/remoteProcedures.js";
import {
  IS_USER_CONNECTED,
  ALL_RESERVATIONS_RESPONSE,
  NEW_RESERVATION_APPROVE,
} from "../api/signalR/responseProcedures.js";
import { connect } from "react-redux";
import "../style/css/AgentPanel.css";
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
  useEffect(() => {
    if (
      reservations.length === 0 &&
      connectionSignalR.state !== "Disconnected"
    ) {
      connectionSignalR
        .invoke(SIGNALR_AGENT_ALL_RESERVATIONS_REQUEST)
        .catch((error) => console.log(error));
    }
  }, []);
  const ApproveReservationClick = (idReservation) => {
    console.log(idReservation);
    connectionSignalR
      .invoke(SIGNALR_AGENT_APPROVE_RESERVATION_REQUEST, idReservation)
      .catch((error) => console.log(error));
  };
  if (connectionSignalR.state === "Disconnected") {
    console.log(user.id);
    connectionSignalR
      .start()
      .then(() => {
        connectionSignalR
          .invoke(ID_REQUEST, user.id)
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  }
  connectionSignalR.on(IS_USER_CONNECTED, (connected) => {
    console.log(connected);
    if (connected) {
      connectionSignalR
        .invoke(SIGNALR_AGENT_ALL_RESERVATIONS_REQUEST)
        .catch((error) => console.log(error));
    }
  });
  connectionSignalR.on(ALL_RESERVATIONS_RESPONSE, (reservations) => {
    console.log(reservations);
    fetchReservations(reservations);
  });
  connectionSignalR.on(NEW_RESERVATION_APPROVE, (id) => {
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
                {reservation.flight.transfer && (
                  <span className="transfer_city">
                    {reservation.flight.transfer.name} ---{">"}
                  </span>
                )}
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
      <h1>Canceled flights</h1>
      {reservations
        .filter((r) => r.flight.canceled)
        .map((reservation) => (
          <div className="reservation canceled" key={reservation.id}>
            <ul className="list-inline">
              <li>
                {reservation.flight.startingCity.name} ---{">"}{" "}
                {reservation.flight.destinationCity.name}
              </li>
              <li>
                {reservation.flight.departureTime} ---
                {">"} {reservation.flight.arrivalTime}
              </li>
              <li>{reservation.quantity} ticket/s</li>
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
