import React from "react";
import { array, func } from 'prop-types'
import Checkbox from 'material-ui/Checkbox';
import { plantTypes } from '../google-energy-map/utils';


// I have some extra mappings ex oil and petrolem for the same color and display name.  It causes dupes.
// The ones im deleting aren't in the new data
const dedupedPlantTypes = Object.assign({}, plantTypes);
delete dedupedPlantTypes.hydroelectric;
delete dedupedPlantTypes.petroleum;

const ENERGY_OPTIONS = Object.keys(dedupedPlantTypes);

export default class FilterEnergyType extends React.Component {

    static propTypes = {
        currentSources: array,
        filterEnergySource: func
    }
    updateFilter(e) {
        let source = e.target.value;
        let currentSources = this.props.currentSources;
        let index = currentSources.indexOf(source);
        if(index !== -1) { // source is active.  Remove it from currentSources
            currentSources.splice(index, 1);
        } else {
            currentSources.push(source);
        }
        this.props.filterEnergySource(currentSources);        
    }

	render() {
        const filterButtons = ENERGY_OPTIONS.map((energyOption, index) => {
                return (
                    <div className="us-energy-map-filter-button col-sm-6" key={energyOption}>
                        <Checkbox 
                            label={plantTypes[energyOption].display} 
                            labelStyle={{ marginLeft: '12px' }}
                            value={energyOption}
                            checked={this.props.currentSources.indexOf(energyOption) !== -1}
                            className="us-energy-map-filter-button-item"
                            iconStyle={{ fill: plantTypes[energyOption].color }}
                            onClick={this.updateFilter.bind(this)}
                        />
                    </div> 
                );
            });
        
		return (
            <div class="us-energy-map-filter-button-container">
                <p className="us-energy-map-filter-button-text">Filter by energy source</p>
                <div className="us-energy-map-filter-button-holder row">
                    {filterButtons}
                </div>
                    
            </div>
		);
	}
}


