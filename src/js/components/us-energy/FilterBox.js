import React from "react";
import PropTypes from 'prop-types'
import Checkbox from 'material-ui/Checkbox';
import { 
    getSourceCssName, 
    getProducerDisplayname, 
    getSourceDisplayname 
} from '../../utils/nameMaps.js';

const sourceButtonBorders = ['red', 'blue', 'lightgrey', 'orange', 'black', 'yellow', 'green'];
export default class FilterBox extends React.Component {

    static propTypes = {
        dispatch: PropTypes.func,
        renderMap: PropTypes.func,
        filterType: PropTypes.string,
        filterArray: PropTypes.array,
        currentSources: PropTypes.array,
        currentUtilities: PropTypes.array
    }

    getFilterOptions(filterType, filterArray, currentSelected) {
        const sources = filterArray.sort();
        const displayNameFunc = filterType === 'source' ? getSourceDisplayname : getProducerDisplayname;
        const list = sources.map((filter, index) => {
        const buttonStyle = filterType === 'source' ? {fill: sourceButtonBorders[index]} : {};
            return (
                <li>
                    <Checkbox 
                        label={displayNameFunc(filter)} 
                        key={filter}
                        value={filter}
                        checked={currentSelected.indexOf(filter) !== -1}
                        className="us-energy-map-filter-button-item"
                        iconStyle={buttonStyle}
                        onClick={this.updateFilter.bind(this, filterType)}
                    />
                </li> 
            );
        });
        return list;
    }

    updateFilter(filterType, e) {
        let source = e.target.value;
        let current = this.props.currentSelected;
        let index = current.indexOf(source);
        if(index !== -1) { // source is active.  Remove it from currentSelected
            current.splice(index, 1);
        } else {
            current.push(source);
        }
        if (filterType === 'source') {
            this.props.dispatch({type: 'SET_CURRENT_SOURCES', payload: current});
            this.props.renderMap({sources: current});
        } else {
            this.props.dispatch({type: 'SET_CURRENT_UTILITIES', payload: current});
            this.props.renderMap({utilites: current});
        }
    }

	render() {
        const title = this.props.filterType === 'source' ? 'Filter by energy source' : 'Filter by production type';
        const filterButtons = this.getFilterOptions(this.props.filterType, this.props.filterArray, this.props.currentSelected);
        
		return (
            <form class="us-energy-map-filter-button">
                <ul className="us-energy-map-filter-button-text"><b>{title}</b>{filterButtons}</ul>
            </form>
		);
	}
}


