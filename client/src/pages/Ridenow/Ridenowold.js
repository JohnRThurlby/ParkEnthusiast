import React, { Component } from 'react';
import API from "../../utils/API";
import ComboSelect from 'react-combo-select';
import DateTimePicker from 'react-datetime-picker'
import Logo from "../../components/Logo";
import ModalConductor from "../../components/ModalConductor";

import { Tabs, Tab, Row, Col } from 'react-bootstrap'
import "./Ridenow.css";

require('../../style.css');

let parkName      = " " 
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
    this.state = {
      
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
        
        this.loadLeaderall();
      })
      .catch(err => console.log(err))
  };

  loadLeaderall = () => {
    API.getUserdatabyuser()
      .then(res => {
        this.setState({ overall: res.data });
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
                    <Col xs={8}></Col>
                    <Col xs={4}> 
                      <h5 style={{ textAlign: "center", color: "yellow" }}>Comment</h5>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={4}>
                    </Col>
                    <Col xs={4}>
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