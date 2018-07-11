import React, { Component } from 'react';
import Logo from "../Logo";
import StarRatingComponent from 'react-star-rating-component';
import Container from "../Container"
import Row from "../Row";
import Col from "../Col";
import ReactChartkick, { ColumnChart } from 'react-chartkick'
import Chart from 'chart.js'

ReactChartkick.addAdapter(Chart)

class PriorrideModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      rating: 1
    };
    
  }
  
  onStarClick(nextValue, prevValue, name) {
    this.setState({rating: nextValue});}
 
  render() {

    const { rating } = this.state;
    return (
  <div>
    <Logo backgroundImage="../../pages/theme.jpg'">
      <Container>
        
        <div id="u47_text" className="text-center">
           <h4>Revenge of the Mummy</h4>
        </div>

        <div id="u47_text" className="text-center">
           <h5>Date of Ride</h5>

           <h6>1/4/2018</h6>
        </div>
        
        <Row>
          <div id="u47_text" className="text-center">
            <Col size="sm-4"> </Col>
            <Col size="sm-3">
            <Row>
              <h6>Rating</h6>
            </Row>  
            </Col>
          </div>
        </Row>
        
        <Row>
          <div id="u45_text" className="text-center">
            <Col size="sm-4"> </Col>
            <Col size="sm-3">
                
              <div style={{fontSize: '100'}}>
                <StarRatingComponent 
                  name="rate1" 
                  starCount={5}
                  editing={false}
                  value={rating}
                  renderStarIcon={() => <span>★</span>}
                  starColor={"#000"}
                  emptyStarColor={"#fff"} 
                />
              </div>
            </Col> 
          </div>
        </Row>

        <Row>
          <Col size="sm-6"> 
              <h6 >Times Ridden</h6>
          </Col>
          <Col size="sm-5"> 
              <input type="text" placeholder="Ridden"/>
          </Col>
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
             
            </div>
          </div>
        </Row>
        <Row>
          <Col size="sm-6"> 
            <h6 >Wait Time</h6>
          </Col>
        </Row>
        <Row>
          <ColumnChart data={[["5/24/2012", 32], ["7/01/2014", 46], ["9/15/2015", 28], ["4/24/2017", 45], ["1/4/2018", 70]]} />
        </Row>
         
      </Container>
     
    </Logo>
  </div>
);
}
}

export default PriorrideModal;