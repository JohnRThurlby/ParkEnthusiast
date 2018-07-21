import React, { Component} from "react";

import API from "../../utils/API";
import { Row, Col } from 'react-bootstrap'

import ModalConductor from "../../components/ModalConductor";

import Frame from 'react-frame-component';

import Logo from "../../components/Logo";

import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

var zipcodes = require('zipcodes');

let userLat = " "
let userLon = " "
let userState = " "

let markerLen = " "
let googlemarkerData = " "
let parkslist = []
let defaultParks = "Select from list"
let selectValue = false

export default class Parkselection extends Component {

  state = { 
    selectValue: false,
    modalStatus: false,
    modalType: ""
  }

  _handleModal = (status, type) => {
    this.setState ({modalStatus: status, modalType: type})
  }

  componentDidMount() {

    let userzipStor = localStorage.getItem('zipcode');

    let userZip = zipcodes.lookup(userzipStor)

    console.log("userZip " + userZip)
    userLat = parseFloat(userZip.latitude)
    userLon = parseFloat(userZip.longitude)
    userState = userZip.state

    
    this.setState({userLat: userLat, userLon: userLon})
    this.loadParks();
  }

  loadParks = () => {
    API.getParks(
      {state: userState}
    )

      .then(res => {
        console.log(res.data)
        for (let i = 0; i < res.data.length; i++)
         {
            markerLen += "&markers=color:red|label:" + res.data[i].parkname + "|" + res.data[i].parklat + ",-" + res.data[i].parklon
            parkslist[i] = res.data[i].parkname
          };

         console.log("marker " + markerLen)
         googlemarkerData = "https://maps.googleapis.com/maps/embed?center=userLat,userLon&zoom=9&size=600x650&maptype=roadmap" + markerLen +
         "&key=AIzaSyAyfaMye_A67QxILzhCbsGEm4RFWBlYZmg"
         console.log("google " + googlemarkerData)
      })
      .catch(err => console.log(err))
  };

  _onSelect = (selectValue) => {
    console.log("in onselect")
    console.log(selectValue)
    if (selectValue) {
      console.log("default " + parkslist)
     // window.location="/rideselection"
    }};

  render() {

    return (
      <div>
        <Logo backgroundImage="../../pages/theme.jpg">
          <Row>
            <Col xs={4}>
                <Row>
                  <Col xs={12}>
                    <h5 style={{color: "white" }}>Select a park from the list</h5>
                  </Col>
                </Row>  
                <Row>
                  <Col xs={12}>                                  
                      <Dropdown name="park" options={parkslist} onChange={() => this._handleModal(true, 'RIDESELECTION')} value={defaultParks} />
                  </Col>
                </Row>
            </Col>
            <Col xs={8}>
              <div>
                <Frame height="550" width="650"> 
                  <div>
                  <img src="https://maps.googleapis.com/maps/api/staticmap?center=userLat,userLon&zoom=8&size=600x650&maptype=roadmap&markers=color:red|label:Gatorland|28.354421,-81.398198&markers=color:red|label:Give Kids the World Village|28.2896,-81.4578&markers=color:red|label:Holy Land Experience|28.495450,-81.43410&markers=color:red|label:Old Town (amusement park)|28.3161,-81.515838&markers=color:red|label:Discovery Cove|28.41950,-81.2742&markers=color:red|label:SeaWorld Orlando|28.439,-81.2745&markers=color:red|label:Universal Studios Orlando|28.47259,-81.46656&markers=color:red|label:Islands of Adventure|28.818,-81.2817&markers=color:red|label:Walt Disney World|28.3852,-81.5638&markers=color:red|label:Disney%27s Animal Kingdom|28.58,-81.59&markers=color:red|label:Disney%27s Hollywood Studios|28.57,-81.5561&markers=color:red|label:Epcot|28.71,-81.55&markers=color:red|label:Magic Kingdom|28.507,-81.3452&key=AIzaSyAyfaMye_A67QxILzhCbsGEm4RFWBlYZmg" alt="" />
                  </div>
                </Frame>
              </div>        
            </Col>
          </Row> 
        </Logo>
        <ModalConductor history={this.props.history} handleModal={this._handleModal} status={this.state.modalStatus} type={this.state.modalType}/>
      </div>
    )
  }
}