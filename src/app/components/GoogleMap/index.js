import React from 'react';
import { connect } from 'react-redux';
import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";

const MapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDdHlV_LZP77DvMpPHVi7TRoPlB4_lYirE&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) => {
  const MarkerList = props.MarkerList.map(marker => (<Marker key={marker.lat+marker.lng} position={{ lat: marker.lat, lng: marker.lng }} />))
  let MapPosition = { lat: 47.081925, lng: 2.393828 };
  if (props.MarkerList.length > 0) { 
    MapPosition = { lat: props.MarkerList[0].lat, lng: props.MarkerList[0].lng }; 
  }
  return (
    <GoogleMap
      defaultZoom={13}
      defaultCenter={MapPosition}
      center={MapPosition}
    >
      {MarkerList}
    </GoogleMap>
  );
});

const mapStateToProps = state => {
  return { listMarkers: state.stations.listStations };
};

class CyclingMap extends React.PureComponent {

  extractCoordinate() {
    if (this.props.listMarkers !== null) {
      return this.props.listMarkers.map(marker => ({ lat: marker.position.lat, lng: marker.position.lng }))
    }
    return [];
  }

  render() {
    return (
      <MapComponent
        MarkerList={this.extractCoordinate()}
      />
    )
  }
}

export default connect(mapStateToProps)(CyclingMap);