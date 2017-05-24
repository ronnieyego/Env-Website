import React from "react";

import costCalc from '../../utils/cost-calc.js';

export default class SolarWidget extends React.Component {

	{
    "stateId": "WA",
    "stateFullName": "Washington",
    "centsPerKwh": 9.27,
    "percentSun": 47,
    "totalSunHours": 2170,
    "clearDays": 58,
    "totalEnergyConsumption": "2,011.90",
    "fossilFuelTotal": "1,092.30",
    "naturalGas": 319.8,
    "petroleum": 696,
    "coal": 76.5,
    "nuclear": 99.3,
    "renewableTotal": 947.9,
    "renewablePercent": 0.47,
    "hydroElectric": 755.7,
    "solar": 0.9,
    "biofuels": 121.1,
    "geothermal": 1.1,
    "wind": 69.1
  }

	constructor(props) {
	    super();
	    this.state = {
	      title: "Welcome",
	      selectedMaterial: 'radio-not-sure',
	      roofSize: 15,
	      sunHours: props.sunHours || 6,
	      kwhPrice: props.kwhPrice || 0.927,
	      averageCO2PerKwh: props.averageCO2PerKwh || 6,
	      showResults: false,
	      resultsMessageLine1: '',
	      resultsMessageLine2: '',
	    };

	  	if(typeof window !== 'undefined') {
	  		console.log('window state', window.__STATE__);
	  		this.state.sunHours = window.__STATE__.sunHours;
	  	}  
	  };


	  validateRoofSizeInput(e) {
	  	let newVal = this.changeIntInput(this.state.roofSize, e);
	  	this.setState({roofSize : newVal});
	  }

	  validateSunHoursInput(e) {
	  	let newVal = this.changeIntInput(this.state.sunHours, e);
	  	this.setState({sunHours : newVal});
	  }

	  validateKwhInput(e) {
	  	let newVal = this.changeIntInput(this.state.kwhPrice.toString(), e);
	  	this.setState({kwhPrice : newVal});
	  }

	  changeIntInput(currentVal, e)  {
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

	  calculateElectricitySavings() {
	  	console.log(this.state);
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

	materialRadioButtonClicked(changeEvent) {
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
	                    <input type="radio" name="survey" id="radio-not-sure" value="Yes" checked={this.state.selectedMaterial === 'radio-not-sure'} onChange={this.materialRadioButtonClicked.bind(this)}></input>
	                    Not Sure
	                  </label>
	                    <label class="radio-inline">
	                    <input type="radio" name="survey" id="radio-mono" value="No" checked={this.state.selectedMaterial === 'radio-mono'} onChange={this.materialRadioButtonClicked.bind(this)}></input>
	                    Monocrystalline
	                  </label>
	                </div>
	                <div>
	                  <label class="radio-inline">
	                    <input type="radio" name="survey" id="radio-poly" value="No" checked={this.state.selectedMaterial === 'radio-poly'} onChange={this.materialRadioButtonClicked.bind(this)}></input>
	                    Polycrystalline
	                  </label>
	                  <label class="radio-inline">
	                    <input type="radio" name="survey" id="radio-thin-film" value="No" checked={this.state.selectedMaterial === 'radio-thin-film'} onChange={this.materialRadioButtonClicked.bind(this)}></input>
	                    Thin Film
	                  </label>
	                </div>
	            </div>

				<div>
	                <div class="form-group">
	                  <label for="roof-size">Square footage of solar panels</label>
	                  <input type="text" class="form-control" id="roof-size-input" value={this.state.roofSize + ' sqft'} onChange={() => {}} onKeyDown={this.validateRoofSizeInput.bind(this)}/>
	                </div>
	                <div class="form-group">
	                  <label for="sun-hours">Hours of Sun/day</label>
	                  <input type="text" class="form-control" id="sun-hours-input" value={this.state.sunHours + ' hours'} onChange={() => {}} onKeyDown={this.validateSunHoursInput.bind(this)}/>
	                </div>
	                <div class="form-group">
	                  <label for="kwh">Cost/kwH:</label>
	                  <input type="text" class="form-control" id="kwh-input" value={'$' + this.state.kwhPrice} onChange={() => {}} onKeyDown={this.validateKwhInput.bind(this)}/>
	                </div>
	            </div>

	            <button type="button" class="btn" onClick={this.calculateElectricitySavings.bind(this)}>Calculate Electricity Savings</button>

            		{ this.props.showResults ? <p>{this.state.resultsMessageLine1}</p> : null}
					{ this.props.showResults ? <p>{this.state.resultsMessageLine2}</p> : null}
            </div>
		);
	}

}
