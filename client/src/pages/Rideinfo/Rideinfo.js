import React from "react";
import Logo from "../../components/Logo";
import { Link } from "react-router-dom";
import Container from "../../components/Container"
import Row from "../../components/Row";
import Col from "../../components/Col";
import { MenuItem, DropdownButton } from 'react-bootstrap';

const Rideinfo = props => (
  <div>
    <Logo backgroundImage="../../pages/theme.jpg'">
      <Container>
        
        <div id="rideinfo" className="text-center">
          <DropdownButton
            bsSize="medium"
            title="Park Rides"
            id="dropdown-size-medium"
            >
            <MenuItem eventKey="1">revenge of the mummy</MenuItem>
            <MenuItem eventKey="2">hollywood rip ride rockit</MenuItem>
            <MenuItem eventKey="3">the simpsons ride</MenuItem>
            <MenuItem eventKey="4">the incredible hulk coaster</MenuItem>
            <MenuItem eventKey="4">the incredible hulk coaster</MenuItem>

          </DropdownButton>
        </div>

        <Row>
          <div id="u47_text" className="text-center">
            <Col size="sm-4"> </Col>
            <Col size="sm-2">
              <h6>Area of Park</h6>
            </Col>
            <Col size="sm-2">
              <p>N/A</p>
            </Col>
          </div>
        </Row>
        
        <Row>
          <div id="u48_text" className="text-center">
            <Col size="sm-4"> </Col>
            <Col size="sm-2">
              <h6>Height Requirements</h6>
            </Col>
            <Col size="sm-2">
              <p>48 in (122 cm)</p>
            </Col>
          </div>
        </Row>

        <Row>
          <div id="u45_text" className="text-center">
            <Col size="sm-4"> </Col>
            <div>
              <Col size="sm-2"> 
              <h6>Duration</h6>
              </Col>
              <Col size="sm-2">
              <h6>Max heigh</h6>
              </Col>
            </div>
          </div>
        </Row>

        <Row>
          <div id="u45_text" className="text-center">
            <Col size="sm-4"> </Col>
            <div>
              <Col size="sm-2"> 
                 <p>4 minutes</p>
              </Col>
              <Col size="sm-2">
                 <p>44.4 ft (13.5 m)</p>
              </Col>
            </div>
          </div>
        </Row>

        <Row>
          <div id="u45_text" className="text-center">
            <Col size="sm-4"> </Col>
            <div>
              <Col size="sm-2"> 
              <h6>Wait Time</h6>
              </Col>
              <Col size="sm-2">
              <h6>Average wait</h6>
              </Col>
            </div>
          </div>
        </Row>

        <Row>
          <div id="u45_text" className="text-center">
            <Col size="sm-4"> </Col>
            <div>
              <Col size="sm-2"> 
                 <p>40 minutes</p>
              </Col>
              <Col size="sm-2">
                 <p>50 minutes</p>
              </Col>
            </div>
          </div>
        </Row>

        <Row>
          <div id="u45_text" className="text-center">
            <Col size="sm-4"> </Col>
            <div>
              <Col size="sm-2"> 
              <h6>Opened</h6>
              </Col>
              <Col size="sm-2">
              <h6>Speed</h6>
              </Col>
            </div>
          </div>
        </Row>

        <Row>
          <div id="u45_text" className="text-center">
            <Col size="sm-4"> </Col>
            <div>
              <Col size="sm-2"> 
                 <p>May 2017</p>
              </Col>
              <Col size="sm-2">
                 <p>45 mph</p>
              </Col>
            </div>
          </div>
        </Row>

        <Row>
          <div id="u45_text" className="text-center">
            <Col size="sm-4"> </Col>
            <div>
              <Col size="sm-2"> 
              <h6>Level</h6>
              </Col>
              <Col size="sm-2">
              <h6>Length</h6>
              </Col>
            </div>
          </div>
        </Row>

        <Row>
          <div id="u45_text" className="text-center">
            <Col size="sm-4"> </Col>
            <div>
              <Col size="sm-2"> 
                 <p>Level, if app</p>
              </Col>
              <Col size="sm-2">
                 <p>2,200 feet</p>
              </Col>
            </div>
          </div>
        </Row>

        <Row>
          <div id="u45_text" className="text-center text-darken-4">
            <Col size="sm-4"> </Col>
            <div>
              <Col size="sm-2"> 
              <h6>Type</h6>
              </Col>
              <Col size="sm-2">
              <p>Steel – Launched – Enclosed</p>
              </Col>
            </div>
          </div>
        </Row>
  
        <div className="text-center">
          <button className="btn btn-action">
            <div>
              <Link to="/ridenow">
              </Link>
            </div>
            Select this Ride
          </button>
        </div>
          
      </Container>
    </Logo>
  </div>
);

export default Rideinfo;
