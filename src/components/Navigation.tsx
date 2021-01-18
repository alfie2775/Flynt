import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

const Navigation: React.FC = () => {
  return (
    <Navbar className="custom-nav" expand="md" variant="dark">
      <Container className="container">
        <Navbar.Brand href="/">
          <img className="logo" src="/Flynt.png" alt="" />
          Flynt IDE
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/user/recentcodes">Recent Codes</Nav.Link>
            <Button variant="outline-secondary">Log in</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default Navigation;
