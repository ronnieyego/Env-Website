import React from "react";
import { array, bool, number, string } from 'prop-types';

import { BarChart, Bar, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { roundData } from './utils';

export default class BarCharDesktop extends React.Component {

    static propTypes = {
        graphData: array.isRequired, // Array of {name: 'Grilling', You: grillCo2 || 0, 'Average American': 55 },
        dataKey: string.isRequired, // Data key to look for in data set.
        units: string, //units on left side
        rightUnits: string,
        title: string,
        rightDataKey: string.isRequired,
        defaultMax: number,
        rightDefaultMax: number,
    }
        
    getDomainMax(barGraphData, dataKey) {
        let max = 0;
        barGraphData.forEach(row => {
            let val = row[dataKey];
            if(typeof val === 'number' && val > max) {
                max = val;
            }
        });
        return max;
    }

    render() {
    
        const barGraphData = roundData(this.props.graphData);
        const defaultMax = this.props.defaultMax || 0;
        const rightDefaultMax = this.props.rightDefaultMax || 0;
        const leftDomainMax = this.getDomainMax(barGraphData, this.props.dataKey);
        const rightDomainMax = this.getDomainMax(barGraphData, this.props.rightDataKey);
        const leftMax = leftDomainMax > defaultMax ? leftDomainMax : defaultMax;
        const rightMax = rightDomainMax > rightDefaultMax ? rightDomainMax : rightDefaultMax;

        const title = this.props.title || '';
        const dataKey = this.props.dataKey || 'You';
        const rightDataKey = this.props.rightDataKey || 'Average American';

        return (
            <div className="bar-chart">
                <p className="bar-chart-title">{title}</p>
                <BarChart width={600} height={300} data={barGraphData}
                        margin={{top: 5, right: 30, left: 20, bottom: 5}}
                        className="bar-chart">
                    <XAxis dataKey="name"/>
                    <YAxis yAxisId="left" orientation="left" stroke="#8884d8" type="number" domain={[0, leftMax]} label={{ value: this.props.units, angle: -90, position: 'left' }} />
                    <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" type="number" domain={[0, rightMax]} label={{ value: this.props.rightUnits, angle: -90, position: 'right' }} />
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Tooltip/>
                    <Legend wrapperStyle={{marginLeft: '0px', marginTop: '30px'}} />
                    <Bar yAxisId="left" dataKey={dataKey} fill="#8884d8" />
                    <Bar yAxisId="right" dataKey={rightDataKey} fill="#82ca9d" />}
                </BarChart>
            </div>
        );
    }
}