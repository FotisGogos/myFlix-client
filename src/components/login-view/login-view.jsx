import React, { useState } from 'react';
import PropTypes from "prop-types";
import "./login-view.scss";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Link } from "react-router-dom";
import { BrowserRouter as Link } from "react-router-dom";


export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    axios.post('https://moviexperts.herokuapp.com/login',{
      Username: username,
      Password: password
    })
    .then(response => {
      const data = response.data;
      props.onLoggedIn(data);
    })
    .catch(e => {
      console.log('User not found')
    });
  };

  

  return (
  <Form className ="Loginform">
      <Form.Group controlId="formUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      </Form.Group>
      <div>
      <Button variant="outline-primary"  type="submit" onClick={handleLogin}>Log in</Button>
      <Link to="/register">
         <Button variant="primary" className="signUp-link" type="submit">Sign up</Button>
       </Link>

      
      </div>
    
  </Form>
 
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
  onLoggedIn: PropTypes.func.isRequired,
};