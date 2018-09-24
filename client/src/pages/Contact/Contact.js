import React, {Component} from "react";
import Logo from "../../components/Logo";

import { Row, Col } from 'react-bootstrap'
import { TextArea } from "../../components/Form";

require("dotenv").config()

let msgSent = " "

let parkPic = "https://image.jimcdn.com/app/cms/image/transf/none/path/sa6549607c78f5c11/image/i2401adc8c9decc07/version/1454162276/image.jpg" 


export default class Contact extends Component {

  state = {
    name:    "",
    email:   "",
    comment: "",
    msgSent: "",
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.name && this.state.email && this.state.comment) {
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
            <Col xs={8}>
              <h5 className="darken-4 text-center textColour">Write to us</h5>
            </Col>
          </Row>
          <form method="POST" action="/api/contact">
            <Row>
              <Col xs={2}></Col>
              <Col xs={8} className="textColour">
                <input
                  autoComplete='name' 
                  required
                  value={this.state.name}
                  onChange={this.handleInputChange}
                  name="name"
                  placeholder="Name"
                />
              </Col>
            </Row>
            <Row>
              <Col xs={2}></Col>
              <Col xs={8} className="textColour">
                <input
                  autoComplete='email'
                  required
                  value={this.state.email}
                  onChange={this.handleInputChange}
                  name="email"
                  placeholder="Email"
                />
              </Col>
            </Row>
            <Row>
              <Col xs={2}></Col>
              <Col xs={8} className="textColour">
                <TextArea
                  value={this.state.comment}
                  required
                  onChange={this.handleInputChange}
                  name="comment"
                  placeholder="Comment"
                />
              </Col>
            </Row>
            <Row>
              <Col xs={5}></Col>
              <Col xs={5}>
                <button className="btn btn-action button" type="submit">
                  Contact Us
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