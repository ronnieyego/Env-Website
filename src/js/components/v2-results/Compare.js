// Bar chart is broken :(

import React from "react";
import { object, number } from 'prop-types';
import { connect } from 'react-redux';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import BarChart from '../bar-chart/BarChartHoc';

import StateDropdown from '../StateDropdown';

import { getAverage } from '../../utils/footprint/get-average-american-footprint';

@connect((store, props) => {
	return {
        results: store.footprintFormAnswers.formResults,
        averageAmerican: store.footprintFormAnswers.averageAmerican,
        averageAmericanState: store.footprintFormAnswers.averageAmericanState,
        averageAmericanAge: store.footprintFormAnswers.averageAmericanAge,
        averageAmericanGender: store.footprintFormAnswers.averageAmericanGender,
	};
})
export default class Compare extends React.Component {
    static propTypes = {
        results: object,
        monthlyCo2: number
    }

    capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    updateStateDropdown(event, index, value) {
        this.props.dispatch({type: 'UPDATE_AVERAGE_AMERICAN_STATE', payload: value});
        this.updateAverageAmerican(value, null, null);
    }

    updateAgeDropdown(event, index, value) {
        this.props.dispatch({type: 'UPDATE_AVERAGE_AMERICAN_AGE', payload: value});
        this.updateAverageAmerican(null, value, null);
    }

    updateGenderDropdown(event, index, value) {
        this.props.dispatch({type: 'UPDATE_AVERAGE_AMERICAN_GENDER', payload: value});
        this.updateAverageAmerican(null, null, value);
    }

    updateAverageAmerican(stateOrNull, ageOrNull, genderOrNull) {
        const state = stateOrNull || this.props.averageAmericanState;
        const age = ageOrNull || this.props.averageAmericanAge;
        const gender = genderOrNull || this.props.averageAmericanGender;
        const average = getAverage(state, age, gender);
        this.props.dispatch({type: 'UPDATE_AVERAGE_AMERICAN', payload: average});
    }
    
	render() {
        const res = this.props.results;
        const { monthlyCo2 } = res;
        const averageGraphData = this.props.averageAmerican.co2;
        const averageTotal = parseInt(averageGraphData.total) || 999;
        const unitText = 'CO2';

        const diff = averageTotal - monthlyCo2;
        const percentDiff = ((diff/averageTotal) * 100).toFixed(0);
        const comparisonText = percentDiff > 0 ? `Congratulations you use ${percentDiff}% less ${unitText} than this average American!` : `You emit ${percentDiff * -1}% more ${unitText} than this average American`;
        
        const homeSum = parseInt(res.home.monthlyCo2 + res.cooling.monthlyCo2 + res.heating.monthlyCo2 + res.homeActivities.monthlyCo2);

        const barGraphData = [
            {name: 'Total', You: monthlyCo2, 'Average American': averageTotal},
            {name: 'Home', You: homeSum, 'Average American': 333},
            {name: 'Food', You: parseInt(res.food.monthlyCo2) || 0, 'Average American': parseInt(averageGraphData.food) || 50},
            {name: 'Transportation', You: parseInt(res.transportation.totalCo2) || 0, 'Average American': parseInt(averageGraphData.transportation) || 50},
            {name: 'Stuff', You: parseInt(res.stuff.monthlyCo2) || 0, 'Average American': 777}
        ];

        const domainMax = Math.max(5000, monthlyCo2, averageTotal);
        
        const genderSelects = ['male', 'female'].map(gender => <MenuItem key={gender} primaryText={this.capitalize(gender)} value={gender} />);
        const ageRanges = ['American Average', '16-19', '20-34', '35-54', '55-64', '65+'];
        const ageSelects = ageRanges.map(age => <MenuItem key={age} primaryText={age} value={age} />);

		return (
            <div className="average-american">
                <div>
                    <h2>You vs an average American</h2>
                    <p className="average-american-compare">{comparisonText}</p>
                    <p className="average-american-compare-subtext">Use the tool below to compare against different demographics</p>
                    <div className="average-american-flex">
                        <BarChart 
                            graphData={barGraphData}
                            units={'Pounds of CO2'}
                            compare={true}
                            dataKey={'You'}
                            defaultMax={domainMax}
                            mobileHeaders={['Category', 'You (LB of CO2)', 'Average American (LB of CO2)']} 
                        />
                    </div>
                </div>   
                
                <div className="row average-american-buttons" id="compare-button-container">
                    <div className="col-12 col-md-4">
                        <b className="average-american-buttons-text">Change State</b>
                        <br />
                        <StateDropdown
                            id="compare-state-dropdown"
                            updateQuestion={this.updateStateDropdown.bind(this)}
                            value={this.props.averageAmericanState} 
                            subText={''}
                        />
                    </div>
                    <div className="col-12 col-md-4">
                        <b className="average-american-buttons-text">Change age group</b>
                        <br />
                        <SelectField 
                            id="age-bracket"
                            menuItemStyle={{fontWeight: 'bold'}}
                            labelStyle={{ paddingRight: '0px', fontWeight: 'bold' }}
                            menuStyle={{textAlign: 'center'}}
                            onChange={this.updateAgeDropdown.bind(this)}
                            value={this.props.averageAmericanAge}
                        >
                            {ageSelects}
                        </SelectField>
                    </div>
                    <div className="col-12 col-md-4">
                        <b className="average-american-buttons-text">Change gender</b>
                        <br />
                        <SelectField 
                            id="gender"
                            menuItemStyle={{fontWeight: 'bold'}}
                            menuStyle={{textAlign: 'center'}}
                            labelStyle={{ paddingRight: '0px', fontWeight: 'bold' }}
                            onChange={this.updateGenderDropdown.bind(this)}
                            value={this.props.averageAmericanGender}
                        >
                            {genderSelects}
                        </SelectField>
                    </div>
                </div>
            </div>
		);
	}
};

