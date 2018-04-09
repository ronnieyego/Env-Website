import React from "react";
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';

import { BarChart, Bar, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import StateDropdown from '../../StateDropdown';

import { getAverage } from '../../../utils/footprint/get-average-american-footprint';

export default class Compare extends React.Component {
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
        let averageGraphData;
        switch(this.props.category) { // Need total before the next switch.  So 2 switches ><
            case 'energy':
                averageGraphData = this.props.averageAmerican.energy;
                break;
            case 'co2':
                averageGraphData = this.props.averageAmerican.co2;
                break;
            case 'water':
                averageGraphData = this.props.averageAmerican.water;
                break;
        };
        let averageTotal = parseInt(averageGraphData.total);
        let title;
        let units;
        let subtitle;
        let unitText;
        let total;
        switch(this.props.category) {
            case 'energy':
                averageGraphData = this.props.averageAmerican.energy;
                total = res.totalEnergy;
                title = 'Energy';
                units = 'kwhs';
                unitText = 'energy';
                subtitle = `Total energy: ${averageTotal.toLocaleString()} kwhs per month`;
                break;
            case 'co2':
                averageGraphData = this.props.averageAmerican.co2;
                total = res.totalCo2;
                title = 'CO2';
                units = 'lbs/CO2';
                unitText = 'CO2';
                subtitle = `Total CO2: ${averageTotal.toLocaleString()} lb/CO2 per month`;
                break;
            case 'water':
                averageGraphData = this.props.averageAmerican.water;
                total = res.totalWater;
                title = 'Water';
                units = 'gallons';
                unitText = 'water';
                subtitle = `Total water: ${averageTotal.toLocaleString()} gallons per month`;
                break;
        }

        const monthlyUse = this.props.monthlyUse;
        const diff = averageTotal - monthlyUse;
        const percentDiff = ((diff/averageTotal) * 100).toFixed(0);
        const comparisonText = percentDiff > 0 ? `Congratulations you use ${percentDiff}% less ${unitText} than this average American!` : `You use ${percentDiff * -1}% more ${unitText} than this average American`;
        
        const barGraphData = [
            {name: 'Total', You: total, 'Average American': averageTotal},
            {name: 'Appliance', You: parseInt(res.appliance) || 0, 'Average American': parseInt(averageGraphData.appliance)},
            {name: 'Food', You: parseInt(res.food) || 0, 'Average American': parseInt(averageGraphData.food)},
            {name: 'Transportation', You: parseInt(res.transportation) || 0, 'Average American': parseInt(averageGraphData.transportation) || 0}
        ];

        const domainMax = Math.max(5000, total, averageTotal);
        
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
                        <BarChart width={600} height={300} data={barGraphData}
                                margin={{top: 5, right: 30, left: 20, bottom: 5}}
                                className="compare-bar-chart">
                            <XAxis dataKey="name"/>
                            <YAxis type="number" domain={[0, domainMax]} label={{ value: units, angle: -90, position: 'insideLeft' }}/>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <Tooltip/>
                            <Legend wrapperStyle={{marginLeft: '0px'}} />
                            <ReferenceLine y={0} stroke='#000'/>
                            <Bar dataKey="You" fill="#8884d8" />
                            <Bar dataKey="Average American" fill="#82ca9d" />
                        </BarChart>
                    </div>
                </div>   
                
                <div className="average-american-buttons" id="compare-button-container">
                    <div>
                        <b className="average-american-buttons-text">Change State</b>
                        <br />
                        <StateDropdown
                            id="compare-state-dropdown"
                            updateQuestion={this.updateStateDropdown.bind(this)}
                            value={this.props.averageAmericanstate} 
                            subText={''}
                        />
                    </div>
                    <div>
                        <b className="average-american-buttons-text">Change age group</b>
                        <br />
                        <SelectField 
                            id="age-bracket"
                            menuItemStyle={{fontWeight: 'bold'}}
                            menuStyle={{textAlign: 'center'}}
                            onChange={this.updateAgeDropdown.bind(this)}
                            value={this.props.age}
                        >
                            {ageSelects}
                        </SelectField>
                    </div>
                    <div>
                        <b className="average-american-buttons-text">Change gender</b>
                        <br />
                        <SelectField 
                            id="gender"
                            menuItemStyle={{fontWeight: 'bold'}}
                            menuStyle={{textAlign: 'center'}}
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

