import React, {Component} from "react";
import Logo from "../../components/Logo";

import API from "../../utils/API";

import { Row, Col } from 'react-bootstrap'

const ValidatePassword = require('validate-password'),
      validPass        = new ValidatePassword(),
      postcode         = require('postcode-validator'),
      bcrypt           = require('bcryptjs'),
      validator        = require("email-validator");

let userValid = true
let error     = " "
let passHash  = " "
let parkPic       = "https://nearfox.com/wp-content/uploads/2016/11/imageferris_wheel_20160301065106331548.jpg" 

export default class Registration extends Component {

   state = { 
    nickname: "",
    zipcode: "",
    email: "",
    repemail: "",
    password: "",
    reppassword: "",
    error: "",
    userValid: true
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();

    userValid = true

    if (!postcode.validate(this.state.zipcode, 'US')) {
      error = 'Zip Code is invalid'
      userValid = false 
    }

    if (!validator.validate(this.state.email) ) {
      error = 'Invalid email, please enter a correcty formatted email'
      userValid = false
    } 

    if (this.state.email !== this.state.repemail    ) {
      error = 'Emails do not match, please re-enter'
      userValid = false
    } 

    let passwordData = validPass.checkPassword(this.state.password);
    if (!passwordData.isValid) {
      error = passwordData.validationMessage
      userValid = false
    }
    else {
      let password = this.state.password
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            console.log("hash "+ hash)
            passHash = hash
        });
       });
    }

    if (this.state.password !== this.state.reppassword) {
      error = "Passwords do not match"
      userValid = false
    }
    
    if (userValid) {
      API.getUser({
        email: this.state.email,
        userpassword: this.state.password
      })
      .then(res => { 
        if (res){ 
          API.saveUser({
            nickname:     this.state.nickname,
            zipcode:      this.state.zipcode, 
            email:        this.state.email,
            userpassword: passHash
          })
           .then(()=> 
               API.getUser({
                email: this.state.email
               })
               .then(res => { 
                  window.location="/parkselection?" + res.data.id + "&" + res.data.zipcode  
                  } 
               )
              .catch(err => console.log(err))
             .catch(err => console.log(err))
            )
          if (res.data.email === this.state.email) {
            error = "User already exist"
            this.forceUpdate();
          }
        }})
      .catch(err => {console.log(err)});
    }
    else {
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
                <h4 style={{ textAlign: "center", color: 'black' }}>Register for Park Enthusiast</h4>
            </Col>
          </Row>
          <form>  
            <Row>
              <Col xs={2}></Col>
              <Col xs={4}>
                <input
                  value={this.state.nickname}
                  onChange={this.handleInputChange}
                  name="nickname"
                  placeholder="Nick Name"
                />
              </Col>
              <Col xs={4}>
                <input
                  autoComplete='zipcode' 
                  value={this.state.zipcode}
                  onChange={this.handleInputChange}
                  name="zipcode"
                  placeholder="Zipcode"
                />
              </Col>
            </Row>
            <Row>
              <Col xs={12}></Col>
            </Row>
            <Row>
              <Col xs={2}></Col>
              <Col xs={4}>
                <input
                  type='email'
                  autoComplete='email' 
                  value={this.state.email}
                  onChange={this.handleInputChange}
                  name="email"
                  placeholder="Email"
                />
              </Col>
              <Col xs={4}>
                <input
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
              <Col xs={12}></Col>
            </Row>
            <Row>
              <Col xs={2}></Col>
              <Col xs={4}>
                <input
                  type='password'
                  value={this.state.password}
                  onChange={this.handleInputChange}
                  name="password"
                  placeholder="Password"
                />
              </Col>
              <Col xs={4}>
                <input
                  type='password'
                  value={this.state.reppassword}
                  onChange={this.handleInputChange}
                  name="reppassword"
                  placeholder="Confirm Password"
                />
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <h6 style={{ textAlign: "center", padding: 0 }}>{error}</h6>
              </Col> 
            </Row> 
            <Row>
              <Col xs={5}></Col>
              <Col xs={4}>
                <button className="btn btn-action button"
                  onClick={this.handleFormSubmit}
                >
                  Register
                </button>
              </Col>
            </Row>                 
          </form>
        </Logo>
      </div>
    )
  }
}