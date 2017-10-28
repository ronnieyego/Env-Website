import React, { PropTypes } from "react";

const stateIds = [
'US',
'AL',
'AK',
'AZ',
'AR',
'CA',
'CO',
'CT',
'DE',
'FL',
'GA',
'HI',
'ID',
'IL',
'IN',
'IA',
'KS',
'KY',
'LA',
'ME',
'MD',
'MA',
'MI',
'MN',
'MS',
'MO',
'MT',
'NE',
'NV',
'NH',
'NJ',
'NM',
'NY',
'NC',
'ND',
'OH',
'OK',
'OR',
'PA',
'RI',
'SC',
'SD',
'TN',
'TX',
'UT',
'VT',
'VA',
'WA',
'WV',
'WI',
'WY'
];

export default class StateDropdown extends React.Component {
    static propTypes = {
        id: PropTypes.string,
        updateQuestion: PropTypes.func
    }
    
	render() {
        const dropDownOptions = stateIds.map(state => {
            if(state === this.props.selected) { // Parent component passes down which value is selected
                return <option key={state} value={state} selected="selected">{state}</option>
            }
            return <option key={state} value={state}>{state}</option>
        })
        
		return (
            <select id={this.props.id} onChange={this.props.updateQuestion.bind(this)} >
                {dropDownOptions}
            </select>
		);
	}
};

