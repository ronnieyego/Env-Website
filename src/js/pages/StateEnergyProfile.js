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
		let stateName, stateId, averageCO2PerKwh, totalEnergyProduced, stateRankCo2, stateRankEnergyProduced;
        console.log('props', props);
		if(props.misc) {
            stateName = props.misc.stateFullName || 'error';
			stateId = props.stateId || 'error';
        }
		if(props.energyProduction) {
            averageCO2PerKwh = props.energyProduction.averageCO2PerKwh || 0;
			totalEnergyProduced = props.energyProduction.total || 0;
        }
		if(props.stateComparisons && props.stateComparisons[stateId]) {
			let comparisonData = props.stateComparisons[stateId];
			stateRankCo2 = comparisonData.emissionsByKwhRank;
			stateRankEnergyProduced = comparisonData.totalEnergyProducedRank;
		}

		this.state = {
			stateId,
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
			sortedEnergy: '',
			sortedStateRankCo2: [],
			stateRankCo2,
			stateRankEnergyProduced       
		}

		if(typeof window !== 'undefined') {
	  		console.log('window state', window.__STATE__);
			  this.state.stateId = window.__STATE__.stateId;
			  this.state.stateName = window.__STATE__.misc.stateFullName;
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
			  this.state.sortedStateRankCo2 = this.sortStatesByCo2PerKwh(window.__STATE__.stateComparisons);
			  this.state.stateRankCo2 = window.__STATE__.stateComparisons[this.state.stateId].emissionsByKwhRank;
			  this.state.stateRankEnergyProduced = window.__STATE__.stateComparisons[this.state.stateId].totalEnergyProducedRank;
		}
	}

	sortStatesByCo2PerKwh(stateOb) {
		let arrayOfStates = [];
		for (let key in stateOb) {
			let data = stateOb[key];
			data['stateId'] = key;
			arrayOfStates.push(data);
		}
		return arrayOfStates.sort((a,b) => {
			return b['emissionsByKwh'] - a['emissionsByKwh'];
		});
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
		let final = res.map(el => { return <li>{`${el[0]}: ${el[1].toLocaleString()} MWhs.`}</li> });
		return  final;
	}

	render() {

		return (
			<div className="container-fluid text-center" >
				<div className="transparent-image">
				  <img src='../public/background.jpg' />
				  <div className="row content">
				  <SideNav open={true}/>

					<div className="col-sm-8 text-left" display="inline-block">
						<h1 style={{textAlign: 'center', fontWeight: 'bold'}}>State Energy Profile</h1>
						<p>States generate their electricity in different ways depending on different economic and social factors.  Generally states in the northwest primarily use hydroelectric and natural gas while appalachian states tend to use more coal.</p>
						<p>On average, {this.state.stateName} produces {(this.state.averageCO2PerKwh * 1000).toFixed(1)} pounds of CO2 per every MWh of energy.  {this.state.stateName} ranks number {50 - this.state.stateRankCo2} in CO2 per MWH.</p>
						<p>In 2015, {this.state.stateName} produced {this.state.totalEnergyProduced.toLocaleString()} MWhs of energy and released {Math.round((this.state.averageCO2PerKwh * 1000 * this.state.totalEnergyProduced)).toLocaleString()} pounds on CO2.  {this.state.stateName} ranks number {this.state.stateRankEnergyProduced} in total energy production</p>
						<StateEnergyChart {...this.props} />
						<p>This is a breakdown of state produced energy</p>
						<ul>{this.state.sortedEnergy}</ul>
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
			</div>
		);
	}
}
