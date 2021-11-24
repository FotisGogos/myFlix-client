import React from 'react';
import { Navbar, Container, Nav,Button, } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import './navbar.scss'

 export function NavBar (props)  { 
    
  const  onLoggedOut = () => {
    localStorage.clear();
    window.open("/", "_self");
  }
  
  const isAuth = () => {
    if(typeof window == "undefined") {
        return false;
    }
    if (localStorage.getItem("token")) {
        return localStorage.getItem("token");
    } else {
        return false;
    }
  };

  return (
 
  <Navbar className="main-nav" sticky="top" bg="navColor" expand="lg" variant="dark">
    <Container fluid > 
    <Navbar.Brand >Myflix</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto">   
          {
            isAuth () && (
              <Nav.Link as={Link} to = "/">Home</Nav.Link>
             )
          }
         
          {
            isAuth () && (
              <Nav.Link as={Link} to = "/profile">Profile</Nav.Link>
             )
          } 
          
          {
            isAuth () && (
              <Nav.Link as={Link} to= "/editProfile">Update your account</Nav.Link>
              )
          } 

          { 
            !isAuth () && (
              <Nav.Link as={Link} to= "/">Log in</Nav.Link>
              )
          }    
              
          
           {
            isAuth () && (
              <Button variant="link" onClick= {onLoggedOut} >Logout</Button>
              )
           }
          
          {
            !isAuth () && (
              <Nav.Link as={Link} to= "/register">Sign up</Nav.Link>
              )
           }
        </Nav>
      </Navbar.Collapse>
    </Container>
</Navbar>
    );
  }
 


 


  