import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Tooltip from "react-tooltip";
import { NavLink } from "react-router-dom";

const Navigation: React.FC = () => {
  return (
    <Navbar className="custom-nav" expand="md" variant="dark">
      <Container className="container">
        <NavLink
          to="/"
          className="nav-link"
          style={{ color: "white", fontSize: "1.3rem" }}
        >
          <img className="logo" src="/Flynt.png" alt="" />
          Flynt IDE
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <NavLink className="nav-link" to="/recent-codes">
              Recent Codes
            </NavLink>
            <Button data-tip data-for="log-in" variant="outline-secondary">
              Log in
            </Button>
            <Tooltip effect="solid" type="light" textColor="black" id="log-in">
              Not yet Available
            </Tooltip>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default Navigation;
