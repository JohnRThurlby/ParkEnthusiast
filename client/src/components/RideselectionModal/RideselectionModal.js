import React, { Component } from "react"

import ModalConductor from "../ModalConductor"

import API from "../../utils/API";

import { Row, Col } from 'react-bootstrap'

import ComboSelect from 'react-combo-select';
require('../../style.css');

let parkName      = " " 
let parkPhone     = " " 
let parkAddr      = " " 
let parkPic       = " " 
let parkid        = "75" 

let parkhours     = []
let parkprices    = []
let parkrides     = []
let modalUserid   = "1"
let modalParkid   = "75"

export default class RideselectionModal extends Component {
  constructor(props) {
    super(props)
    this.state = { isModalOpen: true, modalUserid: this.props.userid, modalParkid: "74"  }
  }

  state = { 
    modalStatus: false,
    modalType: "",
    park:   {},
    parks:  {},
    hours:  {},
    prices: {},
    rides: {},
    parkid: "",
    options: [],
    selectedOption: null
    
  }
    
  _handleModal = (status, type) => {
    this.setState ({modalStatus: status, modalType: type})
  }

  componentDidMount() {
    this.getPark()
  }

  getPark = () => {
    API.getPark({id: parkid})
      .then(res => {
          console.log(res.data);
          this.setState({ park: res.data });
          parkName  = res.data.parkname 
          parkPhone = res.data.parkphone 
          parkAddr  = " " + res.data.parkaddress1 + ", " + res.data.parkcity + ", " + res.data.parkstate + ", " + res.data.parkzip
          parkPic   = res.data.parkpic
          this.getRides()
        }) 
      .catch(err => console.log(err))
  };

  getHours = () => {
    API.getHours( {parkid: parkid}
    )
    .then(res => {
      console.log(res.data);
      this.setState({ hours: res.data });
      parkhours[0] = "Monday " + res.data.parkmon
      parkhours[1] = "Tuesday " + res.data.parktue
      parkhours[2] = "Wednesday " + res.data.parkwed
      parkhours[3] = "Thursday " + res.data.parkthu
      parkhours[4] = "Friday " + res.data.parkfri
      parkhours[5] = "Saturday " + res.data.parksat
      parkhours[6] = "Sunday " + res.data.parksun
      //hourOptions = parkhours
      this.getTickets()
      console.log(parkhours);
    })
      .catch(err => console.log(err))
  };

  getTickets = () => {
    console.log(parkrides);

    API.getTickets(
       {parkid: parkid}
    )
    .then(res => {
      console.log(res.data);
      this.setState({ prices: res.data });
      parkprices[0] = res.data.parkline1
      parkprices[1] = res.data.parkline2
      parkprices[2] = res.data.parkline3
      parkprices[3] = res.data.parkline4
      parkprices[4] = res.data.parkline5
      console.log(parkprices);
      this.getNothing()
    })
      .catch(err => console.log(err))
  };

  getNothing = () => {
    console.log(parkprices);
    API.getPark({id: parkid})
      .then(res => {
        }) 
      .catch(err => console.log(err))
  };

  getRides = () => {
    API.getAllrides( 
      {parkid: parkid}
    )
    .then(res => {
      console.log(res.data);
      this.setState({ rides: res.data });
      for (let i = 0; i < res.data.length; i++){
        let optionsObj   = {}
        optionsObj.value = res.data[i].id
        optionsObj.text  = res.data[i].parkridename
        parkrides.push(optionsObj)
        //parkrides[i] = res.data[i].parkridename
      }
      console.log(parkrides);
      this.getHours()
    })
      .catch(err => console.log(err))
  };

  fakeFunction(value, text) {
    console.log(value, text);
    window.location="/rideinfo?" + modalUserid + "&" + modalParkid + "&" + value
}

  _onSelect = (selectValue) => {
    console.log("in onselect")
    console.log(selectValue)
    if (selectValue) {
      
      window.location="/rideinfo"
    }};
   
  render() {

    return (
      <div>
        <Modal isOpen={this.state.isModalOpen} onClose={() => this.closeModal()}>
          <button type="button" className="fontx close" onClick={() => this.closeModal()} aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <div>
            <Row> 
              <Col xs={12}>
                <h5 style={{ textAlign: "center", color: "black" }}>{parkName}</h5>
              </Col>
            </Row>
            <Row>
              <Col xs={1}></Col>
              <Col xs={1}>
                <h6>Address:</h6>
              </Col>
              <Col xs={5}>
                <h6>{parkAddr}</h6>
              </Col>
              <Col xs={1}>
                <h6>Phone:</h6>
              </Col>
              <Col xs={3}>
                <h6>{parkPhone}</h6>
              </Col>
            </Row>
            <Row>
              <Col xs={8}>
                <Row>
                  <Col xs={1}></Col>
                  <Col xs={2}>
                    <h6>  Park Hours    </h6>
                  </Col>
                  <Col xs={6}>
                    <div className="fontdrop">
                     <ComboSelect data={parkhours} sort="number"  />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col xs={1}></Col>
                  <Col xs={2}>
                      <h6>  Ticket Prices</h6>
                  </Col>
                  <Col xs={6}>
                    <div className="fontdrop">
                      <ComboSelect data={parkprices} sort="number" />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col xs={1}></Col>
                  <Col xs={9}>
                    <h6 style={{ color: "black" }}>Select a ride from the list to see the ride information</h6>
                  </Col>
                </Row>
                <Row>
                  <Col xs={1}></Col>
                  <div className="fontdrop">
                    <ComboSelect data={parkrides} sort="number" type="select" onChange={this.fakeFunction}/>
                  </div>
                </Row> 
              </Col>
              <Col xs={4}>
                    <h5><img src={parkPic} alt="" width="200" height="200"/></h5>
              </Col>
            </Row>  
          </div>
          <ModalConductor handleModal={this._handleModal} status={this.state.modalStatus} type={this.state.modalType}/>
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
      top: '47%',
      left: '50%',
      width: '80%',
      transform: 'translate(-50%, -50%)',
      zIndex: '9999',
      background: 'rgba(255,255,255, 1)'
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
      background: 'rgba(255, 255, 255, 0.2)'
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