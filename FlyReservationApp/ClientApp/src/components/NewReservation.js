import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { connectionSignalR } from "../api/signalR/config";
import { getAllCities } from "../redux/actions/agentActions";

const NewFlight = ({ user, cities, loadAllCities }) => {
  useEffect(() => {
    if (cities.length === 0) {
      connectionSignalR
        .invoke("AllCities")
        .catch((error) => console.log(error));
    }
  }, []);
  const createClick = () => {};
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
    if (connected) {
      connectionSignalR
        .invoke("AllCities")
        .catch((error) => console.log(error));
    }
  });
  connectionSignalR.on("AllCitiesResponse", (citiesResponse) => {
    loadAllCities(citiesResponse);
    setStartingCity(citiesResponse[0].id);
    setDestinationCity(citiesResponse[0].id);
    setTransferCity(citiesResponse[0].id);
  });
  connectionSignalR.on("AddNewFlightResponse", (response) => {
    if (response) {
      console.log("Successfull");
    } else {
      console.log("Failed");
    }
  });
  return <div></div>;
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
