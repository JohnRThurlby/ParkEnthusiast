import React, { Component } from "react";

import GoogleLogin from 'react-google-login'
import API from "../utils/API";

//import ModalConductor from "./ModalConductor";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class Google extends Component {

  state = {
      isLoggedIn:  false,
      email:       '',
      modalStatus: false,
      modalType:   ""
  }

  responseGoogle = response => {
    console.log(response);
    if (!response.error) {
      this.setState ({
        isLoggedIn: true,
          email: response.email
        })
    }
  }

  _handleModal = (status, type) => {
    this.setState ({modalStatus: status, modalType: type})
  }

  componentClicked = () => console.log("clicked")

  getUserinfo = () => {
    API.getUser({
      email: this.state.email
    })
      .then(res => { 
        if (res.data != null ) {

          window.location="/parkselection?" + res.data.id + "&" + res.data.zipcode  
        }
        else {
          this._handleModal(true, 'REGISTRATION')
        }})
      .catch(err => console.log(err));
  }

  render() {

      let goContent; 

      if (this.state.isLoggedIn)
        { 
          console.log("in isLoggedIn from google.js")

       //   this.getUserinfo()  
        }
      else 
        { goContent = (<GoogleLogin
          clientId="179420788979-1pqg9mg2giqev0idr9e6duduil2015cs.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
          >
           <FontAwesomeIcon icon={['fab', 'google-plus']}
           />
          <span> Login</span>
          </GoogleLogin>)
        }

      return (
        <div>
          {goContent}

        </div>
        
      )
  }
}