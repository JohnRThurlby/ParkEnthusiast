import React, { Component } from "react"

import ModalConductor from "../ModalConductor"

import { Form, Col, FormControl, FormGroup, ControlLabel } from 'react-bootstrap'

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
          <h5>Reigster for Park Enthusiast</h5>
          <Form horizontal>
            <FormGroup controlId="formHorizontalFirst">
              <Col componentClass={ControlLabel} sm={2}>
                First Name
              </Col>
              <Col xs={6}>
                <FormControl type="text" placeholder="Enter First Name" />
              </Col>
            </FormGroup>
            <FormGroup controlId="formHorizontalMI">
              <Col componentClass={ControlLabel} sm={2}>
                MI
              </Col>
              <Col xs={6}>
                <FormControl type="text" placeholder="Enter MI" />
              </Col>
            </FormGroup>
            <FormGroup controlId="formHorizontalLast">
              <Col componentClass={ControlLabel} sm={2}>
               Last Name
              </Col>
              <Col xs={6}>
                <FormControl type="text" placeholder="Enter Last Name" />
              </Col>
            </FormGroup>
            <FormGroup controlId="formHorizontalAddr">
              <Col componentClass={ControlLabel} sm={2}>
                Address
              </Col>
              <Col xs={6}>
                <FormControl type="text" placeholder="Enter Address" />
              </Col>
            </FormGroup>
            <FormGroup controlId="formHorizontalCity">
              <Col componentClass={ControlLabel} sm={2}>
                City
              </Col>
              <Col xs={6}>
                <FormControl type="text" placeholder="Enter City" />
              </Col>
            </FormGroup>
            <FormGroup controlId="formControlsState">
                <ControlLabel>State</ControlLabel>
                 <FormControl componentClass="select" placeholder="Select State">
                    <option value="AL">Alabama</option>
                    <option value="AK">Alaska</option>
                    <option value="AZ">Arizona</option>
                    <option value="AR">Arkansas</option>
                    <option value="CA">California</option>
                    <option value="CO">Colorado</option>
                    <option value="CT">Connecticut</option>
                    <option value="DE">Delaware</option>
                    <option value="DC">District of Columbia</option>
                    <option value="FL">Florida</option>
                    <option value="GA">Georgia</option>
                    <option value="HI">Hawaii</option>
                    <option value="ID">Idaho</option>
                    <option value="IL">Illinois</option>
                    <option value="IN">Indiana</option>
                    <option value="IA">Iowa</option>
                    <option value="KS">Kansas</option>
                    <option value="KY">Kentucky</option>
                    <option value="LA">Louisiana</option>
                    <option value="ME">Maine</option>
                    <option value="MD">Maryland</option>
                    <option value="MA">Massachusetts</option>
                    <option value="MI">Michigan</option>
                    <option value="MN">Minnesota</option>
                    <option value="MS">Mississippi</option>
                    <option value="MO">Missouri</option>
                    <option value="MT">Montana</option>
                    <option value="NE">Nebraska</option>
                    <option value="NV">Nevada</option>
                    <option value="NH">New Hampshire</option>
                    <option value="NJ">New Jersey</option>
                    <option value="NM">New Mexico</option>
                    <option value="NY">New York</option>
                    <option value="NC">North Carolina</option>
                    <option value="ND">North Dakota</option>
                    <option value="OH">Ohio</option>
                    <option value="OK">Oklahoma</option>
                    <option value="OR">Oregon</option>
                    <option value="PA">Pennsylvania</option>
                    <option value="RI">Rhode Island</option>
                    <option value="SC">South Carolina</option>
                    <option value="SD">South Dakota</option>
                    <option value="TN">Tennessee</option>
                    <option value="TX">Texas</option>
                    <option value="UT">Utah</option>
                    <option value="VT">Vermont</option>
                    <option value="VA">Virginia</option>
                    <option value="WA">Washington</option>
                    <option value="WV">West Virginia</option>
                    <option value="WI">Wisconsin</option>
                    <option value="WY">Wyoming</option>
                    <option value="other">...</option>
                </FormControl>
            </FormGroup>
            <FormGroup controlId="formHorizontalZip">
                <Col componentClass={ControlLabel} sm={2}>
                    Zip
                </Col>
                <Col xs={6}>
                    <FormControl type="text" placeholder="Enter Zip" />
                </Col>
            </FormGroup>
            <FormGroup controlId="formHorizontalEmail">
                <Col componentClass={ControlLabel} sm={2}>
                  Email
                </Col>
                <Col xs={6}>
                    <FormControl type="email" placeholder="Enter Email" />
                </Col>
            </FormGroup>
            <FormGroup controlId="formHorizontalUserId1">
                <Col componentClass={ControlLabel} sm={2}>
                   UserId
                </Col>
                <Col xs={6}>
                     <FormControl type="text" placeholder="Enter UserId" />
                </Col>
            </FormGroup>
            <FormGroup controlId="formHorizontalUserId2">
                <Col componentClass={ControlLabel} sm={2}>
                    Repeat UserId
                </Col>
                <Col xs={6}>
                   <FormControl type="text" placeholder="Repeat UserId" />
                </Col>
            </FormGroup>
           <FormGroup controlId="formHorizontalPassword1">
                <Col componentClass={ControlLabel} sm={2}>
                    Password
                </Col>
                <Col xs={6}>
                    <FormControl type="password" placeholder="Enter Password" />
                </Col>
            </FormGroup>
            <FormGroup controlId="formHorizontalPassword2">
                <Col componentClass={ControlLabel} sm={2}>
                    Repeat Password
                </Col>
                <Col xs={6}>
                     <FormControl type="password" placeholder="Repeat Password" />
                </Col>
            </FormGroup>
            <FormGroup>
                <Col smOffset={2} xs={9}>
                    <button className="btn btn-action" onClick={() => this._handleModal(true, 'REGISTER')}>
                        Register
                    </button>
                </Col>
            </FormGroup>
        </Form>

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
      background: 'rgba(255,255,255, 0.7)',
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


