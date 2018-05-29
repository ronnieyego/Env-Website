import React from "react";
import { string, bool, func } from 'prop-types';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';

let stateIds = [
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
        id: string,
        value: string,
        subText: string,
        updateQuestion: func,
        isMobile: bool,
        omitUs: bool
    }
    
	render() {
        if(this.props.omitUs) {
            stateIds = stateIds.filter(e => e !== 'US')
        }

        const dropDownOptions = stateIds.map(state => {
            return <MenuItem 
                key={state}
                primaryText={state}
                value={state}  
            />
        });
        const labelStyle = { paddingRight: '0px', fontWeight: 'bold' };

		return (
            <SelectField
                floatingLabelText={this.props.subText}
                id={this.props.id}
                menuItemStyle={{fontWeight: 'bold'}}
                labelStyle={labelStyle}
                menuStyle={{textAlign: 'center'}}
                onChange={this.props.updateQuestion.bind(this)}
                value={this.props.value}
            >
                {dropDownOptions}
            </SelectField>
		);
	}
};

