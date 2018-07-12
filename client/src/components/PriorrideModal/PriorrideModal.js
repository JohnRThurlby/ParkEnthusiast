import React, { Component } from "react"

import ModalConductor from "../ModalConductor"

import { Row, Col } from 'react-bootstrap'

import Container from "../Container"

import Logo from "../Logo";
import StarRatingComponent from 'react-star-rating-component';
import ReactChartkick, { ColumnChart } from 'react-chartkick'
import Chart from 'chart.js'

ReactChartkick.addAdapter(Chart)

export default class PriorrideModal extends Component {
  constructor(props) {
    super(props)
    this.state = { isModalOpen: true }
    this.state = {
      rating: 1
    }
  }

  state = { 
    modalStatus: false,
    modalType: ""
  }
    
  _handleModal = (status, type) => {
    this.setState ({modalStatus: status, modalType: type})
  }
      
  onStarClick(nextValue, prevValue, name) {
    this.setState({rating: nextValue});}
  
  render() {

    const { rating } = this.state;

    return (
      <div>
        <Modal isOpen={this.state.isModalOpen} onClose={() => this.closeModal()}>
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
          <ModalConductor handleModal={this._handleModal} status={this.state.modalStatus} type={this.state.modalType}/>
        </div>
        <p><button className="btn btn-action" onClick={() => this.closeModal()}>Close</button></p>
        </Modal>
      </div>
    )
  }

  openModal() {
    this.setState({ isModalOpen: true })
  }

  closeModal() {
    this.setState({ isModalOpen: false })
  }
}

class Modal extends React.Component {
  render() {
    if (this.props.isOpen === false)
      return null

    let modalStyle = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: '60%',
      transform: 'translate(-50%, -50%)',
      zIndex: '9999',
      background: 'rgba(255,255,255, 0.7)'
    }

    if (this.props.width && this.props.height) {
      modalStyle.width = this.props.width + 'px'
      modalStyle.height = this.props.height + 'px'
      modalStyle.marginLeft = '-' + (this.props.width/2) + 'px'
      modalStyle.marginTop = '-' + (this.props.height/2) + 'px'
      modalStyle.transform = null
    }

    if (this.props.style) {
      for (let key in this.props.style) {
        modalStyle[key] = this.props.style[key]
      }
    }

    let backdropStyle = {
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: '0px',
      left: '0px',
      zIndex: '9998',
      background: 'rgba(255, 255, 255, 0.5)'
    }

    if (this.props.backdropStyle) {
      for (let key in this.props.backdropStyle) {
        backdropStyle[key] = this.props.backdropStyle[key]
      }
    }

    return (
      <div className={this.props.containerClassName}>
        <div className={this.props.className} style={modalStyle}>
          {this.props.children}
        </div>
        {!this.props.noBackdrop &&
            <div className={this.props.backdropClassName} style={backdropStyle}
                 onClick={e => this.close(e)}/>}
      </div>
    )
  }

  close(e) {
    e.preventDefault()

    if (this.props.onClose) {
      this.props.onClose()
    }
  }
}


















// import React, { Component } from 'react';
// import Logo from "../Logo";
// import StarRatingComponent from 'react-star-rating-component';
// import Container from "../Container"
// import Row from "../Row";
// import Col from "../Col";
// import ReactChartkick, { ColumnChart } from 'react-chartkick'
// import Chart from 'chart.js'

// ReactChartkick.addAdapter(Chart)

// class PriorrideModal extends Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       rating: 1
//     };
    
//   }
  
//   onStarClick(nextValue, prevValue, name) {
//     this.setState({rating: nextValue});}
 
//   render() {

//     const { rating } = this.state;
//     return (
//   <div>
//     <Logo backgroundImage="../../pages/theme.jpg'">
//       <Container>
        
//         <div id="u47_text" className="text-center">
//            <h4>Revenge of the Mummy</h4>
//         </div>

//         <div id="u47_text" className="text-center">
//            <h5>Date of Ride</h5>

//            <h6>1/4/2018</h6>
//         </div>
        
//         <Row>
//           <div id="u47_text" className="text-center">
//             <Col size="sm-4"> </Col>
//             <Col size="sm-3">
//             <Row>
//               <h6>Rating</h6>
//             </Row>  
//             </Col>
//           </div>
//         </Row>
        
//         <Row>
//           <div id="u45_text" className="text-center">
//             <Col size="sm-4"> </Col>
//             <Col size="sm-3">
                
//               <div style={{fontSize: '100'}}>
//                 <StarRatingComponent 
//                   name="rate1" 
//                   starCount={5}
//                   editing={false}
//                   value={rating}
//                   renderStarIcon={() => <span>★</span>}
//                   starColor={"#000"}
//                   emptyStarColor={"#fff"} 
//                 />
//               </div>
//             </Col> 
//           </div>
//         </Row>

//         <Row>
//           <Col size="sm-6"> 
//               <h6 >Times Ridden</h6>
//           </Col>
//           <Col size="sm-5"> 
//               <input type="text" placeholder="Ridden"/>
//           </Col>
//         </Row>

//         <Row>
//           <div id="u45_text" className="text-center">
//             <Col size="sm-5"> </Col>
//             <div>
//               <Col size="sm-2"> 
//                 <h6>Comment</h6>
//               </Col>
//             </div>
//           </div>
//         </Row>

//         <Row>
//           <div id="u45_text" className="text-center">
//             <Col size="sm-2"> </Col>
//             <div>
             
//             </div>
//           </div>
//         </Row>
//         <Row>
//           <Col size="sm-6"> 
//             <h6 >Wait Time</h6>
//           </Col>
//         </Row>
//         <Row>
//           <ColumnChart data={[["5/24/2012", 32], ["7/01/2014", 46], ["9/15/2015", 28], ["4/24/2017", 45], ["1/4/2018", 70]]} />
//         </Row>
         
//       </Container>
     
//     </Logo>
//   </div>
// );
// }
// }

// export default PriorrideModal;