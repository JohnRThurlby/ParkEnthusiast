import React from "react";

import API from "../../utils/API";

let placeCoords   = []

const Parklatlon = props => {
  API.getParksbyState( 
    {id: props.userState}
  )
    .then(res => {
      for (let i = 0; i < res.data.length; i++)
        {          
          let optionsCoord = {}

          optionsCoord.lat  = res.data[i].parklat
          optionsCoord.lng  = "-" + res.data[i].parklon
          optionsCoord.text = res.data[i].parkname

          placeCoords.push(optionsCoord)
        };
      })
    .catch(err => console.log(err))
  return (
     <div>{props.children}</div>
  )
}

export default Parklatlon
