import React from "react";
import { connect } from 'react-redux';
import ResultsPieChart from './ResultsPieChart';

import PersonalBreakdown from './PersonalBreakdown';
import Compare from './Compare';
import Savings from './Savings';
import Facts from './Facts';

@connect((store, props) => {
	return {
		results: store.footprintFormAnswers.formResults,
        resultsShown: store.footprintFormAnswers.resultsShown,
		averageAmerican: store.footprintFormAnswers.averageAmerican,
		state: store.footprintFormAnswers.state,
		age: store.footprintFormAnswers.age,
		gender: store.footprintFormAnswers.gender
	};
})
export default class Results extends React.Component {
    
    switchResult(e) {
        const id = e.target.id
        this.props.dispatch({type: 'UPDATE_RESULTS_SHOWN', payload: id});
    }

    backToResults() {
        this.props.dispatch({type: 'DISPLAY_ANSWERS', payload: false});
    }

	render() {
        const containerStyle = {
            margin: 'auto',
            marginLeft: '25px',
            textAlign: 'center'
        };

        const tableStyle = {
            minWidth: '650px',
            width: '100%',
            margin: 'auto'
        }

        const tdStyle = {
            paddingTop: '20px'
        };

        const res = this.props.results;
        const monthlyEnergyUse = parseInt(res.energy.totalEnergy);
        const monthlyCo2Use = parseInt(res.co2.totalCo2);
        let shownResults;
        switch(this.props.resultsShown) {
            case 'energy-personalBreakdown':
                shownResults = <PersonalBreakdown 
                    results={this.props.results.energy} 
                    category={'energy'}
                    />;
                break;
            case 'co2-personalBreakdown':
                shownResults = <PersonalBreakdown 
                    results={this.props.results.co2} 
                    category={'co2'}
                    />;
                break;
            case 'energy-compare':
                shownResults = <Compare 
                                    results={this.props.results.energy}
                                    averageAmerican={this.props.averageAmerican}
                                    state={this.props.state}
                                    age={this.props.age}
                                    gender={this.props.gender}
                                    monthlyUse={monthlyEnergyUse}
                                    dispatch={this.props.dispatch}
                                    category={this.props.category}
                                />;
                break;
            case 'energy-savings':
                shownResults = <Savings 
                    results={this.props.results.energy}
                    category={this.props.category}
                />
                break;
        }

         

		return (
            <div style={containerStyle}>
                <h1>You use <b>{monthlyEnergyUse.toLocaleString()} kwhs</b> each month.  This releases <b>{monthlyCo2Use.toLocaleString()}</b> pounds of CO<sub>2</sub> each month.</h1>
                
                <div>
                    <h2>Lets dive a little deeper</h2>
                    <table style={tableStyle}>
                        <tr>
                            <td style={tdStyle}><b>CO<sub>2</sub></b></td>
                            <td style={tdStyle}><button type="submit" id="co2-personalBreakdown" onClick={this.switchResult.bind(this)}>My Personal CO<sub>2</sub> Breakdown</button></td>
                            <td style={tdStyle}><button type="submit" id="co2-compare" onClick={this.switchResult.bind(this)}>Compare my emissions</button></td>
                            <td style={tdStyle}><button type="submit" id="co2-savings" onClick={this.switchResult.bind(this)}>Ways to reduce my carbon footprint</button></td>
                        </tr>
                        <tr>
                            <td style={tdStyle}><b>Energy</b></td>
                            <td style={tdStyle}><button type="submit" id="energy-personalBreakdown" onClick={this.switchResult.bind(this)}>My Personal Energy Breakdown</button></td>
                            <td style={tdStyle}><button type="submit" id="energy-compare" onClick={this.switchResult.bind(this)}>How I compare to others</button></td>
                            <td style={tdStyle}><button type="submit" id="energy-savings" onClick={this.switchResult.bind(this)}>Ways to reduce my energy</button></td>
                        </tr>
                    </table>
                </div>
                
                {shownResults}
                <br />
                <div style={{display: 'flex', justifyContent: 'space-around'}}>
                    <button onClick={() =>this.backToResults()}>Back to Form</button>
                </div>
                <br />
                <br />
                
                <Facts />
                
                {/* 
                Removed cause it looked bad.  To maybe be added again
                
                <button onClick={this.props.backToForm} >Change your answers</button>
                <div style={{textAlign: 'left'}}>This footprint is incomplete. Future updadates will include
                    <ul>
                        <li>Embodied energy (the energy cost of making your house, car and stuff)</li>
                        <li>Energy use from work</li>
                        <li>Energy use from the public sector and other shared expenditures</li>
                        <li>Water and carbon footprint</li>
                        <li>Things that can affect your footprint (i.e what happens if you go vegan)</li>
                        <li>What you can do to reduce your footprint</li>
                    </ul>
                </div>
                */}
                
            </div>
		);
	}
};

