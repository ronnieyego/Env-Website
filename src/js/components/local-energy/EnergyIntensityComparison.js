import React from "react";
import { shape, number, string } from 'prop-types';
import { SOURCE_NAMES, NAME_MAPPING } from './utils';
import { utilityEmissionsPerState } from '../../utils/utils-data/state-energy-and-emissions';
import BarChart from '../bar-chart/BarChartHoc';



export default class EnergyIntensityComparison extends React.Component {

    static propTypes = {
        totals: shape({
            biofuel: number,
            co2PerKwh: number,
            coal: number,
            geothermal: number,
            hydro: number,
            naturalGas: number,
            nuclear: number,
            oil: number,
            other: number,
            solar: number,
            totalMw: number,
            wind: number,
        }).isRequired,
        maxDistance: number,
        userZipData: shape({
            zip: string.isRequired,
            population: string,
            city: string,
            county: string,
            state: string,
            lat: string.isRequired,
            long: string.isRequired,
        }).isRequired
    }


	render() {
        const usAverage = utilityEmissionsPerState.US;
        const co2PerKwh = this.props.totals.co2PerKwh;
        const graphData = [ {name: 'US Average', Amount: usAverage} ];

        const county = this.props.userZipData && this.props.userZipData.county ? `${this.props.userZipData.county} County` : 'You';
        if(this.props.userZipData && this.props.userZipData.state) { // I may or may not have a state value.
            const stateAverage = utilityEmissionsPerState[this.props.userZipData.state];
            graphData.push({name: this.props.userZipData.state + ' Average', Amount: stateAverage},)
        }
        graphData.push({ name: county, Amount: co2PerKwh })
        
		return (
			<div className="local-energy-comparison" >
                <div className="row">
                    <div className="local-energy-comparison-graph col-md-9 col-sm-12">
                            <BarChart
                                graphData={graphData}
                                units={'Pounds of CO2'}
                                title={"Carbon Intensity of Utilities"}
                                subtitle={"Pounds of CO2 per Kwh"}
                                defaultMax={3}
                                compare={false}
                                dataKey={'Amount'}
                                mobileHeaders={['Carbon Intensity of Utilities', 'Pounds of CO2']}
                            />
                    </div>
                    <div className="local-energy-comparison-summary col-md-3 col-sm-12">
                        <p className="local-energy-comparison-summary-sentence">Utilities generate <b>{this.props.totals.totalMw.toLocaleString()} MWs</b> of energy within {this.props.maxDistance} miles of your home.</p>
                        <ul className="local-energy-comparison-list">
                            { SOURCE_NAMES
                                .filter(source => this.props.totals[source])
                                .sort((a,b) => this.props.totals[b] - this.props.totals[a])
                                .map(source => <li key={`local-energy-${source}`} className="local-energy-comparison-source">{NAME_MAPPING[source]}: {this.props.totals[source].toLocaleString()} MWs</li>)
                            }
                        </ul>
                    </div>
                    
                </div>
           
			</div>
		);
	}
}
