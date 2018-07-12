import React, { Component } from "react"

import ModalConductor from "../ModalConductor"

import { Form, Row, Col } from 'react-bootstrap'

export default class LoginModal extends Component {
  constructor(props) {
    super(props)
    this.state = { isModalOpen: true }
  }

  state = { 
    modalStatus: false,
    modalType: ""
  }
    
  _handleModal = (status, type) => {
    this.setState ({modalStatus: status, modalType: type})
  }
  
  render() {
    return (
      <div>
        <Modal isOpen={this.state.isModalOpen} onClose={() => this.closeModal()}>
        <div>
        <div className="container">
          <Form action="Post">
            <Row>
              <h2 style={{ textAlign: "center" }}>Login with Social Media or Manually</h2>
              <Col sm="2">
                <a href="/home" className="fb btn">
                   <i className="fa fa-facebook fa-fw"></i>Facebook
                </a>
              </Col>
              <Col sm="2"></Col>
              <Col sm="2">
                <a href="/home" className="twitter btn">
                  <i className="fa fa-twitter fa-fw"></i>Twitter
                </a>
              </Col>
              <Col sm="2"></Col>
              <Col sm="2">
                <a href="/home" className="google btn">
                  <i className="fa fa-google fa-fw"></i>Google+
                </a>
              </Col>
              <Row></Row>
              <Row>
                <Col sm="3">
                </Col>
                <Col sm="4">
                  <div className="hide-md-lg">
                    <p>Or sign in manually:</p>
                  </div>
                </Col>
              </Row>

              <Row>
                <Col sm="3"></Col>
                <Col sm="6">
                  <div>
                    <input type="text" name="username" placeholder="Username" required/>
                    <input type="password" name="password" placeholder="Password" required/>
                  </div>
                </Col> 
              </Row>  
              <Row>
                <Col sm="5"></Col>
                <Col sm="3">
                  <div>
                   <input type="submit" value="Login"/>
                  </div>
                </Col>
              </Row>

            </Row>
          </Form>
        </div>

        <div className="bottom-container">
          <Row>
            <Col sm="3"></Col>
            <Col sm="3">
              <button className="btn btn-action" onClick={() => this._handleModal(true, 'REGISTRATION')}>
                Sign Up
              </button> 
            </Col>
            <Col sm="1"></Col>
            <Col sm="3">
              <button className="btn btn-action" onClick={() => this._handleModal(true, 'FORGOT')}>
                Forgot password?
              </button>
            </Col>
          </Row>
        </div>

        <ModalConductor handleModal={this._handleModal} status={this.state.modalStatus} type={this.state.modalType}/>

        </div>
          <p><button className="btn btn-action" onClick={() => this.closeModal()}>Close</button></p>
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
      width: '60%',
      transform: 'translate(-50%, -50%)',
      zIndex: '9999',
      background: 'rgba(255,255,255, 0.7)'
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
      background: 'rgba(255, 255, 255, 0.5)'
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
















// import React, { Component } from "react"

// import ModalConductor from "../ModalConductor"

// import { Form, Row, Col } from 'react-bootstrap'
// import { Button, Fa } from 'mdbreact';


// export default class LoginModal extends Component  {

//   state = { 
//     modalStatus: false,
//     modalType: ""
//   }

//   _handleModal = (status, type) => {
//   this.setState ({modalStatus: status, modalType: type})
//   }

//   closeModal = (status, type) => {
//     this.setState ({modalStatus: status, modalType: type})
//   }  
  
//   render () {

//     return (
//       <div>
//         <div className="container">
//           <Form action="Post">
//             <Row>
//               <h2 style={{ textAlign: "center" }}>Login with Social Media or Manually</h2>
              
//               <Col sm="4">
//                 <a href="/home" className="fb btn">
//                   <i className="fa fa-facebook fa-fw"></i> Login with Facebook
//                 </a>
//               </Col>
//               <Col sm="4">
//                <Button social="tw"><Fa icon="twitter"/></Button>
//               </Col>
//               <Col sm="4">
//                 <a href="/home" className="google btn">
//                   <i className="fa fa-google fa-fw"></i> Login with Google+
//                 </a>
//               </Col>
//               <Row></Row>
//               <Row>
//                 <Col sm="4">
//                 </Col>
//                 <Col sm="2">
//                   <div className="hide-md-lg">
//                   <p>Or sign in manually:</p>
//                   </div>
//                 </Col>
//               </Row>

//               <Row>
//                 <Col sm="3"></Col>
//                 <Col sm="5">
//                   <div>
//                     <input type="text" name="username" placeholder="Username" required/>
//                     <input type="password" name="password" placeholder="Password" required/>
//                     <input type="submit" value="Login"/>
//                   </div>
//                 </Col>
//               </Row>

//             </Row>
//           </Form>
//         </div>

//         <div className="bottom-container">
//           <Row>
//             <Col sm="4"></Col>
//             <Col sm="2">
//               <button className="btn btn-action" onClick={() => this._handleModal(true, 'REGISTRATION')}>
//                 Sign Up
//               </button>
//             </Col>
//             <Col sm="2">
//               <button className="btn btn-action" onClick={() => this._handleModal(true, 'FORGOT')}>
//                 Forgot password?
//               </button>
//             </Col>
//           </Row>
//         </div>

//         <ModalConductor handleModal={this._handleModal} status={this.state.modalStatus} type={this.state.modalType}/>

//       </div>
//     )
//   }
// }