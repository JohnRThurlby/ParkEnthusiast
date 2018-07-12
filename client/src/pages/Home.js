import React, {Component} from "react";
import Logo from "../components/Logo";

import ModalConductor from "../components/ModalConductor";

import Container from "../components/Container"
import Row from "../components/Row";
import Col from "../components/Col";

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
          <Row></Row>
          <Row>  
            <Col size="sm-4"></Col>
            <Col size="sm-6">
              <h2>Park</h2>
            </Col>
            <Col size="sm-6"></Col>
            <Col size="sm-6">
              <h2>Enthusiast</h2>
            </Col>
            <Col size="sm-3"></Col>
            <Col size="sm-6">
              <h5>
                Welcome to the Park Enthusiast. Keep track of your park visits, what rides you have been on and when. 
                Make comments and rate your experiece. Track the actual time you waited in line. 
                As you gather more data, see what your prior wait times have been like.  
              </h5>
            </Col>
          </Row>
          <Container>
            <Row>
              <Col size="sm-5"></Col>
              <Col size="sm-7">
              <div>
                <button className="btn btn-action" onClick={() => this._handleModal(true, 'LOGIN')}>
                  Enter
                </button>
              </div>
              </Col>
            </Row>
          </Container>
        </Logo>

        <ModalConductor handleModal={this._handleModal} status={this.state.modalStatus} type={this.state.modalType}/>
      </div>
    )
  }
}




