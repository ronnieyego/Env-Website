import React from "react";

import ResultsPieChart from './ResultsPieChart';
import StateDropdown from '../../StateDropdown';

import { getAverage } from '../../../utils/footprint/get-average-american-footprint';

const containerStyle = {
    margin: 'auto',
    textAlign: 'center'
};

const buttonStyles = { // Buttons to change state, age, gender
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: '15px',
    marginTop: '15px'
}

export default class Compare extends React.Component {

    capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    updateQuestion(e) {
        const id = e.target.id;
        const value = document.getElementById(id).value;
        let state = this.props.state;
        let age = this.props.age;
        let gender = this.props.gender;
        if(id === 'compare-state-dropdown') {
            state = value;
            this.props.dispatch({type: 'UPDATE_AVERAGE_AMERICAN_STATE', payload: state});
        } else if( id === 'age-bracket') {
            age = value;
            this.props.dispatch({type: 'UPDATE_AVERAGE_AMERICAN_AGE', payload: age});
        } else if(id === 'gender') {
            gender = value;
            this.props.dispatch({type: 'UPDATE_AVERAGE_AMERICAN_GENDER', payload: gender});
        } 
        const average = getAverage(state, age,gender);
        this.props.dispatch({type: 'UPDATE_AVERAGE_AMERICAN', payload: average});
    }

	render() {
        const averageGraphData = this.props.averageAmerican;
        console.log('in compare. Average american is', averageGraphData);

        const monthlyUse = this.props.monthlyUse;
        const averageTotal = parseInt(averageGraphData.total);
        const diff = averageTotal - monthlyUse;
        const percentDiff = ((diff/averageTotal) * 100).toFixed(0);
        const comparisonText = percentDiff > 0 ? `Congratulations you use ${percentDiff}% less energy than this average American!` : `You use ${percentDiff * -1}% more energy than this average American`;
        

        const res = this.props.results;
        // Personal
        const categoryBreakDownData = [
            {source: 'Appliances', amount: parseInt(res.appliance)},
            {source: 'Food', amount: parseInt(res.food)},
            {source: 'Transportation', amount: parseInt(res.transportation)},
        ];

        // Average American Summary
        
        const averageAmerican = [
            {source: 'Appliance', amount: parseInt(averageGraphData.appliance)},
            {source: 'Food', amount: parseInt(averageGraphData.food)},
            {source: 'Transportation', amount: parseInt(averageGraphData.transportation)}
        ];
        const subtitle = `Total energy: ${averageTotal.toLocaleString()} kwhs per month`;
        
        const genderSelects = ['male', 'female'].map(gender => {
            if(gender === this.props.gender) {
                return <option key={gender} value={gender} selected="selected">{this.capitalize(gender)}</option>
            }
            return <option key={gender} value={gender}>{this.capitalize(gender)}</option>
        })

        const ageRanges = ['American Average', '16-19', '20-34', '35-54', '55-64', '65+'];
        const ageSelects = ageRanges.map(age => {
            if(age === this.props.age) {
                return <option key={age} value={age} selected="selected">{age}</option>
            }
            return <option key={age} value={age}>{age}</option>
        });
                            

		return (
            <div style={containerStyle}>
                <div style={{display:'flex'}}>
                    <ResultsPieChart 
                        graphData={categoryBreakDownData} 
                        title={'Your Energy Breakdown'}
                        subtitle={`Total energy: ${this.props.results.totalEnergy.toLocaleString()} kwhs per month`} 
                        /> 
                    <div id="average-american">
                        <ResultsPieChart 
                            graphData={averageAmerican} 
                            title={'Average American Energy Breakdown'} 
                            subtitle={subtitle}
                            /> 
                    </div>
                </div>   
                <p style={{marginTop:'15px', marginBottom: '15px'}}>{comparisonText}</p>
                <div id="compare-button-container" style={buttonStyles}>
                    <div>
                        <b style={{marginBottom: '5px'}}>Change State</b>
                        <br />
                        <StateDropdown id="compare-state-dropdown" updateQuestion={this.updateQuestion} selected={this.props.state} />
                    </div>
                    <div>
                        <b>Change age group</b>
                        <br />
                        <select id="age-bracket" onChange={this.updateQuestion.bind(this)} selected={this.props.age} >
                            {ageSelects}
                        </select> 
                    </div>
                    <div>
                        <b>Change gender</b>
                        <br />
                        <select id="gender" onChange={this.updateQuestion.bind(this)} selected={this.props.gender} >
                            {genderSelects}
                        </select> 
                    </div>
                </div>
            </div>
		);
	}
};

