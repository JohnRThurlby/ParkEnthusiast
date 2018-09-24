import React, { Component } from 'react';

import API from "../../utils/API";
import Chart from "../../components/Chart";
import WaitChart from "../../components/Waitchart";
import Logo from "../../components/Logo";

import ComboSelect from 'react-combo-select';
import DateTimePicker from 'react-datetime-picker'
import ModalConductor from "../../components/ModalConductor";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Row, Col } from 'react-bootstrap'
import Moment from 'moment';
import "./Ridenow.css";

require('../../style.css');

let parkName      = " " 
let parkUrl       = " "
let parkRidename  = " "
let ridercomments = []
let parkid        = " "
let rideid        = " "
let userid        = " "
let rating        = " " 
let overallLeader = [0,0,0,0,0,0,0,0,0,0]
let overallOrder  = [0,0,0,0,0,0,0,0,0,0]
let overallNick   = []
let parkLeader    = [0,0,0,0,0,0,0,0,0,0]
let overallPark   = [0,0,0,0,0,0,0,0,0,0]
let parkNick      = []
let rideLeader    = [0,0,0,0,0,0,0,0,0,0]
let overallRide   = [0,0,0,0,0,0,0,0,0,0]
let rideNick      = []
let dayWait       = ['01/01/2018 12:00','01/01/2018 12:00','01/01/2018 12:00','01/01/2018 12:00','01/01/2018 12:00']
let times         = [0,0,0,0,0]
let rateOne       = 0
let rateTwo       = 0
let rateThree     = 0
let rateFour      = 0
let rateFive      = 0
let parkPic     = "https://nearfox.com/wp-content/uploads/2016/11/imageferris_wheel_20160301065106331548.jpg" 


const ratingList = [
  { value: '1', text: 'One' },
  { value: '2', text: 'Two' },
  { value: '3', text: 'Three' },
  { value: '4', text: 'Four' },
  { value: '5', text: 'Five' }
]

export default class RideNow extends Component {
  
  constructor(){
    super();
    this.state = {
      chartData:{},
      waitData:{},
      date: new Date()
    }
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
    ridecomment: "",
    dateadded:   "",
    
    selectedOption: null,
    rateOne:       0,
    rateTwo:       0,
    rateThree:     0,   
    rateFour:      0,
    rateFive:      0
  }

  _handleModal = (status, type) => {
    this.setState ({modalStatus: status, modalType: type})
  }

