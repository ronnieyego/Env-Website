import React from "react";
import BarChart from '../../bar-chart/BarChartHoc';
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
        let category;
        let total;
        let units;
        switch(this.props.category) {
            case 'energy':
                category = 'Energy';
                total = res.totalEnergy;
                units = 'kwhs';
                break;
            case 'co2':
                category = 'CO2';
                total = res.totalCo2;
                units = 'CO2';
                break;
            case 'water':
                category = 'Water';
                total = res.totalWater;
                units = 'gallons';
                break;
            default:
                console.log('unknown category for personal breakdown: ', this.props.category);
        }
        // Top level summary
        const categoryBreakDownData = [
            {name: 'Appliances', Category: parseInt(res.appliance)},
            {name: 'Food', Category: parseInt(res.food)},
            {name: 'Transportation', Category: parseInt(res.transportation) || 0}, // Default to 0 for Water
        ].sort((a,b) => b.Category > a.Category);

        // Transportation Summary
        const transportationBreakdown = this.props.category === 'water' ? null : [
            {name: 'Daily Use', Method: parseInt(res.transportationSubCategories.monthlyCommute)},
            {name: 'Roadtrips', Method: parseInt(res.transportationSubCategories.monthlyRoadTrip)},
            {name: 'Flying', Method: parseInt(res.transportationSubCategories.monthlyFly)},
            {name: 'Bus', Method: parseInt(res.transportationSubCategories.monthlyBus)},
            {name: 'Train', Method: parseInt(res.transportationSubCategories.monthlyTrain)}
        ].sort((a,b) => b.Method > a.Method);

        // Appliance Summary
        const appliancekeys = Object.keys(res.applianceSubCategories);
        const applianceBreakdown = appliancekeys.map(key => {
            return {name: key, Appliance: res.applianceSubCategories[key]}
        }).sort((a,b) => b.Appliance > a.Appliance);;

        // Food Summary
        const foodkeys = Object.keys(res.foodSubCategories);
        const foodBreakdown = foodkeys.map(key => {
            return {name: key, Food: res.foodSubCategories[key]}
        }).sort((a,b) => b.Food > a.Food);;
        
		return (
            <div style={containerStyle}>
                <div id="top-level-sumamry">
                    <BarChart
                        graphData={categoryBreakDownData}
                        units={'Pounds of CO2'}
                        title={`Monthly ${category} Breakdown`}
                        key="categoryBreakDownData"
                        subtitle={`${total.toLocaleString()} ${units} used each Month`}
                        dataKey={'Category'}
                        mobileHeaders={['Category', 'Pounds of CO2',]} 
                    />
                </div>
                <br />
                {this.props.category !== 'water' &&
                <div id="transportation-summary">
                    <BarChart
                        graphData={transportationBreakdown}
                        key="transportationBreakdownBarChart"
                        units={'Pounds of CO2'}
                        title="Transportation Breakdown"
                        subtitle={`${total.toLocaleString()} ${units} used each Month`}
                        dataKey={'Method'}
                        mobileHeaders={['Method', 'Pounds of CO2',]} 
                    />
                    <br />
                </div>
                }
                <div id="appliance-summary">
                    <BarChart
                        graphData={applianceBreakdown}
                        units={'Pounds of CO2'}
                        key="applianceBreakdown"
                        title="Appliance Breakdown"
                        subtitle={`${total.toLocaleString()} ${units} used each Month`}
                        dataKey={'Appliance'}
                        mobileHeaders={['Appliance', 'Pounds of CO2',]} 
                    />
                </div>
                <br />
                <div id="food-summary">
                    <BarChart
                        graphData={foodBreakdown}
                        key="foodBreakdown"
                        units={'Pounds of CO2'}
                        title="Food Breakdown"
                        subtitle={`${total.toLocaleString()} ${units} used each Month`}
                        dataKey={'Food'}
                        mobileHeaders={['Food', 'Pounds of CO2',]} 
                    />
                </div>
            </div>
		);
	}
};

