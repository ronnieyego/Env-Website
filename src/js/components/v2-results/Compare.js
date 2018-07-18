// Bar chart is broken :(

import React from "react";
import { object, number } from 'prop-types';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import BarChart from '../bar-chart/BarChartHoc';

import StateDropdown from '../StateDropdown';

import { getAverage } from '../../utils/footprint/get-average-american-footprint';

export default class Compare extends React.Component {
    static propTypes = {
        results: object,
        totalMonthlyCo2: number
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
        const state = stateOrNull || this.props.averageAmericanstate;
        const age = ageOrNull || this.props.age;
        const gender = genderOrNull || this.props.gender;
        const average = getAverage(state, age, gender);
        this.props.dispatch({type: 'UPDATE_AVERAGE_AMERICAN', payload: average});
    }
    
	render() {
        const res = this.props.results;
        const averageGraphData = this.props.averageAmerican.co2;
        const averageTotal = parseInt(averageGraphData.total);
        const title = 'CO2';
        const units = 'pounds of co2';
        const subtitle = `Total CO2: ${averageTotal.toLocaleString()} lb/CO2 per month`;
        const unitText = 'CO2';
        const totalMonthlyCo2 = this.props.totalMonthlyCo2;

        const diff = averageTotal - totalMonthlyCo2;
        const percentDiff = ((diff/averageTotal) * 100).toFixed(0);
        const comparisonText = percentDiff > 0 ? `Congratulations you use ${percentDiff}% less ${unitText} than this average American!` : `You use ${percentDiff * -1}% more ${unitText} than this average American`;
        
        const barGraphData = [
            {name: 'Total', You: totalMonthlyCo2, 'Average American': averageTotal},
            {name: 'Home', You: parseInt(res.home.monthlyCo2) || 0, 'Average American': 333},
            {name: 'Appliance', You: parseInt(res.homeActivities.monthlyCo2) || 0, 'Average American': parseInt(averageGraphData.appliance)},
            {name: 'Cooling', You: parseInt(res.cooling.monthlyCo2) || 0, 'Average American': 111},
            {name: 'Heating', You: parseInt(res.heating.monthlyCo2) || 0, 'Average American': 222},
            {name: 'Food', You: parseInt(res.food.monthlyCo2) || 0, 'Average American': parseInt(averageGraphData.food)},
            {name: 'Transportation', You: parseInt(res.transportation.totalCo2) || 0, 'Average American': parseInt(averageGraphData.transportation) || 0},
            {name: 'Stuff', You: parseInt(res.stuff.monthlyCo2) || 0, 'Average American': 777}
        ];

        const domainMax = Math.max(5000, totalMonthlyCo2, averageTotal);
        
        const genderSelects = ['male', 'female'].map(gender => <MenuItem key={gender} primaryText={this.capitalize(gender)} value={gender} />);
        const ageRanges = ['American Average', '16-19', '20-34', '35-54', '55-64', '65+'];
        const ageSelects = ageRanges.map(age => <MenuItem key={age} primaryText={age} value={age} />);

		return (
            <div className="average-american">
                <div>
                    <h1>You vs an average American</h1>
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
                            value={this.props.averageAmericanstate} 
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
                            value={this.props.age}
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
                            value={this.props.gender}
                        >
                            {genderSelects}
                        </SelectField>
                    </div>
                </div>
            </div>
		);
	}
};

