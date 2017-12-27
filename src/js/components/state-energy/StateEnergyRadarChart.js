import React from "react";
import { Radar, RadarChart, PolarGrid, Legend,
         PolarAngleAxis, PolarRadiusAxis } from  'recharts';

export default class StateEnergyRadarChart extends React.Component {

	render() {
        const legendText = [{value: `Energy production breakdown for ${this.props.stateId}`, type: 'line', id: 'ID01' }];
		return (
            <div>
                <RadarChart cx={300} cy={250} outerRadius={150} width={500} height={440} data={this.props.graphData}>
                    <Radar name="Mike" dataKey="amount" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6}/>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="source" />
                    <PolarRadiusAxis/>
                    <Legend align='center' verticalAlign='top' payload={legendText}/>
                </RadarChart>
                <p>Data for this chart comes from the <a href="https://www.eia.gov/electricity/data/state/" target="_blank">EIA</a></p>
            </div>
		);
	}
}

