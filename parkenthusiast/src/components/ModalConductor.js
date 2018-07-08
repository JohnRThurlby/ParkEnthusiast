import React from 'react';
//import {connect} from 'react-redux';
import AboutModal from './AboutModal';
import LoginModal from './LoginModal';
import HelpModal from './HelpModal';
import ContactModal from './ContactModal';
import PrivacyModal from './PrivacyModal';
import TermCondModal from './TermCondModal';
import RegistrationModal from './RegistrationModal';
//import * as actions from './data/actions.js';

const ModalConductor = props => {
  switch (props.currentModal) {
    case 'ABOUT':
      return <AboutModal {...props}/>;

    case 'LOGIN':
      return <LoginModal {...props}/>;

    case 'HELP':
      return <HelpModal {...props}/>;

    case 'CONTACT':
      return <ContactModal {...props}/>;
      
    case 'PRIVACY':
      return <PrivacyModal {...props}/>;

    case 'TERMS':
      return <TermCondModal {...props}/>;

    case 'REGISTRATION':
     return <RegistrationModal {...props}/>;
   
    default:
      return null;
  }
};

export default ModalConductor;