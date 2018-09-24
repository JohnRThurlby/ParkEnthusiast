import React from "react";

import API from "../../utils/API";

import ComboSelect from 'react-combo-select';

let options2 = []

let options      = [{value: "59", text: "Big Kahuna's"},
      {value: "60", text: "Busch Gardens Tampa"},
      {value: "61", text: "Daytona Lagoon"},
      {value: "62", text: "Dinosaur World (theme parks)"},
      {value: "63", text: "Kennedy Space Center Visitor Complex"},
      {value: "64", text: "Legoland Florida"},
      {value: "65", text: "Weeki Wachee Springs"}]

const Parks = props => {

  API.getParksbyState( 
    {id: "CA"}
  )
    .then(res => {

      for (let i = 0; i < res.data.length; i++)
        {          
          let optionsObj   = {}

          optionsObj.value  = res.data[i].id.toString()
          optionsObj.label  = res.data[i].parkname
          options2.push(optionsObj)
        };

      })
    .catch(err => console.log(err))
    return (
    <div>
    </div>
   )
}

export default Parks

export {options2}