import React, { Component } from "react"


export default class HelpModal extends Component  {
  
  render () {

    return (
      
        <div className="example">
        <h2>Help for Park Enthusiast</h2>
            <p>
              Welcome to the Park Enthusiast Help sometimes.   
            </p>

            <div>
              <button onClick={this.close}>Close</button>
            </div>
        </div>
    )
  }
}