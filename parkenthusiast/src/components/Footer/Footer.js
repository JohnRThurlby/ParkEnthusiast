import React from "react";
import { Link } from "react-router-dom";
import Container from "../Container";
import Row from "../Row";
import Col from "../Col";
import "./Footer.css";

const Footer = () => (
  <footer className="footer">
    <Container style={{ marginTop: 10 }}>
     <Row>
        <Col size="sm-4">
          <div>
            <Link to="/privacy">
              Privacy
            </Link>
          </div>
          <div>
            <Link to="/terms">
            Terms & Conditions
            </Link>
          </div>
          <h6>Park Enthusiast 2018</h6>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
