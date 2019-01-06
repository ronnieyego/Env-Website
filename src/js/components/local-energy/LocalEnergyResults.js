import React from "react";
import { shape, arrayOf, string, number } from 'prop-types';

import { NAME_MAPPING, SOURCE_NAMES } from './utils';
import analyzeSources from './analyze-sources';

export default class LocalEnergy extends React.Component {

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
        )
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
            updatedSources,
            totalEnergy,
            mainSources,
            removedSmallSources
        } = analyzeSources(sources);
        
		return (
			<div className="local-energy-sources-container" >
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
                    .map(source => this.renderEnergySource(source)) }
			</div>
		);
	}
}
