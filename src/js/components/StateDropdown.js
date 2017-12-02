import React, { PropTypes } from "react";
import { MenuItem, SelectField } from 'material-ui';

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
        value: PropTypes.string,
        updateQuestion: PropTypes.func
    }
    
	render() {
        const dropDownOptions = stateIds.map(state => {
            return <MenuItem 
                key={state}
                primaryText={state}
                value={state}  
            />
        });
        
		return (
            <SelectField
                floatingLabelText={'Choose your state'}
                id={this.props.id}
                menuItemStyle={{fontWeight: 'bold'}}
                menuStyle={{textAlign: 'center'}}
                onChange={this.props.updateQuestion.bind(this)}
                value={this.props.value}
            >
                {dropDownOptions}
            </SelectField>
		);
	}
};

