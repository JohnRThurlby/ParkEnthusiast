import React, { Component } from 'react';
import Logo from "../../components/Logo";
import ModalConductor from "../../components/ModalConductor";

import Calendar from 'react-calendar'
import StarRatingComponent from 'react-star-rating-component';
import { Row, Col } from 'react-bootstrap'
import API from "../../utils/API";
import { TextArea } from "../../components/Form";

import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

let parkRidename  = " "
let parkdatelist = []
let defaultDatelist = "Select from list"

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
        for (let i = 0; i < res.data.length; i++)
         {
          parkdatelist[i] = res.data[i].daterode
          };
          defaultDatelist = parkdatelist[0]
         
      })
      .catch(err => console.log(err))
  };

  render() {

    const { rating } = this.state;

    return (
      <div>
        <Logo backgroundImage="../../pages/theme.jpg'">
          <Row> 
            <Col xs={12}>
              <h4 style={{ textAlign: "center", color: "red" }}>{parkRidename}</h4>
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
          <Row>
            <Col xs={3}>
              <h5 className="textColour">Select a date to see your stats</h5>
            </Col>
            <Col xs={3}>                                  
                <Dropdown name="parkdatelist" options={parkdatelist} onChange={() => this._handleModal(true, 'PRIORRIDE')} value={defaultDatelist} />
            </Col>
          </Row>
        </Logo>
        <ModalConductor history={this.props.history} handleModal={this._handleModal} status={this.state.modalStatus} type={this.state.modalType}/>
      </div>
    );
  }
}