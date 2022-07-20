import React, { useEffect } from "react";
import {
  allFlights,
  cancelFlight,
  newFlightCreatedFromAgent,
} from "../redux/actions/administratorActions";
import { connectionSignalR } from "../api/signalR/config";
import {
  ALL_FLIGHTS_REQUEST,
  ID_REQUEST,
  CANCEL_FLIGHT_REQUEST,
} from "../api/signalR/remoteProcedures";
import {
  ALL_FLIGHTS_RESPONSE,
  IS_USER_CONNECTED,
  CANCEL_FLIGHT_RESPONSE,
  ADD_NEW_FLIGHT_RESPONSE,
} from "../api/signalR/responseProcedures";
import "../style/css/AdministratorPanel.css";
import { connect } from "react-redux";

const AdministratorPanel = ({
  user,
  flights,
  loadFlights,
  cancelFlightDispatch,
  newFlightCreate,
}) => {
  useEffect(() => {
    if (flights.length === 0 && connectionSignalR.state !== "Disconnected") {
      connectionSignalR
        .invoke(ALL_FLIGHTS_REQUEST, user.id)
        .catch((error) => console.log(error));
    }
  }, []);
  const cancelFlight = (id) => {
    console.log(id);
    connectionSignalR
      .invoke(CANCEL_FLIGHT_REQUEST, id)
      .catch((error) => console.log(error));
  };
  if (connectionSignalR.state !== "Connected") {
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
        .invoke(ALL_FLIGHTS_REQUEST)
        .catch((error) => console.log(error));
    }
  });
  connectionSignalR.on(ALL_FLIGHTS_RESPONSE, (flights) => {
    loadFlights(flights);
  });
  connectionSignalR.on(CANCEL_FLIGHT_RESPONSE, (id) => {
    if (id !== 0) {
      cancelFlightDispatch(id);
    }
  });
  connectionSignalR.on(ADD_NEW_FLIGHT_RESPONSE, (flight) => {
    newFlightCreate(flight);
  });
  return (
    <div>
      <h1>Active flights:</h1>
      {flights
        .filter((f) => !f.canceled)
        .map((flight) => (
          <div className={"flight"} key={flight.id}>
            <ul className="list-inline">
              <li>
                {flight.startingCity.name} ---{">"}{" "}
                {flight.transfer && (
                  <span className="transfer_city">
                    {flight.transfer.name} ---{">"}
                  </span>
                )}
                {flight.destinationCity.name}
                <br></br>
                {flight.departureTime} ---
                {">"} {flight.arrivalTime}
              </li>
              <li>Available tickets: {flight.allSeats - flight.takenSeats}</li>
              <li>Created by: {flight.agent.username}</li>
              <li>
                <button onClick={() => cancelFlight(flight.id)}>
                  Cancel flight
                </button>
              </li>
            </ul>
          </div>
        ))}
      <h1>Canceled flights:</h1>
      {flights
        .filter((f) => f.canceled)
        .map((flight) => (
          <div className={"flight canceled"} key={flight.id}>
            <ul className="list-inline">
              <li>
                {flight.startingCity.name} ---{">"}{" "}
                {flight.transfer && (
                  <span className="transfer_city">
                    {flight.transfer.name} ---{">"}
                  </span>
                )}
                {flight.destinationCity.name}
                <br></br>
                {flight.departureTime} ---
                {">"} {flight.arrivalTime}
              </li>
              <li>Available tickets: {flight.allSeats - flight.takenSeats}</li>
              <li>Created by: {flight.agent.username}</li>
            </ul>
          </div>
        ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.LoginReducer.user ? state.LoginReducer.user : null,
    flights: state.AdministratorReducer.flights
      ? state.AdministratorReducer.flights
      : [],
  };
};

const mapDispatchToProps = {
  loadFlights: (flights) => allFlights(flights),
  cancelFlightDispatch: (flights) => cancelFlight(flights),
  newFlightCreate: (flight) => newFlightCreatedFromAgent(flight),
};

export default connect(mapStateToProps, mapDispatchToProps)(AdministratorPanel);
