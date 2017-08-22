import React from "react";
import { PieChart, Pie, Legend, Sector, Cell } from  'recharts';

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
            margin: 'auto'
        };

        const res = this.props.results;
        const categoryBreakDownData = [
            {source: 'Appliances', amount: parseInt(res.appliance)},
            {source: 'Food', amount: parseInt(res.food)},
            {source: 'Transportation', amount: parseInt(res.transportation)},
        ];
        const categoryList = categoryBreakDownData.map(data => {
            return <li>{`${data.source}: ${data.amount.toLocaleString()} kwhs`}</li>;
        })
        const legendPayload = categoryBreakDownData.map((data, index) => { 
            return { id: data.source, value: data.source, type: 'circle', color: COLORS[index % COLORS.length] }
        });
        
        const monthlyUse = res.totalEnergy;
		return (
            <div style={containerStyle}>
                <h1>You use {monthlyUse}kwhs each month.</h1>
                <div><b>Monthly use by category</b>
                    <ul>
                        {categoryList}
                    </ul>
                </div>
                <div>
                    <PieChart width={730} height={300}>
                        <Pie legendType='circle' dataKey='amount' data={categoryBreakDownData} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label={renderCustomizedLabel}>
                            {categoryBreakDownData.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]} key={index}/>)}
                        </Pie>
                        <Legend verticalAlign="top" height={36} margin={{top: 10, left: 0, right: 0, bottom: 10 }} payload={legendPayload} />
                        
                    </PieChart>
                </div>
            </div>
		);
	}
};

