import React from "react";
import { connect } from 'react-redux';

import StateEnergyText from './StateEnergyText';
import StateEnergyRadarChart from './StateEnergyRadarChart';
import StateEnergyPieChart from './StateEnergyPieChart';
import BarChart from '../bar-chart/BarChartHoc';

import { utilityEmissionsPerState } from '../../utils/utils-data/state-energy-and-emissions';

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

    sortEnergy(coal, geothermal, hydroElectric, naturalGas, nuclear, solar, wind) {
        const unsorted = [
            ['Coal', coal],
            ['Geothermal', geothermal],
            ['Hydro-electric', hydroElectric],
            ['Natural Gas', naturalGas],
            ['Nuclear', nuclear],
            ['Solar', solar],
            ['Wind', wind],
        ];
		unsorted.sort((a,b) => {
			return b[1] - a[1];
		});
		let final = unsorted.map(el => { return <li className="state-energy-text" key={el}>{`${el[0]}: ${el[1].toLocaleString()} MWhs.`}</li> });
		return final;
    }
    
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
            //averageCO2PerKwh, Not as up to date as the utils-data one
            coal,
            geothermal,
            hydroelectric,
            naturalGas,
            nuclear,
            other,
            othergases,
            pCoal,
            pGeothermal,
            pHydroelectric,
            pNaturalGas,
            pNuclear,
            pOther,
            pOtherGases,
            pPetroleum,
            pPumpStorage,
            pSolar,
            pWind,
            pWoodBurning,
            petroleum,
            pumpStorage,
            solar,
            total,
            wind,
            woodBurning
        } = this.props.energyProduction;

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
            { name: 'Coal', amount: coal },
            { name: 'Hydro', amount: hydroelectric },
            { name: 'Solar', amount: solar },
            { name: 'Wind', amount: wind },
            { name: 'Geothermal', amount: geothermal },
            { name: 'Gas', amount: naturalGas },
            { name: 'Nuclear', amount: nuclear}
        ].map(row => ({name: row.name, amount: Math.round(parseInt(row.amount))}))
         .sort((a,b) => b.amount > a.amount);

         let barChartUnits = 'MWHs';
         const barChartMax = this.getDomainMax(barChartGraphData);
         if(barChartMax > 5000 && barChartMax < 5000000) {
            barChartUnits = 'GWHs';
            barChartGraphData = barChartGraphData.map(row => ({name: row.name, amount: row.amount/1000 }));
         }
         if(barChartMax > 5000000) {
            barChartUnits = 'TWHs';
            barChartGraphData = barChartGraphData.map(row => ({name: row.name, amount: row.amount/1000000 }));
         }


        const pieChartData = [
            { source: 'Coal', amount: coal},
            { source: 'HydroElectric', amount: hydroelectric},
            { source: 'Natural Gas', amount: naturalGas},
            { source: 'Nuclear', amount: nuclear },
            { source: 'Solar', amount: solar},
            { source: 'Wind', amount: wind}
        ];

        const stateRankCo2 = stateComparisons[this.props.stateId].emissionsByKwhRank
        const stateRankEnergyProduced = stateComparisons[this.props.stateId].totalEnergyProducedRank

        const radarChartWidth = this.props.isMobile ? 300 : 500;
        const radarChartHeight = this.props.isMobile ? 300 : 500;
        const sortedEnergy = this.sortEnergy(coal, geothermal, hydroelectric, naturalGas, nuclear, solar, wind);
        return (
            <div>
                <StateEnergyText 
                    stateName={stateFullName}
                    CO2PerKwh={CO2PerKwh}
                    stateRankCo2={stateRankCo2}
                    stateRankEnergyProduced={stateRankEnergyProduced}
                    totalEnergyProduced={total}
                />
                <BarChart 
                    title={`Energy production breakdown for ${this.props.stateId}`}
                    stateId={this.props.stateId} 
                    graphData={barChartGraphData}
                    units={barChartUnits}
                    dataKey="amount"
                    compare={false}
                    mobileHeaders={['Energy', barChartUnits]}
                />
                <p className="state-energy-text">Data for this chart comes from the <a href="https://www.eia.gov/electricity/data/state/" target="_blank">EIA</a></p>
                <br />
                <p className="state-energy-text">This is a breakdown of state produced energy</p>
                <ul>{sortedEnergy}</ul>
                <StateEnergyPieChart graphData={pieChartData}/>
            </div>
		);
	}
}

 // const {    
    //     biofuels,
    //     coal,
    //     fossilFuelTotal,
    //     geothermal,
    //     hydroElectric,
    //     naturalGas,
    //     nuclear,
    //     petroleum,
    //     renewablePercent,
    //     renewableTotal,
    //     solar,
    //     totalEnergyConsumption,
    //     wind,
    // } = this.props.energyConsumption;