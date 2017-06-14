// These scripts format data into good JSON
const fs = require('fs');

const rawStateEnergyProductionData = require('./raw/state-energy-production-data');
const rawStateEnergyConsumptionData = require('./raw/state-energy-consumption-data');
const rawStateMiscData = require('./raw/state-misc-data');

const formattedStateEnergyProductionData = require('./formatted/state-energy-production-data');
const formattedStateEnergyConsumptionData = require('./formatted/state-energy-consumption-data');
const formattedStateMiscData = require('./formatted/state-misc-data');
const formattedSolarInstallCost = require('./formatted/solar-install-cost');

const states =  ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'];

const aggregateFormattedData = (misc, production, consumption, solarInstallation) => {
    //const results = misc;
    let results = [];
    states.forEach(id => results.push({stateId: id}) );

    for (let i = 0; i < misc.length; i++) {
        let stateKey = misc[i].stateId;
        for (let k = 0; k < results.length; k++) {
            if (results[k].stateId === stateKey) {
                results[k]['misc'] = misc[i].misc;
            }
        }
    }

    for (let i = 0; i < production.length; i++) {
        let stateKey = production[i].stateId;
        for (let k = 0; k < results.length; k++) {
            if (results[k].stateId === stateKey) {
                results[k]['energyProduction'] = production[i].energyProduction;
            }
        }
    }

    for (let i = 0; i < consumption.length; i++) {
        let stateKey = consumption[i].stateId;
        for (let k = 0; k < results.length; k++) {
            if (results[k].stateId === stateKey) {
                results[k]['energyConsumption'] = consumption[i].energyConsumption;
            }
        }
    }

    for (let i = 0; i < solarInstallation.length; i++) {
        let stateKey = solarInstallation[i].stateId;
        for (let k = 0; k < results.length; k++) {
            if (results[k].stateId === stateKey) {
                results[k]['misc']['installPrice6kw'] = solarInstallation[i].installPrice6kw;
                results[k]['misc']['installPrice10kw'] = solarInstallation[i].installPrice10kw;
            }
        }
    }
    let written = 'module.exports =' + JSON.stringify(results);
    fs.writeFile(__dirname + "/formatted/all-states-all-data.js", written, function(err) {
        if(err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    }); 
    return results;

};

// This script formats misc data
const stateMisc = data => {
    const results = [];
    for (let i = 0; i < data.length; i++) {
        let state = {};
        state.stateId = data[i].stateId;
        delete data[i].stateId;
        for (key in data[i]) {
            if ( data[i][key] === '') {
                data[i][key] = 0;
            }
        }
        state.misc = data[i];
        results.push(state);
    }
    return results;
}

// This script formats state energy production data
const stateEnergyProduction = data => {
    const results = [];
    for (let i = 0; i < data.length; i++) {
        let state = {};
        state.stateId = data[i].stateId;
        delete data[i].stateId;
        for (key in data[i]) {
            if ( data[i][key] === '') {
                data[i][key] = 0;
            }
        }
        state.energyProduction = data[i];
        results.push(state);
    }
    return results;
}

// THis is for state energy consumption
// Data come in trillion BTUs so I need to convert to MWH
const stateEnergyconsumption = data => {
    const results = [];
    for (let i = 0; i < data.length; i++) {
        let state = {};
        state.stateId = data[i].stateId;
        delete data[i].stateId;
        for (key in data[i]) {
            if ( data[i][key] === '') {
                data[i][key] = 0;
            }
            let val = data[i][key];
            if (typeof val === 'string') {
                val = parseInt(val.replace(/\,/g,""));
            }
            data[i][key] = Math.round(data[i][key] * 100.293071); //Trillion BTU to MGW
        }
        state.energyConsumption = data[i];
        results.push(state);
    }
    return results;
}



// let data  = stateEnergyProduction(rawStateEnergyProductionData);
// let data = stateEnergyconsumption(rawStateEnergyConsumptionData);
// let data  = stateMisc(rawStateMiscData);

let data = aggregateFormattedData(formattedStateMiscData, formattedStateEnergyProductionData, formattedStateEnergyConsumptionData, formattedSolarInstallCost);
console.log(data);
