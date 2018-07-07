import React from 'react';
import Modal from 'react-responsive-modal';

export default class Centered extends React.Component {
  state = {
    open: false,
  };

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {
    const { open } = this.state;
    return (
      <div className="example">
        <h4>Help for Park Enthusiast</h4>
        <button className="btn btn-action" onClick={this.onOpenModal}>
          Open
        </button>{' '}
        <Modal open={open} onClose={this.onCloseModal} center>
          <h2>Help for Park Enthusiast</h2>
          <p>
            Lorem ipsum dolor sit amet. 
          </p>
        </Modal>
      </div>
    );
  }
}
