import React, { Component } from 'react';
import Logo from "../../components/Logo";
import ModalConductor from "../../components/ModalConductor";
import "./Ridenow.css";
import { Tabs, Tab, Row, Col } from 'react-bootstrap'
import API from "../../utils/API";
import Chart from "react-google-charts";

import DateTimePicker from 'react-datetime-picker'

import ComboSelect from 'react-combo-select';

require('../../style.css');

let parkRidename  = " "
let ridercomments = []
let parkid        = " "
let rideid        = " "
let userid        = " "
let rating        = " " 
let overallLeader = []
let overallNick   = []
let parkLeader    = []
let parkNick      = []
let rideLeader    = []
let rideNick      = []
let rateOne       = 1
let rateTwo       = 3
let rateThree     = 4
let rateFour      = 3
let rateFive      = 2
let maxWait       = 70
let maxDays       = 5

const ratingData = [
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
  ["5/24/2012", 32, "color: gray"],
  ["7/01/2014", 46, "color: #76A7FA"],
  ["9/15/2015", 28, "color: blue"],
  ["4/24/2017", 45, "stroke-color: #703593; stroke-width: 4; fill-color: #C5A5CF"],
  ["1/4/2018", 70, "stroke-color: #871B47; stroke-opacity: 0.6; stroke-width: 8; fill-color: #BC5679; fill-opacity: 0.2"
  ]
];

const ratingOptions = {
  title: "Rating vs. Number of Ratings",
  hAxis: { title: "Rating", viewWindow: { min: 0, max: 5 } },
  vAxis: { title: "Number", viewWindow: { min: 0, max: 5 } },
  legend: "none"
};

const waitOptions = {
  title: "Days vs. Wait time",
  hAxis: { title: "Days", viewWindow: { min: 0, max: maxDays } },
  vAxis: { title: "Time", viewWindow: { min: 0, max: maxWait } },
  legend: "none"
};

const ratingList = [
  { value: '1', text: 'One' },
  { value: '2', text: 'Two' },
  { value: '3', text: 'Three' },
  { value: '4', text: 'Four' },
  { value: '5', text: 'Five' }
]

export default class RideNow extends Component {

  constructor(props) {
    super(props);
    this.date = props.date
  }
 
  state = {
    date:        new Date(),
    park:        {},
    parkdates:   {},
    comment:     "",
    overall:     {},
    modalStatus: false,
    modalType:   "",
    userid:      "",
    parkid:      "",
    rideid:      "",
    daterode:    "",
    rating:      "",
    waittime:    "",
    ridecomment: "",
    dateadded:   "",
    selectedOption: null
  }

  _handleModal = (status, type) => {
    this.setState ({modalStatus: status, modalType: type})
  }

  componentDidMount() {
    let userinfo = window.location.search;
    let i = userinfo.indexOf("&")
    userid = userinfo.substr(1, i - 1)
    parkid = userinfo.substr(i + 1, 2)
    rideid = userinfo.substr(i + 4, 2)
    this.getRides();
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  onChange = date => this.setState({ date })

  fakeFunction(value, text) {
    console.log("supposed rating value " + value)
    rating = value
}

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
  }

  _handleModal = (status, type, userid, parkid) => {
    this.setState ({modalStatus: status, modalType: type, modalUserid: userid, modalParkid: parkid})
  }

  getRides = () => {
    API.getRides( 
      {parkid: parkid, 
      rideid: rideid }
    )
      .then(res => {
        this.setState({ park: res.data });
        parkRidename = res.data.parkridename 
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
        this.loadRidedata();

      })
      .catch(err => console.log(err))
  };

  handleFormSubmit = event => {
    event.preventDefault();
      API.saveRideuserinfo({
        userid:   userid,
        parkid:   parkid, 
        rideid:   rideid,
        daterode: this.state.date,
        rating:   rating,
        waittime: this.state.waittime,
        fastpass: false,
        singlerider: false
      })
        .then(()=> 
          API.saveRideusercmt({
            userid:    userid,
            parkid:    parkid, 
            rideid:    rideid,
            comment:   this.state.ridecomment,
            dateadded: this.state.date
          })
          .then(()=>
            this._handleModal(true, 'RIDESELECTION', userid, parkid) )
          .catch(err => console.log(err))
        )
        .catch(err => console.log(err))
  };

