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
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            selectedMarker: {}
        }
    }
    handleMarkerClick = (marker, event) => {
        // console.log({ marker })
        this.setState({ selectedMarker: marker })
      }

    onMapClicked(props) {
        this.setState({
            selectedMarker: {}
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
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}
                        children={infoWindow(source)}
                    />}
                </Marker>
            );
        });
    }

    makeCircles(google, mainSources) {
        return mainSources.map((source, i) => (
            <Circle
                key={`${source.name}-circle-${i}`} 
                radius={1200}
                center={{ lat: source.lat, lng: source.long }} 
                onMouseover={() => console.log('mouseover')}
                onClick={() => console.log('mouseclick')}
                onMouseout={() => console.log('mouseout')}
                strokeColor='transparent'
                strokeOpacity={0}
                strokeWeight={5}
                fillColor='#FF0000'
                fillOpacity={0.2}

                // utility={source.utilityName}
                // name={source.name}
                // primaryFuel={source.primaryFuel}
                // total={source.total}
            />
        ));
    }



    render() {
        const zoomLevel = getZoomLevel(this.props.maxDistance);
        console.log('IN MAP COMPONENT.  PROPS ARE', this.props);
        return (
            <GoogleMap 
                defaultZoom={zoomLevel}
                defaultCenter={{ lat: parseFloat(this.props.userZipData.lat, 10), lng: parseFloat(this.props.userZipData.long, 10) }}
                onClick={this.onMapClicked.bind(this)}
            >
     
                { this.makeMarkers(this.props.removedSmallSources, this.props.onMarkerClick)}
                {/* { this.makeCircles(this.props.google, this.props.removedSmallSources) } */}
                
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