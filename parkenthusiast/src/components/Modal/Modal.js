import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import "./Modal.css";

const modalRoot = document.getElementById("modal-root")

export default class Modal extends React.Component { 

  constructor(props) {
    super(props)
    this.el = document.createElement("div")
  } 

  onClose = (e) => {
    console.log("BUTTON CLICKED")
    e.stopPropagation();
    this.props.onClose && this.props.onClose(e);
  }
  
  onKeyUp = (e) => {
    // Lookout for ESC key (27)
    if (e.which === 27 && this.props.show){
      this.onClose(e)
    }
  }

  componentDidMount() {
    document.addEventListener("keyup", this.onKeyUp)
    modalRoot.appendChild(this.el)
  }

  componentwillUnmount() {
    document.removeEventListener("keyup", this.onKeyUp)
    modalRoot.removeChild(this.el)
  }

  render () {
    var modalUI = (
      <div className="backdropStyle">
        <div className="modalStyle">
          {this.props.children}
          <div className="footerStyle">
            <button onClick={(e) => {this.onClose(e)}}> 
              Close
            </button>
          </div>
        </div>
      </div>
    )

    if (!this.props.show) {
      return null;
    }
    return ReactDOM.createPortal (
      modalUI, 
      this.el,
    );
  };
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired
}