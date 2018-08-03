import React, { Component} from "react";
import PropTypes from 'prop-types';

import API from "../../utils/API";
import { Row, Col } from 'react-bootstrap'

import ModalConductor from "../../components/ModalConductor";

import Frame from 'react-frame-component';

import Logo from "../../components/Logo";
import GoogleMapReact from 'google-map-react';
import MyGreatPlace from './my_great_place.jsx';
import shouldPureComponentUpdate from 'react-pure-render/function';

import Select from 'react-select';

var zipcodes = require('zipcodes');

let userLat     = " "
let userLon     = " "
let userState   = " "
let useridStor  = " " 
let userid      = " "

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


function createMapOptions(maps) {
  // next props are exposed at maps
  // "Animation", "ControlPosition", "MapTypeControlStyle", "MapTypeId",
  // "NavigationControlStyle", "ScaleControlStyle", "StrokePosition", "SymbolPath", "ZoomControlStyle",
  // "DirectionsStatus", "DirectionsTravelMode", "DirectionsUnitSystem", "DistanceMatrixStatus",
  // "DistanceMatrixElementStatus", "ElevationStatus", "GeocoderLocationType", "GeocoderStatus", "KmlLayerStatus",
  // "MaxZoomStatus", "StreetViewStatus", "TransitMode", "TransitRoutePreference", "TravelMode", "UnitSystem"
  return {
    zoomControlOptions: {
      position: maps.ControlPosition.RIGHT_CENTER,
      style: maps.ZoomControlStyle.SMALL
    },
    mapTypeControlOptions: {
      position: maps.ControlPosition.TOP_RIGHT
    },
    mapTypeControl: true
  };
}

export default class Parkselection extends Component {

  static propTypes = {
    center: PropTypes.array,
    zoom: PropTypes.number,
    greatPlaceCoords: PropTypes.any
  };

  static defaultProps = {
    center: [28.5383, -81.379],
    zoom: 8,
    greatPlaceCoords:  {lat: 28.646158, lng: -81.267649},
    greatPlaceCoords1: {lat: 28.037962,   lng: -82.421152},
    greatPlaceCoords2: {lat: 29.229979, lng: -81.011157},
    greatPlaceCoords3: {lat: 28.028115,  lng: -82.193234},
    greatPlaceCoords4: {lat: 28.572872,   lng: -80.648981},
    greatPlaceCoords5: {lat: 27.992479, lng: -81.691878},
    greatPlaceCoords6: {lat: 28.517, lng: -82.574388},
    greatPlaceCoords7: {lat: 28.331098, lng: -81.514339},
    greatPlaceCoords8: {lat: 28.467056, lng: -81.455720},
    greatPlaceCoords9: {lat: 28.354421, lng: -81.398198},
    greatPlaceCoords10: {lat: 28.2896, lng: -81.4578},
    greatPlaceCoords11: {lat: 28.495450, lng: -81.43410},
    greatPlaceCoords12: {lat: 28.330139, lng: -81.515959},
    greatPlaceCoords13: {lat: 28.405088, lng: -81.462446},
    greatPlaceCoords14: {lat: 28.411255, lng: -81.461785},
    greatPlaceCoords15: {lat: 28.474322, lng: -81.467821},
    greatPlaceCoords16: {lat: 28.474322, lng: -81.467821},
    greatPlaceCoords17: {lat: 28.3852, lng: -81.5638},
    greatPlaceCoords18: {lat: 28.350824, lng: -81.596787},
    greatPlaceCoords19: {lat: 28.355632, lng: -81.558642},
    greatPlaceCoords20: {lat: 28.3729687, lng: -81.547130},
    greatPlaceCoords21: {lat: 28.403486, lng: -81.584383}

  };

  state = { 
    modalStatus: false,
    modalType: "",
    modalUserid: "",
    userid: "",
    modalParkid: "",
    selectedOption: null
  }

  shouldComponentUpdate = shouldPureComponentUpdate;

  _handleModal = (status, type, userid, parkid) => {
    this.setState ({modalStatus: status, modalType: type, modalUserid: userid, modalParkid: parkid})

  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    this._handleModal(true, 'RIDESELECTION', userid, selectedOption.value) 
  }

