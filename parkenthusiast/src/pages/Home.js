import React from "react";
import Logo from "../components/Logo";
import { Link } from "react-router-dom";
//import Btn from "../components/Btn";
import Container from "../components/Container"
import Row from "../components/Row";
import Col from "../components/Col";

const Home = props => (
  <div>
    <Logo backgroundImage="../../pages/theme.jpg'">
      <h1>Park</h1>
      <h1>Enthusiast</h1>
      <Container>
        <Row>
          <Col size="md-12">
            <div>
              <button className="btn btn-action">
               
               <div>
                <Link to="/login">
                </Link>
               </div>
               Enter
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    </Logo>
  </div>
);

export default Home;
