import React, { useState, useEffect, useMemo } from "react";
import { Container, Input, Row, Card, Button } from "reactstrap";
import { logIn } from "../api/login";
import { connect } from "react-redux";
import {
  logInUserWithCredentials,
  userRoleCheck,
} from "../redux/actions/loginActions";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Login = ({ user, role, logIn, userRole }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

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
                navigate(from, { replace: true });
                setTimeout(() => {
                  navigate(from, { replace: true });
                }, [500]);
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

const mapStateToProps = (state) => {
  return {
    user: state.LoginReducer.user ? state.LoginReducer.user : [],
  };
};

const mapDispatchToProps = {
  logIn: (username, password) => logInUserWithCredentials(username, password),
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
