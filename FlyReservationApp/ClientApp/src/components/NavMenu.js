import React from "react";
import {
  Collapse,
  Container,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
} from "reactstrap";
import { Link } from "react-router-dom";
import "../style/css/NavMenu.css";
import { useState } from "react";
import { connect } from "react-redux";

const NavMenu = ({ user }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleNavbar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <header>
      <Navbar
        className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3"
        light
      >
        <Container>
          <NavbarBrand tag={Link} to="/">
            FlyReservationApp
          </NavbarBrand>
          <NavbarToggler onClick={toggleNavbar} className="mr-2" />
          <Collapse
            className="d-sm-inline-flex flex-sm-row-reverse"
            isOpen={!collapsed}
            navbar
          >
            <ul className="navbar-nav flex-grow">
              <NavItem>
                <NavLink
                  tag={Link}
                  className="text-dark"
                  to="/"
                  disabled={user == null}
                >
                  Home
                </NavLink>
              </NavItem>
              {user.role == "Agent" && (
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/addNewFlight">
                    New Flight
                  </NavLink>
                </NavItem>
              )}
              {user.role == "Customer" && (
                <NavItem>
                  <NavLink
                    tag={Link}
                    className="text-dark"
                    to="/addNewReservation"
                  >
                    New Reservation
                  </NavLink>
                </NavItem>
              )}
              {user.role == "Administrator" && (
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/addNewUser">
                    New User
                  </NavLink>
                </NavItem>
              )}
            </ul>
            {/* <ul className="navbar-nav flex-grow">
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/">
                  Home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/counter">
                  Counter
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/fetch-data">
                  Fetch data
                </NavLink>
              </NavItem>
            </ul> */}
          </Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.LoginReducer.user ? state.LoginReducer.user : [],
  };
};

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(NavMenu);
