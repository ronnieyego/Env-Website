const mongoose = require('../../mongoose.js')
const {States} = require('../../models/states.js')

// This script compares every state vs 1 sample state
// It just checks to see if any keys are missing and if the data types are the same
// It does not validate the data

const states =  ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'];
const problemStates = [];
const completedStates = [];
let results = {};

const exampleState = { _id: '592f520bd5d8d51d1f558e81',
    stateId: 'WA',
    misc: 
     { stateFullName: 'Washington',
       centsPerKwh: 9.27,
       clearDays: 58,
       dailySunHours: 4.4,
       summerSunHours: 5.8,
       winterSunHours: 2.1,
       avgKwhPerHouseholdConsumed: 964,
       avgMonthHouseUtilCost: 88,
       installPrice6kw: 17400,
       installPrice10kw: 28950 },
    energyProduction: 
     { coal: 0,
       geothermal: 0,
       hydroelectric: 73125160,
       naturalGas: 8109246,
       nuclear: 8160912,
       other: -18,
       biomass: 154259,
       othergases: 0,
       petroleum: 1733,
       pumpStorage: 40021,
       solar: 790,
       wind: 3763224,
       woodBurning: 320249,
       total: 93675576,
       pCoal: 0,
       pGeothermal: 0,
       pHydroelectric: 0.78,
       pNaturalGas: 0.09,
       pNuclear: 0.09,
       pOther: 0,
       pBiomass: 0,
       pOtherGases: 0,
       pPetroleum: 0,
       pPumpStorage: 0,
       pSolar: 0,
       pWind: 0.04,
       pWoodBurning: 0 },
    energyConsumption: 
     { totalEnergyConsumption: 201780,
       fossilFuelTotal: 109550,
       naturalGas: 32074,
       petroleum: 69804,
       coal: 7672,
       nuclear: 9959,
       renewableTotal: 95068,
       renewablePercent: 47,
       hydroElectric: 75791,
       solar: 90,
       biofuels: 12145,
       geothermal: 110,
       wind: 6930 
    } 
};

const getObjectMapping = (state, base) => {
    if (!base) {
        base = '';
    }
    let results = {};
    for(key in state) {
        if(typeof state[key] !== 'object') {
            results[base + key] = typeof state[key];
        } else {
            let newBase = key + '-->';
            let deeperLevelRes =  getObjectMapping(state[key],newBase);
            for ( key in deeperLevelRes ) {
                results[key] = deeperLevelRes[key];
            }
        }
    }
    return results;
};

const exampleStateMapping = getObjectMapping(exampleState);



const compareMappings = (example, state) => {
    let missingData = [];
    for ( key in example) {
        //console.log('key: ', key , '|| mappings ' ,example[key], ' ||| ', state[key]);
        if (example[key] !== state[key]) {
            missingData.push(key);
        }
    }
    return missingData;
}


const validateState = (state, id) => {
    let mapping = getObjectMapping(state)
    let missingData = compareMappings(exampleStateMapping, mapping);
    if (missingData.length > 0) {
        results[id] = missingData;
    }
}



const getStateData = id => {
    return myPromise = new Promise((resolve, reject) => {  
        States.find({ stateId: id}).then((stateInfo) => {
            if(!stateInfo) {
                reject('Couldn\'t find state data for :', id);
            } else {
                resolve(stateInfo);
            }
        })
    }).then(res => {
        console.log('Getting data for: ', id);
        completedStates.push(id);
        let stateobject = JSON.parse(JSON.stringify(res[0]));
        validateState(stateobject, id);
    })
    .catch(err => {
        problemStates.push(id);
        console.log(err);
    })
};


Promise.all(states.map(getStateData))
.then(() => {
    console.log('Got all data');
    
    console.log('');
    console.log('');
    console.log('');
    console.log('');
    console.log(results);
    console.log('process completed');

})
.catch(() => {
    console.log('Something went wrong!');
    console.log('problem states', problemStates);
});






