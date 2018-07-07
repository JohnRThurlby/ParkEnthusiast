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
        <h4>Registration</h4>
        <button className="btn btn-action" onClick={this.onOpenModal}>
          Open
        </button>{' '}
        <Modal open={open} onClose={this.onCloseModal} center>
        const RegistrationForm = () =>
          <form method="POST">
            <label htmlFor="firstname">First Name</label>
            <input type="text" name="firstname" />
            <label htmlFor="mi">MI</label>
            <input type="text" name="mi" />
            <label htmlFor="lastname">Last Name</label>
            <input type="text" name="lastname" />
            <label htmlFor="addr1">Address</label>
            <input type="text" name="addr1" />
            <label htmlFor="city">City</label>
            <input type="text" name="city" />
            <label htmlFor="State">State</label>
            <input type="text" name="state" />
            <label htmlFor="zip">Zip</label>
            <input type="text" name="zip" />
            <label htmlFor="email">Email</label>
            <input type="email" name="email" />
            <label htmlFor="userid">UserID</label>
            <input type="text" name="userid" />
            <label htmlFor="repuserid">Repeat UserID</label>
            <input type="text" name="repuserid" />
            <label htmlFor="password">Password</label>
            <input type="password" name="password" />
            <label htmlFor="reppassword">Repeat Password</label>
            <input type="password" name="reppassword" />
            <input type="submit" />
          </form>
        </Modal>
      </div>
    );
  }
}
