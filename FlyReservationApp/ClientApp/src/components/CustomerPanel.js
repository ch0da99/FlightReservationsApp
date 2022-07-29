import React, { useEffect } from "react";
import { connectionSignalR } from "../api/signalR/config.js";
import {
  ID_REQUEST,
  SIGNALR_CUSTOMER_ALL_RESERVATIONS_REQUEST,
} from "../api/signalR/remoteProcedures.js";
import {
  IS_USER_CONNECTED,
  ALL_USER_RESERVATIONS_RESPONSE,
  NEW_RESERVATION_APPROVE,
  CANCEL_FLIGHT_RESPONSE,
} from "../api/signalR/responseProcedures.js";
import { connect } from "react-redux";
import "../style/css/CustomerPanel.css";
import {
  getAllReservationsForCustomer,
  approvedReservation,
  cancelFlight,
} from "../redux/actions/customerActions.js";
import moment from "moment";

const CustomerPanel = ({
  user,
  reservations,
  fetchReservations,
  approveReservationFromAgent,
  cancelFlightDispatch,
}) => {
  useEffect(() => {
    if (connectionSignalR.state !== "Disconnected") {
      connectionSignalR
        .invoke(SIGNALR_CUSTOMER_ALL_RESERVATIONS_REQUEST, user.id)
        .catch((error) => console.log(error));
    }
  }, []);
  if (connectionSignalR.state === "Disconnected") {
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
    if (connected) {
      connectionSignalR
        .invoke(SIGNALR_CUSTOMER_ALL_RESERVATIONS_REQUEST, user.id)
        .catch((error) => console.log(error));
    }
  });
  connectionSignalR.on(ALL_USER_RESERVATIONS_RESPONSE, (reservations) => {
    console.log(reservations);
    fetchReservations(reservations);
  });
  connectionSignalR.on(NEW_RESERVATION_APPROVE, (idR) => {
    if (idR !== 0 && reservations.filter((r) => r.id == idR).length === 1) {
      approveReservationFromAgent(idR);
    }
  });
  connectionSignalR.on(CANCEL_FLIGHT_RESPONSE, (id) => {
    cancelFlightDispatch(id);
  });
  return (
    <div>
      <h1>Waiting for approval</h1>
      {reservations
        .filter((r) => !r.approved && !r.flight.canceled)
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
                {moment(reservation.flight.departureTime).format("LLL")} ---
                {">"} {moment(reservation.flight.arrivalTime).format("LLL")}
              </li>
              <li>{reservation.quantity} ticket/s</li>
            </ul>
          </div>
        ))}
      <hr></hr>
      <h1>Approved reservations</h1>
      {reservations
        .filter((r) => r.approved && !r.flight.canceled)
        .map((reservation) => (
          <div className="reservation approved" key={reservation.id}>
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
                {moment(reservation.flight.departureTime).format("LLL")} ---
                {">"} {moment(reservation.flight.arrivalTime).format("LLL")}
              </li>
              <li>{reservation.quantity} ticket/s</li>
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
                {reservation.flight.transfer && (
                  <span className="transfer_city">
                    {reservation.flight.transfer.name} ---{">"}
                  </span>
                )}
                {reservation.flight.destinationCity.name}
              </li>
              <li>
                {moment(reservation.flight.departureTime).format("LLL")} ---
                {">"} {moment(reservation.flight.arrivalTime).format("LLL")}
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
    reservations: state.CustomerReducer.reservations
      ? state.CustomerReducer.reservations
      : [],
  };
};

const mapDispatchToProps = {
  fetchReservations: (reservations) =>
    getAllReservationsForCustomer(reservations),
  approveReservationFromAgent: (id) => approvedReservation(id),
  cancelFlightDispatch: (id) => cancelFlight(id),
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerPanel);
