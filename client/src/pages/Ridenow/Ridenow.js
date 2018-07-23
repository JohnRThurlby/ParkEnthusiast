import React, { Component } from 'react';
import Logo from "../../components/Logo";
import Calendar from 'react-calendar'
import StarRatingComponent from 'react-star-rating-component';
//import { MenuItem, DropdownButton } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap'

export default class RideNow extends Component {

  constructor() {
    super();
 
    this.state = {
      rating: 1
    };
  }
  state = {
    date: new Date(),
  }

  onStarClick(nextValue, prevValue, name) {
    this.setState({rating: nextValue});}
 
  onChange = date => this.setState({ date })

  render() {

    const { rating } = this.state;

    return (
      <div>
        <Logo backgroundImage="../../pages/theme.jpg'">
          <Row> 
            <Col xs={12}>
              <h4 style={{ textAlign: "center", color: "red" }}>Men in Black</h4>
            </Col>
          </Row>
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
            <Col xs={2}> 
               <input className="textColour2" type="text" placeholder="Wait time"/>
            </Col>
            <Row>
              <Col xs={4}></Col>
              <Col xs={4}> 
                <h5 className="textColour">Comment</h5>
              </Col>
              <Row>
                <Col xs={4}></Col>
                <Col xs={4}> 
                  <input className="textColour2" type="textarea" placeholder="Comment"/>
                </Col>
              </Row>
              <Row>
                <Col xs={5}></Col>
                <Col xs={4}>
                  <button className="btn btn-action button"
                    onClick={this.onRideSelect}
                    >
                      Add Ride Data
                  </button>
                </Col>
              </Row>
            </Row>
          </Row>
        </Logo>
      </div>
    );
  }
}