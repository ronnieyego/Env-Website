import React from "react";
import { connect } from 'react-redux';
import filter from 'lodash/filter';

import { TableRow, TableRowColumn } from 'material-ui/Table';

import Data from '../../components/sources-and-data/Data';
import StateDropdown from '../../components/StateDropdown'

import { utilityEmissionsPerState } from '../../utils/utils-data/state-energy-and-emissions';
import transportationData from '../../components/sources-and-data/transportation-sources-and-data';

@connect((store, props) => {
	return {
        userState: store.userInfo.userState,
        questions: store.footprintForm.questions,
        isMobile: store.userInfo.isMobile
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
        // I think I can make this 1 line with more || 
        const applianceHour = filter(this.props.questions, function(o) { return o['use-type'] === 'hour'; });
        const houseHoldQuestions = filter(this.props.questions, function(o) { return o['use-type'] === 'monthly-own' || o['use-type'] === 'monthly-use'; });
        const applianceQuestions = applianceHour.concat(houseHoldQuestions);
        const foodQuestions = filter(this.props.questions, function(o) { return o['use-type'] === 'serving'; });
        
		return (
            <Data 
                applianceQuestions={applianceQuestions}    
                co2PerKwh={co2PerKwh} 
                dispatch={this.props.dispatch}
                foodQuestions={foodQuestions}
                updateStateDropdown={this.updateStateDropdown}
                userState={this.props.userState}
                transportationData={transportationData}
                isMobile={this.props.isMobile}
            />
        );
	}
}
