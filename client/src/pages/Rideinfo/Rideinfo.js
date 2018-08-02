import React, { Component } from "react"

import Logo from "../../components/Logo";

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import API from "../../utils/API";

import { Row, Col } from 'react-bootstrap'

import Chart from "react-google-charts";

let ridercomments = []
let parkRidename  = " "
let parkArea      = " "
let userid        = " "
let parkid        = " "
let rideid        = " "
let parkHgtreq    = " "
let parkDuration  = " " 
let parkMaxhgt    = " "
let parkOpened    = " "
let parkSpeed     = " "
let parkLevel     = " "
let parkLength    = " "
let parkType      = " "
let parkUrl       = " "
let longWait      = 45
let longWaitdate  = "12/21/2017"
let shortWait     = 10
let shortWaitdate = "05/21/2018"  
let avgWait       = "Average" 
let waitShort     = 25
//let totalCount    = 0
//let dupCount      = 0
let avgCount      = 0
let count         = 0
let rateOne       = 1
let rateTwo       = 3
let rateThree     = 2
let rateFour      = 3
let rateFive      = 3
let maxWait       = 45

let ratingData = [
  ["Rating", "Number", { role: "style" }],
  ["1", rateOne, "color: gray"],
  ["2", rateTwo, "color: #76A7FA"],
  ["3", rateThree, "color: blue"],
  ["4", rateFour, "stroke-color: #703593; stroke-width: 4; fill-color: #C5A5CF"],
  ["5", rateFive, "stroke-color: #871B47; stroke-opacity: 0.6; stroke-width: 8; fill-color: #BC5679; fill-opacity: 0.2"
  ]
];

const waitData = [
  ["Days", "Time", { role: "style" }],
  [shortWaitdate, shortWait, "color: gray"],
  [avgWait, waitShort, "color: #76A7FA"],
  [longWaitdate, longWait, "color: blue"],
];

const ratingOptions = {
  title: "Rating vs. Number of Ratings",
  hAxis: { title: "Rating", viewWindow: { min: 0, max: 5 } },
  vAxis: { title: "Number", viewWindow: { min: 0, max: 5 } },
  legend: "none"
};

const waitOptions = {
  title: "Wait times",
  hAxis: { title: "Days", viewWindow: { min: 0, max: 3 } },
  vAxis: { title: "Time", viewWindow: { min: 0, max: maxWait } },
  legend: "none"
};

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
   
  }

  componentDidMount() {

    let userinfo = window.location.search;
    let i = userinfo.indexOf("&")
    userid = userinfo.substr(1, i - 1)
    parkid = userinfo.substr(i + 1, 2)
    rideid = userinfo.substr(i + 4, 2)
    console.log("userid " + userid)
    console.log("parkid " + parkid)
    console.log("rideid " + rideid)
    this.getRides();
  }

  getRides = () => {
    API.getRides( 
      {parkid: parkid, 
       rideid: rideid }
    )
      .then(res => {
        console.log(res.data)
        this.setState({ park: res.data });
        parkRidename = res.data.parkridename 
        parkArea     = res.data.parkarea
        parkHgtreq   = res.data.parkhgtreq
        parkDuration = res.data.parkduration
        parkMaxhgt   = res.data.parkmaxhgt
        parkOpened   = res.data.parkopened
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
    API.getComments(
      {parkid: parkid, 
        rideid: rideid }
    )
      .then(res => {
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
    API.gettotalCount(
      {parkid: parkid, 
        rideid: rideid }
    )
      .then(res => {
        this.setState({ totalcount: res.data });
        //totalCount = res.data;
        this.getDupcount()
      })
      .catch(err => console.log(err))
  };

  getDupcount = () => {
    API.getdupCount(
      {parkid: parkid, 
        rideid: rideid }
    )
      .then(res => {
        this.setState({ dupcount: res.data });
        //dupCount = res.data;
        this.getUserdata()
      })
      .catch(err => console.log(err))
  };

  getUserdata = () => {
    API.getUserdata(
      {parkid: parkid, 
        rideid: rideid }
    )
      .then(res => {
        this.setState({ waittimes: res.data});
        count = res.data.length
        for (let i = 0; i < res.data.length; i++){
          if (longWait < res.data[i].waittime)
          {
            longWait      = res.data[i].waittime
            longWaitdate  = res.data[i].daterode
          }
          if (shortWait > res.data[i].waittime)
          {
            shortWait      = res.data[i].waittime 
            shortWaitdate  = res.data[i].daterode
          }
          avgCount += res.data[i].waittime 
          switch(res.data[i].rating) {
            case "1":
              rateOne = 1
              break;
            case "2":
              rateTwo = 3
              break;
            case "3":
              rateThree = 2
              break;
            case "4":
              rateFour = 4
              break;
            case "5":
              rateFive = 1
              break;
            default:
              break;
          }
        }
      
        avgWait = avgCount / count
        waitShort = "25"
      })
      .catch(err => console.log(err))
  };
  
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  onRideSelect = event => {
    event.preventDefault();
    window.location="/ridenow?" + userid + "&" + parkid + "&" + rideid
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
              <Col xs={2}>
                <button style={{ margin: 20}} className="btn btn-action button"
                  onClick={this.onRideSelect}
                  >
                    Select this ride?
                </button>
              </Col>
              <Col xs={7}>
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
                    <h5><img src={parkUrl} alt="" width="300" height="200"/></h5>
                  </Col>
                </Row>
              </Col>
            </Row>
            
          </TabPanel>
          <TabPanel>
            <Row> 
              <Col xs={2}>
                <button style={{ margin: 20}} className="btn btn-action button"
                  onClick={this.onRideSelect}
                  >
                    Select this ride?
                </button>
              </Col>
              <Col xs={7}>
                <h4 style={{ textAlign: "center", color: "yellow" }}>{parkRidename}</h4>
              </Col>
            </Row>
            <Row style={{ padding: 0, margin: 0 }}>
              <Col xs={1}></Col>
              <Col xs={4}>
                <h6 style={{ textAlign: "center", color: "yellow" }}>Ratings</h6>
              </Col>
              <Col xs={2}></Col>
              <Col xs={4}>
                <h6 style={{ textAlign: "center", color: "yellow" }}>Short/Average/Long Wait Times</h6>
              </Col>
            </Row>
            <Row style={{ padding: 0, margin: 0 }}>
              <Col xs={1}></Col>
              <Col xs={4}>
                <div className="App">
                  <Chart chartType="ColumnChart" width="100%" height="300px" data={ratingData} options={ratingOptions} legendToggle />
                </div>
              </Col>
              <Col xs={2}></Col>
              <Col xs={4}>
                <div className="App">
                  <Chart chartType="ColumnChart" width="100%" height="300px" data={waitData} options={waitOptions} legendToggle />
                </div>
              </Col>
            </Row>
          </TabPanel>
          <TabPanel>
            <Row> 
              <Col xs={2}>
                <button style={{ margin: 20}} className="btn btn-action button"
                  onClick={this.onRideSelect}
                  >
                    Select this ride?
                </button>
              </Col>
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
          </TabPanel>
        </Tabs>
      </div>
      </Logo>

    )
  }
}