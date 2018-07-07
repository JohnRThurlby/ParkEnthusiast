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
        <h4>About Park Enthusiast</h4>
        <button className="btn btn-action" onClick={this.onOpenModal}>
          Open
        </button>{' '}
        <Modal open={open}  onClose={this.onCloseModal} center>
          <h2>About Park Enthusiast</h2>
          <p>
            Welcome to the Park Enthusiast. Keep track of your park visits, what rides you have been on and when. 
            Make comments and rate your experiece. Track the actual time you waited in line. 
            As you gather more data, see what your prior wait times have been like.  
          </p>
        </Modal>
      </div>
    );
  }
}
