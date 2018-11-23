import React from "react";
import { string, bool, func, object } from 'prop-types';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import { DROPDOWN_STYLE, UNDERLINE_STYLE, ICON_STYLE } from '../utils/shared-styles/dropdown-style';

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

const style = {
    border: "1px solid black",
    borderRadius: "1rem",
    backgroundColor: '#ffffff'
}
const underlineStyle = {
    opacity: 0
};

const iconStyle = {
    right: '24px'
}

export default class StateDropdown extends React.Component {
    static propTypes = {
        id: string,
        errorText: string,
        value: string,
        subText: string,
        updateQuestion: func,
        isMobile: bool,
        omitUs: bool,
        style: object
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
        const combinedSyle = { ...DROPDOWN_STYLE, ...this.props.style};

		return (
            <SelectField
                errorText={this.props.errorText}
                hintText={'Select your state'}
                id={this.props.id}
                menuItemStyle={{fontWeight: 'bold'}}
                menuStyle={{textAlign: 'center'}}
                onChange={this.props.updateQuestion.bind(this)}
                value={this.props.value}
                errorStyle={{ marginTop: '5px', fontSize: '1rem' }}
                hintStyle={{ fontWeight: 'bold', paddingLeft: '5px'}}
                style={combinedSyle}
                iconStyle={ICON_STYLE}
                underlineStyle={UNDERLINE_STYLE}
            >
                {dropDownOptions}
            </SelectField>
		);
	}
};

