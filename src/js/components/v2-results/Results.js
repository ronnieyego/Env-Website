import React from "react";
import { connect } from 'react-redux';

import HowMuchCo2 from '../how-much-co2/HowMuchCo2';
import ResultOptionButtons from './ResultOptionButtons';

import Compare from './Compare';
import Savings from './Savings';


@connect((store, props) => {
	return {
		results: store.footprintFormAnswers.formResults,
		questions: store.footprintFormAnswers.questions,
		answerId: store.footprintFormAnswers.answerId,
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
	render() {

		const { monthlyCo2 } = this.props.results;

		console.log('Results.props', this.props);
		return (
            <div className="results">
                <span className="results-title">
                    You release <b><HowMuchCo2 co2={monthlyCo2} /></b> pounds of CO<sub>2</sub> each month.
                </span>

				<div>
					<Savings 
						results={this.props.results}
                    	questions={this.props.questions}
					/>
				</div>

				<div>
					Lets click!!
					<ResultOptionButtons 
						dispatch={this.props.dispatch}
						answerId= {this.props.answerId}
						resultsShown= {this.props.resultsShown}
						userState= {this.props.userState}
						shareResults= {true}
					/>
				</div>
            </div>
		);
	}
};

