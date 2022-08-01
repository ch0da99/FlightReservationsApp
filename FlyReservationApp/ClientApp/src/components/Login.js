import React, { useEffect, useState } from "react";
import { Container, Input, Row, Card, Button } from "reactstrap";
import { connect } from "react-redux";
import { logInUserWithCredentials } from "../redux/actions/loginActions";
import { useNavigate, useLocation } from "react-router-dom";

const Login = ({ user, logIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    const userStorage = localStorage.getItem("user");
    if (userStorage != null) {
      user = JSON.parse(userStorage);
      (async () => {
        await logIn(user.username, user.password);
        navigate(from, { replace: true });
      })();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

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
              onClick={async () => {
                await logIn(username, password);
                navigate(from, { replace: true });
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
    user: state.LoginReducer.user ? state.LoginReducer.user : null,
  };
};

const mapDispatchToProps = {
  logIn: (username, password) => logInUserWithCredentials(username, password),
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
