import React, {Component} from "react";
import Logo from "../../components/Logo";

import ModalConductor from "../../components/ModalConductor";

import Row from "../../components/Row";
import Col from "../../components/Col";

export default class Home extends Component {

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
        <Logo backgroundImage="../../pages/theme.jpg">
          <Row></Row>
          <Row>  
            <Col size="sm-3"></Col>
            <Col size="sm-6">
              <h2 className="textColour">Park Enthusiast</h2>
            </Col>
          </Row>  
          <Row>
            <Col size="sm-3"></Col>
            <Col size="sm-6">
              <h5 className="textColour">
                Welcome to the Park Enthusiast. Keep track of your park visits, what rides you have been on and when. 
                Make comments and rate your experiece. Track the actual time you waited in line. 
                As you gather more data, see what your prior wait times have been like.  
              </h5>
              <h4 className="textColour">Now it is time to sign up and get riding!</h4>

            </Col>
          </Row>
          <Row>
            <Col size="sm-3"></Col>
            <Col size="sm-7">
              <button className="btn btn-action signbutton" onClick={() => this._handleModal(true, 'REGISTRATION')}>
                Sign up
              </button>
            </Col>
          </Row>
        </Logo>
        <ModalConductor history={this.props.history} handleModal={this._handleModal} status={this.state.modalStatus} type={this.state.modalType}/>
      </div>
    )
  }
}