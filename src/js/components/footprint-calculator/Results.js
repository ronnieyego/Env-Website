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

export default class Results extends React.Component {

    constructor(props) {
	    super();
	}


	render() {
        console.log('results props', this.props);
        const containerStyle = {
            margin: 'auto',
            marginLeft: '25px',
            textAlign: 'center'
        };

        const res = this.props.results;

        // Top level summary
        const monthlyUse = res.totalEnergy;
        const categoryBreakDownData = [
            {source: 'Appliances', amount: parseInt(res.appliance)},
            {source: 'Food', amount: parseInt(res.food)},
            {source: 'Transportation', amount: parseInt(res.transportation)},
        ];
        const categoryList = categoryBreakDownData.map(data => {
            return <li>{`${data.source}: ${data.amount.toLocaleString()} kwhs`}</li>;
        })
        
        // Transportation Summary
        const transportationBreakdown = [
            {source: 'Daily Use', amount: parseInt(res.monthlyCar)},
            {source: 'Roadtrips', amount: parseInt(res.monthlyRoadTrip)},
            {source: 'Flying', amount: parseInt(res.monthlyFly)}
        ];

        
        const appliancekeys = Object.keys(res.applianceSubCategories);
        const applianceBreakdown = appliancekeys.map(key => {
            return {source: key, amount: res.applianceSubCategories[key]}
        });
        
		return (
            <div style={containerStyle}>
                <h1>You use <b>{monthlyUse} kwhs</b> each month.</h1>
                <div id="top-level-sumamry">
                    <ResultsPieChart graphData={categoryBreakDownData} title={'Monthly Energy Breakdown'} /> 
                </div>
                <div id="transportation-summary">
                    <ResultsPieChart graphData={transportationBreakdown} title={'Transportation Breakdown'} /> 
                </div>
                <div id="appliance-summary">
                    <ResultsPieChart graphData={applianceBreakdown} title={'Appliance Breakdown'} /> 
                </div>
                <button onClick={this.props.backToForm} >Update your answers</button>
            </div>
		);
	}
};

