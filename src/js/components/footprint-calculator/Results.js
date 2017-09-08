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

        // Average American Summary
        const avg = this.props.averageAmerican;
        const averageAmerican = [
            {source: 'Appliance', amount: parseInt(avg.appliance)},
            {source: 'Food', amount: parseInt(avg.food)},
            {source: 'Transportation', amount: parseInt(avg.transportation)}
        ];
        
        // Transportation Summary
        const transportationBreakdown = [
            {source: 'Daily Use', amount: parseInt(res.monthlyCommute)},
            {source: 'Roadtrips', amount: parseInt(res.monthlyRoadTrip)},
            {source: 'Flying', amount: parseInt(res.monthlyFly)}
        ];

        // Appliance Summary
        const appliancekeys = Object.keys(res.applianceSubCategories);
        const applianceBreakdown = appliancekeys.map(key => {
            return {source: key, amount: res.applianceSubCategories[key]}
        });

        // Food Summary
        const foodkeys = Object.keys(res.foodSubCategories);
        const foodBreakdown = foodkeys.map(key => {
            return {source: key, amount: res.foodSubCategories[key]}
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
                <div id="food-summary">
                    <ResultsPieChart graphData={foodBreakdown} title={'Food Breakdown'} /> 
                </div>
                <div id="average-american">
                    <ResultsPieChart graphData={averageAmerican} title={'Average American Energy Breakdown'} /> 
                </div>
                <button onClick={this.props.backToForm} >Change your answers</button>
                <div style={{textAlign: 'left'}}>This footprint is incomplete. Future updadates will include
                    <ul>
                        <li>Embodied energy (the energy cost of making your house, car and stuff)</li>
                        <li>Energy use from work</li>
                        <li>Energy use from the public sector and other shared expenditures</li>
                        <li>Water and carbon footprint</li>
                        <li>Things that can affect your footprint (i.e what happens if you go vegan)</li>
                        <li>What you can do to reduce your footprint</li>
                    </ul>
                </div>
            </div>
		);
	}
};

