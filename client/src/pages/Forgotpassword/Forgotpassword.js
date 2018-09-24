import React, {Component} from "react";
import Logo from "../../components/Logo";

import { Row, Col } from 'react-bootstrap'

require("dotenv").config()

let msgSent = " "

let parkPic = "https://nearfox.com/wp-content/uploads/2016/11/imageferris_wheel_20160301065106331548.jpg" 


export default class Forgotpassword extends Component {

  state = {
    email:   "",
    msgSent: ""
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
      msgSent = "Message sent"
      this.forceUpdate();
    }
  };

  render() {

    return (
      <div>
        <Logo backgroundImage={parkPic}>
          <Row>
            <Col xs={2}></Col>
            <Col xs={7}>
              <h5 className="darken-4 text-center textColour">Forgot Password?</h5>
            </Col>
          </Row>
          <form method="POST" action="/api/contact/forgot">
            <Row>
              <Col xs={2}></Col>
              <Col xs={7}>
                <h6 className="darken-4 text-center textColour">Enter email address to get password</h6>
              </Col>
            </Row>
            <Row>
              <Col xs={4}></Col>
              <Col xs={3} className="textColour">
                <input
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
                <button className="btn btn-action button" type="submit">
                  Submit
                </button>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <h6 style={{ textAlign: "center", padding: 0 }}>{msgSent}</h6>
              </Col> 
            </Row> 
          </form>
        </Logo>
      </div>
    )
  }
}