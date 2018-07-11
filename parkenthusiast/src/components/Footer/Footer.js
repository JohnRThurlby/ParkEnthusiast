import React, { Component } from "react"

import ModalConductor from "../ModalConductor"

import "./Footer.css"
import { Navbar, Nav, NavDropdown, MenuItem  } from 'react-bootstrap'

export default class Footer extends Component { 

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
              <a href="/home">Park Enthusiast 2018</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavDropdown eventKey={3} title="Privacy & Terms" id="basic-nav-dropdown">
                <MenuItem eventKey={3.1}>
                  <button className="btn btn-action" onClick={() => this._handleModal(true, 'PRIVACY')}>
                    Privacy
                  </button>
                </MenuItem>
                <MenuItem eventKey={3.2}>
                  <button className="btn btn-action" onClick={() => this._handleModal(true, 'TERMS')}>
                    Terms & Conditions
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