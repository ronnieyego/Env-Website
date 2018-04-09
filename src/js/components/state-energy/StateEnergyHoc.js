import React from "react";
import { connect } from 'react-redux';

import StateEnergyText from './StateEnergyText';
import StateEnergyRadarChart from './StateEnergyRadarChart';
import StateEnergyPieChart from './StateEnergyPieChart';

import { utilityEmissionsPerState } from '../../utils/utils-data/state-energy-and-emissions';

@connect((store, props) => {
	return {
		energyConsumption: store.stateEnergy.energyConsumption,
        energyProduction: store.stateEnergy.energyProduction,
        misc: store.stateEnergy.misc,
        stateComparisons: store.stateEnergy.stateComparisons,
        stateId: store.stateEnergy.stateId || store.stateEnergy.stateName
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

    render() {
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

        const {
            //averageCO2PerKwh, Not as up to date as the utils-data one
            biomass,
            coal,
            geothermal,
            hydroelectric,
            naturalGas,
            nuclear,
            other,
            othergases,
            pBiomass,
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
        const radarGraphData = [
            { source: 'Coal', amount: pCoal },
            { source: 'Renewables', amount: pSolar + pHydroelectric + pWind + pGeothermal},
            { source: 'Natural Gas', amount: pNaturalGas },
            { source: 'Nuclear', amount: pNuclear}
        ];

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

        const sortedEnergy = this.sortEnergy(coal, geothermal, hydroelectric, naturalGas, nuclear, solar, wind);
        return (
            <div className="row content" style={{marginLeft: '50px'}}>
                <div className="col-sm-8 text-left" display="inline-block">
                    <StateEnergyText 
                        stateName={stateFullName}
                        CO2PerKwh={CO2PerKwh}
                        stateRankCo2={stateRankCo2}
                        stateRankEnergyProduced={stateRankEnergyProduced}
                        totalEnergyProduced={total}
                    />
                    <StateEnergyRadarChart stateId={this.props.stateId} graphData={radarGraphData} />
                    <p className="state-energy-text">This is a breakdown of state produced energy</p>
                    <ul>{sortedEnergy}</ul>
                    <StateEnergyPieChart graphData={pieChartData}/>
                </div>
            </div>
		);
	}
}
