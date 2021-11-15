import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { Row, Col, Form, Button } from 'react-bootstrap';

export function Edit (props){
  const [username, setUsername] = useState(props.username);
  const [password, setPassword] = useState(props.password);
  const [email, setEmail] = useState (props.email);
  const [birthday, setBirthday] = useState(props.birthday);
  console.log(username,password,email, 'username', 'password', 'email' )
  const [usernameError, setUsernameError] = useState({});
  const [passwordError, setPasswordError] = useState({});
  const [emailError, setEmailError] = useState({});
  

  useEffect(() => {
    setUsername(props.username);
    setPassword(props.password);
    setEmail(props.email);
    setBirthday(props.birthday);
  }, [props.username]);


  const UserUpdate = (e) => {
    e.preventDefault()
    let token = localStorage.getItem("token");
    let user = localStorage.getItem("user");
    console.log(username,password,email, 'username', 'password', 'email' )
    const validated = formValidation();
    {/*if (validated) { */}
      axios.put( `https://moviexperts.herokuapp.com/users/${user}`,
        { 
          Username: username,
          Password: password,
          Email: email,
          Birthday: birthday 
        },
        { headers: { Authorization: `Bearer ${token}` } } 
      )
        .then((response) => {
            const data = response.data;
            console.log(data);
            alert(user + " has been updated.");
            localStorage.setItem("user",username)
            console.log(response);
            window.open( '/', '_self');
        })
        .catch(e => {
          alert ('user was not updated ')
          console.log(error.response.data);
      });
   {/* } */}
  }

      const formValidation = () => {
        
        const usernameError = {};
        const emailError = {};
        const passwordError = {};
        let isValid = true;

        //Conditions
        if (username.trim().length < 5 ) {
          usernameError.usernameShort = "Username must have at least  5 characters."
          isValid = false;
        }

        if (password.trim().length < 5){
          passwordError.passwordMissing = "Your password must contain  at least 6 characters."
          isValid = false;
        }

        if (!email.includes(".") || !email.includes("@") ) {
          emailError.emailNotEmail = "Enter a valid email"
          isValid = false;
        }

        setUsernameError(usernameError);
        setPasswordError(passwordError);
        setEmailError(emailError);
        return isValid;
      }

    return (
      <div>
        <Row>
          <Col>
            <h2 className = "main-text">Update your profile</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form>
              <Form.Group controlId="updateUsername">
                  <Form.Label className="text">
                      Username:
                  </Form.Label>
                  <Form.Control
                  type="text"
                  value={username}
                  placeholder="Enter your new username"
                    onChange={e => setUsername(e.target.value)} />
                    {Object.keys(usernameError).map((key) => {
                      return <div style={{ fontSize: 12, color:'red'}} key={key}>{usernameError[key]}</div>
                    })}
              </Form.Group>
              <Form.Group controlId="updatePassword">
                  <Form.Label className="text">
                      Password:
                  </Form.Label>
                  <Form.Control type='password'
                    placeholder="Enter old password or new one"
                    onChange={e => setPassword(e.target.value)} />
                    {Object.keys(passwordError).map((key) => {
                        return <div style={{ fontSize: 12, color:'red'}} key={key}>{passwordError[key]}</div>
                      })}
              </Form.Group>
              <Form.Group controlId="updateEmail">
                  <Form.Label className="text">
                      Email:
                  </Form.Label>
                <Form.Control
                   type='email'
                   value={email} 
                   onChange={e => setEmail(e.target.value)} />
                   {Object.keys(emailError).map((key) => {
                      return <div style={{ fontSize: 12, color:'red'}} key={key}>{emailError[key]}</div>
                     })}
                </Form.Group>
                <Form.Group controlId="updateBirthday">
                  <Form.Label className="text">
                      Birthday:
                   </Form.Label>
                      <Form.Control 
                        type='text'
                        value={birthday}
                        onChange={e => setBirthday(e.target.value)} />
                  </Form.Group>
                    <div className="text-center block" >
                        <Button className="btn-primary" size="lg" type='submit' onClick={UserUpdate}>Update Changes</Button> 
                    </div>
             </Form>
          </Col>
        </Row>
      </div>
    )
    }










