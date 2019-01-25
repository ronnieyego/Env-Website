import React from "react";
import { connect } from 'react-redux';
import { shape, arrayOf, string, number } from 'prop-types';

import GoogleMap from '../google-energy-map/GoogleMap';
import EnergyIntensityComparison from './EnergyIntensityComparison';

import { NAME_MAPPING, SOURCE_NAMES } from './utils';
import analyzeSources from './analyze-sources';
import { resolveZipCodeEnergySources } from '../../actions/footprint/zip/actions';

@connect(store => {
	return {
		searchDistance: store.localEnergy.searchDistance,
        energySources: store.localEnergy.energySources,
		energySourcesError: store.localEnergy.energySourcesError,
		userZipData: store.userInfo.userZipData
	};
})
export default class LocalEnergyResults extends React.Component {

    static propTypes = {
        energySources: arrayOf(
            shape({
                id: string.isRequired,
                name: string.isRequired,
                utilityName: string.isRequired,
                city: string.isRequired,
                state: string.isRequired,
                zip: string.isRequired,
                county: string.isRequired,
                lat: string.isRequired,
                long: string.isRequired,
                coal: number.isRequired,
                oil: number.isRequired,
                naturalGas: number.isRequired,
                biofuel: number.isRequired,
                solar: number.isRequired,
                wind: number.isRequired,
                geothermal: number.isRequired,
                hydro: number.isRequired,
                nuclear: number.isRequired,
                other: number.isRequired,
                plantType: string.isRequired,
                distance: number.isRequired,
            }).isRequired
        ),
        userZipData: shape({
            zip: string.isRequired,
            population: string,
            city: string,
            county: string,
            state: string,
            lat: string.isRequired,
            long: string.isRequired,
        }).isRequired,
        searchDistance: number.isRequired
    }

    renderEnergySource(source) {
        return (
            <div className="local-energy-source">
                <p className="local-energy-source-name">Utility: {source.utilityName}</p>
                <p className="local-energy-source-name">Plant Name: {source.name}</p>
                <p className="local-energy-source-name">Total MW: {source.total}</p>
                { SOURCE_NAMES.map(key => source[key] ? <p className="local-energy-source-amount">{NAME_MAPPING[key]}: {source[key]}</p> : null)}
            </div>
        )
    }

    updateSearchDistance(e) {
        const id = e.target.id;
        const searchDistance = praseInt(document.getElementById(id).value);
        this.props.dispatch({ type: 'SET_SEARCH_DISTANCE', payload: searchDistance });
        // New distance is greater, need to refetch data
        if( searchDistance > this.props.searchDistance) {
            this.props.dispatch(resolveZipCodeEnergySources({ searchDistance, inputZip: this.props.userZipData.zip }));
        } else { // New distance is smaller, need to filter data
            const energySources = this.props.energySources.filter(source => source.distance <= searchDistance);
            this.props.dispatch({ type: 'SET_LOCAL_ENERGY_DATA', payload: energySources });
        }
    }

	render() {
        const sources = this.props.energySources || [];
        const { 
            totals,
            updatedSources,
            mainSources,
            removedSmallSources,
            maxDistance
        } = analyzeSources(sources);
        const userZipData = this.props.userZipData;
        const startingCoords = { lat: parseFloat(userZipData.lat, 10), lng: parseFloat(userZipData.long, 10)}
        
        const countyText = this.props.userZipData && this.props.userZipData.county ? `${this.props.userZipData.county} County` : 'your local area';
		return (
			<div className="local-energy-sources-container" >
                <EnergyIntensityComparison 
                    totals={totals}
                    maxDistance={maxDistance}
                    userZipData={this.props.userZipData}
                />
                <br /><hr /><br />
                <div>
                    <p className="local-energy-map-title" >Find your local power plants</p>
                    <p className="local-energy-map-text" >Use the map below to see power plants around {countyText}.  You can click on each power plant to find out more information.  To reduce clutter, this map only includes utilities that generate above 1MW of energy.</p>
                    <div class="slidecontainer">
                        <input type="range" min="1" max="800" value={this.props.searchDistance} onChange={this.updateSearchDistance.bind(this)} class="slider" id="search-distance-slider" />
                    </div>
                    <GoogleMap 
                        circlesToRender={removedSmallSources}
                        maxDistance={maxDistance}
                        startingCoords={startingCoords}
                    />
                </div>
                <br />
                <br />
                <br />
                <br />

                <p className="local-energy-sources-container">Main Sources</p>
                { mainSources
                    .sort((a,b) => b.total - a.total)
                    .map(source => this.renderEnergySource(source))
                }
                <br />
                <hr />
                <br />
                <p className="local-energy-sources-container">Other Sources</p>
                { removedSmallSources
                    .sort((a,b) => b.total - a.total)
                    .map(source => this.renderEnergySource(source)) 
                }
                

			</div>
		);
	}
}
