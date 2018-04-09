import Q from 'q';

import { mongoose } from '../../../../db/mongoose';
import { States } from '../../../../db/models/states';

import getCo2EmissionsByKwh from '../get-co2-emissions-by-kwh';
import validStateId from '../check-if-valid-state-id';

export default stateId => {
    const getStateDataDeferred = Q.defer();
    States.find({ stateId: stateId}).then((stateInfo) => {
        if(!stateInfo) {
            getStateDataDeferred.reject('Couldn\'t find state data');
        } else {
            let res = JSON.parse(JSON.stringify(stateInfo[0])); // Converts its to JSON since its not a native JSON in Mongo
            let production = res.energyProduction;
            let averageCO2PerKwh = getCo2EmissionsByKwh(production.total, production.naturalGas, production.coal, production.petroleum);
            res.energyProduction.averageCO2PerKwh = averageCO2PerKwh;
            getStateDataDeferred.resolve(res);
        }              
    });
    return getStateDataDeferred.promise;
}