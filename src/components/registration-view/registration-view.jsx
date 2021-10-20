import React, { useState } from "react";
import PropTypes from "prop-types";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import axios from 'axios';


import "./registration-view.scss";

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleRegistration = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    axios.post('https://moviexperts.herokuapp.com/users', {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    })
    .then(response => {
      const data = response.data;
      console.log(data);
      window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
    })
    .catch(e => {
      console.log('error registering the user')
    });
  }; 
  
  
  console.log('register')
  return (
    <Form className="regbox">
      <Row className="d-flex mx-auto mt-3 justify-content-center">
        <Form.Group className="mb-3 pt-3" controlId="formGroupUsername">
        <Form.Control 
            placeholder="Enter Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          </Form.Group>
      </Row>
      <Row className="d-flex mx-auto mt-3 justify-content-center">
        <Form.Group controlId="formGroupPassword">
         <Form.Control
            placeholder="Enter Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your password with anyone else.
           </Form.Text>
        </Form.Group>
      </Row>
      <Row className="d-flex mx-auto mt-3 justify-content-center">
        <Form.Group controlId="formGroupEmail">
          <Form.Control
            placeholder="Example@gmail.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
      </Row>
      <Row className="d-flex mx-auto mt-3 justify-content-center">
        <Form.Group controlId="formGroupBirthdate">
          <Form.Control
            placeholder="Enter Birthdate"
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
         />
         </Form.Group>
      </Row>
      <Row className="d-flex mx-auto mt-3 justify-content-center">
         <Button variant="outline-secondary" type="submit" onClick={handleRegistration}>Register</Button>
       </Row>
    </Form>
  )
}  

RegistrationView.propTypes = {
  register: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    birthday: PropTypes.string.isRequired,
  }),
  
};