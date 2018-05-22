import React from "react";
import PropTypes from 'prop-types';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField'

import { BarChart, Bar, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default class CompareBarChar extends React.Component {

    static propTypes = {
        graphData: PropTypes.array, // Array of {name: 'Grilling', You: grillCo2 || 0, 'Average American': 55 },
        dataKey: PropTypes.string, // Data key to look for in data set.
        compare: PropTypes.bool, // If true, looks for average american.  
        units: PropTypes.string, //units on left side
        title: PropTypes.string 
    }
        
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

    roundData(graphData) {
        return graphData.map(row => {
            const rowKeys = Object.keys(row);
            rowKeys.forEach(key => {
                const value = row[key];
                if(typeof value === 'number') {
                    if(value < 10) {
                        row[key] = Math.round(value * 100)/100;
                    } else {
                        row[key] = Math.round(value);
                    }
                }
            });
            return row;
        })
    }
    
    render() {
    
        const barGraphData = this.roundData(this.props.graphData);
        const defaultMax = this.props.defaultMax || 0;
        const domainMax = this.getDomainMax(barGraphData);
        const max = domainMax > defaultMax ? domainMax : defaultMax;
        const units = this.props.units;
        const title = this.props.title || '';
        const dataKey = this.props.dataKey || 'You';
        const dataKeyCompare = this.props.dataKeyCompare || 'Average American';

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
                    <Bar dataKey={dataKey} fill="#8884d8" />
                    {this.props.compare && <Bar dataKey={dataKeyCompare} fill="#82ca9d" />}
                </BarChart>
            </div>
        );
    }
}