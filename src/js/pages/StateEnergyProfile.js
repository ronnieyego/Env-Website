import React from "react";

import Header from '../components/Header.js';
import SideNav from '../components/SideNav.js';
import StateEnergyChart from '../components/StateEnergyChart.js';
import TestPie from '../components/TestPie.js';


const energyTypes = ['coal', 'geothermal', 'hydroElectric', 'naturalGas', 'nuclear', 'petroleum', 'solar', 'wind']
const mapEnergyTypes = {
	coal: 'Coal',
	geothermal: 'Geothermal',
	hydroElectric: 'Hydro-electric',
	naturalGas: 'Natural Gas',
	nuclear : 'Nuclear',
	petroleum : 'Petroleum',
	solar : 'Solar',
	wind : 'Wind'
}
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li>{number}</li>
);

 

export default class StateEnergyProfile extends React.Component {
	

	constructor(props) {
		super();
		let stateName, averageCO2PerKwh, totalEnergyProduced;
        if(props.misc) {
            stateName = props.misc.stateFullName || 'error';
        }
		if(props.energyProduction) {
            averageCO2PerKwh = props.energyProduction.averageCO2PerKwh || 0;
			totalEnergyProduced = props.energyProduction.total || 0;
        }

		this.state = {
			stateName,
			averageCO2PerKwh,
			totalEnergyProduced,
            coal: 0,
            geothermal: 0,
            hydroElectric: 0,
            naturalGas: 0,
            nuclear: 0,
            petroleum: 0,
            solar: 0,
            wind: 0,
            pCoal: 0,
            pNaturalGal: 0,
            pRenewables: 0,
            pNuclear: 0,
			sortedEnergy: []        
		}

		if(typeof window !== 'undefined') {
	  		console.log('window state', window.__STATE__);
              this.state.totalEnergyProduced = window.__STATE__.energyProduction.total;
              this.state.averageCO2PerKwh = window.__STATE__.energyProduction.averageCO2PerKwh;
			  this.state.coal = window.__STATE__.energyProduction.coal;
              this.state.geothermal = window.__STATE__.energyProduction.geothermal;
              this.state.hydroElectric = window.__STATE__.energyProduction.hydroelectric;
              this.state.naturalGas = window.__STATE__.energyProduction.naturalGas;
              this.state.nuclear = window.__STATE__.energyProduction.nuclear;
              this.state.petroleum = window.__STATE__.energyProduction.petroleum;
              this.state.solar = window.__STATE__.energyProduction.solar;
              this.state.wind = window.__STATE__.energyProduction.wind;
			  this.state.sortedEnergy = this.sortEnergy(this.state);
			  this.state.stateName = window.__STATE__.misc.stateFullName;
		}
	}

	sortEnergy (state) {
		let res = [];
		energyTypes.forEach((el, index) => {
			let val = this.state[el];
			let mappedName = mapEnergyTypes[el];
			res.push([mappedName,val]);
		});
		res.sort((a,b) => {
			return b[1] - a[1];
		});
		return res;
	}

	render() {

		// THis function should be outside the render function, but not sure how to call it ><
		const getEnergyList = this.state.sortedEnergy.map(el => { return <li>{`${el[0]}: ${el[1].toLocaleString()} MWhs.`}</li> });

		return (

			<div className="container-fluid text-center">
				<div className="row content">

				<SideNav />

				<div className="col-sm-8 text-left" display="inline-block">
					<h1 style={{textAlign: 'center'}}>State Energy Profile</h1>
					<p>States generate their electricity in different ways depending on different economic and social factors.  Generally states in the northwest primarily use hydroelectric and natural gas.  States in appliacia tend to use more coal.</p>
					<p>On average, {this.state.stateName} produces {this.state.averageCO2PerKwh * 1000} pounds of CO2 per every MWh of energy</p>
					<p>In 2015, {this.state.stateName} produced {this.state.totalEnergyProduced.toLocaleString()} MWhs of energy and released {(this.state.averageCO2PerKwh * 1000 * this.state.totalEnergyProduced).toLocaleString()} pounds on CO2.</p>
					<StateEnergyChart {...this.props} />
					<p>This is a breakdown of energy</p>
					<ul>{getEnergyList}</ul>
					<TestPie />

				</div>
				<div className="col-sm-2 sidenav">
					<div className="well">
					<p>ADS</p>
					</div>
					<div className="well">
					<p>ADS</p>
					</div>
				</div>
				</div>
			</div>
		);
	}
}
