import React from "react";
import "./Logo.css";

const Logo = props => {
    
  return (<div className="logo" style={{ backgroundImage: `url(${props.backgroundImage})` }}>
    {props.children}
  </div>)
};

export default Logo;
