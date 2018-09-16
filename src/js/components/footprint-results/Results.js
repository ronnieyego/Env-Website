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
        resultsShown: store.footprintFormAnswers.resultsShown
	};
})
export default class Results extends React.Component {
	render() {
		const { monthlyCo2 } = this.props.results;

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
                <div className="results-title">
                    <span>You release <b><HowMuchCo2 co2={monthlyCo2} /></b> pounds of CO<sub>2</sub> each month.</span>
					<p className="results-subtitle" >Use the tools below to compare your footprint, investigate what constitutes your footprint, and ultimately reduce your footprint.</p>
                </div>

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