  componentDidMount() {

    let userinfo = window.location.search;
    let i = userinfo.indexOf("&")
    useridStor  = userinfo.substr(1, i - 1)
    let userzipStor = userinfo.substr(i + 1, 5)
    let userZip = zipcodes.lookup(userzipStor)

    userLat = parseFloat(userZip.latitude)
    userLon = parseFloat(userZip.longitude)
    userState = userZip.state

    this.setState({modalUserid: useridStor})
    userid = useridStor
    
    this.setState({userLat: userLat, userLon: userLon})
    this.setState({parkstate: userState})
    this.loadParks();
  }

  loadParks = () => {
    API.getParksbyState( 
      {id: userState}
       )
      .then(res => {
        for (let i = 0; i < res.data.length; i++)
          {          
            let optionsObj   = {}
            optionsObj.value = res.data[i].id.toString()
            optionsObj.label = res.data[i].parkname
          };
      })
      .catch(err => console.log(err))
  };

  render() {

    const { selectedOption } = this.state;

    return (
      <div>
        <Logo backgroundImage="../../pages/theme.jpg">
          <Row>
            <Col xs={4}>
                <Row>
                  <Col xs={12}>
                    <h5 className="textColour">Select a park from the list</h5>
                  </Col>
                </Row>  
                <Row>
                  <Col xs={12}> 
                    <div className="fontdrop">
                      <Select
                        value={selectedOption}
                        onChange={this.handleChange}
                        options={options}
                      />
                    </div>                                 
                  </Col>
                </Row>
            </Col>
            <Col xs={8}>
              <Frame height="575" width="900">
                <div style={{ height: '100vh', width: '100%' }}>
                  <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyAyfaMye_A67QxILzhCbsGEm4RFWBlYZmg" }}
                    center={this.props.center}
                    zoom={this.props.zoom}
                    options={createMapOptions}>
                    <MyGreatPlace {...this.props.greatPlaceCoords} text={"Big Kahuna's"}/>
                    <MyGreatPlace {...this.props.greatPlaceCoords1} text={'Busch Gardens Tampa'}/>
                    <MyGreatPlace {...this.props.greatPlaceCoords2} text={'Daytona Lagoon'}/>
                    <MyGreatPlace {...this.props.greatPlaceCoords3} text={'Dinosaur World (theme parks)'}/>
                    <MyGreatPlace {...this.props.greatPlaceCoords4} text={'Kennedy Space Center Visitor Complex'}/>
                    <MyGreatPlace {...this.props.greatPlaceCoords5} text={'Legoland Florida'}/>
                    <MyGreatPlace {...this.props.greatPlaceCoords6} text={'Weeki Wachee Springs'}/>
                    <MyGreatPlace {...this.props.greatPlaceCoords7} text={'Fun Spot America Theme Parks#Kissimmee location'}/>
                    <MyGreatPlace {...this.props.greatPlaceCoords8} text={'Fun Spot America Theme Parks#Orlando location'}/>
                    <MyGreatPlace {...this.props.greatPlaceCoords9} text={'Gatorland'}/>
                    <MyGreatPlace {...this.props.greatPlaceCoords10} text={'Give Kids the World Village'}/>
                    <MyGreatPlace {...this.props.greatPlaceCoords11} text={'Holy Land Experience'}/>
                    <MyGreatPlace {...this.props.greatPlaceCoords12} text={'Old Town (amusement park)'}/>
                    <MyGreatPlace {...this.props.greatPlaceCoords13} text={'Discovery Cove'}/>
                    <MyGreatPlace {...this.props.greatPlaceCoords14} text={'SeaWorld Orlando'}/>
                    <MyGreatPlace {...this.props.greatPlaceCoords15} text={'Universal Studios Orlando'}/>
                    <MyGreatPlace {...this.props.greatPlaceCoords16} text={'Islands of Adventure'}/>
                    <MyGreatPlace {...this.props.greatPlaceCoords17} text={'Walt Disney World'}/>
                    <MyGreatPlace {...this.props.greatPlaceCoords18} text={"Disney's Animal Kingdom"}/>
                    <MyGreatPlace {...this.props.greatPlaceCoords19} text={"Disney's Hollywood Studios"}/>
                    <MyGreatPlace {...this.props.greatPlaceCoords20} text={'Epcot'}/>
                    <MyGreatPlace {...this.props.greatPlaceCoords21} text={'Magic Kingdom'}/>

                  </GoogleMapReact>
                </div> 
              </Frame>
            </Col>
          </Row> 
        </Logo>
        <ModalConductor history={this.props.history} handleModal={this._handleModal} status={this.state.modalStatus} type={this.state.modalType} userid={this.state.modalUserid} parkid={this.state.modalParkid}/>
      </div>
    )
  }
}