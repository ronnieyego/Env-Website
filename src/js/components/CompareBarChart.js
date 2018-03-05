import React from "react";
import { MenuItem, SelectField } from 'material-ui';

import { BarChart, Bar, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default class CompareBarChar extends React.Component {
        
    getDomainMax(barGraphData) {
        let max = 0;
        barGraphData.forEach(ob => {
            let keys = Object.keys(ob);
            keys.forEach(key => {
                let val = ob[key];
                if(typeof val === 'number' && val > max) {
                    max = val;
                }
            })
        });
        return max;
    }
    
    render() {
    
        const barGraphData = this.props.graphData;
        const defaultMax = this.props.defaultMax || 0;
        const domainMax = this.getDomainMax(barGraphData);
        const max = domainMax > defaultMax ? domainMax : defaultMax;
        const units = this.props.units;
        const title = this.props.title || '';

        return (
            <div className="compare-bar-chart">
                <p className="compare-bar-chart-title">{title}</p>
                <BarChart width={600} height={300} data={barGraphData}
                        margin={{top: 5, right: 30, left: 20, bottom: 5}}
                        className="compare-bar-chart">
                    <XAxis dataKey="name"/>
                    <YAxis type="number" domain={[0, max]} label={{ value: units, angle: -90, position: 'left' }}/>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Tooltip/>
                    <Legend wrapperStyle={{marginLeft: '0px'}} />
                    <ReferenceLine y={0} stroke='#000'/>
                    <Bar dataKey="You" fill="#8884d8" />
                    <Bar dataKey="Average American" fill="#82ca9d" />
                </BarChart>
            </div>
        );
    }
}