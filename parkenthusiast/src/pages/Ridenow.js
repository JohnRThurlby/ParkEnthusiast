import React, { Component } from 'react';
import Logo from "../components/Logo";
//import { Link } from "react-router-dom";
import Calendar from 'react-calendar'
import StarRatingComponent from 'react-star-rating-component';
import Container from "../components/Container"
import Row from "../components/Row";
import Col from "../components/Col";
import { MenuItem, DropdownButton } from 'react-bootstrap';

class RideNow extends Component {

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
      <Container>
        
        <div id="u47_text" className="text-center">
           <h4>Revenge of the Mummy</h4>
        </div>

        <Row>
          <div id="u47_text" className="text-center">
            <Col size="sm-2"> </Col>
            <Col size="sm-4">
              <h6>Date of Ride</h6>
            </Col>
            <Col size="sm-3">
            <Row>
              <h6>Rating</h6>
            </Row>  
            </Col>
          </div>
        </Row>
        
        <Row>
          <div id="u45_text" className="text-center">
            <Col size="sm-2"> </Col>
            <div>
              <Col size="sm-4"> 
                <Calendar
                  onChange={this.onChange}
                  value={this.state.date}
                />
              </Col>
              <Col size="sm-3">
                <Row>
                  <div style={{fontSize: '100'}}>
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
                </Row>
                <Row>
                  <Col size="sm-6"> 
                     <h6 >Wait Time</h6>
                  </Col>
                </Row>

                <Row>
                  <Col size="sm-5"> 
                     <input type="text" placeholder="Wait time"/>
                  </Col>
                </Row>
              </Col>
            </div>
          </div>
        </Row>
       
        <Row>
          <div id="u45_text" className="text-center">
            <Col size="sm-5"> </Col>
            <div>
              <Col size="sm-2"> 
              <h6>Comment</h6>
              </Col>
            </div>
          </div>
        </Row>

        <Row>
          <div id="u45_text" className="text-center">
            <Col size="sm-2"> </Col>
            <div>
              <Col size="sm-7"> 
                 <input type="textarea" placeholder="Comment"/>
              </Col>
            </div>
          </div>
        </Row>

       
  
        <div className="text-center">
          <button action="POST" className="btn btn-action">
            
            Add New Ride Info
          </button>
        </div>
          
      </Container>

      <Container>
        <div id="u47_text" className="text-center">
           <h4>Prior Ride Visits</h4>
        </div>

        <div id="u47_text" className="text-center">
           <h5>Select Date to see prior rating/comment</h5>
        </div>

        <div id="priorrides" className="text-center">
          <DropdownButton
            bsSize="medium"
            title="Prior Rides"
            id="dropdown-size-medium"
            >
            <MenuItem eventKey="1">5/24/2012</MenuItem>
            <MenuItem eventKey="2">7/1/2014</MenuItem>
            <MenuItem eventKey="3">9/15/2015</MenuItem>
            <MenuItem eventKey="4">4/24/2017</MenuItem>
            <MenuItem eventKey="5">1/4/2018</MenuItem>

          </DropdownButton>
        </div>

      </Container>
    </Logo>
  </div>
);
}
}

export default RideNow;
