import React, { useState } from "react";
import { Container, Input, Row, Card, Button } from "reactstrap";
import { logIn } from "../api/login";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      <Container className="d-flex justify-content-center">
        <Card className="w-50 p-5 d-flex flex-row justify-content-center align-items-center border-danger">
          <Row className="d-flex flex-row justify-content-center align-items-center">
            <h2 className="col-12 d-flex justify-content-center mb-5">
              Log-in
            </h2>
            <span className="col-6">Username:</span>
            <Input
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              type="text"
              className="col-6"
            />
            <br />
            <span className="col-6">Password:</span>
            <Input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              className="col-6"
            />
            <Button
              onClick={() => {
                logIn(username, password);
              }}
              className="btn-primary mt-5"
            >
              Submit
            </Button>
          </Row>
        </Card>
      </Container>
    </>
  );
};

export default Login;
