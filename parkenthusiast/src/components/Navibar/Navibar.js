import React, { Component } from "react";
import "./Navibar.css";
import { Navbar, Nav, NavItem } from 'react-bootstrap';

class Navibar extends Component { 
  render () {

    return (
      <div className="Navibar">
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/home">Park Enthusiast</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={1} href="/about">
                About
              </NavItem>
              <NavItem eventKey={2} href="/help">
                Help
              </NavItem>
              <NavItem eventKey={3} href="/contact">
                Contact
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  };
};

export default Navibar;