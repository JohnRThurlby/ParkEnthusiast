import React, { Component } from "react"

import ModalConductor from "../ModalConductor"

import { Form, Row, Col } from 'react-bootstrap'


export default class LoginModal extends Component  {

  state = { 
    modalStatus: false,
    modalType: ""
  }

  _handleModal = (status, type) => {
  this.setState ({modalStatus: status, modalType: type})
  }

  closeModal = (status, type) => {
    this.setState ({modalStatus: status, modalType: type})
  }  
  
  render () {

    return (
      <div>
        <div className="container">
          <Form action="Post">
            <Row>
              <h2 style={{ textAlign: "center" }}>Login with Social Media or Manually</h2>
              
              <Col sm="4">
                <a href="/home" className="fb btn">
                  <i className="fa fa-facebook fa-fw"></i> Login with Facebook
                </a>
              </Col>
              <Col sm="4">
                <a href="/home" className="twitter btn">
                 <i className="fa fa-twitter fa-fw"></i> Login with Twitter
                </a>
              </Col>
              <Col sm="4">
                <a href="/home" className="google btn">
                  <i className="fa fa-google fa-fw"></i> Login with Google+
                </a>
              </Col>
              <Row></Row>
              <Row>
                <Col sm="4">
                </Col>
                <Col sm="2">
                  <div className="hide-md-lg">
                  <p>Or sign in manually:</p>
                  </div>
                </Col>
              </Row>

              <Row>
                <Col sm="3"></Col>
                <Col sm="5">
                  <div>
                    <input type="text" name="username" placeholder="Username" required/>
                    <input type="password" name="password" placeholder="Password" required/>
                    <input type="submit" value="Login"/>
                  </div>
                </Col>
              </Row>

            </Row>
          </Form>
        </div>

        <div className="bottom-container">
          <Row>
            <Col sm="4"></Col>
            <Col sm="2">
              <button className="btn btn-action" onClick={() => this._handleModal(true, 'REGISTRATION')}>
                Sign Up
              </button>
            </Col>
            <Col sm="2">
              <button className="btn btn-action" onClick={() => this._handleModal(true, 'FORGOT')}>
                Forgot password?
              </button>
            </Col>
          </Row>
        </div>

        <ModalConductor handleModal={this._handleModal} status={this.state.modalStatus} type={this.state.modalType}/>

      </div>
    )
  }
}