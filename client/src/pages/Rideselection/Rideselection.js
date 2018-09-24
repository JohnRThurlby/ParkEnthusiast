import React, { Component } from "react"

import API from "../../utils/API";

import { Row, Col } from 'react-bootstrap'

import ComboSelect from 'react-combo-select';

import Logo from "../../components/Logo";

require('../../style.css');

let parkName      = " " 
let parkPhone     = " " 
let parkAddr      = " " 
let parkPic       = " " 
let userid        = " " 
let parkid        = " " 
let parkhours     = []
let parkprices    = []
let parkrides     = []
let unrides       = []

export default class Rideselection extends Component {
  
  state = { 
    park:   {},
    parks:  {},
    hours:  {},
    prices: {},
    rides: {},
    options: [],
    parkprices: [],
    selectedOption: null
  }

  componentWillMount() {
    let userinfo = window.location.search;
    let i        = userinfo.indexOf("&")
    userid       = userinfo.substr(1, i - 1)
    parkid       = userinfo.substr(i + 1, 2)

    this.getPark()
    this.getTickets()
    this.getHours()
  }

  getPark = () => {

    API.getPark({id: parkid})
      .then(res => {
          this.setState({ park: res.data });
          parkName  = res.data.parkname 
          parkPhone = res.data.parkphone 
          parkAddr  = " " + res.data.parkaddress1 + ", " + res.data.parkcity + ", " + res.data.parkstate + ", " + res.data.parkzip
          parkPic   = res.data.parkpic
          this.getRides()
        }) 
      .catch(err => console.log(err))
  };

  getRides = () => {
    API.getAllrides( 
      {parkid: parkid}
    )
    .then(res => {
      this.setState({ rides: res.data });
      for (let i = 0; i < res.data.length; i++){
        let optionsObj   = {}
        optionsObj.value = res.data[i].id
        optionsObj.text  = res.data[i].parkridename
        API.getUserbyiddata( 
          { userid: userid + ".com",
            parkid: parkid, 
            rideid: optionsObj.value }
        )
          .then(res => {
            this.setState({ park: res.data });
            if (res.data.length === 0) {
              unrides.push(optionsObj)
            }
            else {
              parkrides.push(optionsObj)
            }
          })
          .catch(
            err => console.log(err)
          )
      }

    })
      .catch(err => console.log(err))
  };

  getHours = () => {
    API.getHours( {parkid: parkid}
    )
    .then(res => {
      this.setState({ hours: res.data });
      parkhours[0] = "Monday " + res.data.parkmon
      parkhours[1] = "Tuesday " + res.data.parktue
      parkhours[2] = "Wednesday " + res.data.parkwed
      parkhours[3] = "Thursday " + res.data.parkthu
      parkhours[4] = "Friday " + res.data.parkfri
      parkhours[5] = "Saturday " + res.data.parksat
      parkhours[6] = "Sunday " + res.data.parksun
    })
      .catch(err => console.log(err))
  };

  getTickets = () => {

    API.getTickets(
       {parkid: parkid}
    )
    .then(res => {
      this.setState({ prices: res.data });
      parkprices[0] = res.data.parkline1
      parkprices[1] = res.data.parkline2
      parkprices[2] = res.data.parkline3
      parkprices[3] = res.data.parkline4
      parkprices[4] = res.data.parkline5
    })
      .catch(err => console.log(err))
  };

  fakeFunction(value, text) {
    window.location="/rideinfo?" + userid + "&" + parkid + "&" + value
  }
   
  render() {

    return (
      <div>
        <Logo backgroundImage={parkPic}>
          <Row> 
            <Col xs={12}>
              <h5 style={{ textAlign: "center", color: "white" }}>{parkName}</h5>
            </Col>
          </Row>
          <Row>
            <Col xs={1}></Col>
            <Col xs={1}>
              <h6 className="textColour">Address:</h6>
            </Col>
            <Col xs={3}>
              <h6 className="textColour">{parkAddr}</h6>
            </Col>
          </Row>
          <Row>
            <Col xs={1}></Col>
            <Col xs={1}>
              <h6 className="textColour">Phone:</h6>
            </Col>
            <Col xs={3}>
              <h6 className="textColour">{parkPhone}</h6>
            </Col>
          </Row>
          <Row>
            <Col xs={1}></Col>
            <Col xs={1}>
              <h6 className="textColour">  Park Hours    </h6>
            </Col>
            <Col xs={2}>
              <div className="fontdrop">
                <ComboSelect data={parkhours} sort="number"  />
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={1}></Col>
            <Col xs={1}>
              <h6 className="textColour">  Ticket Prices</h6>
            </Col>
            <Col xs={2}>
              <div className="fontdrop">
                <ComboSelect data={parkprices} />
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={1}></Col>
            <Col xs={4}>
              <h6 className="textColour">Ridden:</h6>
            </Col>
          </Row>
          <Row>
            <Col xs={1}></Col>
            <Col xs={4}>
              <div className="fontdrop">
                <ComboSelect data={parkrides} type="select" onChange={this.fakeFunction}/>
              </div>
            </Col>
          </Row> 
          <Row>
            <Col xs={1}></Col>
            <Col xs={4}>
              <h6 className="textColour">Unridden:</h6>
            </Col>
          </Row>
          <Row>
            <Col xs={1
            }></Col>
            <Col xs={4}>
              <div className="fontdrop">
                <ComboSelect data={unrides} type="select" onChange={this.fakeFunction}/>
              </div>
            </Col>
          </Row> 
        </Logo>
      </div>
    )
  }
}