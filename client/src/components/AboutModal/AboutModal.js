import React, { Component } from "react"

import { Row, Col } from 'react-bootstrap'

export default class AboutModal extends Component {
  constructor(props) {
    super(props)
    this.state = { isModalOpen: true }
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.state.isModalOpen} onClose={() => this.closeModal()}>
         
          <button type="button" className="fontx close" onClick={() => this.closeModal()} aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
         
          <Row>
            <Col xs={3}></Col>
            <Col xs={8}>
              <h3>About Park Enthusiast</h3>
            </Col>
          </Row>
          <Row>
            <Col xs={3}></Col>
            <Col xs={6}>
              <p>
                Welcome to the Park Enthusiast. Keep track of your park visits, what rides you have been on and when. 
                Make comments and rate your experiece. Track the actual time you waited in line. 
                As you gather more data, see what your prior wait times have been like.  
              </p> 
            </Col>
          </Row>
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
      width: '30%',
      top: '50%',
      left: '50%',
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

// export default class AboutModal extends Component  {

//   closeModal = (status, type) => {
//     this.setState ({modalStatus: status, modalType: type})
//   }  
  
//   render () {

//     return (
      
//         <div className="example">
//         <h2>About Park Enthusiast</h2>
//             <p>
//               Welcome to the Park Enthusiast. Keep track of your park visits, what rides you have been on and when. 
//               Make comments and rate your experiece. Track the actual time you waited in line. 
//               As you gather more data, see what your prior wait times have been like.  
//             </p>
//             <button className="btn btn-action" onClick={() => this.closeModal}>
//                 Close
//             </button>
            
//         </div>

//     )
//   }
// }