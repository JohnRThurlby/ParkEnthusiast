import React, { Component } from "react";

import FacebookLogin from 'react-facebook-login'
import TiSocialFacebookCircular from 'react-icons/lib/ti/social-facebook-circular';

import API from "../utils/API";

export default class Facebook extends Component {

  state = {
      isLoggedIn:  false,
      email:       '',
      modalStatus: false,
      modalType:   ""
  }

  responseFacebook = response => {
    console.log(response);
    if (!response.status) {
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

      let fbContent; 

      if (this.state.isLoggedIn)
        { 
          console.log("in isLoggedIn from facebook.js")
          this.getUserinfo()  
        }
      else 
        { fbContent = (<FacebookLogin
          appId="468171206961498"
          fields="email"
          buttonText="Login"
          onClick={this.componentClicked}
          callback={this.responseFacebook}
          cssClass="my-facebook-button-class"
          icon={<TiSocialFacebookCircular /> } 
        />         
        )}

      return (
        <div>
          {fbContent}
        </div>
      )
  }
}