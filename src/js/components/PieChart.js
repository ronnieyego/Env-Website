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

const setColors = graphData => {
    const colorMap = {};
    graphData.sort((a,b) => {
        return a.amount < b.amount;
    })
    .map((data, index) => {
        colorMap[data.source] = {
            color: COLORS[index % COLORS.length],
            index: index
        }
    });
    return colorMap;
}

export default class StandardPieChart extends React.Component {
    constructor(props) {
        super();
        // Set fixed order and color for graph
        // In state so the order doesn't change if values change
        this.colorMapping = setColors(props.graphData);
    }

	render() {
        const graphData = this.props.graphData;

        const legendWrapperStyle = {
            marginLeft: '100%',
            marginTop: '10%',
            align: 'center',
            width: '40%',
            left: '0px'
        }
        
        graphData.sort((a,b) => {
            return this.colorMapping[a.source].index > this.colorMapping[b.source].index;
        });

        const legendPayload = graphData.map((data, index) => { 
            const name = data.source.charAt(0).toUpperCase() + data.source.slice(1);
            return { id: data.source, value: name, type: 'circle', color: this.colorMapping[data.source].color }
        });
        
        const categoryList = graphData.map(data => {
            const name = data.source.charAt(0).toUpperCase() + data.source.slice(1);
            return <li key={name} id={name}>{`${name}: ${data.amount.toLocaleString()}`}</li>;
        });

		return (
            <div className="pie">
                <p className="pie-header"><b>{this.props.title || ''}</b></p>
                <p className="pie-subheader"><b>{this.props.subtitle || ''}</b></p>
                <div className="pie-container">
                    <div>
                        <PieChart width={400} height={300}>
                            <Pie legendType='circle' dataKey='amount' data={graphData} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label={renderCustomizedLabel}>
                                {graphData.map((entry, index) => <Cell fill={this.colorMapping[entry.source].color} key={index}/>)}
                            </Pie>
                            <Legend wrapperStyle={legendWrapperStyle} align="left" verticalAlign="top" height={36} payload={legendPayload} />
                        </PieChart>
                    </div>
                    <div className="pie-breakdown">{this.props.breakDownText || ''}
                        <ul className="pie-breakdown-list">
                        </ul>
                    </div>
                </div>

            </div>
		);
	}
};

