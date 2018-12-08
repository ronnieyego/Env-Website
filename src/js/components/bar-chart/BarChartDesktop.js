import React from "react";
import { array, bool, number, string } from 'prop-types';

import { BarChart, Bar, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { roundData } from './utils';

const INDEX_LIMIT_FOR_LOWER_RENDER = 5;
const BASE_WIDTH = 600;
const BASE_HEIGHT = 300;

const renderOffsetTicks = (props) => {
    const { x, y, payload } = props;
    const { index } = payload;
    const offset = index % 2 === 0 ? 0 : 20;

    return (
        <text x={x} y={y + offset} textAnchor="middle" dominantBaseline="hanging">	
            {payload.value}
        </text>
  );
};

const renderDefaultTicks = (props) => {
    const { x, y, payload } = props;
    return (
        <text x={x} y={y} textAnchor="middle" dominantBaseline="hanging">	
            {payload.value}
        </text>
  );
};

export default class BarCharDesktop extends React.Component {

    static propTypes = {
        graphData: array.isRequired, // Array of {name: 'Grilling', You: grillCo2 || 0, 'Average American': 55 },
        dataKey: string.isRequired, // Data key to look for in data set.
        compare: bool, // If true, looks for average american.  
        dataKeyCompare: string,
        units: string, //units on left side
        title: string,
        width: number,
        height: number,
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

    getTicks(barGraphData) {
        return barGraphData.map((data, index) => {
            const tickSize = index % 2 === 0 ? 25 : 6;
            return { ...data, tickSize }
        });
    }

    render() {
        const barGraphData = roundData(this.props.graphData);
        const lowerRender = barGraphData.length > INDEX_LIMIT_FOR_LOWER_RENDER;
        const labelYOffset = lowerRender ? '-20px' : '5px';
        const renderTicks = lowerRender ? renderOffsetTicks : renderDefaultTicks;
        const tickSize = lowerRender ? 10 : 6
        const defaultMax = this.props.defaultMax || 0;
        const domainMax = this.getDomainMax(barGraphData);
        const max = domainMax > defaultMax ? domainMax : defaultMax;
        const units = this.props.units;
        const title = this.props.title || '';
        const dataKey = this.props.dataKey || 'You';
        const dataKeyCompare = this.props.dataKeyCompare || 'Average American';

        return (
            <div className="bar-chart">
                <p className="bar-chart-title">{title}</p>
                <BarChart width={this.props.width || BASE_WIDTH} height={this.props.height || BASE_HEIGHT} data={barGraphData}
                        margin={{top: 5, right: 30, left: 20, bottom: 5}}
                        className="bar-chart">
                    <XAxis dataKey="name" interval={0} tickSize={tickSize} tick={renderTicks} />
                    <YAxis type="number" domain={[0, max]} label={{ value: units, angle: -90, position: 'left' }} />
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Tooltip/>
                    <Legend wrapperStyle={{marginLeft: '0px', bottom: labelYOffset}} />
                    <ReferenceLine y={0} stroke='#000'/>
                    <Bar dataKey={dataKey} fill="#8884d8" />
                    {this.props.compare && <Bar dataKey={dataKeyCompare} fill="#82ca9d" />}
                </BarChart>
            </div>
        );
    }
}