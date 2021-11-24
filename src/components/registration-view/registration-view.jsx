import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import axios from "axios";

import "./registration-view.scss";

export function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [usernameError, setUsernameError] = useState({});
  const [passwordError, setPasswordError] = useState({});
  const [emailError, setEmailError] = useState({});

  const handleRegistration = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    axios
      .post("https://moviexperts.herokuapp.com/users", {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday,
      })
      .then((response) => {
        const data = response.data;
        console.log(data);
        window.open("/", "_self"); // the second argument '_self' is necessary so that the page will open in the current tab
      })
      .catch((e) => {
        console.log("error registering the user");
      });
  };

  const validate = (e) => {
    const usernameError = {};
    const passwordError = {};
    const emailError = {};

    let isValid = true;

    //Conditions
    if (username.trim().length < 5) {
      usernameError.usernameShort =
        "Username must have at least  5 characters.";
      isValid = false;
    }

    if (password.trim().length < 5) {
      passwordError.passwordMissing =
        "Your password must contain  at least 6 characters.";
      isValid = false;
    }

    if (!email.includes(".") || !email.includes("@")) {
      emailError.emailNotEmail = "Enter a valid email";
      isValid = false;
    }

    setUsernameError(usernameError);
    setPasswordError(passwordError);
    setEmailError(emailError);
    return isValid;
  };

  console.log("register");
  return (
    <>
      <Container>
        <h1 className="shadow-sm text mt-5 p-3 text-center rounded">Sign up</h1>
        <Row className="mt-5">
          <Col
            lg={5}
            md={6}
            sm={12}
            className="p-5 m-auto shadow-sm rounded-lg"
          >
            {/* Email Form */}

            <Form className="regbox">
              <Form.Group className="mb-3 pt-3" controlId="formGroupUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  placeholder="Enter Username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onInput={validate}
                />
                {Object.keys(usernameError).map((key) => {
                  return (
                    <div style={{ fontSize: 12, color: "red" }} key={key}>
                      {usernameError[key]}
                    </div>
                  );
                })}
              </Form.Group>

              {/* Password Form */}

              <Form.Group controlId="formGroupPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  placeholder="Enter Password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  onInput={validate}
                />
                <Form.Text className="text-muted">
                  We'll never share your password with anyone else.
                </Form.Text>
                {Object.keys(passwordError).map((key) => {
                  return (
                    <div style={{ fontSize: 12, color: "red" }} key={key}>
                      {passwordError[key]}
                    </div>
                  );
                })}
              </Form.Group>

              {/* Email Form */}

              <Form.Group controlId="formGroupEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  placeholder="Example@gmail.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onInput={validate}
                />
                {Object.keys(emailError).map((key) => {
                  return (
                    <div style={{ fontSize: 12, color: "red" }} key={key}>
                      {emailError[key]}
                    </div>
                  );
                })}
              </Form.Group>

              {/* Birthdate Form */}

              <Form.Group controlId="formGroupBirthdate">
                <Form.Label>Birthdate</Form.Label>
                <Form.Control
                  placeholder="Enter Birthdate"
                  type="date"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                  onInput={validate}
                />
              </Form.Group>

              <Button
                variant="outline-success btn-block"
                type="submit"
                onClick={handleRegistration}
              >
                Register
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

RegistrationView.propTypes = {
  register: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    birthday: PropTypes.string.isRequired,
  }),
};
