import React, { Component } from "react"

import Logo from "../../components/Logo";

import API from "../../utils/API";

import { Row, Col } from 'react-bootstrap'

let parkIn        = 0
let parkInid      = " "
let parkName      = " " 
let parkPhone     = " " 
let parkAddress1  = " "
let parkCity      = " "
let parkState     = " "
let parkZip       = " "
let parkPic       = " "
let parkUrl       = " "
let parkLat       = " " 
let parkLon       = " "

export default class Parkadmin extends Component {
  constructor(){
    super();
    this.state = {
      parkInid:     " ",
      parkIn:       0,
      parkName:     " ", 
      parkPhone:    " ", 
      parkAddress1: " ",
      parkCity:     " ",
      parkState:    " ",
      parkZip:      " ",
      parkPic:      " ",
      parkUrl:      " ",
      parkLat:      " ", 
      parkLon:      " "
    }  
  }

  state = { 
  }

  handleFormSubmit = event => {
    event.preventDefault();
    API.updatePark({
       parkid:       parkIn,
       parkname:     this.state.parkName,
       parkphone:    this.state.parkPhone, 
       parkaddress1: this.state.parkAddress1,
       parkcity:     this.state.parkCity,
       parkstate:    this.state.parkState,
       parkzip:      this.state.parkZip,
       parkurl:      this.state.parkUrl,
       parklat:      this.state.parkLat, 
       parklon:      this.state.parkLon,
       parkpic:      this.state.parkPic
      })
        .then()
        .catch(err => console.log(err))
  };
  
  getPark = () => {

    API.getPark({id: parkIn})
      .then(res => {
          this.setState({ park: res.data });
          parkName      = res.data.parkname 
          parkPhone     = res.data.parkphone 
          parkAddress1  = res.data.parkaddress1
          parkCity      = res.data.parkcity
          parkState     = res.data.parkstate
          parkZip       = res.data.parkzip
          parkPic       = res.data.parkpic
          parkUrl       = res.data.parkurl
          parkLat       = res.data.parklat 
          parkLon       = res.data.parklon
        }) 
      .catch(err => console.log(err))
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    if (name === "parkInid") {
      if (value.length === 2)
       {parkIn = parseInt(value, 10)
        console.log("parkIn " + parkIn)
        this.getPark()
      }}
      console.log("value "  + value )
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
                  Update Park Data
                </button>
              </div>
            </Col>
          </Row>
          <Row> 
            <Col xs={1}>
              <h5><input className="textColour2" onChange={this.handleInputChange} value={this.state.parkInid} type="text" id="parkInid" name="parkInid" maxLength="2"/></h5>
            </Col>
            <Col xs={2}>
              <h5 className="textColour">Park Name</h5>
            </Col>
            <Col xs={3}>
              <h5><input className="textColour2" onChange={this.handleInputChange} value={parkName} type="text" id="parkName" name="parkName" maxLength="50"/></h5>
            </Col>
          </Row>
          <Row>
          <Col xs={2}>
              <h5 className="textColour">Phone</h5>
            </Col>
            <Col xs={2}>
              <h5 className="textColour">Address</h5>
            </Col>
            <Col xs={2}> 
              <h5 className="textColour">City</h5>
            </Col>
            <Col xs={2}>
              <h5 className="textColour">State</h5>
            </Col>
            <Col xs={2}>
              <h5 className="textColour">Zip</h5>
            </Col>
            <Col xs={2}>
              <h5 className="textColour">URL</h5>
            </Col>
          </Row>
          <Row>
            <Col xs={2}>
              <h5><input className="textColour2" onChange={this.handleInputChange} value={this.state.parkPhone} type="text" id="parkPhone" name="parkPhone" maxLength="25" placeholder="Phone"/></h5>
            </Col>
            <Col xs={2}> 
              <h5><input className="textColour2" onChange={this.handleInputChange} value={this.state.parkAddress1} type="text" id="parkAddress1" name="parkAddress1" maxLength="50" placeholder="Address1"/></h5>
            </Col>
            <Col xs={2}>
              <h5><input className="textColour2" onChange={this.handleInputChange} value={this.state.parkCity} type="text" id="parkCity" name="parkCity" maxLength="40" placeholder="City"/></h5>
            </Col>
            <Col xs={2}> 
              <h5><input className="textColour2" onChange={this.handleInputChange} value={this.state.parkState} type="text" id="parkState" name="parkState" maxLength="2" placeholder="State"/></h5>
            </Col>
            <Col xs={2}>
              <h5><input className="textColour2" onChange={this.handleInputChange} value={this.state.parkZip} type="text" id="parkZip" name="parkZip" maxLength="10" placeholder="Zip"/></h5>
            </Col>
            <Col xs={2}>
              <h5><input className="textColour2" onChange={this.handleInputChange} value={this.state.parkUrl} type="text" id="parkUrl" name="parkUrl" maxLength="75" placeholder="URL"/></h5>
            </Col>
          </Row>
          <Row>
            <Col xs={2}> 
              <h5 className="textColour">Latitude</h5>
            </Col>
            <Col xs={2}>
              <h5 className="textColour">Longitude</h5>
            </Col>
            <Col xs={2}> 
              <h5 className="textColour">Park Pic URL</h5>
            </Col>
          </Row>
          <Row>
            <Col xs={2}>
              <h5><input className="textColour2" onChange={this.handleInputChange} value={this.state.parkLat} type="text" id="parkLat" name="parkLat" maxLength="10" placeholder="Latitude"/></h5>
            </Col>
            <Col xs={2}>
              <h5><input className="textColour2" onChange={this.handleInputChange} value={this.state.parkLon} type="text" id="parkLon" name="parkLon" maxLength="10" placeholder="Longitude"/></h5>
            </Col>
            <Col xs={2}>
              <h5><input className="textColour2" onChange={this.handleInputChange} value={this.state.parkPic} type="text" id="parkPic" name="parkPic" maxLength="75" placeholder="Pic URL"/></h5>
            </Col>
            
          </Row>
        </form>
      </div>
     </Logo>
    )
  }
}