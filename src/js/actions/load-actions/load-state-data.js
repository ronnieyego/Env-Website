// Database
import { States } from '../../../../db/models/states';

// Utils
import getCo2EmissionsByKwh from '../../utils/get-co2-emissions-by-kwh';


const appendUSAverages = async stateData => {
    const usData = await States.find({ stateId: 'US'});
    if(!usData) {
        console.log('ERROR.  Could not find US energy data');
        return null;
    }
    const res = JSON.parse(JSON.stringify(usData[0]));
    stateData['US'] = res;
    return stateData;
};

const getStateData = async stateId => {
    const mongoStateData = await States.find({ stateId: stateId});
    if(!mongoStateData) {
        console.log("ERROR -- Could not find state data for ", stateId);
        return null;
    }
    const stateData = JSON.parse(JSON.stringify(mongoStateData[0])); // Converts its to JSON since its not a native JSON in Mongo
    const production = stateData.energyProduction;
    const averageCO2PerKwh = getCo2EmissionsByKwh(production.total, production.naturalGas, production.coal, production.petroleum);
    stateData.energyProduction.averageCO2PerKwh = averageCO2PerKwh;
    return stateData;
}


const getStateAndUsData = async state => {
    const stateData = await getStateData(state);
    if(!stateData) {
        return { error: true, message: 'Could not find state data for: ', state };
    }
    const completeStateData = await appendUSAverages(stateData);
    if(!completeStateData) {
        return { error: true, message: 'Could not find US data' };
    }
    const comparisons = completeStateData.US.stateComparisons;
    delete completeStateData.US;
    completeStateData['stateComparisons'] = comparisons;
    return  { error: false, completeStateData };
};

module.exports = {
    getStateAndUsData,
    getStateData,
    appendUSAverages
}