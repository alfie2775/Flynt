import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Tooltip from "react-tooltip";
import { NavLink } from "react-router-dom";
import { Form } from "react-bootstrap";

const Navigation: React.FC = () => {
  const [logInModal, toggleLogInModal] = useState(false);
  const [login, setLogin] = useState(true);
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    text: "",
  });

  const handleLogin = async (e: any) => {
    e.preventDefault();
    const user = await fetch("http://localhost:3000/users/login", {
      method: "POST",
      body: JSON.stringify({
        username: state.username,
        password: state.password,
      }),
    }).then((user) => user.json());

    if (user.success) {
      localStorage.setItem("flynt-token", user.token);
      console.log({ ...user });
    } else {
      setState({
        ...state,
        text: "Username or password is incorrect",
      });
    }
  };

  const handleCreate = async (e: any) => {
    e.preventDefault();
    const user = await fetch(process.env.REACT_APP_API + "users/signup", {
      method: "POST",
      body: JSON.stringify({
        username: state.username,
        password: state.password,
        firstName: state.firstName,
        lastName: state.lastName,
      }),
    }).then((user) => user.json());

    console.log({ ...user });
  };

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
            <Button
              onClick={() => toggleLogInModal(true)}
              data-tip
              data-for="log-in"
              variant="outline-secondary"
            >
              Log in
            </Button>
            <Tooltip effect="solid" type="light" textColor="black" id="log-in">
              Not yet Available
            </Tooltip>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <Modal show={logInModal} onHide={() => toggleLogInModal(false)}>
        <Modal.Title className="login-modal-title">
          {login ? "Log In" : "Sign up"}
        </Modal.Title>
        <Modal.Body className="login-modal">
          <Form className="login-form">
            {!login && (
              <Form.Group>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  value={state.firstName}
                  onChange={(e) =>
                    setState({ ...state, firstName: e.target.value })
                  }
                  type="text"
                ></Form.Control>
              </Form.Group>
            )}
            {!login && (
              <Form.Group>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  value={state.lastName}
                  onChange={(e) =>
                    setState({ ...state, lastName: e.target.value })
                  }
                  type="text"
                ></Form.Control>
              </Form.Group>
            )}
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                value={state.username}
                onChange={(e) =>
                  setState({ ...state, username: e.target.value })
                }
                type="text"
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                value={state.password}
                onChange={(e) =>
                  setState({ ...state, password: e.target.value })
                }
                type="text"
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Text>{state.text}</Form.Text>
            </Form.Group>
            <Form.Group className="account-holder">
              <span onClick={() => setLogin(!login)} className="account">
                {!login ? "Create an account" : "Have an account"}
              </span>
              {login ? (
                <Button onClick={(e) => handleLogin(e)} type="submit">
                  Log in
                </Button>
              ) : (
                <Button onClick={(e) => handleCreate(e)} type="submit">
                  Create
                </Button>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </Navbar>
  );
};
export default Navigation;
