import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { connectionSignalR } from "../api/signalR/config";
import {
  ID_REQUEST,
  ADMINISTRATOR_NEW_USER_CREATE_REQUEST,
} from "../api/signalR/remoteProcedures";
import { ADMINISTRATOR_NEW_USER_CREATE_RESPONSE } from "../api/signalR/responseProcedures";

const NewUser = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
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
  const createClick = () => {
    if ((username === "", password === "", role === "")) {
      alert("Not all fields are filled.");
    } else {
      if (password !== confirmPassword) {
        alert("These two passwords do not match.");
      } else {
        connectionSignalR.invoke(
          ADMINISTRATOR_NEW_USER_CREATE_REQUEST,
          username,
          password,
          role
        );
      }
    }
  };
  connectionSignalR.on(ADMINISTRATOR_NEW_USER_CREATE_RESPONSE, (user) => {
    if (user != null) {
      alert("User successfuly created!");
    } else {
      alert("Problem with creating new user. Please try again.");
    }
  });
  return (
    <div>
      <Form>
        <FormGroup>
          <Label>Username:</Label>
          <Input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
          ></Input>
        </FormGroup>
        <FormGroup>
          <Label>Password:</Label>
          <Input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          ></Input>
        </FormGroup>
        <FormGroup>
          <Label>Confirm password:</Label>
          <Input
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Input>
        </FormGroup>
        <FormGroup>
          <Label>User role:</Label>
          <Input type="select" onChange={(e) => setRole(e.target.value)}>
            <option>Customer</option>
            <option>Agent</option>
          </Input>
        </FormGroup>

        <Button onClick={createClick}>Create</Button>
      </Form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.LoginReducer.user ? state.LoginReducer.user : null,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(NewUser);
