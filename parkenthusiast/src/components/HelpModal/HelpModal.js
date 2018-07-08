import React from 'react';

import ModalWrapper from '../ModalWrapper';

import { Col } from 'react-bootstrap';

const HelpModal = props => {
  const helpModal = provider => {
    props.hideModal();
    props.helpmodal(provider);
  };

  return (
    <ModalWrapper
      {...props}
      title="Help"
      width={400}
      showOk={false}
    >
      <div className="example">
        
        <h2>Help for Park Enthusiast</h2>
          <p>
          Help for Park Enthusiast
          </p>
          <Col smOffset={2} xs={9}>
              <button onClick={() => helpModal('Close')}>Close</button>
          </Col>
      </div>
    </ModalWrapper>
  );
};

export default HelpModal;