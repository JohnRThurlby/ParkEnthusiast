import React from "react";
import "./Logo.css";
//import Background from '../../pages/ridesel.jpg';
//import Background from '../../pages/theme.jpg';
import Background from '../../pages/rides.jpg';
//import Background from '../../pages/abstract.jpg';


const Logo = props => {
  
  return (<div className="logo" style={{opacity: 0.9,  backgroundImage: `url(${Background})` }}>
    {props.children}
  </div>)
};

export default Logo;
