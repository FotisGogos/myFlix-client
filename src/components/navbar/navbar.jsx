import React from 'react';
import { Navbar, Container, Nav, NavDropdown, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
//import logo from '../../public/MovieExperts.png';

 export function Navbar (props)  { 

  const { logo } = props; 
  
  
  onLoggedOut = () => {
    localStorage.clear();
    window.open("/", "_self");
  }

  return (
 
    <Navbar className="nav-main">
    <Container>
      <Navbar.Brand href="#home"> <img src ={logo} alt="myFlix logo" /> Logo</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
      <Navbar.Collapse className="justify-content-end">
      <Nav.Link href="/Login">Log in </Nav.Link>
      <Link to={"/register"}>
            <Button variant="primary" className="signUp-link" type="submit">Sign up</Button>
          </Link>

      <Button variant="link" onClick={() => { this.onLoggedOut() }}>Logout</Button>
          
        
      </Navbar.Collapse>
    </Container>
  </Navbar>

  )
  
}

