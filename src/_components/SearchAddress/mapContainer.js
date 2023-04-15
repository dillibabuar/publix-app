import React, { Component } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";

const MarkersList = props => {
  const { locations, ...markerProps } = props;
  return (
    <span>
      {locations.map((location, i) => {
        return (
          <Marker
            key={i}
            {...markerProps}
            position={{ lat: location.lat(), lng: location.lng() }}
          />
        );
      })}
    </span>
  );
};

class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: []
    };
    this.handleMapClick = this.handleMapClick.bind(this);
  }

  handleMapClick = (ref, map, ev) => {
    const location = ev.latLng;
    /*  this.setState(prevState => ({
      locations: [...prevState.locations, location]
    })); */
    this.setState(prevState => ({
        locations: [location]
      }));
    map.panTo(location);
  };

  render() {
    return (
      <div className="map-container">
        <Map
          google={this.props.google}
          style={{ width:'71%',height:'300px',padding: '15px'}}
          zoom={this.props.zoom}
          initialCenter={this.props.center}
          onClick={this.handleMapClick}
        >
         <MarkersList locations={this.state.locations} icon="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png" />
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAZNkyssR5FZaUoevJ_NCgyEIPws-7WHZI",
  libraries: []
})(MapContainer);