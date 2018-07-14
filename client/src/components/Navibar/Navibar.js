import React, { Component } from "react"

import ModalConductor from "../ModalConductor"

import "./Navibar.css"
import { Row,  Col, Nav, Navbar, NavDropdown, MenuItem} from 'react-bootstrap'

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
        <Row>
          <Col xs={2}>
            <h6><a href="/home">Park Enthusiast</a></h6>
          </Col>
          <Col xs={7}>
          </Col>
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
          {/* <Col sm="1">
            <button className="btn btn-action" onClick={() => this._handleModal(true, 'ABOUT')}>
              About
            </button>
          </Col>
          <Col sm="1">
            <button className="btn btn-action" onClick={() => this._handleModal(true, 'HELP')}>
              Help
            </button>
          </Col>
          <Col sm="1">
            <button className="btn btn-action" onClick={() => this._handleModal(true, 'CONTACT')}>
              Contact
            </button>
          </Col> */}
        </Row>
        </Navbar>
        <ModalConductor handleModal={this._handleModal} status={this.state.modalStatus} type={this.state.modalType}/>
      
      </div>
   
    )
  }
}