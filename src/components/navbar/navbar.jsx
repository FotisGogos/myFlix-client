import React from 'react';
import { Navbar, Container, Nav,Button, } from 'react-bootstrap';
import { Link} from 'react-router-dom';

 export function Navbar (props)  { 
    
  onLoggedOut = () => {
    localStorage.clear();
    window.open("/", "_self");
  }

  return (
 
  <Navbar className="main-nav" sticky="top" bg="dark" expand="lg" variant="dark">
    <Container> 
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto">   
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/profile">Profile</Nav.Link>
          <Nav.Link href="/editProfile">Update your account</Nav.Link>
          <Button variant="link" onClick={() => { this.onLoggedOut() }}>Logout</Button>
          <Link to="/register">
            <Button variant="primary" className="signUp-link" >Sign up</Button>
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
</Navbar>
    );
  }
 


 


  