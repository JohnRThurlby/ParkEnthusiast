import React, { Component } from "react"

export default class ContactModal extends Component {
  constructor(props) {
    super(props)
    this.state = { isModalOpen: true }
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.state.isModalOpen} onClose={() => this.closeModal()}>
          <form method="POST" action="/api/email">
            <p className="h4 text-center mb-4">Write to us</p>
            <label htmlFor="defaultFormContactNameEx" className="grey-text">Your name</label>
            <input type="text" id="defaultFormContactNameEx" className="form-control"/>
            
            <br/>
            <label htmlFor="defaultFormContactEmailEx" className="grey-text">Your email</label>
            <input type="email" id="defaultFormContactEmailEx" className="form-control"/>
            
            <br/>
            <label htmlFor="defaultFormContactSubjectEx" className="grey-text">Subject</label>
            <input type="text" id="defaultFormContactSubjectEx" className="form-control"/>
            
            <br/>
            <label htmlFor="defaultFormContactMessageEx" className="grey-text">Your message</label>
            <textarea type="text" id="defaultFormContactMessageEx" className="form-control" rows="3"></textarea>
            
            <div className="text-center mt-4">
              <button className="btn btn-outline-warning" type="submit">Send<i className="fa fa-paper-plane-o ml-2"></i></button>
            </div>

          </form>
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
      width: '50%',
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






// import React, { Component } from "react"

// export default class ContactModal extends Component  {

//   closeModal = (status, type) => {
//     this.setState ({modalStatus: status, modalType: type})
//   }  
  
//   render () {

//     return (
      
//         <div className="example">
//         <form>
//             <p className="h4 text-center mb-4">Write to us</p>
//             <label htmlFor="defaultFormContactNameEx" className="grey-text">Your name</label>
//             <input type="text" id="defaultFormContactNameEx" className="form-control"/>
//             <br/>
//             <label htmlFor="defaultFormContactEmailEx" className="grey-text">Your email</label>
//             <input type="email" id="defaultFormContactEmailEx" className="form-control"/>
//             <br/>
//             <label htmlFor="defaultFormContactSubjectEx" className="grey-text">Subject</label>
//             <input type="text" id="defaultFormContactSubjectEx" className="form-control"/>
//             <br/>
//             <label htmlFor="defaultFormContactMessageEx" className="grey-text">Your message</label>
//             <textarea type="text" id="defaultFormContactMessageEx" className="form-control" rows="3"></textarea>
//             <div className="text-center mt-4">
//               <button className="btn btn-outline-warning" type="submit">Send<i className="fa fa-paper-plane-o ml-2"></i></button>
//             </div>
//           </form>
//         </div>
//     )
//   }
// }