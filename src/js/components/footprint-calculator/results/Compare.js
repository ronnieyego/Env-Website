import React from "react";
import ResultsPieChart from './ResultsPieChart';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#ff598f', '#01dddd', '#00bfaf','#01dddd', '#e0e300'];

const RADIAN = Math.PI / 180;                    
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = outerRadius * 1.25;
  const x  = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy  + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default class Compare extends React.Component {

    constructor(props) {
	    super();
	}


	render() {
        const containerStyle = {
            margin: 'auto',
            textAlign: 'center'
        };

        const res = this.props.results;

        // Average American Summary
        const avg = this.props.averageAmerican;
        const averageAmerican = [
            {source: 'Appliance', amount: parseInt(avg.appliance)},
            {source: 'Food', amount: parseInt(avg.food)},
            {source: 'Transportation', amount: parseInt(avg.transportation)}
        ];

        
		return (
            <div style={containerStyle}>
                <div id="average-american">
                    <ResultsPieChart graphData={averageAmerican} title={'Average American Energy Breakdown'} /> 
                </div>
            </div>
		);
	}
};

