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
          <h1>Park</h1>
          <h1>Enthusiast</h1>
          <Container>
            <Row>
              <Col size="md-12">
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




