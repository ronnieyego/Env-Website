import React from "react";
import ResultsModal from './results-modal.js';

import costCalc from '../../utils/cost-calc.js';
import getCo2PerKwh from '../../utils/get-co2-emissions-by-kwh.js';

export default class SolarWidget extends React.Component {

	constructor(props) {
	    super();
	    let sunHours = 2;
	    let kwhPrice = 0.927;
	    let averageCO2PerKwh = 6;
	    let installPrice6kw = 15000;
	    let installPrice10kw = 25000;
	    if( props.misc ) {
	    	sunHours = props.misc.dailySunHours;
	    	kwhPrice = props.misc.centsPerKwh;

	    	// Have to check to see if I have this data.  Otherwise I'll default to US averages
	    	if(props.misc.installPrice6kw && props.misc.installPrice10kw) {
	    		installPrice6kw = props.misc.installPrice6kw;
	    		installPrice10kw = props.misc.installPrice10kw;
	    	} else if (props.usAverages.installPrice6kw && props.usAverages.installPrice10kw) {
	    		installPrice6kw = props.usAverages.installPrice6kw;
	    		installPrice10kw = props.usAverages.installPrice10kw;
	    	}
	    	//averageCO2PerKwh = props.energyPoduction.averageCO2PerKwh;  Calculating each time.  Should probably pass in from server
	    }

	    this.state = {
	      stateFullName: '',
	      selectedMaterial: 'radio-not-sure',
	      roofSize: 400,
	      sunHours,
	      kwhPrice,
	      averageCO2PerKwh,
	      showResults: false,
	      installPrice6kw,
	      installPrice10kw,
				paybackPeriod: 0,
				resultsMessage: ''
	    };

	  	if(typeof window !== 'undefined') {
	  		console.log('window state', window.__STATE__);
	  		this.state.sunHours = window.__STATE__.misc.dailySunHours;
	  		this.state.kwhPrice = window.__STATE__.misc.centsPerKwh;
	  		this.state.averageCO2PerKwh = window.__STATE__.energyProduction.averageCO2PerKwh;
				this.state.stateFullName = window.__STATE__.misc.stateFullName;

	  		// Have to check to see if I have this data.  Otherwise I'll default to US averages
	    	if(window.__STATE__.misc.installPrice6kw && window.__STATE__.misc.installPrice10kw) {
	    		this.state.installPrice6kw = window.__STATE__.misc.installPrice6kw;
	    		this.state.installPrice10kw = window.__STATE__.misc.installPrice10kw;
	    	} else if (window.__STATE__.usAverages.installPrice6kw && window.__STATE__.usAverages.installPrice10kw) {
	    		this.state.installPrice6kw = window.__STATE__.usAverages.installPrice6kw;
	    		this.state.installPrice10kw = window.__STATE__.usAverages.installPrice10kw;
	    	}
	  	}

			this.closeResultsModal = this.closeResultsModal.bind(this);

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
	  	let result = currentVal.toString();  // Need to ensure its not an Int.
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
	  	let co2PerKwh = this.state.averageCO2PerKwh;
		let roofSize = this.state.roofSize;
	    let kwhPrice = this.state.kwhPrice * 0.01; //Convert it to cents
	    let sunHours = this.state.sunHours;
	    let wattsPerHour;
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
	    const { electrictyGenerated, savings } = costCalc(roofSize, kwhPrice, sunHours, wattsPerHour);
	    const totalCo2Saved = co2PerKwh * electrictyGenerated;
			const paybackPeriod = (this.state.installPrice6kw/savings).toFixed(1);

	    let resultsMessage = `You will generate ${electrictyGenerated.toLocaleString()}kwHs of electricity per year.  This will save you $${savings.toLocaleString()} per year and will also prevent ${totalCo2Saved.toFixed(2).toLocaleString()} pounds of CO2 from being produced each year.`;
	    this.setState({
	    	showResults: true,
	    	resultsMessage,
				paybackPeriod
	    });
	    this.props.showResults();
	}

	materialRadioButtonClicked(changeEvent) {
	  this.setState({ selectedMaterial: changeEvent.target.id });
	}

	closeResultsModal() {
		this.setState({ showResults: false });
	}

	render() {
		return (
			<div id="widget" style={this.props.widgetHeight}>
				<span id="widget-title">Payback Period for Solar Panels</span>
	            <br></br>
	            <br></br>
	            <span>Type of solar panel</span>
            <br></br>
            <label className="radio-inline"></label>
            	<div className="inline-radio-buttons">
	                <div>
	                    <label className="radio-inline">
	                    <input type="radio" name="survey" id="radio-not-sure" value="Yes" checked={this.state.selectedMaterial === 'radio-not-sure'} onChange={this.materialRadioButtonClicked.bind(this)}></input>
	                    Not Sure
	                  </label>
	                    <label className="radio-inline">
	                    <input type="radio" name="survey" id="radio-mono" value="No" checked={this.state.selectedMaterial === 'radio-mono'} onChange={this.materialRadioButtonClicked.bind(this)}></input>
	                    Monocrystalline
	                  </label>
	                </div>
	                <div>
	                  <label className="radio-inline">
	                    <input type="radio" name="survey" id="radio-poly" value="No" checked={this.state.selectedMaterial === 'radio-poly'} onChange={this.materialRadioButtonClicked.bind(this)}></input>
	                    Polycrystalline
	                  </label>
	                  <label className="radio-inline">
	                    <input type="radio" name="survey" id="radio-thin-film" value="No" checked={this.state.selectedMaterial === 'radio-thin-film'} onChange={this.materialRadioButtonClicked.bind(this)}></input>
	                    Thin Film
	                  </label>
	                </div>
	            </div>

				<div>
	                <div className="form-group">
	                  <label htmlFor="roof-size">Square footage of solar panels</label>
	                  <input type="text" className="form-control" id="roof-size-input" value={this.state.roofSize + ' sqft'} onChange={() => {}} onKeyDown={this.validateRoofSizeInput.bind(this)}/>
	                </div>
	                <div className="form-group">
	                  <label htmlFor="sun-hours">Hours of Sun/day</label>
	                  <input type="text" className="form-control" id="sun-hours-input" value={this.state.sunHours + ' hours'} onChange={() => {}} onKeyDown={this.validateSunHoursInput.bind(this)}/>
	                </div>
	                <div className="form-group">
	                  <label htmlFor="kwh">Cost/kwH:</label>
	                  <input type="text" className="form-control" id="kwh-input" value={'¢' + this.state.kwhPrice} onChange={() => {}} onKeyDown={this.validateKwhInput.bind(this)}/>
	                </div>
	            </div>

	            <button type="button" className="btn" onClick={this.calculateElectricitySavings.bind(this)}>Calculate Electricity Savings</button>

            		<ResultsModal modalOpen={this.state.showResults} onRequestClose={this.closeResultsModal} message={this.state.resultsMessage} stateName={this.state.stateFullName} paybackPeriod={this.state.paybackPeriod}/>
            </div>
		);
	}

}
