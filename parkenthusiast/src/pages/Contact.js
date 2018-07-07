import React, { Component } from "react";
//import Modal from 'react-responsive-modal';

import { Form, FormControl, Col, FormGroup, Button, ControlLabel } from 'react-bootstrap';

////import sendEmail from 'mailer';
//import nodeMailer from 'nodemailer';

class Contact extends Component { 
  render () {

    return (
      <div>
        <h5>Contact Park Enthusiast</h5>
        <Form horizontal>

          <FormGroup controlId="formHorizontalEmail">
          <Col componentClass={ControlLabel} sm={2}>
              Name
          </Col>
          <Col xs={6}>
              <FormControl type="text" placeholder="Name" />
          </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalEmail">
            <Col componentClass={ControlLabel} sm={2}>
              Email
            </Col>
            <Col xs={6}>
              <FormControl type="email" placeholder="Email" />
            </Col>
          </FormGroup>

          <FormGroup controlId="formControlsTextarea">
          <Col componentClass={ControlLabel} sm={2}>
              Comment
            </Col>
            <Col xs={6}>
              <FormControl type="textarea" placeholder="Comment" />
            </Col>
          </FormGroup>     

          <FormGroup>
            <Col smOffset={2} xs={9}>
              <Button type="submit">Submit</Button>
            </Col>
          </FormGroup>
        </Form>
        </div>
      );
  };
};

export default Contact;