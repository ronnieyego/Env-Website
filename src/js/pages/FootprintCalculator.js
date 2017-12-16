import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Header from '../components/Header.js';
import FootprintFormHoc from '../components/footprint-calculator/forms/FootprintFormHoc';
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
			<FootprintFormHoc />;
		return (
			<div className="container-fluid text-center">
				<Header />
				<div className="row footprint">
					<div className="col-sm-2"></div>
					<div className="col-lg-8">
						<p>{this.props.text}</p>
						<h1 id="footprint-finder-page-title"><b>Footprint Finder</b></h1>
						<div style={{textAlign: 'left'}}>
							{formOrResults}
						</div>
					</div>
					<div className="col-sm-2"></div>
				</div>
			</div>
		);
	}
}
