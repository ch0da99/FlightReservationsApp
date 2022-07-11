import React, { Component } from "react";
import { Container } from "reactstrap";
import { NavMenu } from "./index.js";

const Layout = (props) => {
  return (
    <div>
      <NavMenu />
      <Container>{props.children}</Container>
    </div>
  );
};

export default Layout;