// import { Form, FormControl, Col, FormGroup, ControlLabel } from 'react-bootstrap';


// export default class RegistrationModal extends Component  {

//     state = { 
//       modalStatus: false,
//       modalType: ""
//     }
  
//     _handleModal = (status, type) => {
//     this.setState ({modalStatus: status, modalType: type})
//     }
  
//     closeModal = (status, type) => {
//       this.setState ({modalStatus: status, modalType: type})
//     }  
    
//     render () {
  
//       return (
    
//       <div>
//         <h5>Reigster for Park Enthusiast</h5>
//         <Form horizontal>

//           <FormGroup controlId="formHorizontalFirst">
//           <Col componentClass={ControlLabel} sm={2}>
//               First Name
//           </Col>
//           <Col xs={6}>
//               <FormControl type="text" placeholder="Enter First Name" />
//           </Col>
//           </FormGroup>
//           <FormGroup controlId="formHorizontalMI">
//           <Col componentClass={ControlLabel} sm={2}>
//               MI
//           </Col>
//           <Col xs={6}>
//               <FormControl type="text" placeholder="Enter MI" />
//           </Col>
//           </FormGroup>
//           <FormGroup controlId="formHorizontalLast">
//           <Col componentClass={ControlLabel} sm={2}>
//               Last Name
//           </Col>
//           <Col xs={6}>
//               <FormControl type="text" placeholder="Enter Last Name" />
//           </Col>
//           </FormGroup>
//           <FormGroup controlId="formHorizontalAddr">
//           <Col componentClass={ControlLabel} sm={2}>
//               Address
//           </Col>
//           <Col xs={6}>
//               <FormControl type="text" placeholder="Enter Address" />
//           </Col>
//           </FormGroup>
//           <FormGroup controlId="formHorizontalCity">
//           <Col componentClass={ControlLabel} sm={2}>
//               City
//           </Col>
//           <Col xs={6}>
//               <FormControl type="text" placeholder="Enter City" />
//           </Col>
//           </FormGroup>
//           <FormGroup controlId="formControlsState">
//             <ControlLabel>State</ControlLabel>
//             <FormControl componentClass="select" placeholder="Select State">
//               <option value="AL">Alabama</option>
//               <option value="AK">Alaska</option>
//               <option value="AZ">Arizona</option>
//               <option value="AR">Arkansas</option>
//               <option value="CA">California</option>
//               <option value="CO">Colorado</option>
//               <option value="CT">Connecticut</option>
//               <option value="DE">Delaware</option>
//               <option value="DC">District of Columbia</option>
//               <option value="FL">Florida</option>
//               <option value="GA">Georgia</option>
//               <option value="HI">Hawaii</option>
//               <option value="ID">Idaho</option>
//               <option value="IL">Illinois</option>
//               <option value="IN">Indiana</option>
//               <option value="IA">Iowa</option>
//               <option value="KS">Kansas</option>
//               <option value="KY">Kentucky</option>
//               <option value="LA">Louisiana</option>
//               <option value="ME">Maine</option>
//               <option value="MD">Maryland</option>
//               <option value="MA">Massachusetts</option>
//               <option value="MI">Michigan</option>
//               <option value="MN">Minnesota</option>
//               <option value="MS">Mississippi</option>
//               <option value="MO">Missouri</option>
//               <option value="MT">Montana</option>
//               <option value="NE">Nebraska</option>
//               <option value="NV">Nevada</option>
//               <option value="NH">New Hampshire</option>
//               <option value="NJ">New Jersey</option>
//               <option value="NM">New Mexico</option>
//               <option value="NY">New York</option>
//               <option value="NC">North Carolina</option>
//               <option value="ND">North Dakota</option>
//               <option value="OH">Ohio</option>
//               <option value="OK">Oklahoma</option>
//               <option value="OR">Oregon</option>
//               <option value="PA">Pennsylvania</option>
//               <option value="RI">Rhode Island</option>
//               <option value="SC">South Carolina</option>
//               <option value="SD">South Dakota</option>
//               <option value="TN">Tennessee</option>
//               <option value="TX">Texas</option>
//               <option value="UT">Utah</option>
//               <option value="VT">Vermont</option>
//               <option value="VA">Virginia</option>
//               <option value="WA">Washington</option>
//               <option value="WV">West Virginia</option>
//               <option value="WI">Wisconsin</option>
//               <option value="WY">Wyoming</option>
//               <option value="other">...</option>
//             </FormControl>
//           </FormGroup>
//           <FormGroup controlId="formHorizontalZip">
//           <Col componentClass={ControlLabel} sm={2}>
//               Zip
//           </Col>
//           <Col xs={6}>
//               <FormControl type="text" placeholder="Enter Zip" />
//           </Col>
//           </FormGroup>
//           <FormGroup controlId="formHorizontalEmail">
//             <Col componentClass={ControlLabel} sm={2}>
//               Email
//             </Col>
//             <Col xs={6}>
//               <FormControl type="email" placeholder="Enter Email" />
//             </Col>
//           </FormGroup>
//           <FormGroup controlId="formHorizontalUserId1">
//           <Col componentClass={ControlLabel} sm={2}>
//               UserId
//           </Col>
//           <Col xs={6}>
//               <FormControl type="text" placeholder="Enter UserId" />
//           </Col>
//           </FormGroup>
//           <FormGroup controlId="formHorizontalUserId2">
//           <Col componentClass={ControlLabel} sm={2}>
//               Repeat UserId
//           </Col>
//           <Col xs={6}>
//               <FormControl type="text" placeholder="Repeat UserId" />
//           </Col>
//           </FormGroup>
//           <FormGroup controlId="formHorizontalPassword1">
//           <Col componentClass={ControlLabel} sm={2}>
//               Password
//           </Col>
//           <Col xs={6}>
//               <FormControl type="password" placeholder="Enter Password" />
//           </Col>
//           </FormGroup>
//           <FormGroup controlId="formHorizontalPassword2">
//           <Col componentClass={ControlLabel} sm={2}>
//               Repeat Password
//           </Col>
//           <Col xs={6}>
//               <FormControl type="password" placeholder="Repeat Password" />
//           </Col>
//           </FormGroup>

//           <FormGroup>
//             <Col smOffset={2} xs={9}>
//             <button className="btn btn-action" onClick={() => this._handleModal(true, 'REGISTER')}>
//                 Register
//               </button>
//             </Col>
//           </FormGroup>
//         </Form>

//         <ModalConductor handleModal={this._handleModal} status={this.state.modalStatus} type={this.state.modalType}/>

//         </div>

//     )
//   }
// }