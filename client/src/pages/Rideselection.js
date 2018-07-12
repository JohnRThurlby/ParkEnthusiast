import React from "react";
import { Link } from "react-router-dom";
import Container from "../components/Container"
import Row from "../components/Row";
import Col from "../components/Col";
import Logo from "../components/Logo";
import { MenuItem, DropdownButton } from 'react-bootstrap';

const RideSelection = props => (
  <div>
    <Logo backgroundImage="../../pages/ridesel.jpg'">
    <Container> 
        <Row>
            <Col size="md-12">     
                <div id="parkname" className="text-center">
                    <h6><span>Adventure Landing</span></h6>
                </div>
                        
                <div id="parkaddr" className="text-center ">
                    <h6><span>1944 Beach Blvd</span></h6><h6><span>Jacksonville Beach, FL 32250</span></h6>
                </div>
                    
                <div id="parkphone" className="text-center ">
                    <h6><span>(904) 246-4386</span></h6>
                </div>
                
                <div id="ticketprices" className="text-center">
                     <DropdownButton
                        bsSize="medium"
                        title="Ticket Prices"
                        id="dropdown-size-medium"
                        >
                        <MenuItem eventKey="1">Full Day Admission 42″ &amp; Above – $32.99</MenuItem>
                        <MenuItem eventKey="2">Full Day Admission Below 42″ – $24.99</MenuItem>
                        <MenuItem eventKey="3">Full Day Spectator Pass – $32.99</MenuItem>
                        <MenuItem eventKey="4">3 and under – FREE</MenuItem>

                    </DropdownButton>
                </div>
                             
                <div id="parkhrlist" className="text-center">
                    <DropdownButton
                        bsSize="medium"
                        title="Park Hours"
                        id="dropdown-size-medium"
                        >
                        <MenuItem eventKey="1">Sunday – Thursday – 10am – 11pm</MenuItem>
                        <MenuItem eventKey="2">Friday &amp; Saturday – 10am – 12am</MenuItem>
                        
                    </DropdownButton>
                </div>
                
                <div className="googleMap text-center">
                        <a href="//maps.google.com/?q={{this.likelocation}}" target="_blank" rel="noopener noreferrer" data-ga-label="Full Map Link" itemprop="map">
                        <img src="//maps.googleapis.com/maps/api/staticmap?zoom=13&amp;size=314x300&amp;maptype=roadmap&amp;markers=color:red%7Ccolor:red%7C{{this.likelocation}}&amp;key=AIzaSyBZyI2NwL198_2YM1ZBlZ3FdDb6JcOnUPI&amp;sensor=false" alt="{{venue_address}} {{city_name}} {{region_abbr}} {{postal_code}}"/>
                        <p>Full Map and Directions</p></a>
                    </div>

                <div className="text-center">
                    <button className="btn btn-action text-center">
                
                        <div>
                            <Link to="/rideinfo">
                            </Link>
                        </div>
                        Select this Park
                    </button>
                </div>
            </Col>
        </Row>
    </Container> 
    </Logo>  
  </div>
   
);

export default RideSelection;
