import React, { Component } from "react"

import ModalConductor from "../ModalConductor"

import "./Navibar.css"
import { Navbar, Nav, NavDropdown, MenuItem } from 'react-bootstrap'
import AdSense from 'react-adsense';

export default class Navibar extends Component { 
  
  state = { 
    modalStatus: false,
    modalType: ""
  }

  _handleModal = (status, type) => {
  this.setState ({modalStatus: status, modalType: type})
  }

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
          {/* <div>
            <AdSense.Google
              client='ca-pub-7292810486004926'
              slot='780639467
              3'
            />
          </div> */}
          <Navbar.Collapse>
            <Nav>
              <NavDropdown eventKey={3} title="Menu" id="basic-nav-dropdown">
                <MenuItem eventKey={3.1}>
                  <button className="btn btn-action" onClick={() => this._handleModal(true, 'ABOUT')}>
                    About
                  </button>
                </MenuItem>
                <MenuItem eventKey={3.2}>
                  <button className="btn btn-action" onClick={() => this._handleModal(true, 'HELP')}>
                      Help
                  </button>
                </MenuItem>
                <MenuItem eventKey={3.3}>
                  <button className="btn btn-action" onClick={() => this._handleModal(true, 'CONTACT')}>
                      Contact
                  </button>
                </MenuItem>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <ModalConductor handleModal={this._handleModal} status={this.state.modalStatus} type={this.state.modalType}/>

      </div>
    )
  }
}