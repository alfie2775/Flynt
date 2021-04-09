import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import { Dropdown, Form } from "react-bootstrap";
import { getSavedCodes, getTemplates, logIn, signUp } from "../others/apiCalls";
import { removeUserData, setUserName, setUserToken } from "../others/helper";
import { useDispatch, useSelector } from "../redux/hooks";

const Navigation: React.FC = () => {
  const isAuth = useSelector((state: any) => state.isAuth);
  const username = useSelector((state: any) => state.username);
  const [logInModal, toggleLogInModal] = useState(false);
  const [login, setLogin] = useState(true);
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    text: "",
  });
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const setToast = (value: boolean) =>
    dispatch({ type: "SET_TOAST", payload: value });

  const setToastHeader = (value: string) =>
    dispatch({ type: "SET_TOAST_HEADER", payload: value });

  const setToastBody = (value: string) =>
    dispatch({ type: "SET_TOAST_BODY", payload: value });

  const openToast = (header: string, body: string, open: boolean = false) => {
    setToastHeader(header);
    setToastBody(body);
    if (open) setToast(true);
  };
  const handleLogin = async (e: any) => {
    e.preventDefault();
    openToast("Signing in", "loading", true);
    toggleLogInModal(!logInModal);
    const user = await logIn(state.username, state.password);
    if (user.success) {
      setUserToken(user.token);
      setUserName(state.username);
      dispatch({ type: "SET_AUTH", payload: true });
      dispatch({ type: "SET_USERNAME", payload: state.username });
      const templates = await getTemplates();
      if ("templates" in templates)
        dispatch({ type: "ADD_TEMPLATES", payload: templates.templates });
      const savedCodes = await getSavedCodes();
      dispatch({ type: "GET_SAVED_CODES", payload: savedCodes.reverse() });
      openToast("Signed in", "");
      setState({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
        text: "",
      });
      setTimeout(() => {
        setToast(false);
      }, 500);
    } else if (user === "Unauthorized") {
      openToast("username or Password is incorrect", "");
    } else {
      openToast("Try again later", "");
    }
  };

  const validateSignup = () => {
    const { username, firstName, lastName, email, password } = state;
    if (firstName.length < 3)
      alert("First Name cannot be less thatn 3 characters");
    else if (lastName.length < 3)
      alert("Last Name cannot be less thatn 3 characters");
    else if (
      email.indexOf("@") === -1 ||
      email.indexOf("@") !== email.lastIndexOf("@") ||
      email.indexOf(".") === -1 ||
      email.lastIndexOf(".") < email.indexOf("@")
    )
      alert("Invalid email");
    else if (username.length < 3)
      alert("Username cannot be less thatn 3 characters");
    else if (password.length < 6)
      alert("Password should contain minimum of 6 characters");
    else return false;
    return true;
  };

  const handleCreate = async (e: any) => {
    e.preventDefault();
    if (validateSignup() === true) return;
    toggleLogInModal(!logInModal);
    openToast("Creating an account", "loading", true);
    const user = await signUp(state);

    if (user.success) {
      setUserToken(user.token);
      setUserName(state.username);
      dispatch({ type: "SET_AUTH", payload: true });
      dispatch({ type: "SET_USERNAME", payload: state.username });
      openToast("Account has been created and logged you in", "");
      setState({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
        text: "",
      });
      setTimeout(() => setToast(false), 1500);
    } else if (user.error) {
      openToast("Username is already taken", "");
    } else {
      openToast("Try again later", "");
    }
  };

  const logout = (e: any) => {
    dispatch({ type: "DELTE_TEMPLATES" });
    dispatch({ type: "SET_AUTH", payload: false });
    dispatch({ type: "SET_USERNAME", payload: "" });
    removeUserData();
    history.push("/");
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
            {isAuth ? (
              <Dropdown>
                <Dropdown.Toggle variant="outline-secondary" id="login-opts">
                  {" "}
                  Hello, {username}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    active={location.pathname.indexOf("saved-codes") !== -1}
                    onClick={() => history.push("/saved-codes")}
                    className="saved-codes"
                  >
                    Saved Codes
                  </Dropdown.Item>
                  <Dropdown.Item onClick={(e) => logout(e)}>
                    <span className="fa fa-sign-out"></span>&nbsp;Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Button
                onClick={() => toggleLogInModal(true)}
                variant="outline-secondary"
              >
                <span className="fa fa-sign-in"></span>
                {" Log in"}
              </Button>
            )}
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
            {!login && (
              <Form.Group>
                <Form.Label>E-Mail</Form.Label>
                <Form.Control
                  value={state.email}
                  onChange={(e) =>
                    setState({ ...state, email: e.target.value })
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
                type="password"
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Text>{state.text}</Form.Text>
            </Form.Group>
            <Form.Group className="account-holder">
              <span
                onClick={() => {
                  setLogin(!login);
                  setState({ ...state, username: "", password: "" });
                }}
                className="account"
              >
                {login ? "Create an account" : "Have an account"}
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
