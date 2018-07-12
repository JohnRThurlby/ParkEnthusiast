import React from "react";
import "./Logo.css";
//import Background from '../../pages/ridesel.jpg';
//import Background from '../../pages/theme.jpg';
import Background from '../../pages/rides.jpg';

const Logo = props => {
  
  return (<div className="logo" style={{ backgroundImage: `url(${Background})` }}>
    {props.children}
  </div>)
};

export default Logo;
