import React from 'react';
import { Navbar, Container, Nav,Button, } from 'react-bootstrap';
import './navbar.scss'

 export function Navbar (props)  { 
    
  onLoggedOut = () => {
    localStorage.clear();
    window.open("/", "_self");
  }
  
  isAuth = () => {
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
    <Container> 
    <Navbar.Brand >Myflix</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto">   
          {
            isAuth () && (
              <Nav.Link href="/">Home</Nav.Link>
             )
          }
         
          {
            isAuth () && (
              <Nav.Link href="/profile">Profile</Nav.Link>
             )
          } 
          
          {
            isAuth () && (
              <Nav.Link href="/editProfile">Update your account</Nav.Link>
              )
          } 

          { 
            !isAuth () && (
              <Nav.Link href="/">Log in</Nav.Link>
              )
          }    
              
          
           {
            isAuth () && (
              <Button variant="link" onClick={() => { this.onLoggedOut() }}>Logout</Button>
              )
           }
          
          {
            !isAuth () && (
              <Nav.Link href="/register">Sign up</Nav.Link>
              )
           }
          
           
        </Nav>
      </Navbar.Collapse>
    </Container>
</Navbar>
    );
  }
 


 


  