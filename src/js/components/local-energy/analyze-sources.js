import { SOURCE_NAMES } from './utils';


// 89503 reno zip

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

const sumTotalEnergyForEachType = results => {
    const total = {
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
            total[key] += source[key];
        })
    });
    return total;
}

export default results => {
    const totals = sumTotalEnergyForEachType(results);
    const updatedSources = results.map(source => appendTotalEnergyToSource(source));
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
        .filter(source => mainSourceIds.indexOf(source.id) === -1)

    console.log('totalEnergy', totalEnergy)
    console.log('mainSources', mainSources)
    console.log('updatedSources', updatedSources)
    console.log('removedSmallSources', removedSmallSources)
    console.log('totals', totals)
    
    return {
        totals,
        updatedSources,
        totalEnergy,
        mainSources,
        removedSmallSources
    }
}