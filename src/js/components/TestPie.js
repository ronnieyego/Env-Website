import React from "react";
import { PieChart, Pie, Legend, Sector, Cell } from  'recharts';


const data = [{name: 'Group A', value: 400}, {name: 'Group B', value: 300},
                  {name: 'Group C', value: 300}, {name: 'Group D', value: 200}
            ];
const legendData = [
    { value: 'Solar', type: 'line', id: 'ID01' },
    { value: 'Coal', type: 'line', id: 'ID02' }
    ];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#ff598f', '#01dddd', '#00bfaf','#01dddd', '#e0e300'];

const RADIAN = Math.PI / 180;                    
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  
  const radius = outerRadius * 1.25;
  const x  = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy  + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};


export default class TestPie extends React.Component {


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
              //this.state.totalEnergyConsumption = window.__STATE__.energyProduction.totalEnergyConsumption;
              this.state.coal = window.__STATE__.energyProduction.coal;
              this.state.geothermal = window.__STATE__.energyProduction.geothermal;
              this.state.hydroElectric = window.__STATE__.energyProduction.hydroelectric;
              this.state.naturalGas = window.__STATE__.energyProduction.naturalGas;
              this.state.nuclear = window.__STATE__.energyProduction.nuclear;
              this.state.petroleum = window.__STATE__.energyProduction.petroleum;
              this.state.solar = window.__STATE__.energyProduction.solar;
              this.state.wind = window.__STATE__.energyProduction.wind;

              // Get graph data
              this.state.graphData = [
                    { source: 'Coal', amount: this.state.coal},
                    { source: 'HydroElectric', amount: this.state.hydroElectric},
                    { source: 'Natural Gas', amount: this.state.naturalGas},
                    { source: 'Nuclear', amount: this.state.nuclear }
                ];
        }
    }
	render() {
		return (
            <div>
                <PieChart width={730} height={300}>
                    <Pie legendType='circle' dataKey='amount' data={this.state.graphData} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label={renderCustomizedLabel}>
                        {data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]} key={index}/>)}
                    </Pie>
                    <Legend verticalAlign="top" height={36} margin={{top: 10, left: 0, right: 0, bottom: 10 }} />
                    
                </PieChart>
            <br />
            <br />
            Below the piechart!
            </div>
		);
	}
}

