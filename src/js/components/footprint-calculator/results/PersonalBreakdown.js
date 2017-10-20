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

export default class PersonalBreakdown extends React.Component {

	render() {
        const containerStyle = {
            margin: 'auto',
            textAlign: 'center'
        };
        const res = this.props.results;
        const category = this.props.category === 'energy' ? 'Energy' : 'CO2';

        // Top level summary
        const categoryBreakDownData = [
            {source: 'Appliances', amount: parseInt(res.appliance)},
            {source: 'Food', amount: parseInt(res.food)},
            {source: 'Transportation', amount: parseInt(res.transportation)},
        ];

        // Transportation Summary
        const transportationBreakdown = [
            {source: 'Daily Use', amount: parseInt(res.transportationSubCategories.monthlyCommute)},
            {source: 'Roadtrips', amount: parseInt(res.transportationSubCategories.monthlyRoadTrip)},
            {source: 'Flying', amount: parseInt(res.transportationSubCategories.monthlyFly)}
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
                <div id="top-level-sumamry">
                    <ResultsPieChart 
                        graphData={categoryBreakDownData} 
                        title={`Monthly ${category} Breakdown`} 
                        key={`Monthly ${category} Breakdown`} 
                        category={this.props.category}
                    /> 
                </div>
                <div id="transportation-summary">
                    <ResultsPieChart 
                        graphData={transportationBreakdown}
                        title={'Transportation Breakdown'}
                        key={'Transportation Breakdown'}
                        category={this.props.category}/> 
                </div>
                <div id="appliance-summary">
                    <ResultsPieChart 
                        graphData={applianceBreakdown}
                        title={'Appliance Breakdown'}
                        key={'Appliance Breakdown'}
                        category={this.props.category}
                    /> 
                </div>
                <div id="food-summary">
                    <ResultsPieChart 
                        graphData={foodBreakdown}
                        title={'Food Breakdown'}
                        key={'Food Breakdown'}
                        category={this.props.category}
                    /> 
                </div>
            </div>
		);
	}
};

