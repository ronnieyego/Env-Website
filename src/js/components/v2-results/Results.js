import React from "react";
import { connect } from 'react-redux';

import HowMuchCo2 from '../how-much-co2/HowMuchCo2';
import ResultOptionButtons from './ResultOptionButtons';


import PersonalBreakdown from './PersonalBreakdown';
import Compare from './Compare';
import Savings from './Savings';


@connect((store, props) => {
	return {
		results: store.footprintFormAnswers.formResults,
		questions: store.footprintFormAnswers.questions,
		answerId: store.footprintFormAnswers.answerId,
        userState: store.footprintFormAnswers.userState,
        resultsShown: store.footprintFormAnswers.resultsShown,
	};
})
export default class Results extends React.Component {
	render() {

		const { monthlyCo2 } = this.props.results;

		console.log('Results.props', this.props);

		let results;
		switch(this.props.resultsShown) {
			case 'compare': 
				results = (<Compare />);
				break;
			case 'personalBreakdown':
				results = (<PersonalBreakdown  results={this.props.results} />);
				break;
			case 'savings':
				results = (<Savings 
					results={this.props.results}
					questions={this.props.questions}
					userState={this.props.userState}
				/>);
				break;
			default:
				console.log('ERROR -- Invalid results shown: ', this.props.resultsShown);
		}

		return (
            <div className="results">
                <span className="results-title">
                    You release <b><HowMuchCo2 co2={monthlyCo2} /></b> pounds of CO<sub>2</sub> each month.
                </span>

				<div id="top-of-results">
					{results}		
				</div>
			
				<div>
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

