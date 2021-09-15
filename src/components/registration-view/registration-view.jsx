import React, { useState } from "react";
import PropTypes from "prop-types";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import "./registration-view.scss";

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleSubmit = () => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    props.onRegistration(username);
  }; 
  
  return (
    <Form className="regbox">
      <Form.Group controlId="formGroupUsername">
       <Form.control 
          placeholder="Enter Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        </Form.Group>
        <Form.Group controlId="formGroupPassword">
         <Form.control
            placeholder="Enter Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formGroupEmail">
          <Form.control
            placeholder="Enter Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formGroupBirthdate">
          <Form.control
            placeholder="Enter Birthdate"
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
         />
         </Form.Group>
      
         <Button variant="outline-secondary" type="submit" onClick={handleSubmit}>Register</Button>
    </Form>
  )
}  

RegistrationView.propTypes = {
  register: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    birthdate: PropTypes.string.isRequired,
  }),
  onRegistration: PropTypes.func.isRequired,
};