import React, { Component } from "react"

import Logo from "../../components/Logo";

import API from "../../utils/API";

import { Row, Col } from 'react-bootstrap'

export default class Rideadmin extends Component {
  constructor(){
    super();
    this.state = {
    }
  }

  state = { 
  }

  handleFormSubmit = event => {
    event.preventDefault();
    API.addRide({
      parkid:        this.state.parkInid, 
       rideid:       this.state.rideInid,
       parkridename: this.state.parkRidename,
       parkarea:     this.state.parkArea, 
       parkhgtreq:   this.state.parkHgtreq,
       parkduration: this.state.parkDuration,
       parkmaxhgt:   this.state.parkMaxhgt,
       parkopened:   this.state.parkOpened,
       parkspeed:    this.state.parkSpeed,
       parklevel:    this.state.parkLevel, 
       parklength:   this.state.parkLength,
       parktype:     this.state.parkType,
       rideurl:      this.state.parkUrl 
      })
        .then()
        .catch(err => console.log(err))
  };
  
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };
  
  render() {
    
    return (
      <Logo backgroundImage="../../pages/theme.jpg">
      <div>
        <form>
          <Row> 
            <Col xs={2}>
              <div style={{ textAlign: "center"}}>
                <button className="btn btn-action button" onClick={this.handleFormSubmit}>
                  Add Ride Data
                </button>
              </div>
            </Col>
          </Row>
          <Row> 
            <Col xs={1}>
              <h5 className="textColour">Park</h5>
            </Col>
            <Col xs={1}>
              <h5><input className="textColour2" onChange={this.handleInputChange} value={this.state.parkInid} type="text" id="parkInid" name="parkInid" maxLength="2"/></h5>
            </Col>
            <Col xs={1}>
              <h5 className="textColour">Ride</h5>
            </Col>
            <Col xs={1}>
              <h5><input className="textColour2" onChange={this.handleInputChange} value={this.state.rideInid} type="text" id="rideInid" name="rideInid" maxLength="2"/></h5>
            </Col>
            <Col xs={2}>
              <h5 className="textColour">Ride Name</h5>
            </Col>
            <Col xs={3}>
              <h5><input className="textColour2" onChange={this.handleInputChange} value={this.state.parkRidename} type="text" id="parkRidename" name="parkRidename" maxLength="50" placeholder="Ride Name"/></h5>
            </Col>
          </Row>
          <Row>
            <Col xs={2}>
              <h5 className="textColour">Area of Park</h5>
            </Col>
            <Col xs={2}> 
              <h5 className="textColour">Duration</h5>
            </Col>
            <Col xs={2}>
              <h5 className="textColour">Max height</h5>
            </Col>
            <Col xs={2}>
              <h5 className="textColour">Speed</h5>
            </Col>
            <Col xs={2}>
              <h5 className="textColour">Opened</h5>
            </Col>
            <Col xs={2}>
              <h5 className="textColour">Ride Photo URL</h5>
            </Col>
          </Row>
          <Row>
            <Col xs={2}>
              <h5><input className="textColour2" onChange={this.handleInputChange} value={this.state.parkArea} type="text" id="parkArea" name="parkArea" maxLength="25" placeholder="Area"/></h5>
            </Col>
            <Col xs={2}> 
              <h5><input className="textColour2" onChange={this.handleInputChange} value={this.state.parkDuration} type="text" id="parkDuration" name="parkDuration" maxLength="10" placeholder="Duration"/></h5>
            </Col>
            <Col xs={2}>
              <h5><input className="textColour2" onChange={this.handleInputChange} value={this.state.parkMaxhgt} type="text" id="parkMaxhgt" name="parkMaxhgt" maxLength="20" placeholder="Max height"/></h5>
            </Col>
            <Col xs={2}> 
              <h5><input className="textColour2" onChange={this.handleInputChange} value={this.state.parkSpeed} type="text" id="parkSpeed" name="parkSpeed" maxLength="20" placeholder="Speed"/></h5>
            </Col>
            <Col xs={2}>
              <h5><input className="textColour2" onChange={this.handleInputChange} value={this.state.parkOpened} type="date" id="parkOpened" name="parkOpened" maxLength="15" placeholder="Date Opened"/></h5>
            </Col>
            <Col xs={2}>
              <h5><input className="textColour2" onChange={this.handleInputChange} value={this.state.parkUrl} type="text" id="parkUrl" name="parkUrl" maxLength="75" placeholder="Photo URL"/></h5>
            </Col>
          </Row>
          <Row>
            <Col xs={2}> 
              <h5 className="textColour">Level</h5>
            </Col>
            <Col xs={2}>
              <h5 className="textColour">Ride Length</h5>
            </Col>
            <Col xs={2}> 
              <h5 className="textColour">Ride Type</h5>
            </Col>
            <Col xs={2}>
              <h5 className="textColour">Height restriction</h5>
            </Col>
          </Row>
          <Row>
            <Col xs={2}>
              <h5><input className="textColour2" onChange={this.handleInputChange} value={this.state.parkLevel} type="text" id="parkLevel" name="parkLevel" maxLength="10" placeholder="Level"/></h5>
            </Col>
            <Col xs={2}>
              <h5><input className="textColour2" onChange={this.handleInputChange} value={this.state.parkLength} type="text" id="parkLength" name="parkLength" maxLength="25" placeholder="Length"/></h5>
            </Col>
            <Col xs={2}>
              <h5><input className="textColour2" onChange={this.handleInputChange} value={this.state.parkType} type="text" id="parkType" name="parkType" maxLength="25" placeholder="Type"/></h5>
            </Col>
            <Col xs={3}>
              <h5><input className="textColour2" onChange={this.handleInputChange} value={this.state.parkHgtreq} type="text" id="parkHgtreq" name="parkHgtreq" maxLength="25" placeholder="Height Req."/></h5>
            </Col>
          </Row>
        </form>
      </div>
     </Logo>
    )
  }
}