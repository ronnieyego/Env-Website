import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Header from '../components/header/HeaderHoc';
import FootprintFormHoc from '../components/footprint-calculator/forms/FootprintFormHoc';
import FootprintFormV2 from '../components/v2-form/forms/FormContainer';
import Results from '../components/footprint-calculator/results/Results.js';

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
			<FootprintFormV2 />;
		return (
			<div className="container-fluid text-center">
				<Header />
				<div className="footprint">
					<h1 id="footprint-finder-page-title"><b>What's my footprint?</b></h1>
					<div style={{textAlign: 'left'}}>
						{formOrResults}
					</div>
				</div>
			</div>
		);
	}
}
