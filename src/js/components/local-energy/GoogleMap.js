import React from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

const KEY = 'AIzaSyCuyOzMc7yLNeb45cdmaLI3ZI0ef6080r0';

const infoWindow = marker => {
    return (
        <div className="map-google-info-window">
            <p className="map-google-info-window-utility">{marker.utility}</p>
            <p className="map-google-info-window-plant">{marker.name}</p>
            <p className="map-google-info-window-amount">Production: {marker.total} MW</p>
        </div>
    )
}

export class MapContainer extends React.Component {
    constructor() {
        super();
        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
        }
    }

    onMarkerClick(props, marker, e){
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
          })
    }

    onMapClicked(props) {
        if (this.state.showingInfoWindow) {
          this.setState({
            showingInfoWindow: false,
            activeMarker: null
          })
        }
      };


    onInfoWindowClose() {
        console.log('info window closed');
    }
    
    makeMarkers(mainSources) {
        return mainSources.map((source, i) => {
            return (
                <Marker
                    key={`${source.name}-${i}`} 
                    utility={source.utilityName}
                    name={source.name}
                    position={{ lat: source.lat, lng: source.long }} 
                    onClick={this.onMarkerClick.bind(this)}
                    onMouseover={this.onMarkerClick.bind(this)}
                    total={source.total}
                />
            )
        })
    }



    render() {
        return (
            <Map 
                google={this.props.google}
                initialCenter={{
                    lat: 37.277121,
                    lng: -121.986133
                }}
                zoom={12}
                onClick={this.onMapClicked.bind(this)}
            >
     
            { this.makeMarkers(this.props.removedSmallSources)}
     
            <InfoWindow
                marker={this.state.activeMarker}
                visible={this.state.showingInfoWindow}
                children={infoWindow(this.state.selectedPlace)}
            />
            </Map>
        );
    }
}
 
export default GoogleApiWrapper(
    props => ({
      apiKey: KEY,
      mainSources: props.mainSources,
      removedSmallSources: props.removedSmallSources
    }
  ))(MapContainer)