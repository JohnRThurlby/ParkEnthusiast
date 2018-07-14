import React, { Component } from "react"

import { Row, Col } from 'react-bootstrap'

export default class PrivacyModal extends Component {
  constructor(props) {
    super(props)
    this.state = { isModalOpen: true }
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.state.isModalOpen} onClose={() => this.closeModal()}>
          <Row>
            <Col xs={2}></Col>
            <Col xs={8}>
              <h3>Park Enthusiast Privacy</h3>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <p>Last updated: 7/5/2018</p>    
              <p>My Company, Park Enthusiast, ("us", "we", or "our") operates http://www.parkenthusiast.com (the "Site"). This page informs you of our policies regarding the collection, use and disclosure of Personal Information we receive from users of the Site.</p>
              <p>We use your Personal Information only for providing and improving the Site. By using the Site, you agree to the collection and use of information in accordance with this policy. </p>   
            </Col>
          </Row>

          <h5>Information Collection And Use</h5>
          <Row>
            <Col xs={12}>
            <p> While using our Site, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you. Personally identifiable information may include, but is not limited to your name ("Personal Information"). </p>   
            </Col>
          </Row>
          <h5>Log Data</h5>
          <Row>
            <Col xs={12}>
            <p>Like many site operators, we collect information that your browser sends whenever you visit our Site ("Log Data"). </p>  
            <p>This Log Data may include information such as your computer's Internet Protocol ("IP") address, browser type, browser version, the pages of our Site that you visit, the time and date of your visit, the time spent on those pages and other statistics.</p>
            <p>In addition, we may use third party services such as Google Analytics that collect, monitor and analyze this …</p>
            <p>The Log Data section is for businesses that use analytics or tracking services in websites or apps, like Google Analytics. For the full disclosure section, create your own Privacy Policy.</p>
            </Col>
          </Row>
          <h5>Communications</h5>
          <Row>
            <Col xs={12}>
            <p>We may use your Personal Information to contact you with newsletters, marketing or promotional materials and other information that ...</p>
            <p>The Communications section is for businesses that may contact users via email (email newsletters) or other methods. For the full disclosure section, create your own Privacy Policy.</p>
            </Col>
          </Row>
          <h5>Cookies</h5>
          <Row>
            <Col xs={12}>
            <p>Cookies are files with small amount of data, which may include an anonymous unique identifier. Cookies are sent to your browser from a web site and stored on your computer's hard drive.</p>
            <p>Like many sites, we use "cookies" to collect information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Site.</p>
            </Col>
          </Row>
         <h5>Security</h5>
          <Row>
            <Col xs={12}>
            <p>The security of your Personal Information is important to us, but remember that no method of transmission over the Internet, or method of electronic storage, is 100% secure. While we strive to use commercially acceptable means to protect your Personal Information, we cannot guarantee its absolute security.</p>
          
            </Col>
          </Row>
          <h5>Changes To This Privacy Policy</h5>
          <Row>
            <Col xs={12}>
            <p>This Privacy Policy is effective as of 7/5/2018 and will remain in effect except with respect to any changes in its provisions in the future, which will be in effect immediately after being posted on this page.</p>
            <p>We reserve the right to update or change our Privacy Policy at any time and you should check this Privacy Policy periodically. Your continued use of the Service after we post any modifications to the Privacy Policy on this page will constitute your acknowledgment of the modifications and your consent to abide and be bound by the modified Privacy Policy.</p>
            <p>If we make any material changes to this Privacy Policy, we will notify you either through the email address you have provided us, or by placing a prominent notice on our website.</p>
            </Col>
          </Row>
          <h5>Contact Us</h5>
          <Row>
            <Col xs={12}>
            <p>If you have any questions about this Privacy Policy, please contact us.</p>
            </Col>
          </Row>
          <Row>
            <Col xs={10}></Col>
            <p><button className="btn btn-action" onClick={() => this.closeModal()}>Close</button></p>
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
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: '9999',
      background: 'rgba(255,255,255, 0.7)',
      maxHeight: "100%",
      overflow: "auto"
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