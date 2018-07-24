import React, { Component } from "react"

import ModalConductor from "../ModalConductor"

import API from "../../utils/API";

import { Form, Row, Col } from 'react-bootstrap'
import { Input } from "../../components/Form";

import { FacebookLoginButton, TwitterLoginButton, GoogleLoginButton } from "react-social-login-buttons";

export default class LoginModal extends Component {
  constructor(props) {
    super(props)
    this.state = { isModalOpen: true }
  }

  state = { 
    modalStatus: false,
    modalType: "",
    email: "",
    password: "",
    userdata: {}
  }
    
  _handleModal = (status, type) => {
    this.closeModal()
    this.setState ({modalStatus: status, modalType: type})
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
      API.getUser({
        email: this.state.email,
        userpassword: this.state.password
      })
        .then(res => { 
        this.setState({ userdata: res.data });
        console.log(res.data.zipcode)
        localStorage.setItem('zipcode', res.data.zipcode)
        window.location="/parkselection"})
        .catch(err => console.log(err));
  };
  
  render() {
    return (
      <div>
        <Modal isOpen={this.state.isModalOpen} onClose={() => this.closeModal()}>
          <button type="button" className="fontx close" onClick={() => this.closeModal()} aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <div>
            <div className="container">
              <Form action="Post">
                <Row>
                  <Col xs={1}></Col>
                  <Col xs={11}>
                    <h4 style={{ textAlign: "center" }}>Login with Social Media or Manually</h4>
                  </Col>
                </Row>
                <Row>
                <Col xs={1}></Col>

                  <Col xs={3}>
                    <FacebookLoginButton onClick={() => alert("Hello")}>
                      <span>Login</span>
                    </FacebookLoginButton>
                  </Col>
                  <Col xs={1}></Col>
                  <Col xs={3}>
                    <TwitterLoginButton onClick={() => alert("Hello")}>
                      <span>Login</span>
                    </TwitterLoginButton>
                  </Col>
                  <Col xs={1}></Col>
                  <Col xs={3}>
                    <GoogleLoginButton onClick={() => alert("Hello")}>
                      <span>Login</span>
                    </GoogleLoginButton>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12}> 
                    <hr className="someClass"/>
                  </Col>
                </Row>
                <Row>
                  <Col xs={4}></Col>
                  <Col xs={5}>
                    <div className="hide-md-lg">
                      <h6>Or sign in manually:</h6>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col xs={3}></Col>
                  <Col xs={6}>
                    <div>
                      <Input
                        type='email'
                        autoComplete='email' 
                        value={this.state.email}
                        onChange={this.handleInputChange}
                        name="email"
                        placeholder="Email"
                      />
                      <Input
                        type='password'
                        autoComplete='password' 
                        value={this.state.password}
                        onChange={this.handleInputChange}
                        name="password"
                        placeholder="Password"
                      />
                    </div>
                  </Col> 
                </Row>  
                <Row>
                  <Col xs={3}></Col>
                  <Col xs={4}>
                    <p style={{margin: 0}}><a ref="#" onClick={() => this._handleModal(true, 'FORGOT')}>Forgot Password?</a></p>
                  </Col> 
                  <Col xs={3}>
                    <p><a ref="#" onClick={() => this._handleModal(true, 'REGISTRATION')}>Not a User?</a></p>
                  </Col> 
                </Row>  
                <Row>
                  <Col xs={5}></Col>
                  <Col xs={5}>
                    <button className="btn btn-action button"
                      onClick={this.handleFormSubmit}
                    >
                      Login
                    </button>
                  </Col>
                </Row>
                <br/>
              </Form>
            </div>
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