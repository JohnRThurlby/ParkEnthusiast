import React from 'react';

import ModalWrapper from '../ModalWrapper';
import { Form, FormControl, Col, FormGroup, ControlLabel } from 'react-bootstrap';

const RegistrationModal = props => {
  const registrationModal = provider => {
    props.hideModal();
    props.registrationModal(provider);
  };

  return (
    <ModalWrapper
      {...props}
      title="Registration"
      width={400}
      showOk={false}
    >
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
              <button onClick={() => registrationModal('Submit')}>Submit</button>
            </Col>
          </FormGroup>
        </Form>
        </div>

    </ModalWrapper>
  );
};

export default RegistrationModal;