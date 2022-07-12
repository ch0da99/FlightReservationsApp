import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { connectionSignalR } from "../api/signalR/config";
import { getAllCities } from "../redux/actions/agentActions";

const NewFlight = ({ user, cities, loadAllCities}) => {
  console.log(cities)
  if (connectionSignalR.state === "Disconnected") {
    connectionSignalR
      .start()
      .then(() => {
        console.log(user.id)
        connectionSignalR
          .invoke("IDresponse", user.id)
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  }
  connectionSignalR.on("IsConnected", (connected) => {
    connectionSignalR.invoke("AllCities").catch((error)=>console.log(error))
      .catch((error) => console.log("greska"));
  });
  connectionSignalR.on("AllCitiesResponse", (citiesResponse) =>{
    console.log(citiesResponse)
    loadAllCities(citiesResponse)
  })
  return (<div>
    <Form>
      <FormGroup>
        <Label>Take off city:</Label>
        <Input type="select">
          {cities.map((city) => (
            <option key={city.id}>{city.name}</option>
          ))}
        </Input>
      </FormGroup>
      <FormGroup>
        <Label>Take off date:</Label>
        <Input type="date"/>
      </FormGroup>
      <FormGroup>
        <Label>Take off time</Label>
        <Input type="time"/>
      </FormGroup>
      <FormGroup>
        <Label>Landing city:</Label>
        <Input type="select">
        {cities.map((city) => (
            <option key={city.id}>{city.name}</option>
          ))}
      </Input>
      </FormGroup>
      <FormGroup>
        <Label>Landing date:</Label>
        <Input type="date"/>
      </FormGroup>
      <FormGroup>
        <Label>Landing time:</Label>
        <Input type="time"/>
      </FormGroup>
      <FormGroup>
        <Label>Number of seats:</Label>
        <Input type="number" defaultValue={100} min={10} max={300}/>
      </FormGroup>
      <FormGroup>
        <Label>Transfer City:</Label>
        <Input type="select">
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
      <Button>Submit</Button>
    </Form>
  </div>)
};

const mapStateToProps = (state) => {
  return {
    user: state.LoginReducer.user ? state.LoginReducer.user : null,
    cities: state.AgentReducer.cities ? state.AgentReducer.cities : []
  }
};

const mapDispatchToProps = {
  loadAllCities: (cities) => getAllCities(cities)
};

export default connect(mapStateToProps, mapDispatchToProps)(NewFlight);
