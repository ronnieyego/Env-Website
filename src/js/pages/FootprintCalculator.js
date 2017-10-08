import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Header from '../components/Header.js';
import FootprintForm from '../components/footprint-calculator/forms/FootprintForm.js';
import Results from '../components/footprint-calculator/results/Results.js';

@connect((store, props) => {
	return {
		text: store.footprintForm.text
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
		let formOrResults = this.state.showResults ? 
			<Results 
				answers={this.state.answers} 
				results={this.state.results} 
				backToForm={this.backToForm} 
				averageAmerican={this.state.averageAmerican} 
			/> 
			: 
			<FootprintForm  
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
