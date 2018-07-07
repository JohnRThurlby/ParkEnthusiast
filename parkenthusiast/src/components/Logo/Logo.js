import React from "react";
import "./Logo.css";
import Background from '../../pages/theme.jpg';

const Logo = props => (
  
  <div className="logo" style={{ backgroundImage: `url(${Background})` }}>
    {props.children}
   </div>
);

export default Logo;
