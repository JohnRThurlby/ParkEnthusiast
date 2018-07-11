import React, { Component } from "react"

export default class AboutModal extends Component  {

  closeModal = (status, type) => {
    this.setState ({modalStatus: status, modalType: type})
  }  
  
  render () {

    return (
      
        <div className="example">
        <h2>About Park Enthusiast</h2>
            <p>
              Welcome to the Park Enthusiast. Keep track of your park visits, what rides you have been on and when. 
              Make comments and rate your experiece. Track the actual time you waited in line. 
              As you gather more data, see what your prior wait times have been like.  
            </p>
            <button className="btn btn-action" onClick={() => this.closeModal}>
                Close
            </button>
            
        </div>

    )
  }
}