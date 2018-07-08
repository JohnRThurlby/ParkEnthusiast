import React, { Component } from "react";
import "./Footer.css";
import { Navbar, Nav, NavDropdown, MenuItem  } from 'react-bootstrap';

class Footer extends Component { 
  render () {

    return (
      <div className="Navibar">
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/home">Park Enthusiast 2018</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavDropdown eventKey={3} title="Privacy & Terms" id="basic-nav-dropdown">
                <MenuItem href="/privacy" eventKey={3.1}>Privacy</MenuItem>
                <MenuItem href="/terms" eventKey={3.2}>Terms & Conditions</MenuItem>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  };
};

export default Footer;
