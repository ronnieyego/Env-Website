import React from "react";

import Header from '../components/Header.js';
import FootprintForm from '../components/footprint-calculator/forms/FootprintForm.js';
import Results from '../components/footprint-calculator/Results.js';

import { getAverage } from '../utils/footprint/get-average-american-footprint';

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
			results: {},
			averageAmerican: getAverage()
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

                            <p>There is a ton of advice on how to lower your ecological footprint, "drive less, turn off your lights, dont' eat meat".  Sure, they're all good ideas, but have drastically different impacts.  One flaw I've found in all of these suggestions is that they take a qualitative approach to a very quantitative problem.</p>
                            <p>The calculator below attempts to give you reasonably accurate insights on your ecological footprint.  The goal is to give you the ability to reduce your footprint in a way that fits with your life.  The form takes about 5 minutes to fill out</p>
                            {formOrResults}
                        </div>
					</div>
					
					
			</div>
		);
	}
}
