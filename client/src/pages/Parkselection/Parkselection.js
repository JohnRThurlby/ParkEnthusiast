import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../components/Logo";
import Iframe from 'react-iframe'
import { MenuItem, DropdownButton } from 'react-bootstrap';

const Home = props => (
  <div>
    <Logo backgroundImage="../../pages/theme.jpg'">
      
      <div className="text-center">
        <Iframe url="https://createaclickablemap.com/map.php?&id=72417&maplocation=false&online=true"
          width="1000px"
          height="600px"
          id="clickable"
          className="clickMap"
          display="initial"
          position="relative"
          allowFullScreen/>
      </div>

      <div id="parklist" className="text-center">
        <DropdownButton
            bsSize="medium"
            title="Park List for Florida"
            id="dropdown-size-medium"
            >
            <MenuItem eventKey="1">Universal Islands of Adventure</MenuItem>
            <MenuItem eventKey="2">Universal Studios</MenuItem>
            
        </DropdownButton>
        <Link to="/rideinfo">
                  </Link>
      </div>
      
    </Logo>
  </div>
);

export default Home;
