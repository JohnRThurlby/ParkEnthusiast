import React, { Component } from "react";

import { Row, Col } from 'react-bootstrap'
import { Input } from "../../components/Form";

import ModalConductor from "../ModalConductor"

require("dotenv").config()
//var ses = require('node-ses')
//  , client = ses.createClient({ key: "AKIAJY3KUB5OAVIHPW3Q", secret: "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" });

export default class ForgotpasswordModal extends Component {

  constructor(props) {
    super(props)
    this.state = { isModalOpen: true }
  }

  state = {
    email: "",
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.email) {
      console.log("in email")
      //client.sendEmail({
      //  to: "johnrthurlby@gmail.com"
      //  , from: "enthusiastpark@gmail.com"
      //  , altText: "Forgot password"
      //}, function (err, data, res) {
      //  console.log("in function")
      //});
    }
  };

  render() {
    return (
      <div>
        <Modal isOpen={this.state.isModalOpen} onClose={() => this.closeModal()}>
          <div>
            
            <button type="button" className="fontx close" onClick={() => this.closeModal()} aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            
            <Row>
              <Col xs={2}></Col>
              <Col xs={9}>
                
                <h3 className="darken-4 text-center">Forgot Password</h3>

              </Col>
            </Row>
            <form>
              <Row>
                <Col xs={2}></Col>
                <Col xs={9}>
                  <h5 className="darken-4 text-center">Enter email address to get password</h5>
                </Col>
              </Row>
              <Row>
                <Col xs={2}></Col>
                <Col xs={8}>

                  <Input
                    autoComplete='email'
                    value={this.state.email}
                    onChange={this.handleInputChange}
                    name="email"
                    placeholder="Email"
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={5}></Col>
                <Col xs={5}>
                  <button className="btn btn-action button"
                    onClick={this.handleFormSubmit}
                  >
                    Submit
                  </button>
                </Col>
              </Row>
            </form>
            <ModalConductor handleModal={this._handleModal} status={this.state.modalStatus} type={this.state.modalType}/>
          </div>
       </Modal>
      </div>
    )
  }
  openModal() {
    this.setState({ isModalOpen: true })
  }

  closeModal() {
    this.setState({ isModalOpen: false })
  }
}

class Modal extends React.Component {
  render() {
    if (this.props.isOpen === false)
      return null

    let modalStyle = {
      position: 'absolute',
      top: '47%',
      left: '50%',
      width: '60%',
      transform: 'translate(-50%, -50%)',
      zIndex: '9999',
      background: 'rgba(255,255,255, 1)'
    }

    if (this.props.width && this.props.height) {
      modalStyle.width = this.props.width + 'px'
      modalStyle.height = this.props.height + 'px'
      modalStyle.marginLeft = '-' + (this.props.width/2) + 'px'
      modalStyle.marginTop = '-' + (this.props.height/2) + 'px'
      modalStyle.transform = null
    }

    if (this.props.style) {
      for (let key in this.props.style) {
        modalStyle[key] = this.props.style[key]
      }
    }

    let backdropStyle = {
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: '0px',
      left: '0px',
      zIndex: '9991',
      background: 'rgba(255, 255, 255, 0.2)'
    }

    if (this.props.backdropStyle) {
      for (let key in this.props.backdropStyle) {
        backdropStyle[key] = this.props.backdropStyle[key]
      }
    }

    return (
      <div className={this.props.containerClassName}>
        <div className={this.props.className} style={modalStyle}>
          {this.props.children}
        </div>
        {!this.props.noBackdrop &&
            <div className={this.props.backdropClassName} style={backdropStyle}
                 onClick={e => this.close(e)}/>}
      </div>
    )
  }

  close(e) {
    e.preventDefault()

    if (this.props.onClose) {
      this.props.onClose()
    }
  }
}