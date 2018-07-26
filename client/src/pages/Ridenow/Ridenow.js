import React, { Component } from 'react';
import Logo from "../../components/Logo";
import ModalConductor from "../../components/ModalConductor";

import Calendar from 'react-calendar'
import { Row, Col } from 'react-bootstrap'
import API from "../../utils/API";
import { TextArea } from "../../components/Form";

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import 'react-dropdown/style.css'

import StarRatingComponent from 'react-star-rating-component';
import ReactChartkick, { ColumnChart } from 'react-chartkick'
import Chart from 'chart.js'

ReactChartkick.addAdapter(Chart)

let parkRidename  = " "
let ratings=[["1", 1], ["2", 3], ["3", 5], ["4", 4], ["5", 2]]
let waittimes=[["5/24/2012", 32], ["7/01/2014", 46], ["9/15/2015", 28], ["4/24/2017", 45], ["1/4/2018", 70]]

export default class RideNow extends Component {

  constructor() {
    super();
 
    this.state = {
      rating: 1
     
    };
  }
  state = {
    date:        new Date(),
    park:        {},
    parkdates:   {},
    comment:     "",
    modalStatus: false,
    modalType:   "",
    userid:      "",
    parkidid:    "",
    rideid:      "",
    daterode:    "",
    rating:      "",
    waittime:    "",
    dateadded:   ""
  }

  _handleModal = (status, type) => {
    this.setState ({modalStatus: status, modalType: type})
  }
  componentDidMount() {
    this.getRides();
    this.loadRidedates();
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  getRides = () => {
    API.getRides( {parkid: 75, rideid: 8 }
    )
      .then(res => {
        console.log("in get ride return")
        console.log(res.data)
        this.setState({ park: res.data });
        parkRidename = res.data.parkridename 
        console.log(parkRidename)
      })
      
      .catch(err => console.log(err))
  };

  onStarClick(nextValue, prevValue, name) {
    this.setState({rating: nextValue});}
 
  onChange = date => this.setState({ date })

  handleFormSubmit = event => {
    event.preventDefault();
      console.log("in API call")
      API.saveRideuserinfo({
        userid:        "1",
        parkid:        "75",
        rideid:        "10",
        daterode:      this.state.date,
        rating:        this.state.rating,
        waittime:      this.state.waittime
      })
        .then(()=> 
          API.saveRideusercmt({
            userid:        "1",
            parkid:        "75",
            rideid:        "10",
            comment:      this.state.comment,
            dateadded:    new Date()
          })
          .then(()=>
            window.location="/ridenow")
          .catch(err => console.log(err))
        )
        .catch(err => console.log(err))
  };

  loadRidedates = () => {
    API.getUserdata( 
       )
      .then(res => {
        console.log("user park data")
        console.log(res.data)
         
      })
      .catch(err => console.log(err))
  };

  render() {

    const { rating } = this.state;

    return (
      <div>
        <Logo backgroundImage="../../pages/theme.jpg'">
          <div>
            <Tabs >
              <TabList>
                <Col xs={4}></Col>
                <Tab><h5 style={{color: "black"}}>Update Ride</h5></Tab>
                <Tab><h5 style={{color: "black"}}>Your Analysis</h5></Tab>
                <Tab><h5 style={{color: "black"}}>Leader Boards!</h5></Tab>
              </TabList>
              <TabPanel>
                <Row> 
                  <Col xs={7}>
                    <h4 style={{ textAlign: "center", color: "yellow" }}>{parkRidename}</h4>
                  </Col>
                </Row>
                <form>
                  <Row>
                    <Col xs={3}></Col>
                    <Col xs={3}>
                      <h5 className="textColour">Date of Ride</h5>
                    </Col>
                    <Col xs={2}> 
                      <h5 className="textColour">Rating</h5>
                    </Col>
                    <Col xs={2}> 
                      <h5 className="textColour">Wait Time</h5>
                    </Col>
                    <Col xs={2}> 
                      <h5 className="textColour">Comment</h5>
                    </Col>
                  </Row>
                  <Row>
                      <Col xs={2}></Col>
                      <Col xs={4}> 
                        <Calendar
                          onChange={this.onChange}
                            value={this.state.date}
                        />
                      </Col>
                        <Col xs={2}>
                          <div>
                            <StarRatingComponent 
                              name="rate1" 
                              starCount={5}
                              value={rating}
                              renderStarIcon={() => <span>★</span>}
                              onStarClick={this.onStarClick.bind(this)}
                              starColor={"#000"}
                              emptyStarColor={"#fff"} 
                            />
                          </div>
                        </Col>
                        <Col xs={1}> 
                          <input
                            className="textColour"
                            autoComplete='waittime'
                            value={this.state.waittime}
                            onChange={this.handleInputChange}
                            name="waittime"
                            placeholder="Wait Time"
                          />
                        </Col>
                        <Col xs={2}>
                          <TextArea
                              value={this.state.comment}
                              onChange={this.handleInputChange}
                              name="comment"
                              placeholder="Comment"
                            />
                        </Col>
                        <Row>
                        <Col xs={5}></Col>
                        <Col xs={4}>
                          <button className="btn btn-action button"
                              onClick={this.handleFormSubmit}
                            >
                              Add Ride Data
                          </button>
                        </Col>
                      </Row>
                    </Row> 
                </form>
              </TabPanel>
              <TabPanel>
                <Row> 
                  <Col xs={7}>
                    <h4 style={{ textAlign: "center", color: "yellow" }}>{parkRidename}</h4>
                  </Col>
                </Row>
                <Row>
                  <Col xs={1}></Col>
                  <Col xs={2}></Col>
                  <Col xs={2}> 
                    <h6 className="textColour">Times Ridden</h6>
                  </Col>
                  <Col xs={2}></Col>
                  <Col xs={2}> 
                    <h6 className="textColour">Comment</h6>
                  </Col>
                </Row>
                <Row>
                    <Col xs={2}></Col>
                    <Col xs={4}>
                      <h6 style={{ textAlign: "center", color: "yellow" }}>Ratings you gave</h6>
                    </Col>
                    <Col xs={3}></Col>
                    <Col xs={1}>
                      <h6 style={{ color: "yellow" }}>Wait Time</h6>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={2}></Col>
                    <Col xs={4}>
                      <ColumnChart colors={["#fff"]} xtitle="Rating" ytitle="Count" data={ratings} />
                    </Col>
                    <Col xs={2}></Col>
                    <Col xs={4}>
                      <ColumnChart colors={["#fff"]} xtitle="Date" ytitle="Wait Time" data={waittimes} />
                    </Col>
                  </Row>
              </TabPanel>
              <TabPanel>
                <Row>
                  <Col xs={1}></Col>
                  <Col xs={3}>
                    <h5 className="textColour">On All Parks</h5>
                  </Col>
                  <Col xs={1}></Col>
                  <Col xs={3}> 
                    <h5 className="textColour">At this park</h5>
                  </Col>
                  <Col xs={1}></Col>
                  <Col xs={3}> 
                    <h5 className="textColour">On this ride</h5>
                  </Col>
                </Row>
              </TabPanel>
            </Tabs >
          </div>
        </Logo>
        <ModalConductor history={this.props.history} handleModal={this._handleModal} status={this.state.modalStatus} type={this.state.modalType}/>
      </div>
    );
  }
}