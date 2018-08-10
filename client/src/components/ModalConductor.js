import React, {Component} from 'react'

import './ModalConductor.css'

import AboutModal from './AboutModal'
import LoginModal from './LoginModal'
import ContactModal from './ContactModal'
import PrivacyModal from './PrivacyModal'
import TermCondModal from './TermCondModal'
import RegistrationModal from './RegistrationModal'
import ForgotpasswordModal from './ForgotpasswordModal'
import RideselectionModal from './RideselectionModal'

export default class ModalConductor extends Component {
  renderSwitch () {
    switch (this.props.type) {
      case 'ABOUT':
        return <AboutModal handleModal={this.props.handleModal}/>;

      case 'LOGIN':
        return <LoginModal history={this.props.history} handleModal={this.props.handleModal}/>;

      case 'CONTACT':
        return <ContactModal/>;
          
      case 'PRIVACY':
        return <PrivacyModal/>;

      case 'TERMS':
        return <TermCondModal/>;

      case 'FORGOT':
        return <ForgotpasswordModal/>;

      case 'REGISTRATION':
        return <RegistrationModal history={this.props.history} handleModal={this.props.handleModal}/>;

      case 'RIDESELECTION':
        return <RideselectionModal history={this.props.history} handleModal={this.props.handleModal} userid={this.props.userid} parkid={this.props.parkid}/>;
      
      default:
        return null

    }
  }

  render() {

    if(this.props.status === false) return null

    return(

      <div className="ModalConductor">
         {this.renderSwitch()}
      </div>

     )
  }
}