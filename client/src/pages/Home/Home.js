import React, {Component} from "react";
import Logo from "../../components/Logo";

import Row from "../../components/Row";
import Col from "../../components/Col";

let parkPic       = "https://nearfox.com/wp-content/uploads/2016/11/imageferris_wheel_20160301065106331548.jpg" 


export default class Home extends Component {

  _handleLogin = event => {
    event.preventDefault();
    window.location="/login"  
  }

  render() {

    return (
      <div>
        <Logo backgroundImage={parkPic}>
          <Row></Row>
          <Row>  
            <Col size="sm-3"></Col>
            <Col size="sm-6">
              <h2 className="textColour">Park Enthusiast</h2>
            </Col>
          </Row>  
          <Row>
            <Col size="sm-3"></Col>
            <Col size="sm-6">
              <h5 className="textColour">
                Welcome to the Park Enthusiast. Keep track of your park visits, what rides you have been on and when. 
                Make comments and rate your experiece. Track the actual time you waited in line. 
                As more data is gathered, see what wait times, ratings, and comments have been like. 
                Compete with friends to get the most park visits and rides!  
              </h5>
              <h4 className="textColour">Now it is time to log in and get riding!</h4>

            </Col>
          </Row>
          <Row>
            <Col size="sm-3"></Col>
            <Col size="sm-7">
              <button className="btn btn-action regisbutton" onClick={this._handleLogin}>
                Login
              </button>
            </Col>
          </Row>
        </Logo>
      </div>
    )
  }
}