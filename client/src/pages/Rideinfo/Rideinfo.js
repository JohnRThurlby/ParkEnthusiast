import React, { Component } from "react"
import { Link } from "react-router-dom";

import Logo from "../../components/Logo";

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import API from "../../utils/API";

import { Row, Col } from 'react-bootstrap'

export default class Rideinfo extends Component {
  
  state = { 
    rides: {}
  }

  componentDidMount() {

    this.loadRides();

  }

  loadRides = () => {
    API.getRides(
      {parkid: 59, rideid: 1 }

    //  {parkid: this.state.parkid, rideid: this.state.rideid }
    )

      .then(res =>
        this.setState({ })
      )
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
      
      API.getRides({
        parkid: this.state.parkid,
        rideid: this.state.rideid
       
      })
        .then(<Link to="/parkselection"></Link>)
        .catch(err => console.log(err));
  };
  
  render() {
    return (
      <Logo backgroundImage="../../pages/theme.jpg">

      <div>
        <Tabs >
          <TabList>
            
              <Tab><h5>Ride Information</h5></Tab>
             
              <Tab><h5>Ride Analysis</h5></Tab>

              <Tab><h5>Rider's Comments</h5></Tab>
              
          </TabList>
 
          <TabPanel>
            <Row> 
              <Col xs={10}>
                <h4 style={{ textAlign: "center" }}>{this.state.rides.parkridename}</h4>
              </Col>
            </Row>
            <Row>
              <Col xs={2}></Col>
              <Col xs={2}>
                <h5>Area of Park</h5>
              </Col>
              <Col xs={3}>
                <h5>Height Requirements</h5>
              </Col>
              <Col xs={3}> 
                <h5>Duration</h5>
              </Col>
            </Row>
            <Row>
              <Col xs={2}></Col>
              <Col xs={2}>
                <p>{this.state.rides.parkarea}</p>
              </Col>
              <Col xs={3}>
                <p>{this.state.rides.parkhgtreq}</p>
              </Col>
              <Col xs={3}> 
                <p>{this.state.rides.parkduration}</p>
              </Col>
            </Row>
            <Row>
              <Col xs={2}></Col>
              <Col xs={2}>
                <h5>Max height</h5>
              </Col>
              <Col xs={3}> 
                <h5>Wait Time</h5>
              </Col>
              <Col xs={3}>
                <h5>Average wait</h5>
              </Col>
            </Row>
            <Row>
              <Col xs={2}></Col>
              <Col xs={2}>
                <p>{this.state.rides.parkmaxhgt}</p>
              </Col>
              <Col xs={3}> 
                <p>{this.state.rides.parkwaittime}</p>
              </Col>
              <Col xs={3}>
                <p>{this.state.rides.parkavgwait}</p>
              </Col>
            </Row>
            <Row>
              <Col xs={2}></Col>
              <Col xs={2}> 
                <h5>Opened</h5>
              </Col>
              <Col xs={3}>
                <h5>Speed</h5>
              </Col>
              <Col xs={3}> 
                <h5>Level</h5>
              </Col>
            </Row>
            <Row>
              <Col xs={2}></Col>
              <Col xs={2}> 
                <p>{this.state.rides.parkopened}</p>
              </Col>
              <Col xs={3}>
                <p>{this.state.rides.parkspeed}</p>
              </Col>
              <Col xs={3}> 
                <p>{this.state.rides.parklevel}</p>
              </Col>
            </Row>
            <Row>
              <Col xs={2}></Col>
              <Col xs={2}>
                <h5>Length</h5>
              </Col>
              <Col xs={3}> 
                <h5>Type</h5>
              </Col>
            </Row>
            <Row>
              <Col xs={2}></Col>
              <Col xs={2}>
                <p>{this.state.rides.parklength}</p>
              </Col>
              <Col xs={3}>
                <p>{this.state.rides.parktype}</p>
              </Col>
            </Row>
          </TabPanel>
          <TabPanel>
            <Row>
              <Col xs={2}></Col>
              <Col xs={3}> 
                <h5>Average User Wait Time</h5>
              </Col>
              <Col xs={3}>
                <h5>Average user rating</h5>
              </Col>
            </Row>
            <Row>
              <Col xs={2}></Col>
              <Col xs={3}> 
                <p>{this.state.rides.avguserwaittime}</p>
              </Col>
              <Col xs={3}>
                <p>{this.state.rides.avguserrating}</p>
              </Col>
            </Row>
            <Row>
              <Col xs={2}></Col>
              <Col xs={3}> 
                <h5>Times ridden by all users</h5>
              </Col>
              <Col xs={3}>
                <h5>Number of repeat riders</h5>
              </Col>
            </Row>
            <Row>
              <Col xs={2}></Col>
              <Col xs={3}> 
                <p>{this.state.rides.totalriders}</p>
              </Col>
              <Col xs={3}>
                <p>{this.state.rides.repeatriders}</p>
              </Col>
            </Row>
            <Row>
              <Col xs={2}></Col>
              <Col xs={3}>
                  <h5>Shortest known wait</h5>
              </Col>
              <Col xs={3}>
                 <h5>Longest known wait</h5>
              </Col>
            </Row>
            <Row>
              <Col xs={2}></Col>
              <Col xs={3}>
                  <h5>Longest known wait</h5>
              </Col>
              <Col xs={3}>
                 <h5>Date of longest wait</h5>
              </Col>
            </Row>
            <Row>
              <Col xs={2}></Col>
              <Col xs={3}> 
                <p>{this.state.rides.longestwait}</p>
              </Col>
              <Col xs={3}>
                <p>{this.state.rides.datelongest}</p>
              </Col>
            </Row>
            <Row>
              <Col xs={2}></Col>
              <Col xs={3}>
                  <h5>Shortest known wait</h5>
              </Col>
              <Col xs={3}>
                 <h5>Date of shortest wait</h5>
              </Col>
            </Row>
            <Row>
              <Col xs={2}></Col>
              <Col xs={3}> 
                <p>{this.state.rides.shortestwait}</p>
              </Col>
              <Col xs={3}>
                <p>{this.state.rides.dateshortest}</p>
              </Col>
            </Row>
          </TabPanel>
          <TabPanel>
            <Row>
              <Col xs={2}></Col>
              <Col xs={3}> 
                <h5>Comments</h5>
              </Col>
            </Row>
            <Row>
              <Col xs={2}></Col>
              <Col xs={3}> 
                <p>{this.state.rides.comments}</p>
              </Col>
            </Row>
          </TabPanel>
        </Tabs>
      </div>
      </Logo>

    )
  }
}