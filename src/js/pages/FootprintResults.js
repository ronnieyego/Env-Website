import React from 'react';
import { connect } from 'react-redux';

import Header from '../components/header/HeaderHoc';
import FootprintResults from '../components/footprint-results/Results';
import Hero from '../components/footprint-results/Hero';


@connect((store, props) => {
	console.log(store);
	return {
		results: store.footprintFormAnswers.formResults,
		questions: store.footprintFormAnswers.questions,
		answerId: store.footprintFormAnswers.answerId,
        userState: store.footprintFormAnswers.userState,
		resultsShown: store.footprintFormAnswers.resultsShown,
		isMobile: store.userInfo.isMobile
	};
})
export default class FootprintCalcPage extends React.Component {
	render() {
		const { monthlyCo2 } = this.props.results;
		return (
			<div className="text-center">
				<Header />
				<Hero 
					isMobile={this.props.isMobile}
					monthlyCo2={monthlyCo2}
				/>
				<FootprintResults />
			</div>
		);
	}
}
