import React, { Component } from "react"

import Logo from "../../components/Logo";
import Chart from "../../components/Chart";
import WaitChart from "../../components/Waitchart";

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import API from "../../utils/API";

import { Row, Col } from 'react-bootstrap'

import Moment from 'moment';

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
let longWait      = 0
let longWaitdate  = " "
let shortWait     = 10000
let shortWaitdate = " "  
let avgDate       = "Average" 
let waitShort     = 0
let avgCount      = 0
let avgWait       = 0
let count         = 0
let rateOne       = 0
let rateTwo       = 0
let rateThree     = 0
let rateFour      = 0
let rateFive      = 0

export default class Rideinfo extends Component {
  constructor(){
    super();
    this.state = {
      chartData:{},
      waitData:{}
    }
  }

  state = { 
    park:          {},
    comments:      {},
    waittimes:     {},
    totalcount:    " ",
    dupcount:      " ",
    longWaitdate:  " ",
    shortWaitdate: " ", 
    waitShort:     " ",
    rateOne:       0,
    rateTwo:       0,
    rateThree:     0,   
    rateFour:      0,
    rateFive:      0
   
  }

  componentWillMount() {

    let userinfo = window.location.search;
    let i = userinfo.indexOf("&")
    userid = userinfo.substr(1, i - 1)
    parkid = userinfo.substr(i + 1, 2)
    rideid = userinfo.substr(i + 4, 2)
    this.getUserdata()
    this.getRides();

  }

  getRides = () => {
    API.getRides( 
      {parkid: parkid, 
       rideid: rideid }
    )
      .then(res => {
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
        this.getChartData();
        this.getWaitData();

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
          if (longWait < parseInt(res.data[i].waittime, 10) )
          {
            longWaitdate = Moment(res.data[i].daterode).format("MMM Do YYYY"); 
            longWait     = res.data[i].waittime
          }
          if (shortWait > parseInt(res.data[i].waittime, 10))
          {
            shortWait      = res.data[i].waittime 
            shortWaitdate = Moment(res.data[i].daterode).format("MMM Do YYYY"); 

          }

          avgCount += parseInt(res.data[i].waittime, 10) 
          switch(res.data[i].rating) {
            case "1":
              rateOne += 1
              break;
            case "2":
              rateTwo += 1
              break;
            case "3":
              rateThree += 1
              break;
            case "4":
              rateFour += 1
              break;
            case "5":
              rateFive += 1
              break;
            default:
              break;
          }

        }
        avgWait = avgCount / count
        if (shortWait === 10000) {
          shortWait = 0
        }

        waitShort = Math.trunc(avgWait)
      })
      .catch(err => console.log(err))

  };

  getChartData = () => {
    console.log("in call chart from rideinfo")
    this.setState({
      chartData: {
        labels: ['1', '2', '3' ,'4', '5'],
        datasets: [{
          label: 'Ratings',
          fontColor: 'white',
          backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"], 
          data:[rateOne, rateTwo, rateThree, rateFour, rateFive]
        }]  
      }  
    })
  }

  getWaitData = () => {
    this.setState({
      waitData: {
        labels: [shortWaitdate, avgDate, longWaitdate],
        datasets: [{
          label: 'Wait Times', 
          backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f"], 
          data:[shortWait, waitShort, longWait]
        }]  
      }  
    })
  }
  
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
          <TabPanel >
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
            <Row style={{ color: "black" }}>
              <Col xs={1}></Col>
              <Col xs={4}>
                <div>
                  <Chart chartData={this.state.chartData} />
                </div>
              </Col>
              <Col xs={2}></Col>
              <Col xs={4}>
                <div>
                  <WaitChart waitData={this.state.waitData} />
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