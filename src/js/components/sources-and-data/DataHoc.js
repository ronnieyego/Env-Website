import React from "react";
import { connect } from 'react-redux';
import filter from 'lodash/filter';

import { TableRow, TableRowColumn } from 'material-ui/Table';

import Data from './Data';
import { getFoodApplianceRow } from './get-rows-util';
import StateDropdown from '../../components/StateDropdown'

import { utilityEmissionsPerState } from '../../utils/utils-data/state-energy-and-emissions';
import transportationData from './transportation-sources-and-data';

const tdStyle = {
    whiteSpace: 'normal',
    wordWrap: 'break-word'
};

const tdStyleNotes = {
    ...tdStyle,
    width: '50%'
};

@connect((store, props) => {
	return {
        userState: store.userInfo.userState,
        questions: store.footprintForm.questions
	};
})
export default class DataHoc extends React.Component {

    updateStateDropdown(event, index, value) {
        this.props.dispatch({type: 'UPDATE_USER_STATE', payload: value});
    }

    componentDidMount() {
        fetch('/data/temp-footprint-questions.json')  
        .then(function(response) {
            return response.json();     
        })
        .then(questions => {
            this.props.dispatch({ type: 'GET_QUESTIONS', payload: questions.questions })
        });
    }

	render() {
        const co2PerKwh = utilityEmissionsPerState[this.props.userState];
        const applianceHour = filter(this.props.questions, function(o) { return o['use-type'] === 'hour'; });
        const houseHoldQuestions = filter(this.props.questions, function(o) { return o['use-type'] === 'monthly-own' || o['use-type'] === 'monthly-use'; });
        const appliances = applianceHour.concat(houseHoldQuestions);
        const applianceRows = appliances.map(question => getFoodApplianceRow(question, co2PerKwh));

        const foodQuestions = filter(this.props.questions, function(o) { return o['use-type'] === 'serving'; });
        const foodRows = foodQuestions.map(question => getFoodApplianceRow(question, co2PerKwh));

        const transportationRows = transportationData.map(row => {
            return (
                <TableRow>
                    <TableRowColumn style={tdStyle}>{row.description}</TableRowColumn>
                    <TableRowColumn style={tdStyle}>{row.value}</TableRowColumn>
                    <TableRowColumn style={tdStyle}><a href={row.sourceLink} target="_blank">{row.sourceName}</a></TableRowColumn>
                    <TableRowColumn style={tdStyleNotes}>{row.notes}</TableRowColumn>
                </TableRow>
            );
        });
        
		return (
            <Data 
                applianceRows={applianceRows}    
                co2PerKwh={co2PerKwh} 
                dispatch={this.props.dispatch}
                foodRows={foodRows}
                updateStateDropdown={this.updateStateDropdown}
                userState={this.props.userState}
                transportationRows={transportationRows}
            />
        );
	}
}
