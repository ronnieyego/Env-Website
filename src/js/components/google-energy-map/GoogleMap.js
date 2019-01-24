import React from 'react';
import { compose, withProps, withStateHandlers } from 'recompose'
import { 
    withScriptjs,
    withGoogleMap,
    GoogleMap, InfoWindow, Marker } from 'react-google-maps';
import Circle from './Circle';
import { getZoomLevel } from '../local-energy/utils';
import { plantTypes, getAdjustedRadiusForZoom } from './utils';


const GOOGLE_TOKEN = 'AIzaSyCuyOzMc7yLNeb45cdmaLI3ZI0ef6080r0';
const GOOGLE_MAP_URL = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_TOKEN}&v=3.exp&libraries=geometry,drawing,places`;

const infoWindow = marker => {
    return (
        <div className="map-google-info-window">
            <p className="map-google-info-window-utility">Utility: {marker.utilityName}</p>
            <p className="map-google-info-window-plant">Plant: {marker.name}</p>
            <p className="map-google-info-window-plant">Energy Type: {plantTypes[marker.primaryFuel].display}</p>
            <p className="map-google-info-window-amount">Production: {marker.total} MW</p>
        </div>
    )
};


const MapContainer = class MapContainer extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedMarker: null
        }
    }
    handleMarkerClick = (marker, event) => {
        this.setState({ selectedMarker: marker })
    }

    unselectAllInfoWindows() {
        this.setState({
            selectedMarker: null
        })
    }

    makeCircles(mainSources) {
        return mainSources.map((source, i) => {
            try {
                source.radius = Math.log(source.total) * this.props.sizeMultiplier;
                return (<Circle
                        key={`${source.name}-circle-${i}`}
                        source={source}
                        onClick={this.handleMarkerClick}
                    />);
            } catch {
                console.log('BAD Source', source);
                return null;
            }
            
        });
    }



    render() {
        const zoomLevel = getZoomLevel(this.props.maxDistance);
        const selectedMarker = this.state.selectedMarker;
        return (
            <GoogleMap 
                defaultZoom={zoomLevel}
                defaultCenter={this.props.startingCoords}
                onClick={this.unselectAllInfoWindows.bind(this)}
            >
                {selectedMarker && <InfoWindow
                    position={{ lat: parseFloat(selectedMarker.lat, 10), lng: parseFloat(selectedMarker.long, 10) }}
                    children={infoWindow(selectedMarker)}
                    onCloseClick={this.unselectAllInfoWindows.bind(this)}
                /> }
                
                { this.makeCircles(this.props.circlesToRender) }
                
            </GoogleMap>
        );
    }
}
 
export default compose(
    withProps(props => ({
        googleMapURL: GOOGLE_MAP_URL,
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement:<div className="google-map-container" style={{ height: props.height || null }} />,
        mapElement:<div style={{ height: `100%` }} />,
        maxDistance: props.maxDistance,
        startingCoords: props.startingCoords,
        circlesToRender: props.circlesToRender,
        sizeMultiplier: props.sizeMultiplier || 2500
    })),
    withStateHandlers(() => ({
        isOpen: false,
      }), {
        onToggleOpen: ({ isOpen }) => () => ({
          isOpen: !isOpen,
        })
      }
    ),
    withScriptjs,
    withGoogleMap
  )(props => <MapContainer {...props} />)