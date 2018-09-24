import React, { Component} from "react";

import { Row, Col } from 'react-bootstrap'

import Logo from "../../components/Logo";

import GoogleMapReact from 'google-map-react';

import API from "../../utils/API";

import Parks from "./Parks";
import {options2} from "./Parks";

import Parklatlon from "./Parklatlon";

import Select from 'react-select'

import zipcodes from 'zipcodes'

let userLat     = " "
let userLon     = " "
let userState   = " "
let useridStor  = " " 
let userid      = " "

let parkPic     = "https://nearfox.com/wp-content/uploads/2016/11/imageferris_wheel_20160301065106331548.jpg" 

let options      = [{value: "59", label: "Big Kahuna's"},
      {value: "60", label: "Busch Gardens Tampa"},
      {value: "61", label: "Daytona Lagoon"},
      {value: "62", label: "Dinosaur World (theme parks)"},
      {value: "63", label: "Kennedy Space Center Visitor Complex"},
      {value: "64", label: "Legoland Florida"},
      {value: "65", label: "Weeki Wachee Springs"},
      {value: "66", label: "Fun Spot America Theme Parks#Kissimmee location"},
      {value: "67", label: "Fun Spot America Theme Parks#Orlando location"},
      {value: "68", label: "Gatorland"},
      {value: "69", label: "Give Kids the World Village"},
      {value: "70", label: "Holy Land Experience"},
      {value: "71", label: "Old Town (amusement park)"},
      {value: "73", label: "Discovery Cove"},
      {value: "74", label: "SeaWorld Orlando"},
      {value: "75", label: "Universal Studios Orlando"},
      {value: "77", label: "Islands of Adventure"},
      {value: "78", label: "Walt Disney World"},
      {value: "79", label: "Disney's Animal Kingdom"},
      {value: "80", label: "Disney's Hollywood Studios"},
      {value: "81", label: "Epcot"},
      {value: "82", label: "Magic Kingdom"}]

      const AnyReactComponent = ({ text }) => <div>{text}</div>;

      function logChange(val) {
        console.log("Selected: " + JSON.stringify(val));
        window.location="/rideselection?" + userid + "&" + val.value  

      }

export default class Parkselection extends Component {

  componentWillMount() {

    let userinfo = window.location.search;
    let i = userinfo.indexOf("&")
    useridStor  = userinfo.substr(1, i - 1)
    let userzipStor = userinfo.substr(i + 1, 5)
    let userZip = zipcodes.lookup(userzipStor)
    userState = userZip.state

    userLat = "lat: " + parseFloat(userZip.latitude)
    userLon = "lng: " + parseFloat(userZip.longitude)

    userid = useridStor
    
    this.setState({userLat: userLat, userLon: userLon})
    this.setState({parkstate: userState})
  }

  static defaultProps = {
    center: {lat: 28.331098, lng: -81.514339},
    zoom: 7,
    
    greatPlace:  [{lat: 28.646158, lng: -81.267649, text: "Big Kahuna's"},
                  {lat: 28.037962,   lng: -82.421152, text: 'Busch Gardens Tampa'},
                  {lat: 29.229979, lng: -81.011157, text: 'Daytona Lagoon'},
                  {lat: 28.028115,  lng: -82.193234, text: 'Dinosaur World (theme parks)'},
                  {lat: 28.572872,   lng: -80.648981, text: 'Kennedy Space Center Visitor Complex'},
                  {lat: 27.992479, lng: -81.691878, text: 'Legoland Florida'},
                  {lat: 28.517, lng: -82.574388, text: 'Weeki Wachee Springs' },
                  {lat: 28.331098, lng: -81.514339, text: 'Fun Spot America Theme Parks#Kissimmee location'},
                  {lat: 28.467056, lng: -81.455720, text: 'Fun Spot America Theme Parks#Orlando location'},
                  {lat: 28.354421, lng: -81.398198, text: 'Gatorland'},
                  {lat: 28.2896, lng: -81.4578, text: 'Give Kids the World Village'},
                  {lat: 28.495450, lng: -81.43410, text: 'Holy Land Experience'},
                  {lat: 28.330139, lng: -81.515959, text: 'Old Town (amusement park)'},
                  {lat: 28.405088, lng: -81.462446, text: 'Discovery Cove'},
                  {lat: 28.411255, lng: -81.461785, text: 'SeaWorld Orlando'},
                  {lat: 28.474322, lng: -81.467821, text: 'Universal Studios Orlando'},
                  {lat: 28.474322, lng: -81.467821, text: 'Islands of Adventure'},
                  {lat: 28.3852, lng: -81.5638, text: 'Walt Disney World'},
                  {lat: 28.350824, lng: -81.596787, text: "Disney's Animal Kingdom"},
                  {lat: 28.355632, lng: -81.558642, text: "Disney's Hollywood Studios"},
                  {lat: 28.3729687, lng: -81.547130, text: 'Epcot'},
                  {lat: 28.403486, lng: -81.584383, text: 'Magic Kingdom'}]

  };
    
  state = { 
    userid: "",
    modalParkid: "",
    selectedOption: null
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    window.location="/rideselection?" + userid + "&" + selectedOption.value  
 }
  
  render() {

    const { selectedOption } = this.state;
    
    return (
      <div>
        <Logo backgroundImage={parkPic}>
          <Row>
            <Col xs={12}>
              <h5 style={{ textAlign: "center" }} className="textColour">Select a park from the list</h5>
            </Col>
          </Row>  
          <Row>
            <Col xs={1}></Col>

            <Col xs={3}> 
              <Parks userState={userState} />
              <div className="fontdrop">
                <Select
                  name="form-field-name"
                  options={options}
                  onChange={logChange}
                />
              </div> 
            </Col>
            <Col xs={1}></Col>
            <Col xs={6}>
              <div style={{ height: '60vh', width: '50vw' }}>
                <GoogleMapReact
                  bootstrapURLKeys={{ key: "AIzaSyAyfaMye_A67QxILzhCbsGEm4RFWBlYZmg" }}
                  defaultCenter={this.props.center}
                  defaultZoom={this.props.zoom}
                >
                  <AnyReactComponent
                    lat={28.475210}
                    lng={-81.474930}
                    text={'Universal Studios Orlando'}
                  />
                  <AnyReactComponent
                    lat={28.421700}
                    lng={-81.581260}
                    text={'Magic Kingdom'}
                  />
                </GoogleMapReact>
              </div>
            </Col>
          </Row> 
        </Logo>
      </div>
    )
  }
}