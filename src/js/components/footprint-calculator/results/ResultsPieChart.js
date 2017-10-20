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

export default class ResultsPieChart extends React.Component {

	render() {
        const units = this.props.category === 'energy' ? 'kwhs' : 'lbs/CO';
        const sub2 = this.props.category === 'energy' ? '' : <sub>2</sub>;
        const graphData = this.props.graphData;
        graphData.sort((a,b) => {
            return a.amount < b.amount;
        });
        const categoryList = graphData.map(data => {
            const name = data.source.charAt(0).toUpperCase() + data.source.slice(1);
            return <li key={name} id={name}>{`${name}: ${data.amount.toLocaleString()} ${units}`}{sub2}</li>;
        });
        const legendPayload = graphData.map((data, index) => { 
            const name = data.source.charAt(0).toUpperCase() + data.source.slice(1);
            return { id: data.source, value: name, type: 'circle', color: COLORS[index % COLORS.length] }
        });


        const styles = {
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '10px'
        };
        const breakDownStyles = {
            marginTop: '150px',
            marginLeft: '-100px',
            textAlign: 'left'
        }
        
		return (
            <div style={{border: '3px solid gray'}}>
                <h2><b>{this.props.title || ''}</b></h2>
                <h3><b>{this.props.subtitle || ''}</b></h3>
                <div style={styles}>
                    <div>
                        <PieChart width={500} height={300}>
                            <Pie legendType='circle' dataKey='amount' data={graphData} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label={renderCustomizedLabel}>
                                {graphData.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]} key={index}/>)}
                            </Pie>
                            <Legend verticalAlign="top" height={36} margin={{top: 10, left: 0, right: 0, bottom: 10 }} payload={legendPayload} />
                        </PieChart>
                    </div>
                    <div style={breakDownStyles}>{this.props.breakDownText || ''}
                        <ul style={{marginRight: '15px'}}>
                            {categoryList}
                        </ul>
                    </div>
                </div>

            </div>
		);
	}
};

