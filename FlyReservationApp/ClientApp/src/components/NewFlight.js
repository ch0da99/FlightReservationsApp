import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { connectionSignalR } from "../api/signalR/config";
import { getAllCities } from "../redux/actions/agentActions";
import { ID_REQUEST, ALL_CITIES_REQUEST } from "../api/signalR/remoteProcedures";
import { IS_USER_CONNECTED, ALL_CITIES_RESPONSE, ADD_NEW_FLIGHT_RESPONSE } from "../api/signalR/responseProcedures";

const NewFlight = ({ user, cities, loadAllCities }) => {
  const [startingCity, setStartingCity] = useState();
  const [departureDate, setDepartureDate] = useState();
  const [destinationCity, setDestinationCity] = useState();
  const [arrivalDate, setArrivalDate] = useState();
  const [transferCity, setTransferCity] = useState();
  const [availableSeats, setAvailableSeats] = useState();

  useEffect(() => {
    if (cities.length === 0 &&
      connectionSignalR.state === "Connected") {
      connectionSignalR
        .invoke(ALL_CITIES_REQUEST)
        .catch((error) => console.log(error));
    }
  }, []);
  const createClick = () => {
    console.log(startingCity);
    console.log(departureDate);
    console.log(destinationCity);
    console.log(arrivalDate);
    console.log(transferCity);
    console.log(availableSeats);
    if (
      startingCity !== undefined &&
      departureDate !== undefined &&
      destinationCity !== undefined &&
      arrivalDate !== undefined &&
      transferCity !== undefined &&
      availableSeats !== undefined
    ) {
      connectionSignalR
        .invoke(
          ADD_NEW_FLIGHT_REQUEST,
          user.id,
          parseInt(availableSeats),
          new Date(arrivalDate).toISOString(),
          new Date(departureDate).toISOString(),
          cities.filter((c) => c.id == startingCity)[0],
          cities.filter((c) => c.id == destinationCity)[0],
          cities.filter((c) => c.id == transferCity)[0]
        )
        .catch((error) => console.log(error));
    } else {
      alert("Not all fields are filled in!");
    }
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
        .invoke(ALL_CITIES_REQUEST)
        .catch((error) => console.log(error));
    }
  });
  connectionSignalR.on(ALL_CITIES_RESPONSE, (citiesResponse) => {
    loadAllCities(citiesResponse);
    setStartingCity(citiesResponse[0].id);
    setDestinationCity(citiesResponse[0].id);
    setTransferCity(citiesResponse[0].id);
  });
  connectionSignalR.on(ADD_NEW_FLIGHT_RESPONSE, (response) => {
    if (response) {
      console.log("Successfull");
    } else {
      console.log("Failed");
    }
  });
  return (
    <div>
      <Form>
        <FormGroup>
          <Label>Take off city:</Label>
          <Input
            type="select"
            onChange={(e) => {
              setStartingCity(
                cities.filter(
                  (c) => c.id == cities[e.target.options.selectedIndex].id
                )[0].id
              );
            }}
          >
            {cities.map((city) => (
              <option key={city.id}>{city.name}</option>
            ))}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label>Take off date:</Label>
          <Input
            type="datetime-local"
            onChange={(e) => {
              console.log(e.target.value);
              setDepartureDate(e.target.value);
            }}
          />
        </FormGroup>
        <FormGroup>
          <Label>Landing city:</Label>
          <Input
            type="select"
            onChange={(e) => {
              setDestinationCity(
                cities.filter(
                  (c) => c.id == cities[e.target.options.selectedIndex].id
                )[0].id
              );
            }}
          >
            {cities.map((city) => (
              <option key={city.id}>{city.name}</option>
            ))}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label>Landing date:</Label>
          <Input
            type="datetime-local"
            defaultValue={Date.now()}
            onChange={(e) => {
              console.log(new Date(e.target.value).toISOString());
              setArrivalDate(e.target.value);
            }}
          />
        </FormGroup>
        <FormGroup>
          <Label>Number of seats:</Label>
          <Input
            type="number"
            defaultValue={100}
            min={10}
            max={300}
            onChange={(e) => {
              setAvailableSeats(e.target.value);
            }}
          />
        </FormGroup>
        <FormGroup>
          <Label>Transfer City:</Label>
          <Input
            type="select"
            onChange={(e) => {
              setTransferCity(
                cities.filter(
                  (c) => c.id == cities[e.target.options.selectedIndex].id
                )[0].id
              );
            }}
          >
            <option>None</option>
            {cities.map((city) => (
              <option key={city.id}>{city.name}</option>
            ))}
          </Input>
        </FormGroup>
        {/* <FormGroup check>
        <Label check>
          <Input type="checkbox" />{' '}
          Check me out
        </Label>
      </FormGroup> */}
        <Button onClick={createClick}>Create</Button>
      </Form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.LoginReducer.user ? state.LoginReducer.user : null,
    cities: state.AgentReducer.cities ? state.AgentReducer.cities : [],
  };
};

const mapDispatchToProps = {
  loadAllCities: (cities) => getAllCities(cities),
};

export default connect(mapStateToProps, mapDispatchToProps)(NewFlight);
