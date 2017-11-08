import React from "react";
import { connect } from 'react-redux';
import ResultsPieChart from './ResultsPieChart';

import PersonalBreakdown from './PersonalBreakdown';
import Compare from './Compare';
import Savings from './Savings';
import Facts from './Facts';
import HowMuchCo2 from './HowMuchCo2';

@connect((store, props) => {
	return {
        questions: store.footprintForm.questions,
		results: store.footprintFormAnswers.formResults,
        resultsShown: store.footprintFormAnswers.resultsShown,
		averageAmerican: store.footprintFormAnswers.averageAmerican,
		averageAmericanState: store.footprintFormAnswers.averageAmericanState,
		averageAmericanAge: store.footprintFormAnswers.averageAmericanAge,
		averageAmericanGender: store.footprintFormAnswers.averageAmericanGender
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
        const monthlyWaterUse = parseInt(res.water.totalWater);
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
            case 'water-personalBreakdown':
                shownResults = <PersonalBreakdown 
                    results={this.props.results.water} 
                    category={'water'}
                    />;
                break;
            case 'energy-compare':
                shownResults = <Compare 
                                    results={this.props.results.energy}
                                    averageAmerican={this.props.averageAmerican}
                                    state={this.props.averageAmericanState}
                                    age={this.props.averageAmericanAge}
                                    gender={this.props.averageAmericanGender}
                                    monthlyUse={monthlyEnergyUse}
                                    dispatch={this.props.dispatch}
                                    category={'energy'}
                                />;
                break;
            case 'co2-compare':
                shownResults = <Compare 
                                    results={this.props.results.co2}
                                    averageAmerican={this.props.averageAmerican}
                                    state={this.props.averageAmericanState}
                                    age={this.props.averageAmericanAge}
                                    gender={this.props.averageAmericanGender}
                                    monthlyUse={monthlyCo2Use}
                                    dispatch={this.props.dispatch}
                                    category={'co2'}
                                />;
                break;
            case 'water-compare':
                shownResults = <Compare 
                                    results={this.props.results.water}
                                    averageAmerican={this.props.averageAmerican}
                                    state={this.props.averageAmericanState}
                                    age={this.props.averageAmericanAge}
                                    gender={this.props.averageAmericanGender}
                                    monthlyUse={monthlyWaterUse}
                                    dispatch={this.props.dispatch}
                                    category={'water'}
                                />;
                break;
            case 'energy-savings':
                shownResults = <Savings 
                    results={this.props.results}
                    category={'energy'}
                />
                break;
            case 'co2-savings':
                shownResults = <Savings 
                    results={this.props.results}
                    questions={this.props.questions}
                    category={'co2'}
                />
                break;
            case 'water-savings':
                shownResults = <Savings 
                    results={this.props.results}
                    questions={this.props.questions}
                    category={'water'}
                />
                break;
        }

         

		return (
            <div style={containerStyle}>
                <h1>You use <b>{monthlyEnergyUse.toLocaleString()} kwhs</b> each month.  This releases <b>{monthlyCo2Use.toLocaleString()}</b> pounds of CO<sub>2</sub>.  <b>{monthlyWaterUse.toLocaleString()}</b> gallons of water are used to support your lifestyle.</h1>
                
                <div>
                    <HowMuchCo2 co2={monthlyCo2Use} averageAmerican={this.props.averageAmerican.co2.total} />
                    {/*<h3 style={{textAlign: 'left'}}>These numbers may seem surprisingly large (especially water use). It takes a lot of effort to produce the life we live.  The first step in any debate or action is knowing our current position.</h3>*/}
                    <h2><b>Lets dive a little deeper</b></h2>
                    <table style={tableStyle}>
                        <tr>
                            <td style={tdStyle}><b>CO<sub>2</sub></b></td>
                            <td style={tdStyle}><button type="submit" id="co2-personalBreakdown" onClick={this.switchResult.bind(this)}>My Personal CO<sub>2</sub> Breakdown</button></td>
                            <td style={tdStyle}><button type="submit" id="co2-compare" onClick={this.switchResult.bind(this)}>Compare my emissions</button></td>
                            <td style={tdStyle}><button type="submit" id="co2-savings" onClick={this.switchResult.bind(this)}>Ways to reduce my carbon footprint</button></td>
                        </tr>
                        <tr>
                            <td style={tdStyle}><b>Water</b></td>
                            <td style={tdStyle}><button type="submit" id="water-personalBreakdown" onClick={this.switchResult.bind(this)}>My Personal Water Breakdown</button></td>
                            <td style={tdStyle}><button type="submit" id="water-compare" onClick={this.switchResult.bind(this)}>Compare my water use</button></td>
                            <td style={tdStyle}><button type="submit" id="water-savings" onClick={this.switchResult.bind(this)}>Ways to reduce my water use</button></td>
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

