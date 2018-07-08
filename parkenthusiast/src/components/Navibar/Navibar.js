import React, { Component } from "react";
import "./Navibar.css";
import { Navbar, Nav, NavDropdown, MenuItem } from 'react-bootstrap';

class Navibar extends Component { 
  
  onChange = (event) => {
    this.setState({
      currentModal: "About"
    }
  )};

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
              <NavDropdown eventKey={3} title="Menu" id="basic-nav-dropdown">
                <MenuItem eventKey={3.1}>
                  <input type="button" onClick={this.onChange} value="About"/>
                  
                </MenuItem>
                <MenuItem href="/help" eventKey={3.2}>Help</MenuItem>
                <MenuItem href="/contact" eventKey={3.3}>Contact</MenuItem>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  };
};

export default Navibar;