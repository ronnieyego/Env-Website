import React from "react";
import { connect } from 'react-redux';

import ResultOptionButtons from './ResultOptionButtons';
import PersonalBreakdown from './PersonalBreakdown';
import Compare from './Compare';
import Savings from './Savings';


@connect((store, props) => {
	return {
		results: store.footprintFormAnswers.formResults,
		questions: store.questions.questions,
		answerId: store.footprintFormAnswers.answerId,
        userState: store.footprintFormAnswers.userState,
        resultsShown: store.footprintFormAnswers.resultsShown
	};
})
export default class Results extends React.Component {
	render() {
		let results;
		switch(this.props.resultsShown) {
			case 'compare': 
				results = (<Compare />);
				break;
			case 'personalBreakdown':
				results = (<PersonalBreakdown  results={this.props.results} />);
				break;
			case 'savings':
				results = (<Savings />);
				break;
			default:
				console.log('ERROR -- Invalid results shown: ', this.props.resultsShown);
		}

		return (
            <div className="results">
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

