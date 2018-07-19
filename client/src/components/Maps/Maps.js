import React, {Component} from "react";

import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
 
export class MapContainer extends Component {
 
  render() {
    return (
      <Map google={this.props.google} zoom={8}>
 
        <Marker onClick={this.onMarkerClick}
                name={'Current location'} />
 
        <InfoWindow onClose={this.onInfoWindowClose}>
            <div>
              <h1>{"Parks"}</h1>
            </div>
        </InfoWindow>
      </Map>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: "AIzaSyDg-vYzGC3fEWIUt7dhItwHdmq8uCe7yGQ"
})(MapContainer)