import React, { Component } from "react"

import ModalConductor from "../ModalConductor"

import "./Footer.css"
import { Navbar, Row, Col } from 'react-bootstrap'

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
          <Row>
            <Col xs={4}>
              <Navbar.Brand>
                <a style={{color: "white"}} href="/home">© Park Enthusiast 2018</a>
              </Navbar.Brand>
            </Col>
            <Col xs={3}>
            </Col>
            <Col xs={2}>
              <h6 style={{padding: 10}}><a href="#"onClick={() => this._handleModal(true, 'PRIVACY')}>Privacy</a></h6>
            </Col>
            <Col xs={3}>
              <h6 style={{padding: 10}}><a href="#"onClick={() => this._handleModal(true, 'TERMS')}>Terms & Conditions</a></h6>
            </Col>
          </Row>
        </Navbar>
        <ModalConductor handleModal={this._handleModal} status={this.state.modalStatus} type={this.state.modalType}/>
      </div>

    )
  }
}