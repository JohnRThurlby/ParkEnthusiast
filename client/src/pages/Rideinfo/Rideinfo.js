import React, { Component } from "react"

import Logo from "../../components/Logo";

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import API from "../../utils/API";

import { Row, Col } from 'react-bootstrap'

let ridercomments = []
let parkRidename  = " "
let parkArea      = " "
let parkHgtreq    = " "
let parkDuration  = " " 
let parkMaxhgt    = " "
let parkOpened    = " "
let parkAvgwait   = " "
let parkSpeed     = " "
let parkLevel     = " "
let parkLength    = " "
let parkType      = " "
let parkUrl       = " "


export default class Rideinfo extends Component {
  
  state = { 
    park: {},
    comments: {}
  }

  componentDidMount() {

    this.getRides();
    this.getComments();

  }

  getRides = () => {
    API.getRides( {parkid: 75, rideid: 8 }

    //  {parkid: this.state.parkid, rideid: this.state.rideid }
    )

      .then(res => {
        console.log("in get ride return")
        console.log(res.data)
        this.setState({ park: res.data });
        parkRidename = res.data[0].parkridename 
        parkArea     = res.data[0].parkarea
        parkHgtreq   = res.data[0].parkhgtreq
        parkDuration = res.data[0].parkduration
        parkMaxhgt   = res.data[0].parkmaxhgt
        parkOpened   = res.data[0].parkopened
        parkAvgwait  = res.data[0].parkavgwait
        parkSpeed    = res.data[0].parkspeed
        parkLevel    = res.data[0].parklevel 
        parkLength   = res.data[0].parklength
        parkType     = res.data[0].parktype 
        parkUrl      = res.data[0].parkurl
      })
      
      .catch(err => console.log(err))
  };

