import React from 'react';

import ModalWrapper from '../ModalWrapper';

import { Col } from 'react-bootstrap';

const AboutModal = props => {
  const aboutModal = provider => {
    props.hideModal();
    props.aboutModal(provider);
  };

  return (
    <ModalWrapper
      {...props}
      title="About"
      width={400}
      showOk={false}
    >
      <div className="example">
      <h2>About Park Enthusiast</h2>
          <p>
            Welcome to the Park Enthusiast. Keep track of your park visits, what rides you have been on and when. 
            Make comments and rate your experiece. Track the actual time you waited in line. 
            As you gather more data, see what your prior wait times have been like.  
          </p>
          <Col smOffset={2} xs={9}>
              <button onClick={() => aboutModal('Close')}>Close</button>
          </Col>
      </div>
      
    </ModalWrapper>
  );
};

export default AboutModal;