  componentWillMount() {

    let userinfo = window.location.search;
    let i = userinfo.indexOf("&")
    userid = userinfo.substr(1, i - 1)
    parkid = userinfo.substr(i + 1, 2)
    rideid = userinfo.substr(i + 4, 2)
    this.getPark()
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

  getPark = () => {

    API.getPark({id: parkid})
      .then(res => {
          this.setState({ park: res.data });
          parkName  = res.data.parkname 

        }) 
      .catch(err => console.log(err))
  };

  getRides = () => {
    API.getRides( 
      {parkid: parkid, 
      rideid: rideid }
    )
      .then(res => {
        this.setState({ park: res.data });
        parkRidename = res.data.parkridename 
        //parkUrl      = res.data.rideurl

        this.getComments();

      })
      
      .catch(err => console.log(err))
  };

  getComments = () => {
    API.getCommentsuser(
      { userid: userid + ".com",
        parkid: parkid, 
        rideid: rideid }
    )
      .then(res => {
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
    API.getUserbyiddata( 
      { userid: userid + ".com",
        parkid: parkid, 
        rideid: rideid }
       )
      .then(res => {
        console.log(res.data.length)
        this.setState({ comments: res.data });
        let count = 0
        for (let i = 0; i < res.data.length; i++){
          if (count < 5)
          {
            dayWait[count]  = Moment(res.data[i].daterode).format("MM/DD/YY HH:mm"); 
            times[count] = res.data[i].waittime; 
            count++
          }
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
        this.loadLeaderall();
      })
      .catch(err => console.log(err))
  };

  loadLeaderall = () => {
    API.getUserdatabyuser()
      .then(res => {
        this.setState({ overall: res.data });
        console.log(res.data)
        for (let i = 0; i < res.data.length; i++){

          overallLeader[parseInt(res.data[i].userid, 10)] = overallLeader[parseInt(res.data[i].userid, 10)] + 1 

          if (parkid === res.data[i].parkid ) 
          {
            parkLeader[parseInt(res.data[i].userid, 10)] = parkLeader[parseInt(res.data[i].userid, 10)] + 1
          }

          if (parkid === res.data[i].parkid && rideid === res.data[i].rideid ) 
          {
            rideLeader[parseInt(res.data[i].userid, 10)] = rideLeader[parseInt(res.data[i].userid, 10)] + 1
          }
        }

        let i = 0
        while (i < 11) 
        {
          let j = Math.max.apply(Math,overallLeader);
          let x = overallLeader.indexOf(j);
          overallOrder[i] = x
          overallLeader[x] = 0
          i++
        }
       for (let k = 0; k < overallOrder.length; k++){
          if (overallOrder[k] !== 0) {
            API.getUsernick({
              id: overallOrder[k]
            })
            .then(res => { 
              this.setState({ overall: res.data });
              overallNick[k] =  res.data[0].nickname
            })
            .catch(err => console.log(err));
          }
        }
        let y = 0
        while (y < 11) 
        {
          let j = Math.max.apply(Math,parkLeader);
          let x = parkLeader.indexOf(j);
          overallPark[y] = x
          parkLeader[x] = 0
          y++
        }
        for (let l = 0; l < overallPark.length; l++){
          if (overallPark[l] !== 0) {
            API.getUsernick({
              id: overallPark[l]
            })
            .then(res => { 
              this.setState({ parkride: res.data });
              parkNick[l] =  res.data[0].nickname
            })
            .catch(err => console.log(err));
          }
        }
        let w = 0
        while (w < 11) 
        {
          let j = Math.max.apply(Math,rideLeader);
          let x = rideLeader.indexOf(j);
          overallRide[w] = x
          rideLeader[x] = 0
          w++
        }

        for (let m = 0; m < overallRide.length; m++){
          if (overallRide[m] !== 0) {
            API.getUsernick({
              id: overallRide[m]
            })
              .then(res => { 
                this.setState({ ridepark: res.data });
                rideNick[m] =  res.data[0].nickname

              })
              .catch(err => console.log(err));
          }
        }

      })
      .catch(err => console.log(err))
      this.getChartData();
      this.getWaitData();

  };

  getChartData = () => {
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
        labels: [dayWait[0], dayWait[1], dayWait[2], dayWait[3], dayWait[4]],
        datasets: [{
          label: 'Wait Times', 
          backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"], 
          data:[times[0], times[1], times[2], times[3], times[4]]
        }]  
      }  
    })
  }

  render() {

    return (
      <div>
        <Logo backgroundImage={parkPic}>
          <div>
            <Tabs >
              <TabList>
                  <Col xs={3}></Col>
                  <Tab><h5 style={{color: "black"}}>Update Ride..  </h5></Tab>
                  <Tab><h5 style={{color: "black"}}>Your Analysis..  </h5></Tab>
                  <Tab><h5 style={{color: "black"}}>Leader Boards!</h5></Tab>
              </TabList>
              <TabPanel >
                <Row> 
                   <Col xs={2}></Col>
                   <Col xs={7}>
                     <h4 style={{ textAlign: "center", color: "yellow" }}>{parkRidename}</h4>
                  </Col>
                </Row>
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
              </TabPanel>
              <TabPanel>
                <Row> 
                  <Col xs={2}></Col>
                  <Col xs={7}>
                    <h4 style={{ textAlign: "center", color: "yellow" }}>{parkRidename}</h4>
                  </Col>
                </Row>
                <Row>
                  <Col xs={8}></Col>
                  <Col xs={4}> 
                    <h5 style={{ textAlign: "center", color: "yellow" }}>Comment</h5>
                  </Col>
                </Row>
                <Row>
                  <Col xs={4}>
                    <div>
                      <Chart chartData={this.state.chartData} />
                    </div>
                  </Col>
                  <Col xs={4}>
                    <div>
                      <WaitChart waitData={this.state.waitData} />
                    </div>
                  </Col>
                  <Col xs={3}> 
                    <ul style={{color: "white"}}>
                      {ridercomments.map(function(ridercomment, index){
                          return <h6 key={ index }>{ridercomment}</h6>;
                      })}
                    </ul>
                  </Col>
                </Row>
              </TabPanel>
              <TabPanel>
                <Row>
                  <Col xs={2}></Col>
                  <Col xs={2}>
                    <h5 style={{ textAlign: "center", color: "yellow" }}>All Parks</h5>
                      
                  </Col>
                  <Col xs={4}> 
                    <h5 style={{ textAlign: "center", color: "yellow" }}>{parkName}</h5>
                      
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
              </TabPanel>
            </Tabs>
          </div>
        </Logo>       
        <ModalConductor history={this.props.history} handleModal={this._handleModal} status={this.state.modalStatus} type={this.state.modalType} userid={this.state.modalUserid} parkid={this.state.modalParkid}/>
      </div>
    );
  }
}