import { SOURCE_NAMES } from './utils';

import co2BySource from '../../data/energy/co2-by-source';

// 89503 reno zip

// Currently not using major sources.
// You're a major source if youre above either of these thresholds.
const MAIN_SOURCE_PERCENT = .33;
const MAIN_SOURCE_AMOUNT = 400;
const TINY_SOURCE_AMOUNT = 10;

const sumSourceTotalEnergy = source => {
    return SOURCE_NAMES.reduce((total, key) => {
        return total + source[key];
    }, 0);
};

// TODO:  Add to dataset vs calculate on the fly. . . 
const appendTotalEnergyToSource = source => {
    source.total = sumSourceTotalEnergy(source);
    return source;
};

const appendPrimaryFuel = source => {
    let fuel = '';
    let max = 0;
    SOURCE_NAMES.forEach(fuelType => {
        if(source[fuelType] > max) {
            fuel = fuelType;
        }
    });
    source.primaryFuel = fuel;
    return source;
};

const latLongAsNumber = source => {
    source.lat = parseFloat(source.lat, 10);
    source.long = parseFloat(source.long, 10);
    return source;
}

const sumTotalEnergyForEachType = results => {
    const totals = {
        coal: 0,
        oil: 0,
        naturalGas: 0,
        biofuel: 0,
        solar: 0,
        wind: 0,
        geothermal: 0,
        hydro: 0,
        nuclear: 0,
        other: 0,
    };
    results.forEach(source => {
        SOURCE_NAMES.forEach(key => {
            totals[key] += source[key];
        })
    });
    const totalMw = Object.keys(totals).reduce((acc, key) => acc + totals[key], 0);
    totals.totalMw = totalMw;
    const co2PerKwh = Object.keys(totals).reduce((acc, key) => {
        if(key === 'totalMw') {
            return acc;
        }
        const co2PerKwhForSource = co2BySource[key] || co2BySource.other; // other is 1;
        const percent = totals[key] / totalMw;
        const co2Contribution = percent * co2PerKwhForSource;
        return acc + co2Contribution;
    }, 0);
    totals.co2PerKwh = Math.round(co2PerKwh * 100)/100;
    return totals;
}

export default results => {
    const totals = sumTotalEnergyForEachType(results);
    const updatedSources = results.map(source => {
        const withTotals = appendTotalEnergyToSource(source);
        const withPrimary = appendPrimaryFuel(withTotals);
        const latLongAsNumbers = latLongAsNumber(withPrimary);
        return latLongAsNumbers;
    });
    const totalEnergy = updatedSources.reduce((total, source) => {
        return total + source.total;
    }, 0);
    const mainSources = updatedSources
        .filter(source => source.total > MAIN_SOURCE_AMOUNT || (source.total / totalEnergy) > MAIN_SOURCE_PERCENT )
        .map(source => {
            source.percentPower = (Math.round(source.total / totalEnergy * 100)/100);
            return source;
        });
    const mainSourceIds = mainSources.map(source => source.id);

    const removedSmallSources = updatedSources
        .filter(source => source.total > TINY_SOURCE_AMOUNT)
        // .filter(source => mainSourceIds.indexOf(source.id) === -1);
    const maxDistance = Math.max(...updatedSources.map(source => source.distance));

    return {
        totals,
        updatedSources,
        totalEnergy,
        mainSources,
        removedSmallSources,
        maxDistance
    }
}