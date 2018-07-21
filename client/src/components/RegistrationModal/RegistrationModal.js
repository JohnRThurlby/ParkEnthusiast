import React, { Component } from "react"

import ModalConductor from "../ModalConductor"

import API from "../../utils/API";

import { Row, Col } from 'react-bootstrap'
import { Input } from "../../components/Form";

const ValidatePassword = require('validate-password'),
      validPass        = new ValidatePassword(),
      postcode         = require('postcode-validator'),
      validator        = require("email-validator");

let userValid = true
let error     = " "

export default class RegistrationModal extends Component {
  constructor(props) {
    super(props)
    this.state = { isModalOpen: true }
  }

  state = { 
    modalStatus: false,
    modalType: "",
    nickname: "",
    zipcode: "",
    email: "",
    repemail: "",
    password: "",
    reppassword: "",
    userValid: true
  }
  
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  _handleModal = (status, type) => {
    this.setState ({modalStatus: status, modalType: type})
  }

  handleFormSubmit = event => {
    event.preventDefault();

    if (!validator.validate(this.state.email)) {
      error = 'Invalid email, please enter a correcty formatted email'
      userValid = false
    } 

    let passwordData = validPass.checkPassword(this.state.password);
    if (!passwordData.isValid) {
      error = passwordData.validationMessage
      userValid = false
    }

    if (!postcode.validate(this.state.zipcode, 'US')) {
      error = 'Zip Code is invalid'
      userValid = false 
}
    
    if (this.state.nickname && this.state.email && this.state.password && this.state.zipcode) {
      console.log("in API call")
      
      API.saveUser({
        nickname: this.state.nickname,
        zipcode: this.state.zipcode, 
        email: this.state.email,
        userpassword: this.state.password
      })
        .then(()=> {window.location="/parkselection"})
        .catch(err => console.log(err));
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
              <Col xs={10}>
                <h4 style={{ textAlign: "center" }}>Register for Park Enthusiast</h4>
              </Col>
            </Row>
            <form>  
              <Row>
                <Col xs={2}></Col>
                <Col xs={8}>

                  <Input
                    value={this.state.nickname}
                    onChange={this.handleInputChange}
                    name="nickname"
                    placeholder="Nick Name"
                  />
                </Col>
              </Row>
              <Row>
              <Col xs={2}></Col>
                <Col xs={8}>

                  <Input
                    autoComplete='zipcode' 
                    value={this.state.zipcode}
                    onChange={this.handleInputChange}
                    name="zipcode"
                    placeholder="Zipcode"
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={2}></Col>
                <Col xs={8}>

                  <Input
                    type='email'
                    autoComplete='email' 
                    value={this.state.email}
                    onChange={this.handleInputChange}
                    name="email"
                    placeholder="Email"
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={2}></Col>
                <Col xs={8}>

                  <Input
                    type='email'
                    autoComplete='email' 
                    value={this.state.repemail}
                    onChange={this.handleInputChange}
                    name="repemail"
                    placeholder="Confirm Email"
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={2}></Col>
                <Col xs={8}>

                  <Input
                    type='password'
                    value={this.state.password}
                    onChange={this.handleInputChange}
                    name="password"
                    placeholder="Password"
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={2}></Col>
                <Col xs={8}>

                  <Input
                    type='password'
                    value={this.state.reppassword}
                    onChange={this.handleInputChange}
                    name="reppassword"
                    placeholder="Confirm Password"
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={4}></Col>
                <Col xs={5}>
                  <button className="btn btn-action button"
                    onClick={this.handleFormSubmit}
                  >
                    Register
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
      top: '50%',
      left: '50%',
      width: '40%',
      transform: 'translate(-50%, -50%)',
      zIndex: '9999',
      background: 'rgba(255,255,255, 1)',
      maxHeight: "100%",
      overflow: "auto"
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
      zIndex: '9998',
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