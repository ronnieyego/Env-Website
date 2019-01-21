import React from 'react';
import { compose, withProps, withStateHandlers } from 'recompose'
import { 
    withScriptjs,
    withGoogleMap,
    GoogleMap, InfoWindow, Marker, Circle } from 'react-google-maps';
import { getZoomLevel } from './utils';
import { getSourceDisplayname } from '../../utils/nameMaps';


const KEY = 'AIzaSyCuyOzMc7yLNeb45cdmaLI3ZI0ef6080r0';
const GOOGLE_MAP_URL = `https://maps.googleapis.com/maps/api/js?key=${KEY}&v=3.exp&libraries=geometry,drawing,places`;


const infoWindow = marker => {
    return (
        <div className="map-google-info-window">
            <p className="map-google-info-window-utility">Utility: {marker.utilityName}</p>
            <p className="map-google-info-window-plant">Plant: {marker.name}</p>
            <p className="map-google-info-window-plant">Energy Type: {getSourceDisplayname(marker.primaryFuel)}</p>
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
        console.log('CLICKED HANDLEMARKERCLICKED', marker);
        this.setState({ selectedMarker: marker })
    }

    infoWindowCloseClick() {
        this.setState({
            selectedMarker: null
        })
    }

    onMapClicked(props) {
        this.setState({
            selectedMarker: null
        })
      };

    makeMarkers(mainSources) {
        return mainSources.map((source, i) => {
            return (
                <Marker
                    key={`${source.name}-marker-${i}`} 
                    position={{ lat: source.lat, lng: source.long }} 
                    onClick={this.handleMarkerClick.bind(this, source)}
                >
                    {this.state.selectedMarker === source  && <InfoWindow
                        children={infoWindow(source)}
                    />}
                </Marker>
            );
        });
    }

    makeCircles(mainSources) {
        return mainSources.map((source, i) => (
            <Circle
                key={`${source.name}-circle-${i}`} 
                radius={3200}
                center={{ lat: source.lat, lng: source.long }} 
                onMouseover={() => console.log('mouseover')}
                onClick={this.handleMarkerClick.bind(this, source)}
                onMouseout={() => console.log('mouseout')}
                strokeColor='transparent'
                strokeOpacity={0}
                strokeWeight={5}
                fillColor='#FF0000'
                fillOpacity={0.2}
            />
        ));
    }



    render() {
        const zoomLevel = getZoomLevel(this.props.maxDistance);
        console.log('state is', this.state);
        const selectedMarker = this.state.selectedMarker;
        console.log('selected marker is', selectedMarker);
        return (
            <GoogleMap 
                defaultZoom={zoomLevel}
                defaultCenter={{ lat: parseFloat(this.props.userZipData.lat, 10), lng: parseFloat(this.props.userZipData.long, 10) }}
                onClick={this.onMapClicked.bind(this)}
            >
                {selectedMarker && <InfoWindow
                    position={{ lat: parseFloat(selectedMarker.lat, 10), lng: parseFloat(selectedMarker.long, 10) }}
                    children={infoWindow(selectedMarker)}
                    onCloseClick={this.infoWindowCloseClick.bind(this)}
                /> }
                
     
                {/* { this.makeMarkers(this.props.removedSmallSources, this.props.onMarkerClick)} */}
                { this.makeCircles(this.props.removedSmallSources) }
                
            </GoogleMap>
        );
    }
}
 
export default compose(
    withProps(props => ({
        googleMapURL: GOOGLE_MAP_URL,
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement:<div style={{ height: `400px` }} />,
        mapElement:<div style={{ height: `100%` }} />,
        mainSources: props.mainSources,
        removedSmallSources: props.removedSmallSources,
        maxDistance: props.maxDistance,
        userZipData: props.userZipData
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