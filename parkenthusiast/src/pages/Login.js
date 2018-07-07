import React, { Component } from "react";
//import Modal from 'react-responsive-modal';
import { Form, FormControl, Col, FormGroup, Button, Checkbox, ControlLabel } from 'react-bootstrap';

class Login extends Component { 

  render() {
    
    return (
      <div className="example">
               
        <Form horizontal>
          <FormGroup controlId="formHorizontalEmail">
            <Col componentClass={ControlLabel} sm={2}>
              UserId
            </Col>
            <Col xs={9}>
              <FormControl type="text" placeholder="UserId" />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} sm={2}>
              Password
            </Col>
            <Col xs={9}>
              <FormControl type="password" placeholder="Password" />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Checkbox>Remember me</Checkbox>
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button type="submit">Sign in</Button>
            </Col>
          </FormGroup>
        </Form>;
      </div>
    );
  };
};

export default Login;
