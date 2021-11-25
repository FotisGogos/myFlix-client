import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./login-view.scss";
import { Form, Button, Col, Row, Container } from "react-bootstrap";
import axios from "axios";
import { BrowserRouter as Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Eye icon (show/hide password)
  const eye = <FontAwesomeIcon icon={faEye} />;

  // Password visibility
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  //user feedback as to the loading state

  function simulateNetworkRequest() {
    return new Promise((resolve) => setTimeout(resolve, 2000));
  }
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoading) {
      simulateNetworkRequest().then(() => {
        setLoading(false);
      });
    }
  }, [isLoading]);

  const handleLogin = (e) => {
    setLoading(true);
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    axios
      .post("https://moviexperts.herokuapp.com/login", {
        Username: username,
        Password: password,
      })
      .then((response) => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch((e) => {
        console.log("User not found");
      });
  };

  return (
    <>
      <Container>
        <h1 className="shadow-sm text mt-5 p-3 text-center rounded">
          Welcome to MovieExperts
        </h1>
        <Row className="mt-5">
          <Col
            lg={5}
            md={6}
            sm={12}
            className="p-5 m-auto shadow-sm rounded-lg"
          >
            <Form className="Loginform">
              <Form.Group controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <i>{eye}</i>
                <Form.Control
                  type={passwordShown ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <i onClick={togglePasswordVisiblity}>{eye}</i>
              </Form.Group>
              <div>
                <Button
                  variant="outline-success btn-block"
                  type="submit"
                  onClick={handleLogin}
                  disabled={isLoading}
                  onClick={!isLoading ? handleLogin : null}
                >
                  {isLoading ? "Loading…" : "Log in"}
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
  onLoggedIn: PropTypes.func.isRequired,
};
