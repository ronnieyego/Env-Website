import React from "react";
import { connect } from 'react-redux';

import RaisedButton from 'material-ui/RaisedButton';
import Header from '../../components/header/HeaderHoc';

import ResultsPieChart from '../../components/footprint-calculator/results/ResultsPieChart';
import ResultOptionButtons from '../../components/footprint-calculator/results/ResultOptionButtons';
import FacebookShare from '../../components/footprint-calculator/results/FacebookShare';
import PersonalBreakdown from '../../components/footprint-calculator/results/PersonalBreakdown';
import Compare from '../../components/footprint-calculator/results/Compare';
import Savings from '../../components/footprint-calculator/results/Savings';
import Facts from '../../components/footprint-calculator/results/Facts';
import HowMuchCo2 from '../../components/how-much-co2/HowMuchCo2';

@connect((store, props) => {
	return {
        answerId: store.footprintFormAnswers.answerId,
        questions: store.footprintForm.questions,
        userState: store.footprintFormAnswers.userState,
        results: store.footprintFormAnswers.formResults,
        resultsShown: store.footprintFormAnswers.resultsShown,
        resultsUnit: store.footprintFormAnswers.resultsUnit,
		averageAmerican: store.averageAmerican.averageAmerican,
		averageAmericanState: store.averageAmerican.averageAmericanState,
		averageAmericanAge: store.averageAmerican.averageAmericanAge,
        averageAmericanGender: store.averageAmerican.averageAmericanGender
	};
})
export default class Results extends React.Component {
	render() {
        const res = this.props.results;
        const monthlyEnergyUse = parseInt(res.energy.totalEnergy);
        const monthlyCo2Use = parseInt(res.co2.totalCo2);
        const monthlyWaterUse = parseInt(res.water.totalWater);
        let shownResults;
        switch(this.props.resultsUnit + '-' + this.props.resultsShown) {
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
            default:
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
        }

		return (
            <div className="container-fluid text-center">
                <div className="share-page">
                    <h1 ><b>What's my environmental footprint?</b></h1>
                    <span className="results-title">
                        This person <b><HowMuchCo2 co2={monthlyCo2Use} /></b> pounds of CO<sub>2</sub> and uses <b>{monthlyEnergyUse.toLocaleString()} kwhs</b> of energy each month.  <b>{monthlyWaterUse.toLocaleString()}</b> gallons of water are used to support this lifestyle.
                    </span>
                    <div>
                        <div id="top-of-results" />
                            <br />
                            {shownResults}
                            <ResultOptionButtons 
                                answerId={this.props.answerId}
                                dispatch={this.props.dispatch} 
                                resultsShown={this.props.resultsShown}
                                resultsUnit={this.props.resultsUnit}
                                shareResults={false}
                            />
                        </div>
                    <br />
                    
                    <Facts />
                </div>
            </div>
		);
	}
};
