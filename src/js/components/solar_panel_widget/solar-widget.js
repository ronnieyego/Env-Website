import React from "react";

import Results from './results'
import costCalc from '../../utils/cost-calc.js';

export default class SolarWidget extends React.Component {
	constructor() {
	    super();
	    this.state = {
	      title: "Welcome",
	      selectedMaterial: 'radio-not-sure',
	      roofSize: 15,
	      sunHours: 6,
	      kwhPrice: 0.75,
	      showResults: false,
	      resultsMessageLine1: '',
	      resultsMessageLine2: '',
	    };

	    //Binding my functions
	    // this.materialRadioButtonClicked = this.materialRadioButtonClicked.bind(this);
	    // this.componentDidMount = this.componentDidMount.bind(this);
	    // this.changeIntInput = this.changeIntInput.bind(this);
	    // this.validateRoofSizeInput = this.validateRoofSizeInput.bind(this);
	    // this.validateSunHoursInput = this.validateSunHoursInput.bind(this);
	    // this.validateKwhInput = this.validateKwhInput.bind(this);
	    // this.calculateElectricitySavings = this.calculateElectricitySavings.bind(this);
	  }

	  componentDidMount = () => {
	    //document.getElementById('roof-size-input').addEventListener('keydown', this.validateRoofSizeInput);
	    //document.getElementById('sun-hours-input').addEventListener('keydown', this.validateSunHoursInput);
	    //document.getElementById('kwh-input').addEventListener('keydown', this.validateKwhInput);
	  };


	  validateRoofSizeInput = e => {
	  	let newVal = this.changeIntInput(this.state.roofSize, e);
	  	this.setState({roofSize : newVal});
	  }

	  validateSunHoursInput = e =>  {
	  	let newVal = this.changeIntInput(this.state.sunHours, e);
	  	this.setState({sunHours : newVal});
	  }

	  validateKwhInput = e =>  {
	  	let newVal = this.changeIntInput(this.state.kwhPrice.toString(), e);
	  	this.setState({kwhPrice : newVal});
	  }

	  changeIntInput = (currentVal, e) => {
	  	let result = currentVal;
	  	if(e.keyCode === 8) { // Check for backspace
	  		let index = result.length - 1;
	  		result = result.substring(0, index);
	  	}
	  	if(parseInt(e.key) >= 0 || e.keyCode === 190) { // check for any int or .
	  		result = result.toString() + e.key.toString();
	  	}
	  	return result;
	  }

	  calculateElectricitySavings = () => {
		let roofSize = this.state.roofSize;
	    let kwhPrice = this.state.kwhPrice;
	    let sunHours = this.state.sunHours;
	    let wattsPerHour;
	    console.log('material: ', this.state.selectedMaterial);
	    switch(this.state.selectedMaterial){
	    	case 'radio-not-sure':
	    		wattsPerHour = 15;
	    		break;
	    	case 'radio-mono':
	    		wattsPerHour = 14;
	    		break;
	    	case 'radio-poly':
	    		wattsPerHour = 12.6;
	    		break;
	    	case 'radio-thin-film':
	    		wattsPerHour = 6.5;
	    		break;
	    	default:
	    		wattsPerHour = 15;
	    }
	    // Run calculation
	    // Should break out message function from calc cost function
	    const { resultsMessageLine1, resultsMessageLine2 } = costCalc(roofSize, kwhPrice, sunHours, wattsPerHour);
	    this.setState({
	    	showResults: true,
	    	resultsMessageLine1: resultsMessageLine1,
	    	resultsMessageLine2: resultsMessageLine2
	    });
	    this.props.showResults();
	}

	materialRadioButtonClicked = changeEvent => {
	  this.setState({ selectedMaterial: changeEvent.target.id });
	}



	render() {
		return (
			<div id="widget" styles={this.props.widgetHeight}>
				<span id="widget-title">Payback Period for Solar Panels</span>
	            <br></br>
	            <br></br>
	            <span>Type of solar panel</span>
            <br></br>
            <label class="radio-inline"></label>
            	<div class="inline-radio-buttons">
	                <div>
	                    <label class="radio-inline">
	                    <input type="radio" name="survey" id="radio-not-sure" value="Yes" checked={this.state.selectedMaterial === 'radio-not-sure'} onChange={this.materialRadioButtonClicked}></input>
	                    Not Sure
	                  </label>
	                    <label class="radio-inline">
	                    <input type="radio" name="survey" id="radio-mono" value="No" checked={this.state.selectedMaterial === 'radio-mono'} onChange={this.materialRadioButtonClicked}></input>
	                    Monocrystalline
	                  </label>
	                </div>
	                <div>
	                  <label class="radio-inline">
	                    <input type="radio" name="survey" id="radio-poly" value="No" checked={this.state.selectedMaterial === 'radio-poly'} onChange={this.materialRadioButtonClicked}></input>
	                    Polycrystalline
	                  </label>
	                  <label class="radio-inline">
	                    <input type="radio" name="survey" id="radio-thin-film" value="No" checked={this.state.selectedMaterial === 'radio-thin-film'} onChange={this.materialRadioButtonClicked}></input>
	                    Thin Film
	                  </label>
	                </div>
	            </div>

				<div>
	                <div class="form-group">
	                  <label for="roof-size">Square footage of solar panels</label>
	                  <input type="text" class="form-control" id="roof-size-input" value={this.state.roofSize + ' sqft'} onChange={() => {}} onKeyDown={this.validateRoofSizeInput}/>
	                </div>
	                <div class="form-group">
	                  <label for="sun-hours">Hours of Sun/day</label>
	                  <input type="text" class="form-control" id="sun-hours-input" value={this.state.sunHours + ' hours'} onChange={() => {}} onKeyDown={this.validateSunHoursInput}/>
	                </div>
	                <div class="form-group">
	                  <label for="kwh">Cost/kwH:</label>
	                  <input type="text" class="form-control" id="kwh-input" value={'$' + this.state.kwhPrice} onChange={() => {}} onKeyDown={this.validateKwhInput}/>
	                </div>
	            </div>

	            <button type="button" class="btn" onClick={this.calculateElectricitySavings}>Calculate Electricity Savings</button>
            		
            		{ this.props.showResults ? <p>{this.state.resultsMessageLine1}</p> : null}
					{ this.props.showResults ? <p>{this.state.resultsMessageLine2}</p> : null}
            </div>
		);
	}

	// { this.props.showResults ? <Results resultsMessageLine1={this.state.resultsMessageLine1} resultsMessageLine2={this.state.resultsMessageLine2}/> : null }
}