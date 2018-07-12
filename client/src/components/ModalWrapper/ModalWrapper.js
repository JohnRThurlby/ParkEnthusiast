import React from 'react';
import PropTypes from "react"
//const {proptypes} = React;

const ModalWrapper = props => {
  const handleBackgroundClick = e => {
    if (e.target === e.currentTarget) props.hideModal();
  };

  const onOk = () => {
    props.onOk();
    props.hideModal();
  };

  const okButton = props.showOk
    ? (
      <button
        onClick={onOk}
        disabled={props.okDisabled}
      >
        {props.okText}
      </button>
    ) : null;

  return (
    <div onClick={handleBackgroundClick}>
      <header>
        <h1>{props.title}</h1>

        <button onClick={() => props.handleModal(false, '')}>Close</button>
      </header>

      {props.children}

      {okButton}
    </div>
  );
};

ModalWrapper.propTypes = {
  // props
  title: PropTypes.string,
  showOk: PropTypes.bool,
  okText: PropTypes.string,
  okDisabled: PropTypes.bool,
  width: PropTypes.number,
  style: PropTypes.object,
  optionalArray: PropTypes.array,
  optionalelement: PropTypes.element,
  optionalstring: PropTypes.string,
  
  // methods
  hideModal: PropTypes.func,
  onOk: PropTypes.func,
};

ModalWrapper.defaultProps = {
  title: '',
  showOk: true,
  okText: 'OK',
  okDisabled: false,
  width: 400,
  onOk: () => {}
};

export default ModalWrapper;
