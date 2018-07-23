import React, { Component } from "react"

import ModalConductor from "../ModalConductor"

import API from "../../utils/API";

import { Row, Col } from 'react-bootstrap'

import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

let parkName      = " " 
let parkPhone     = " " 
let parkAddr      = " " 
let parkCtyst     = " " 

let parkhours     = []
let defaultHours  = "Select from list"
let parkprices    = []
let defaultPrices = "Select from list"
let parkrides     = []
let defaultRides  = "Select from list"

export default class RideselectionModal extends Component {
  constructor(props) {
    super(props)
    this.state = { isModalOpen: true }
  }

  state = { 
    modalStatus: false,
    modalType: "",
    park:   {},
    parks:  {},
    hours:  {},
    prices: {}
    
  }
    
  _handleModal = (status, type) => {
    this.setState ({modalStatus: status, modalType: type})
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  componentDidMount() {

    this.getPark()

  }

  getPark = () => {
    API.getPark({id: 75})

      .then(res => {
          console.log(res.data);
          this.setState({ park: res.data });
          parkName  = res.data[0].parkname 
          parkPhone = res.data[0].parkphone 
          parkAddr  = res.data[0].parkaddress1 + ","
          parkCtyst = res.data[0].parkcity + ", " + res.data[0].parkstate + ", " + res.data[0].parkzip
          this.getHours()
        }) 
      .catch(err => console.log(err))
  };

  getHours = () => {
    API.getHours( {parkid: 75}

    )

    .then(res => {
      console.log(res.data);
      this.setState({ hours: res.data });
      defaultHours = "Monday " + res.data.parkmon
      parkhours[0] = "Monday " + res.data.parkmon
      parkhours[1] = "Tuesday " + res.data.parktue
      parkhours[2] = "Wednesday " + res.data.parkwed
      parkhours[3] = "Thursday " + res.data.parkthu
      parkhours[4] = "Friday " + res.data.parkfri
      parkhours[5] = "Saturday " + res.data.parksat
      parkhours[6] = "Sunday " + res.data.parksun
      this.getTickets()
      console.log(parkhours);

    })
      .catch(err => console.log(err))
  };

  getTickets = () => {
    API.getTickets( {parkid: 75}

    //  {parkid: this.state.parkid }
    )
    .then(res => {
      console.log(res.data);
      this.setState({ prices: res.data });
      parkprices[0] = res.data.parkline1
      parkprices[1] = res.data.parkline2
      parkprices[2] = res.data.parkline3
      parkprices[3] = res.data.parkline4
      parkprices[4] = res.data.parkline5
      defaultPrices = res.data.parkline1
      console.log(parkprices);
      this.getRides()
    })
      .catch(err => console.log(err))
  };

  getRides = () => {
    API.getAllrides( {parkid: 75}

    //  {parkid: this.state.parkid }
    )
    .then(res => {
      console.log(res.data);
      this.setState({ parks: res.data });
      for (let i = 0; i < res.data.length; i++){
        parkrides[i] = res.data[i].parkridename
      }
      console.log(parkrides);
    })
      .catch(err => console.log(err))
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

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
          <div className="container">
            <Row> 
              <Col xs={4}> </Col>
              <Col xs={4}>
                <h4>{parkName}</h4>
              </Col>
            </Row>
            <Row>
              <Col xs={1}>
                <h6>Address:</h6>
              </Col>
              <Col xs={6}>
                <h6>{parkAddr}</h6>
              </Col>
              <Col xs={1}></Col>
              <Col xs={1}>
                <h6>Phone:</h6>
              </Col>
              <Col xs={3}>
                <h6>{parkPhone}</h6>
              </Col>
            </Row>
            <Row>
              <Col xs={1}></Col>
              <Col xs={6}>
                <h6>{parkCtyst}</h6>
              </Col>
            </Row>
            <Row>
              <Col xs={1}>
                  <h6>Park Hours</h6>
              </Col>
              <Col xs={4}>
                  <Dropdown options={parkhours} value={defaultHours} />
              </Col>
              <Col xs={2}> </Col>
              <Col xs={1}>
                  <h6>Ticket Prices</h6>
              </Col>
              <Col xs={4}>
                <Dropdown options={parkprices} value={defaultPrices} />
              </Col>
            </Row>
            <Row>
              <Col xs={3}>
                <h6>Select a ride from the list</h6>
              </Col>
              <Col xs={9}>                                  
                <Dropdown options={parkrides} onChange={() => this._onSelect(true)} value={defaultRides} />
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