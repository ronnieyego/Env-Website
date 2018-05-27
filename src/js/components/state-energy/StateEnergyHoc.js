import React from "react";
import { connect } from 'react-redux';

import StateEnergyText from './StateEnergyText';
import StateEnergyRadarChart from './StateEnergyRadarChart';
import StateEnergyPieChart from './StateEnergyPieChart';
import BarChart from '../bar-chart/BarChartHoc';

import { utilityEmissionsPerState } from '../../utils/utils-data/state-energy-and-emissions';

// The bar graph has all the data for production and consumption
// But i dont have consumption data so i turned that off
// To turn back, simply switch the compare flag in the bar graph component to true.

@connect((store, props) => {
	return {
		energyConsumption: store.stateEnergy.energyConsumption,
        energyProduction: store.stateEnergy.energyProduction,
        misc: store.stateEnergy.misc,
        stateComparisons: store.stateEnergy.stateComparisons,
        stateId: store.stateEnergy.stateId || store.stateEnergy.stateName,
        isMobile: store.userInfo.isMobile
	};
})
export default class StateEnergyHoc extends React.Component {
    
    // Copied from barChart
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
        const {
            coal: coalP,
            geothermal: geothermalP,
            hydroelectric: hydroelectricP,
            naturalGas: naturalGasP,
            nuclear: nuclearP,
            solar: solarP,
            total: totalP,
            wind: windP,
        } = this.props.energyProduction;

        const {    
            coal: coalC,
            geothermal: geothermalC,
            hydroElectric: hydroElectricC,
            naturalGas: naturalGasC,
            nuclear: nuclearC,
            solar: solarC,
            totalEnergyConsumption,
            wind: windC,
        } = this.props.energyConsumption;

        const  {
            avgKwhPerHouseholdConsumed,
            avgMonthHouseUtilCost,
            centsPerKwh,
            clearDays,
            dailySunHours,
            installPrice6kw,
            installPrice10kw,
            stateFullName,
            summerSunHours,
            winterSunHours
        } = this.props.misc;

        const stateComparisons = this.props.stateComparisons;

        const CO2PerKwh = utilityEmissionsPerState[this.props.stateId];
        let barChartGraphData = [
            { name: 'Coal', Production: coalP, Consumption:  coalC},
            { name: 'Hydro', Production: hydroelectricP, Consumption:  hydroElectricC},
            { name: 'Solar', Production: solarP, Consumption:  solarC},
            { name: 'Wind', Production: windP, Consumption: windC },
            { name: 'Geothermal', Production: geothermalP, Consumption:  geothermalC },
            // Name change since NG might not appear on bar chart :(
            { name: this.props.isMobile ? 'Natural Gas' : 'Gas', Production: naturalGasP, Consumption:  naturalGasC },
            { name: 'Nuclear', Production: nuclearP, Consumption: nuclearC }
        ].map(row => ({name: row.name, Production: Math.round(parseInt(row.Production)), Consumption: Math.round(parseInt(row.Consumption))}))
         .sort((a,b) => b.Production > a.Production);

         let barChartUnits = 'MWHs';
         const barChartMax = this.getDomainMax(barChartGraphData);
         if(barChartMax > 5000 && barChartMax < 5000000) {
            barChartUnits = 'GWHs';
            barChartGraphData = barChartGraphData.map(row => ({name: row.name, Production: row.Production/1000, Consumption: row.Consumption/1000 }));
         }
         if(barChartMax > 5000000) {
            barChartUnits = 'TWHs';
            barChartGraphData = barChartGraphData.map(row => ({name: row.name, Production: row.Production/1000000, Consumption: row.Consumption/1000000 }));
         }

        const stateRankCo2 = stateComparisons[this.props.stateId].emissionsByKwhRank
        const stateRankEnergyProduced = stateComparisons[this.props.stateId].totalEnergyProducedRank

        const radarChartWidth = this.props.isMobile ? 300 : 500;
        const radarChartHeight = this.props.isMobile ? 300 : 500;
        return (
            <div>
                <StateEnergyText 
                    stateName={stateFullName}
                    CO2PerKwh={CO2PerKwh}
                    stateRankCo2={stateRankCo2}
                    stateRankEnergyProduced={stateRankEnergyProduced}
                    totalEnergyProduced={totalP}
                />
                <BarChart 
                    title={`Energy breakdown for ${this.props.stateId}`}
                    stateId={this.props.stateId} 
                    graphData={barChartGraphData}
                    units={barChartUnits}
                    dataKey="Production"
                    dataKeyCompare="Consumption"
                    compare={false}
                    mobileHeaders={['Energy', `Production (${barChartUnits}`, `Consumption (${barChartUnits}`]}
                />
                <p className="state-energy-bar-chart-attribution">Data for this chart comes from the <a href="https://www.eia.gov/electricity/data/state/" target="_blank">EIA</a></p>
            </div>
		);
	}
}

 