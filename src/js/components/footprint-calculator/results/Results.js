import React from "react";
import { connect } from 'react-redux';


import { RaisedButton } from 'material-ui';

import FacebookShare from './FacebookShare';
import ResultsPieChart from './ResultsPieChart';
import ResultOptionButtons from './ResultOptionButtons';
import PersonalBreakdown from './PersonalBreakdown';
import Compare from './Compare';
import Savings from './Savings';
import Facts from './Facts';
import HowMuchCo2 from './HowMuchCo2';

@connect((store, props) => {
	return {
        answerId: store.footprintFormAnswers.answerId,
        questions: store.footprintForm.questions,
        userState: store.footprintFormAnswers.userState,
		results: store.footprintFormAnswers.formResults,
        resultsShown: store.footprintFormAnswers.resultsShown,
		averageAmerican: store.footprintFormAnswers.averageAmerican,
		averageAmericanState: store.footprintFormAnswers.averageAmericanState,
		averageAmericanAge: store.footprintFormAnswers.averageAmericanAge,
        averageAmericanGender: store.footprintFormAnswers.averageAmericanGender
	};
})
export default class Results extends React.Component {
    backToResults() {
        this.props.dispatch({type: 'DISPLAY_ANSWERS', payload: false});
    }

	render() {
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
                                    averageAmericanstate={this.props.averageAmericanState}
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
                                    averageAmericanstate={this.props.averageAmericanState}
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
                                    averageAmericanstate={this.props.averageAmericanState}
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
            <div className="results">
                <h1>You use <b>{monthlyEnergyUse.toLocaleString()} kwhs</b> each month.  This releases <b>{monthlyCo2Use.toLocaleString()}</b> pounds of CO<sub>2</sub>.  <b>{monthlyWaterUse.toLocaleString()}</b> gallons of water are used to support your lifestyle.</h1>
                <div>
                    <HowMuchCo2 co2={monthlyCo2Use} averageAmerican={this.props.averageAmerican.co2.total} />
                    {/*<h3 style={{textAlign: 'left'}}>These numbers may seem surprisingly large (especially water use). It takes a lot of effort to produce the life we live.  The first step in any debate or action is knowing our current position.</h3>*/}
                    <h2><b>Lets dive a little deeper</b></h2>
                    <ResultOptionButtons dispatch={this.props.dispatch} />
                </div>
                
                {shownResults}
                <br />
                <div style={{display: 'flex', justifyContent: 'space-around'}}>
                    <RaisedButton onClick={() => this.backToResults()} label="Back to Form" backgroundColor={"lightgrey"} />
                    <a href="/how-your-footprint-was-calculated" target="_blank"><RaisedButton label="How I got my results" backgroundColor={"lightgrey"} /></a>
                    <FacebookShare
                            id={this.props.answerId}
                            displayText="Share on Facebook"
                    />
                </div>
                <br />
                <br />
                
                <Facts />
            </div>
		);
	}
};

