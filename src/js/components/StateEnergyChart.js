import React from "react";
import { Radar, RadarChart, PolarGrid, Legend,
         PolarAngleAxis, PolarRadiusAxis } from  'recharts';

export default class StateEnergyChart extends React.Component {

    constructor(props) {
	    super();

        this.state = {
            //totalEnergyConsumption: 0,
            pcoal: 0,
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
            graphData: {}
        }

        if(typeof window !== 'undefined') {
	  		console.log('window state', window.__STATE__);
              //this.state.totalEnergyConsumption = window.__STATE__.energyProduction.totalEnergyConsumption;
              
              //Absolute Numbers
              this.state.coal = window.__STATE__.energyProduction.coal;
              this.state.geothermal = window.__STATE__.energyProduction.geothermal;
              this.state.hydroElectric = window.__STATE__.energyProduction.hydroelectric;
              this.state.naturalGas = window.__STATE__.energyProduction.naturalGas;
              this.state.nuclear = window.__STATE__.energyProduction.nuclear;
              this.state.petroleum = window.__STATE__.energyProduction.petroleum;
              this.state.solar = window.__STATE__.energyProduction.solar;
              this.state.wind = window.__STATE__.energyProduction.wind;
              // Source percentages for the graph
              this.state.pCoal = window.__STATE__.energyProduction.pCoal;
              this.state.pNaturalGas = window.__STATE__.energyProduction.pNaturalGas;
              this.state.pNuclear = window.__STATE__.energyProduction.pNuclear;
              this.state.pRenewables = window.__STATE__.energyProduction.pSolar + window.__STATE__.energyProduction.pHydroelectric + window.__STATE__.energyProduction.pWind + window.__STATE__.energyProduction.pGeothermal;


              this.state.graphData = [
                    { source: 'Coal', amount: this.state.pCoal },
                    { source: 'Renewables', amount: this.state.pRenewables},
                    { source: 'Natural Gas', amount: this.state.pNaturalGas },
                    { source: 'Nuclear', amount: this.state.pNuclear}
                ];
        }
    }

	render() {
		return (
			<RadarChart cx={300} cy={250} outerRadius={150} width={600} height={500} data={this.state.graphData}>
                <Radar name="Mike" dataKey="amount" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6}/>
                <PolarGrid />
                <PolarAngleAxis dataKey="source" />
                <PolarRadiusAxis/>
            </RadarChart>
		);
	}
}

