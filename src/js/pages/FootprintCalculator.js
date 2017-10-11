import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Header from '../components/Header.js';
import FootprintFormHoc from '../components/footprint-calculator/forms/FootprintFormHoc';
import Results from '../components/footprint-calculator/results/Results.js';

@connect((store, props) => {
	return {
		displayAnswers: store.footprintFormAnswers.displayAnswers,
		results: store.footprintFormAnswers.formResults
	};
})
export default class FootprintCalcPage extends React.Component {
	constructor() {
		super();
		this.displayResults = this.displayResults.bind(this);
		this.backToForm = this.backToForm.bind(this);
		this.state = {
			showResults: false,
			answers: {
				applianceHour: {},
				household: {},
				foodQuestions: {},
				transportation: {}
			},
			results: {}
		}
	}

	displayResults(answers, results) {
		this.setState({
			answers,
			results,
			showResults: true
		});
	}

	backToForm() {
		this.setState({showResults: false});
	}
	
	render() {
		console.log('props', this.props);
		let formOrResults = this.props.displayAnswers ? 
			<Results 
				answers={this.state.answers} 
				results={this.props.results} 
				backToForm={this.backToForm} 
				averageAmerican={this.state.averageAmerican} 
			/> 
			: 
			<FootprintFormHoc  
			displayResults={this.displayResults} 
			data={this.state.answers}
			/>;
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
