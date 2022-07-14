import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { connectionSignalR } from "../api/signalR/config";
import { getAllFlights } from "../redux/actions/customerActions";
import { IS_USER_CONNECTED, ALL_FLIGHTS_AVAILABLE_FOR_RESERVATION_RESPONSE, NEW_RESERVATION_CREATED_RESPONSE  } from "../api/signalR/responseProcedures";
import { ALL_FLIGHTS_AVAILABLE_FOR_RESERVATION_REQUEST, ID_REQUEST, CREATE_NEW_RESERVATION_REQUEST } from "../api/signalR/remoteProcedures";
import { Input, Label } from "reactstrap";
import "../style/css/NewReservation.css";

const NewFlight = ({ user, flights, loadAllFlights }) => {
  const [quantity, setQuantity] = useState(1)
  console.log(new Date(new Date(2022, 7, 18, 0, 0, 0).getTime() - new Date()).getDay())
  useEffect(() => {
    if (flights.length === 0 && connectionSignalR.state === "Connected") {
      connectionSignalR
        .invoke(ALL_FLIGHTS_AVAILABLE_FOR_RESERVATION_REQUEST)
        .catch((error) => console.log(error));
    }
  }, []);
  const createReservationClick = (flightId) => {
    connectionSignalR.invoke(CREATE_NEW_RESERVATION_REQUEST, quantity, user.id, flightId)
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
        .invoke(ALL_FLIGHTS_AVAILABLE_FOR_RESERVATION_REQUEST)
        .catch((error) => console.log(error));
    }
  });
  connectionSignalR.on(ALL_FLIGHTS_AVAILABLE_FOR_RESERVATION_RESPONSE, (flights) => {
    console.log(flights)
    loadAllFlights(flights)
  })
  connectionSignalR.on(NEW_RESERVATION_CREATED_RESPONSE, (reservation) => {
    console.log(reservation)
  })
  return <div>
    {flights.map(flight => (
      <div className={"flight "} key={flight.id}>
          <ul className="list-inline">
            <li>
              {flight.startingCity.name} ---{">"}{" "}
              {flight.transfer && (
                <span className="transfer_city">
                  {flight.transfer.name} ---{">"}
                </span>
              )}
              {flight.destinationCity.name}<br></br>
              {flight.departureTime} ---
              {">"} {flight.arrivalTime}
            </li>
            <li>
              Available tickets: {flight.allSeats - flight.takenSeats }
            </li>
            <li className="reservation-part">
              <ul className="list-inline">
              <li>
                <Label>Amount of tickets:</Label>
                <Input type="number" min={1} max={flight.allSeats - flight.takenSeats} defaultValue={1} onChange={(e) => {setQuantity(e.target.value)}}></Input>
              </li>
              <li>
                <button
                  onClick={() => {
                    createReservationClick(flight.id);
                  }}
                >
                  Create Reservation
                </button>
              </li>
              </ul>
            </li>
          </ul>
        </div>
    ))}
  </div>;
};

const mapStateToProps = (state) => {
  return {
    user: state.LoginReducer.user ? state.LoginReducer.user : null,
    flights: state.CustomerReducer.flights ? state.CustomerReducer.flights : [],
  };
};

const mapDispatchToProps = {
  loadAllFlights: (flights) => getAllFlights(flights)
};

export default connect(mapStateToProps, mapDispatchToProps)(NewFlight);
