import React, {Component} from "react";
import Logo from "../../components/Logo";

import API from "../../utils/API";

import { Form, Row, Col } from 'react-bootstrap'

import Facebook from "../../components/Facebook";
import Google   from "../../components/Google";

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fab)

const bcrypt = require('bcryptjs')

let error = " "

//let parkPic = "../../pages/theme.jpg"
let parkPic = "https://nearfox.com/wp-content/uploads/2016/11/imageferris_wheel_20160301065106331548.jpg" 

export default class Login extends Component {

  state = { 
    email:     "",
    password:  "",
    error:     "",
    userdata:  {}
  }

  _handleRegistration = event => {
    event.preventDefault();
    window.location="/registration"  
  }

  _handleForgot = event => {
    event.preventDefault();
    window.location="/forgotpassword"  
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
        email: this.state.email
      })
        .then(res => { 
          if (res.data != null ) {
            let hash = res.data.userpassword
            if (bcrypt.compareSync(this.state.password, hash)) {
              window.location="/parkselection?" + res.data.id + "&" + res.data.zipcode  
             } 
             else {
              error = "Incorrect password, please re-enter"
              this.forceUpdate();
             }
          }
          else {
            error = "User does not exist, please re-enter"
            this.forceUpdate();
          }})
        .catch(err => console.log(err));
  };

  render() {

    return (
      <div>
        <Logo backgroundImage={parkPic}>
          <Row>
            <Col xs={11}>
              <h5 className="textColour" style={{ textAlign: "center" }}>Login to Park Enthusiast with Social Media</h5>
            </Col>
          </Row>
          <Row>
            <Col xs={3}></Col>
            <Col xs={3}>
              <Facebook />
            </Col>
            <Col xs={3}>
              <Google />
            </Col>
          </Row>
          <Row>
            <Col xs={1}></Col>
            <Col xs={8}> 
              <hr className="someClass textColour"/>
            </Col>
          </Row>
          <Row>
            <Col xs={3}></Col>
            <Col xs={5}>
              <div style={{ textAlign: "center" }} className="hide-md-lg textColour">
                <h5>Or sign in manually:</h5>
              </div>
            </Col>
          </Row>
          <Form action="GET">
            <Row>
              <Col xs={4}></Col>
              <Col xs={3}>
                <div className="textColour">
                  <input
                    type='email'
                    autoComplete='email' 
                    value={this.state.email}
                    onChange={this.handleInputChange}
                    name="email"
                    placeholder="Email"
                  />
                  <input
                    type='password'
                    autoComplete='password' 
                    value={this.state.password}
                    onChange={this.handleInputChange}
                    name="password"
                    width='30vw'
                    placeholder="Password"
                  />
                </div>
              </Col> 
            </Row> 
            <Row>
              <Col xs={12}>
                <h6 style={{ textAlign: "center", padding: 0 }}>{error}</h6>
              </Col> 
            </Row> 
            <Row>
              <Col xs={4}></Col>
              <Col xs={2}>
                <p><a className="textColour" ref="#" onClick={this._handleRegistration}>Not a User?</a></p>
              </Col> 
              <Col xs={2}>
                <p><a className="textColour" ref="#" onClick={this._handleForgot}>Forgot password?</a></p>
              </Col> 
            </Row> 
            <Row>
              <Col xs={5}></Col>
              <Col xs={5}>
                <button style={{ textAlign: "center"}} className="btn btn-action button textColour"
                  onClick={this.handleFormSubmit}
                >
                  Login
                </button>
              </Col>
            </Row>
          </Form>
        </Logo>
      </div>
    )
  }
}