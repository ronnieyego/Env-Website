import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Header from '../src/js/components/Header.js';
import FootprintFormHoc from '../src/js/components/footprint-calculator/forms/FootprintFormHoc';
import Results from '../src/js/components/footprint-calculator/results/Results.js';

@connect((store, props) => {
	return {
		displayAnswers: store.footprintFormAnswers.displayAnswers,
	};
})
export default class FootprintCalcPage extends React.Component {
	render() {
		let formOrResults = this.props.displayAnswers ? 
			<Results /> 
			: 
			<FootprintFormHoc />;
		return (
			<div className="container-fluid text-center">
				<Header />
				<div>
					<p>{this.props.text}</p>
					<h1>Footprint Finder</h1>
					<div style={{textAlign: 'left'}}>
						{formOrResults}
					</div>
				</div>
			</div>
		);
	}
}
