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
                <a href="/home">Copyright Park Enthusiast 2018</a>
              </Navbar.Brand>
            </Col>
            <Col xs={3}>
            </Col>
            <Col xs={2}>
              <button className="btn btn-action button" onClick={() => this._handleModal(true, 'PRIVACY')}>
                Privacy
              </button>
            </Col>
            <Col xs={2}>
              <button className="btn btn-action button" onClick={() => this._handleModal(true, 'TERMS')}>
              Terms & Conditions
              </button>
            </Col>
          </Row>
        </Navbar>

        <ModalConductor handleModal={this._handleModal} status={this.state.modalStatus} type={this.state.modalType}/>

      </div>

    )
  }
}