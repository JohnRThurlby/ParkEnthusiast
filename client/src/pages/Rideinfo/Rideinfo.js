import React, { Component } from "react"

import Logo from "../../components/Logo";

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import API from "../../utils/API";

import { Row, Col } from 'react-bootstrap'

import ReactChartkick, { ColumnChart } from 'react-chartkick'
import Chart from 'chart.js'

var moment = require('moment');
moment().format();

ReactChartkick.addAdapter(Chart)


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
let longWait      = "0"
let longWaitdate  = " "
let shortWait     = "9999"
let shortWaitdate = " "  
let avgWait       = "0" 
let waitShort     = " "
let avgRating     = " "
let totalCount    = 0
let dupCount      = 0
let avgCount      = 0
let count         = 0
//let oneRate       = 0
//let twoRate       = 0
//let threeRate     = 0
//let fourRate      = 0
//let fiveRate      = 0

let ratings=[]
let waittimes=[]


export default class Rideinfo extends Component {
  
  state = { 
    park:          {},
    comments:      {},
    waittimes:     {},
    totalcount:    " ",
    dupcount:      " ",
    longWait:      " ",
    shortWait:     " ",
    avgrating:     " ",
    longWaitdate:  " ",
    shortWaitdate: " ", 
    waitShort:     " "
    //avgWait:       " " 
    //oneRate:       " ",
    //twoRate:       " ",
    //threeRate:     " ",
    //fourRate:      " ",
    //fiveRate:      " "
  }

  componentDidMount() {

    this.getRides();

  }

  getRides = () => {
    API.getRides( {parkid: 75, rideid: 10 }

    //  {parkid: this.state.parkid, rideid: this.state.rideid }
    )

      .then(res => {
        console.log("in get ride return")
        console.log(res.data)
        this.setState({ park: res.data });
        parkRidename = res.data.parkridename 
        parkArea     = res.data.parkarea
        parkHgtreq   = res.data.parkhgtreq
        parkDuration = res.data.parkduration
        parkMaxhgt   = res.data.parkmaxhgt
        parkOpened   = res.data.parkopened
        parkAvgwait  = res.data.parkavgwait
        parkSpeed    = res.data.parkspeed
        parkLevel    = res.data.parklevel 
        parkLength   = res.data.parklength
        parkType     = res.data.parktype 
        parkUrl      = res.data.rideurl
        this.getComments();
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
        this.getRideanalysis()
      })
      .catch(err => console.log(err))
  };
  
  getRideanalysis = () => {
    API.gettotalCount()
      .then(res => {
        console.log("in get total count")
        console.log(res.data)
        this.setState({ totalcount: res.data });
        totalCount = res.data;
        console.log("total count" + totalCount)
        this.getDupcount()
      })
      .catch(err => console.log(err))
  };

  getDupcount = () => {
    API.getdupCount()
      .then(res => {
        console.log("in get dup count")
        console.log(res.data)
        this.setState({ dupcount: res.data });
        dupCount = res.data;
        console.log("dup count " + dupCount)
        this.getUserdata()
      })
      .catch(err => console.log(err))
  };

  getUserdata = () => {
    API.getUserdata()
      .then(res => {
        console.log("in get user data")
        console.log(res.data)
        this.setState({ waittimes: res.data});
        count = res.data.length
        for (let i = 0; i < res.data.length; i++){
          if (longWait < res.data[i].waittime)
          {
            longWait      = res.data[i].waittime
            longWaitdate  = moment(res.data[i].daterode, "YYYY-MM-DD")
          }
          if (shortWait > res.data[i].waittime)
          {
            shortWait      = res.data[i].waittime 
            shortWaitdate  = res.data[i].daterode
          }
          avgCount += res.data[i].waittime 
        }
        avgWait = avgCount / count
        waitShort = "25"
        console.log(waitShort)

        waittimes=[[shortWaitdate, shortWait], ["Average", waitShort], [longWaitdate, longWait]]
        console.log("waittimes array " + waittimes)
        ratings=[["1", 0], ["2", 1], ["3", 2], ["4", 3], ["5", 4]]


      })
      .catch(err => console.log(err))
  };
  
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  _onRideSelect = event => {
    event.preventDefault();
    window.location="/ridenow"
  };
  