  getComments = () => {
    API.getComments()
      .then(res => {
        console.log("in get comments return")
        console.log(res.data)
        this.setState({ comments: res.data });
        for (let i = 0; i < res.data.length; i++){
          ridercomments[i] = res.data[i].comment 
        }
      })
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
        <Tabs >
          <TabList>
            
              <Tab><h5 style={{color: "black"}}>Ride Information</h5></Tab>
             
              <Tab><h5 style={{color: "black"}}>Ride Analysis</h5></Tab>

              <Tab><h5 style={{color: "black"}}>Rider's Comments</h5></Tab>
              
          </TabList>
 
          <TabPanel>
            <Row> 
              <Col xs={10}>
                <h4 style={{ textAlign: "center", color: "white" }}>{parkRidename}</h4>
              </Col>
            </Row>
            <Row>
              <Col xs={2}></Col>
              <Col xs={2}>
                <h5 className="textColour">Area of Park</h5>
              </Col>
              <Col xs={3}>
                <h5 className="textColour">Height Requirements</h5>
              </Col>
              <Col xs={3}> 
                <h5 className="textColour">Duration</h5>
              </Col>
              <Col xs={2}>
                <h5 className="textColour">Max height</h5>
              </Col>
            </Row>
            <Row>
              <Col xs={2}></Col>
              <Col xs={2}>
                <p className="textColour">{parkArea}</p>
              </Col>
              <Col xs={3}>
                <p className="textColour">{parkHgtreq}</p>
              </Col>
              <Col xs={3}> 
                <p className="textColour">{parkDuration}</p>
              </Col>
              <Col xs={2}>
                <p className="textColour">{parkMaxhgt}</p>
              </Col>
            </Row>
            <Row>
              <Col xs={2}></Col>
              <Col xs={2}>
                <h5 className="textColour">Opened</h5>
              </Col>
              <Col xs={3}> 
                <h5 className="textColour">Average wait</h5>
              </Col>
              <Col xs={3}>
                <h5 className="textColour">Speed</h5>
              </Col>
              <Col xs={2}> 
                <h5 className="textColour">Level</h5>
              </Col>
            </Row>
            <Row>
              <Col xs={2}></Col>
              <Col xs={2}>
                <p className="textColour">{parkOpened}</p>
              </Col>
              <Col xs={3}>
                <p className="textColour">{parkAvgwait}</p>
              </Col>
              <Col xs={3}> 
                <p className="textColour">{parkSpeed}</p>
              </Col>
              <Col xs={2}>
                <p className="textColour">{parkLevel}</p>
              </Col>
            </Row>
            
            
            <Row>
              <Col xs={2}></Col>
              <Col xs={2}>
                <h5 className="textColour">Length</h5>
              </Col>
              <Col xs={3}> 
                <h5 className="textColour">Type</h5>
              </Col>
            </Row>
            <Row>
              <Col xs={2}></Col>
              <Col xs={2}>
                <p className="textColour">{parkLength}</p>
              </Col>
              <Col xs={3}>
                <p className="textColour">{parkType}</p>
              </Col>
            </Row>
          </TabPanel>
          <TabPanel>
            <Row>
              <Col xs={2}></Col>
              <Col xs={3}> 
                <h5 style={{color: "white"}}>Average User Wait Time</h5>
              </Col>
              <Col xs={3}>
                <h5 style={{color: "white"}}>Average user rating</h5>
              </Col>
            </Row>
            <Row>
              <Col xs={2}></Col>
              <Col xs={3}> 
                <p>{parkArea}</p>
              </Col>
              <Col xs={3}>
                <p>{parkArea}</p>
              </Col>
            </Row>
            <Row>
              <Col xs={2}></Col>
              <Col xs={3}> 
                <h5 style={{color: "white"}}>Times ridden by all users</h5>
              </Col>
              <Col xs={3}>
                <h5 style={{color: "white"}}>Number of repeat riders</h5>
              </Col>
            </Row>
            <Row>
              <Col xs={2}></Col>
              <Col xs={3}> 
                <p>{parkArea}</p>
              </Col>
              <Col xs={3}>
                <p>{parkArea}</p>
              </Col>
            </Row>
            <Row>
              <Col xs={2}></Col>
              <Col xs={3}>
                  <h5 style={{color: "white"}}>Shortest known wait</h5>
              </Col>
              <Col xs={3}>
                 <h5 style={{color: "white"}}>Longest known wait</h5>
              </Col>
            </Row>
            <Row>
              <Col xs={2}></Col>
              <Col xs={3}>
                 <h5 style={{color: "white"}}>Longest known wait</h5>
              </Col>
              <Col xs={3}>
                 <h5 style={{color: "white"}}>Date of longest wait</h5>
              </Col>
            </Row>
            <Row>
              <Col xs={2}></Col>
              <Col xs={3}> 
                <p>{parkArea}</p>
              </Col>
              <Col xs={3}>
                <p>{parkArea}</p>
              </Col>
            </Row>
            <Row>
              <Col xs={2}></Col>
              <Col xs={3}>
                  <h5 style={{color: "white"}}>Shortest known wait</h5>
              </Col>
              <Col xs={3}>
                 <h5 style={{color: "white"}}>Date of shortest wait</h5>
              </Col>
            </Row>
            <Row>
              <Col xs={2}></Col>
              <Col xs={3}> 
                <p>{parkArea}</p>
              </Col>
              <Col xs={3}>
                <p>{parkArea}</p>
              </Col>
            </Row>
          </TabPanel>
          <TabPanel>
            <Row>
              <Col xs={2}></Col>
              <Col xs={3}> 
                <h5 style={{color: "white"}}>Comments</h5>
              </Col>
              <Col xs={2}></Col>
              <Col xs={3}>
                 <h5 style={{color: "white"}}>Ride Photo</h5>
              </Col>
            </Row>
            <Row>
              <Col xs={2}></Col>
              <Col xs={3}> 
                <p style={{color: "white"}}>{ridercomments}</p>
              </Col>
              <Col xs={2}></Col>
              <Col xs={3}>
                 <h5 style={{color: "white"}}>{parkUrl}</h5>
              </Col>
            </Row>
          </TabPanel>
        </Tabs>
      </div>
      </Logo>

    )
  }
}