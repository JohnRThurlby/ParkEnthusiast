import React, { Component } from "react"

import ModalConductor from "../ModalConductor"

import "./Navibar.css"
import { Row,  Col, Navbar} from 'react-bootstrap'

export default class Navibar extends Component { 
  
  state = { 
    modalStatus: false,
    modalType: ""
  }

  _handleModal = (status, type) => {
  this.setState ({modalStatus: status, modalType: type})
  }

  _handleContact = event => {
    event.preventDefault();
    window.location="/contact"  
  }

  render () {

    return (
      <div className="Navibar">
        <Navbar inverse collapseOnSelect>   
          <Row>
            <Col xs={2}>
              <h6 style={{padding: 10}}><a href="/home">Park Enthusiast</a></h6>
            </Col>
            <Col xs={6}>
            </Col>
            <Col xs={1}>
              <button className="btn btn-action button" onClick={() => this._handleModal(true, 'ABOUT')}>
                About
              </button>
            </Col>
            <Col xs={2}>
            </Col>
            <Col xs={1}>
              <button className="btn btn-action button" onClick={this._handleContact}>
                Contact
              </button>
            </Col>
          </Row>
        </Navbar>
        <ModalConductor handleModal={this._handleModal} status={this.state.modalStatus} type={this.state.modalType}/>
      </div>
    )
  }
}