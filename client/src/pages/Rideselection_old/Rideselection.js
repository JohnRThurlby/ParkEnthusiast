import React, { Component } from "react"
import { Link } from "react-router-dom";

import API from "../../utils/API";

import { Row, Col } from 'react-bootstrap'


import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import Logo from "../../components/Logo";

import ReactGoogleMapLoader from "react-google-maps-loader"
import ReactGoogleMap from "react-google-map"


let parkhours = []
let defaultHours = "Select from list"
let parkprices = []
let defaultPrices = "Select from list"
let userLat = 0
let userLon = 0

export default class Rideselection extends Component {
  
  state = { 
    park: {}
  }

  componentDidMount() {

    this.getPark()

    this.getHours()

    this.getTickets()

  }

  getPark = () => {
    API.getPark({id: 59})

      .then(res => {
          this.setState({ park: res.data });
          userLat = parseFloat(this.state.park.parklat)
          userLon = parseFloat(this.state.park.parklon)
        }) 
      .catch(err => console.log(err))
  };

  getHours = () => {
    API.getHours( {parkid: 59}

    )

    .then(res => {
      this.setState({ hours: res.data });
      parkhours[0] = "Monday" + res.data.parkmon
      parkhours[1] = "tuesday " + res.data.parktue
      parkhours[2] = "Wednesday " + res.data.parkwed
      parkhours[3] = "Thursday " + res.data.parkthu
      parkhours[4] = "Friday " + res.data.parkfri
      parkhours[5] = "Saturday " + res.data.parksat
      parkhours[6] = "Sunday " + res.data.parksun

    })
      .catch(err => console.log(err))
  };

  getTickets = () => {
    API.getTickets( {parkid: 61}

    )
    .then(res => {
      console.log(res.data);
      this.setState({ hours: res.data });
      parkprices[0] = res.data.parkline1
      parkprices[1] = res.data.parkline2
            

    })
      .catch(err => console.log(err))
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
      
      API.getPark({
        parkid: this.state.parkid,
       
      })
        .then(<Link to="/parkselection"></Link>)
        .catch(err => console.log(err));
  };
  
  render() {
    return (
      <div>
        <Logo backgroundImage="../../pages/theme.jpg">
          <Row> 
            <Col xs={4}> </Col>
            <Col xs={2}>
              <h3 style={{ textAlign: "center" }}>{this.state.park.parkname}</h3>
            </Col>
          </Row>
          <Row>
            <Col xs={2}></Col>
            <Col xs={2}>
              <h6 style={{color: "white"}}>Address</h6>
            </Col>
            <Col xs={2}>
              <h6>{this.state.park.parkaddress1 + ", " + this.state.park.parkcity + ", " + this.state.park.parkstate + ", " + this.state.park.parkzip}</h6>
            </Col>
            <Col xs={1}></Col>
            <Col xs={2}>
              <h6 style={{color: "white"}}>Phone Number</h6>
            </Col>
            <Col xs={2}>
              <h6>{this.state.park.parkphone}</h6>
            </Col>
          </Row>
          <Row>
            <Col xs={2}></Col>
            <Col xs={2}>
                <h6 style={{color: "white" }}>Park Hours</h6>
            </Col>
            <Col xs={2}>
                <Dropdown options={parkhours} value={defaultHours} />
            </Col>
            <Col xs={1}> </Col>
            <Col xs={2}>
                <h6 style={{color: "white" }}>Ticket Prices</h6>
            </Col>
            <Col xs={2}>
              <Dropdown options={parkprices} value={defaultPrices} />
            </Col>
        </Row>
        <Row>
            <Col xs={4}></Col>
            <Col xs={6}>
              <ReactGoogleMapLoader
                params={{
                    key: "AIzaSyDg-vYzGC3fEWIUt7dhItwHdmq8uCe7yGQ",
                    libraries: "places,geometry",
                }}
                render={googleMaps =>
                    googleMaps && (
                    <div style={{height: "400px", width: "400px"}}>
                      <ReactGoogleMap
                        googleMaps={googleMaps}
                        center={{lat: userLat, lng: -userLon}}
                        zoom={10}
                      />
                   </div>
                  )}
               />
            </Col>
          </Row>
          </Logo>
      </div>
    )
  }
}