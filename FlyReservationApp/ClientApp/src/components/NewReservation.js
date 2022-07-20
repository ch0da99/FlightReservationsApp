import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { connectionSignalR } from "../api/signalR/config";
import {
  getAllCities,
  getAllFlights,
  newFlightCreatedFromAgent,
  cancelFlight,
} from "../redux/actions/customerActions";
import {
  IS_USER_CONNECTED,
  ALL_FLIGHTS_AVAILABLE_FOR_RESERVATION_RESPONSE,
  NEW_RESERVATION_CREATED_RESPONSE,
  ADD_NEW_FLIGHT_RESPONSE,
  ALL_CITIES_RESPONSE,
  CANCEL_FLIGHT_RESPONSE,
} from "../api/signalR/responseProcedures";
import {
  ALL_FLIGHTS_AVAILABLE_FOR_RESERVATION_REQUEST,
  ID_REQUEST,
  CREATE_NEW_RESERVATION_REQUEST,
  ALL_CITIES_REQUEST,
} from "../api/signalR/remoteProcedures";
import { Input, Label } from "reactstrap";
import "../style/css/NewReservation.css";

const NewFlight = ({
  user,
  flights,
  cities,
  loadAllFlights,
  newFlightCreate,
  loadAllCities,
  cancelFlightDispatch,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [filterStartingCity, setFilterStartingCity] = useState("All");
  const [filterDestinationCity, setfilterDestinationCity] = useState("All");
  const [filterNoTransfer, setFilterNoTransfer] = useState(false);

  useEffect(() => {
    if (flights.length === 0 && connectionSignalR.state === "Connected") {
      connectionSignalR
        .invoke(ALL_FLIGHTS_AVAILABLE_FOR_RESERVATION_REQUEST)
        .catch((error) => console.log(error));
      connectionSignalR
        .invoke(ALL_CITIES_REQUEST)
        .catch((error) => console.log(error));
    }
  }, []);
  const createReservationClick = (flightId) => {
    console.log(quantity);
    console.log(user.id);
    console.log(flightId);
    connectionSignalR.invoke(
      CREATE_NEW_RESERVATION_REQUEST,
      quantity,
      user.id,
      flightId
    );
  };

  if (connectionSignalR.state !== "Connected") {
    connectionSignalR
      .start()
      .then(() => {
        connectionSignalR
          .invoke(ID_REQUEST, user.id)
          .catch((error) => console.log(error));
        connectionSignalR
          .invoke(ALL_CITIES_REQUEST)
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
  connectionSignalR.on(
    ALL_FLIGHTS_AVAILABLE_FOR_RESERVATION_RESPONSE,
    (flights) => {
      loadAllFlights(flights);
    }
  );
  connectionSignalR.on(NEW_RESERVATION_CREATED_RESPONSE, (reservation) => {
    reservation.preventDefault();
    if (reservation != null) {
      alert("Successfuly added new reservation!");
    } else {
      alert("Problem with adding new reservation, try again later.");
    }
  });
  connectionSignalR.on(ADD_NEW_FLIGHT_RESPONSE, (flight) => {
    newFlightCreate(flight);
  });
  connectionSignalR.on(ALL_CITIES_RESPONSE, (cities) => {
    loadAllCities(cities);
  });
  connectionSignalR.on(CANCEL_FLIGHT_RESPONSE, (id) => {
    cancelFlightDispatch(id);
  });
  return (
    <div>
      <div className="filter-section">
        <ul className="list-inline">
          <li>
            <Label>StartingCity</Label>
            <Input
              type="select"
              onChange={(e) => {
                setFilterStartingCity(e.target.value);
              }}
            >
              <option>All</option>
              {cities.map((city) => (
                <option key={city.id}>{city.name}</option>
              ))}
            </Input>
          </li>
          <li>
            <Label>DestinationCity</Label>
            <Input
              type="select"
              onChange={(e) => {
                setfilterDestinationCity(e.target.value);
              }}
            >
              <option>All</option>
              {cities.map((city) => (
                <option key={city.id}>{city.name}</option>
              ))}
            </Input>
          </li>
          <li>
            <Input
              type="checkbox"
              onChange={() => {
                setFilterNoTransfer(!filterNoTransfer);
              }}
            />{" "}
            <Label>No transfer</Label>
          </li>
        </ul>
      </div>
      {flights
        .filter((f) =>
          f.startingCity.name == filterStartingCity
            ? f
            : filterStartingCity == "All"
            ? f
            : null
        )
        .filter((f) =>
          f.destinationCity.name == filterDestinationCity
            ? f
            : filterDestinationCity == "All"
            ? f
            : null
        )
        .filter((f) => (!filterNoTransfer ? f : f.transfer == null ? f : null))
        .map((flight) => (
          <div className={"flight "} key={flight.id}>
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
              <li>
                <ul className="list-inline">
                  <li>
                    <Label>Amount of tickets:</Label>
                    <Input
                      type="number"
                      min={1}
                      max={flight.allSeats - flight.takenSeats}
                      defaultValue={1}
                      onChange={(e) => {
                        setQuantity(e.target.value);
                      }}
                    ></Input>
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
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.LoginReducer.user ? state.LoginReducer.user : null,
    flights: state.CustomerReducer.flights ? state.CustomerReducer.flights : [],
    cities: state.CustomerReducer.cities ? state.CustomerReducer.cities : [],
  };
};

const mapDispatchToProps = {
  loadAllFlights: (flights) => getAllFlights(flights),
  newFlightCreate: (flight) => newFlightCreatedFromAgent(flight),
  loadAllCities: (cities) => getAllCities(cities),
  cancelFlightDispatch: (id) => cancelFlight(id),
};

export default connect(mapStateToProps, mapDispatchToProps)(NewFlight);
