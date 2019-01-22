import React from "react";
import { shape, arrayOf, string, number } from 'prop-types';

import GoogleMap from '../google-energy-map/GoogleMap';
import EnergyIntensityComparison from './EnergyIntensityComparison';

import { NAME_MAPPING, SOURCE_NAMES } from './utils';
import analyzeSources from './analyze-sources';


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
                lat: number.isRequired,
                long: number.isRequired,
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
        }).isRequired
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

	render() {
        const sources = this.props.energySources || [];
        const { 
            totals,
            updatedSources,
            mainSources,
            removedSmallSources,
            maxDistance
        } = analyzeSources(sources);
        
        const countyText = this.props.userZipData && this.props.userZipData.county ? `${this.props.userZipData.county} County` : 'your local area';
		return (
			<div className="local-energy-sources-container" >

                <EnergyIntensityComparison 
                    totals={totals}
                    maxDistance={maxDistance}
                    userZipData={this.props.userZipData}
                />

                <br />
                <hr />
                <br />
                <div className="local-energy-map-container">
                    <p className="local-energy-map-title" >Find your local power plants</p>
                    <p className="local-energy-map-text" >Use the map below to see power plants around {countyText}.  You can click on each power plant to find out more information.  To reduce clutter, this map only includes utilities that generate above 1MW of energy.</p>
                    <GoogleMap 
                        circlesToRender={removedSmallSources}
                        maxDistance={maxDistance}
                        userZipData={this.props.userZipData}
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
