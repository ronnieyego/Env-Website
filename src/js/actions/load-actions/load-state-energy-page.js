import Q from 'q';

import getStateData from '../../utils/apis/get-state-data';
import { States } from '../../../../db/models/states';

const appendUSAverages = stateData => {
    const appendUSAveragesDeferred = Q.defer();
    States.find({ stateId: 'US'})
    .then( usData => {
        if(!usData) {
            appendUSAveragesDeferred.reject('Couldn\'t find state data');
        } else {
            let res = JSON.parse(JSON.stringify(usData[0]));
            stateData['US'] = res;
            appendUSAveragesDeferred.resolve(stateData);
        }
    });
    return appendUSAveragesDeferred.promise
};


export const getStateAndUsData = state => {
    return getStateData(state)
    .then(stateData => {
        return appendUSAverages(stateData);
    })
    .then(allData => {
        let comparisons = allData.US.stateComparisons;
        delete allData.US;
        allData['stateComparisons'] = comparisons;
        return allData;
    })
    .catch(err => {
        console.log('ERRORED OUT OH NO!');
    });
};