  loadRidedata = () => {
    API.getUserdata( 
      { userid: userid + "?",
        parkid: parkid, 
        rideid: rideid }
       )
      .then(res => {
        this.loadLeaderall();
      })
      .catch(err => console.log(err))
  };

  loadLeaderall = () => {
    API.getUserdatabyuser()
      .then(res => {
        this.setState({ overall: res.data });
        for (let i = 0; i < res.data.length; i++){
          let j = parseInt(res.data[i].userid, 10)
          overallLeader[j] = res.data[i].userid 
          if (parkid === res.data[i].parkid ) 
          {
            parkLeader[j] = res.data[i].userid
          }

          if (parkid === res.data[i].parkid && rideid === res.data[i].rideid ) 
          {
            rideLeader[j] = res.data[i].userid
          }
        }
        for (let k = 0; k < overallLeader.length; k++){
              API.getUsernick({
                id: overallLeader[k]
              })
              .then(res => { 
                this.setState({ overall: res.data });
                overallNick[k] =  res.data[0].nickname
              })
              .catch(err => console.log(err));
        }
        for (let l = 0; l < parkLeader.length; l++){
          API.getUsernick({
            id: parkLeader[l]
          })
          .then(res => { 
            this.setState({ parkride: res.data });
            parkNick[l] =  res.data[0].nickname
          })
          .catch(err => console.log(err));
        }
        for (let m = 0; m < rideLeader.length; m++){
          API.getUsernick({
            id: rideLeader[m]
          })
          .then(res => { 
            this.setState({ ridenick: res.data });
            rideNick[m] =  res.data[0].nickname
          })
          .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err))
  };

  

  render() {

    return (
      <div>
        <Logo backgroundImage="../../pages/theme.jpg'">
          <div>
            <Row> 
              <Col xs={12}>
                <h4 style={{ textAlign: "center", color: "yellow" }}>{parkRidename}</h4>
              </Col>
            </Row>
            <Row>
              <Col xs={5}></Col>
              <Tabs style={{color: "white"}} defaultActiveKey={3} id="uncontrolled-tab-example">
                <Tab eventKey={1} style={{color: "white"}} title="Update Ride">
                  <Row>
                    <Col xs={1}></Col>
                    <Col xs={3}>
                      <h5 className="textColour">Date of Ride</h5>
                    </Col>
                    <Col xs={2}> 
                      <h5 style={{ textAlign: "center", color: "white" }}>Rating</h5>
                    </Col>
                    <Col xs={1}></Col>
                    <Col xs={2}> 
                      <h5 style={{ textAlign: "center", color: "white" }}>Wait Time(mins)</h5>
                    </Col>
                    <Col xs={3}> 
                        <h5 style={{ textAlign: "center", color: "white" }}>Comment</h5>
                      </Col>
                  </Row>
                  <form>
                    <Row>
                      <Col xs={1}></Col>
                      <Col xs={3}> 
                        <div style={{ textAlign: "left", color: "black" }}>
                          <DateTimePicker
                            onChange={this.onChange}
                            value={this.state.date}
                          />
                        </div>
                      </Col>
                      <Col xs={2}>
                        <div style={{ margin: 0, color: "black" }}>
                           <ComboSelect data={ratingList} sort="number" type="select" onChange={this.fakeFunction}
                          />
                        </div>
                      </Col>
                      <Col xs={1}></Col>
                      <Col xs={2}> 
                        <div style={{ border: 0, color: "white" }}>
                          <h5><input onChange={this.handleInputChange} value={this.state.waittime} type="text" id="waittime" name="waittime" maxLength="5" placeholder="Wait Time"/></h5>
                        </div>
                      </Col>
                      <Col xs={1}></Col>
                      <Col xs={2}>
                          <div style={{ color: "white" }}>
                            <textarea onChange={this.handleInputChange} value={this.state.ridecomment} id="ridecomment" name="ridecomment" maxLength="200" placeholder="Comment"/>
                          </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={7}></Col>
                      <Col xs={2}> 
                        <h5 style={{ textAlign: "center", color: "white" }}>Fast Pass?</h5>
                      </Col>
                      <Col xs={1}></Col>

                      <Col xs={2}> 
                        <h5 style={{ textAlign: "center", color: "white" }}>Single Rider?</h5>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={6}></Col>
                      <Col xs={2}>
                        <div>
                          
                        </div>
                      </Col>
                      <Col xs={1}></Col>
                      <Col xs={2}>
                        <div>
                          
                        </div>
                      </Col>
                    </Row>
                  </form>
                  <Row>
                    <Col xs={7}></Col>
                    <Col xs={4}>
                      <div style={{ textAlign: "center"}}>
                        <button  className="btn btn-action button"
                          onClick={this.handleFormSubmit}
                        >
                          Add Ride Data
                        </button>
                      </div>
                    </Col>
                  </Row> 
                </Tab>
                <Tab eventKey={2} style={{color: "white"}} title="Your Analysis">
                   
                  <Row>
                    <Col xs={3}>
                      <h5 style={{ textAlign: "center", color: "yellow" }}>Your Ratings </h5>
                    </Col>
                    <Col xs={5}>
                      <h5 style={{ textAlign: "center", color: "yellow" }}>Your Wait Time</h5>
                    </Col>
                    <Col xs={4}> 
                      <h5 style={{ textAlign: "center", color: "yellow" }}>Comment</h5>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={4}>
                      <div className="App">
                        <Chart chartType="ColumnChart" width="100%" height="300px" data={ratingData} options={ratingOptions} legendToggle />
                       </div>
                    </Col>
                    <Col xs={4}>
                      <div className="App">
                        <Chart chartType="ColumnChart" width="100%" height="300px" data={waitData} options={waitOptions} legendToggle />
                       </div>
                    </Col>
                    <Col xs={4}> 
                      <ul style={{color: "white"}}>
                        {ridercomments.map(function(ridercomment, index){
                            return <h6 key={ index }>{ridercomment}</h6>;
                          })}
                      </ul>
                    </Col>
                  </Row>
                </Tab>
                <Tab eventKey={3} style={{color: "white"}} title="Leader Boards!">
                  <Row>
                    <Col xs={2}></Col>
                    <Col xs={2}>
                      <h5 style={{ textAlign: "center", color: "yellow" }}>All Parks</h5>
                      
                    </Col>
                    <Col xs={4}> 
                      <h5 style={{ textAlign: "center", color: "yellow" }}>Universal Studios Orlando</h5>
                      
                    </Col>
                    <Col xs={3}> 
                      <h5 style={{ textAlign: "center", color: "yellow" }}>{parkRidename}</h5>
                      
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={2}></Col>
                    <Col xs={2}>
                      <ul style={{textAlign: "center", color: "white"}}>
                        {overallNick.map(function(overallNick, index){
                        return <h6 key={ index }>{overallNick}</h6>;
                         })}
                       </ul>
                    </Col>
                    <Col xs={4}> 
                      <ul style={{textAlign: "center", color: "white"}}>
                        {parkNick.map(function(parkNick, index){
                        return <h6 key={ index }>{parkNick}</h6>;
                         })}
                       </ul>
                    </Col>
                    <Col xs={3}> 
                      <ul style={{textAlign: "center", color: "white"}}>
                        {rideNick.map(function(rideNick, index){
                        return <h6 key={ index }>{rideNick}</h6>;
                         })}
                       </ul>
                    </Col>
                  </Row>
                </Tab>
              </Tabs>;
            </Row>
           
          </div>
        </Logo>       
         <ModalConductor history={this.props.history} handleModal={this._handleModal} status={this.state.modalStatus} type={this.state.modalType} userid={this.state.modalUserid} parkid={this.state.modalParkid}/>
      </div>
    );
  }
}