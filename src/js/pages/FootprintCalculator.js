import React from "react";

import Header from '../components/Header.js';
import FootprintForm from '../components/footprint-calculator/forms/FootprintForm.js';
import Results from '../components/footprint-calculator/results/Results.js';

export default class FootprintCalcPage extends React.Component {
	
	constructor(props) {
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
                        <h1>Footprint Finder</h1>
                        <div style={{textAlign: 'left'}}>
                            {formOrResults}
                        </div>
					</div>
					
					
			</div>
		);
	}
}