  render() {
    return (
      <Logo backgroundImage="../../pages/theme.jpg">

      <div>
        <Tabs >
            <TabList>
                <Col xs={3}></Col>
                <Tab><h5 style={{color: "black"}}>Ride Information..  </h5></Tab>
                <Tab><h5 style={{color: "black"}}>Ride Analysis..  </h5></Tab>
                <Tab><h5 style={{color: "black"}}>Rider's Comments..</h5></Tab>
            </TabList>
          <TabPanel>
            <Row> 
              <Col xs={12}>
                <h4 style={{ textAlign: "center", color: "yellow" }}>{parkRidename}</h4>
              </Col>
            </Row>
            <Row>
              <Col xs={8}>
                <Row>
                  <Col xs={2}></Col>
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
                </Row>
                <Row>
                  <Col xs={2}></Col>
                  <Col xs={2}>
                    <h6 className="textColour2">{parkArea}</h6>
                  </Col>
                  <Col xs={2}> 
                    <h6 className="textColour2">{parkDuration}</h6>
                  </Col>
                  <Col xs={2}>
                    <h6 className="textColour2">{parkMaxhgt}</h6>
                  </Col>
                  <Col xs={2}> 
                    <h6 className="textColour2">{parkSpeed}</h6>
                  </Col>
                  <Col xs={2}>
                    <h6 className="textColour2">{parkOpened}</h6>
                  </Col>
                </Row>
                <Row>
                  <Col xs={2}></Col>
                  <Col xs={2}> 
                    <h5 className="textColour">Level</h5>
                  </Col>
                  <Col xs={2}>
                    <h5 className="textColour">Length</h5>
                  </Col>
                  <Col xs={2}> 
                    <h5 className="textColour">Type</h5>
                  </Col>
                  <Col xs={2}>
                    <h5 className="textColour">Height restriction</h5>
                  </Col>
                </Row>
                <Row>
                  <Col xs={2}></Col>
                  <Col xs={2}>
                    <h6 className="textColour2">{parkLevel}</h6>
                  </Col>
                  <Col xs={2}>
                    <h6 className="textColour2">{parkLength}</h6>
                  </Col>
                  <Col xs={2}>
                    <h6 className="textColour2">{parkType}</h6>
                  </Col>
                  <Col xs={3}>
                    <h6 className="textColour2">{parkHgtreq}</h6>
                  </Col>
                </Row>
              </Col>
              <Col xs={4}>
                <Row>
                  <Col xs={12}>
                    <h5 className="textColour">Ride Photo</h5>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12}>
                    <h5><img src={parkUrl} alt="" width="200" height="200"/></h5>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col xs={5}></Col>
              <Col xs={4}>
                <button className="btn btn-action button"
                  onClick={this.onRideSelect}
                  >
                    Select this ride?
                </button>
              </Col>
            </Row>
          </TabPanel>
          <TabPanel>
            <Row> 
              <Col xs={12}>
                <h4 style={{ textAlign: "center", color: "yellow" }}>{parkRidename}</h4>
              </Col>
            </Row>
            <Row style={{ padding: 0, margin: 0 }}>
              <Col xs={1}></Col>
              <Col xs={4}>
                <h6 style={{ textAlign: "center", color: "yellow" }}>Wait Times</h6>
              </Col>
              <Col xs={2}></Col>
              <Col xs={4}>
                <h6 style={{ textAlign: "center", color: "yellow" }}>Ratings</h6>
              </Col>
            </Row>
            <Row style={{ padding: 0, margin: 0 }}>
              <Col xs={1}></Col>
              <Col xs={4}>
                <ColumnChart colors={["#fff", "#fff"]} xtitle="Date" ytitle="Wait Time" data={[["7/21/2017", 10],["Average", 25],["6/21/2018", 60]]} />
              </Col>
              <Col xs={2}></Col>
              <Col xs={4}>
                <ColumnChart colors={["#fff"]} xtitle="Date" ytitle="Ratings" data={[["1", 0], ["2", 1], ["3", 2], ["4", 3], ["5", 4]]} />
              </Col>
            </Row>
            <Row style={{ padding: 0, margin: 0 }}>
              <Col xs={1}></Col>
              <Col xs={2}>
                <h6 className="textColour">Times ridden by users</h6>
              </Col>
              <Col xs={2}>
                <h6 className="textColour2">{totalCount}</h6>
              </Col>
              <Col xs={2}>
                <h6 className="textColour">Number of repeat riders</h6>
              </Col>
              <Col xs={2}>
                <h6 className="textColour2">{dupCount}</h6>
              </Col>
              <Col xs={3}>
                <button className="btn btn-action button"
                  onClick={this._onRideSelect}
                  >
                    Select this ride?
                </button>
              </Col>
            </Row>
          </TabPanel>
          <TabPanel>
            <Row> 
              <Col xs={2}></Col>
              <Col xs={7}>
                <h4 style={{ textAlign: "center", color: "yellow" }}>{parkRidename}</h4>
              </Col>
            </Row>
            <Row>
              <Col xs={5}></Col>
              <Col xs={5}> 
                <h5 style={{color: "white"}}>Comments</h5>
              </Col>
              <Col xs={2}></Col>
            </Row>
            <Row>
              <Col xs={4}></Col>
              <Col xs={5}> 
                <ul style={{color: "white"}}>
                  {ridercomments.map(function(ridercomment, index){
                      return <h6 key={ index }>{ridercomment}</h6>;
                    })}
                </ul>
              </Col>
              <Col xs={2}></Col>
            </Row>
            <Row>
              <Col xs={3}></Col>

              <Col xs={2}></Col>
              <Col xs={4}>
                <button className="btn btn-action button"
                  onClick={this.onRideSelect}
                  >
                    Select this ride?
                </button>
              </Col>
            </Row>
          </TabPanel>
        </Tabs>
      </div>
      </Logo>

    )
  }
}