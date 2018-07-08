import React from 'react';

import ModalWrapper from '../ModalWrapper';

const LoginModal = props => {
  const loginModal = provider => {
    props.hideModal();
    props.loginModal(provider);
  };

  return (
    <ModalWrapper
      {...props}
      title="Enter"
      width={400}
      showOk={false}
    >
      <p>Choose your Social Media</p>
      <button onClick={() => loginModal('facebook')}>Facebook</button>
      <button onClick={() => loginModal('google')}>Google</button>
      <button onClick={() => loginModal('twitter')}>Twitter</button>

    </ModalWrapper>
  );
};

export default LoginModal;