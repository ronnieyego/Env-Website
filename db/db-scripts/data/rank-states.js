// This script grabs all state data, finds some fields to sort on, and then adds the states ranking
// If im missing data on a state, it will suceed, but it should fail.

const fs = require('fs');
const {MongoClient, ObjectId} = require('mongodb');
const co2Emissions = require('../../../src/js/utils/get-co2-emissions-by-kwh.js');

// Heroku : 'mongodb://heroku_0fqtdb7x:sgvsobiubth5nmf1oujn6lr5jg@ds157571.mlab.com:57571/heroku_0fqtdb7x
// Local : 'mongodb://localhost:27017/EnvWebsite'
const env = 'mongodb://localhost:27017/EnvWebsite';

const states = ['AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 'WA', 'WI', 'WV', 'WY'];
let missingData = [];
let noRes = [];

let output = [];
let sortedOutput = {};
let db;
const getStateData = (id) => {
   console.log(id);
   return new Promise((resolve, reject) => {
        db.collection('states').findOne({stateId: id})
        .then(res => {
            if(!res){
                console.log(id + ' No results');
                noRes.push(id);
                resolve(id, ' Has no results');
            }
            if(res.energyProduction) {
                let total = res.energyProduction.total;
                let coal = res.energyProduction.coal;
                let naturalGas = res.energyProduction.naturalGas;
                let petroleum = res.energyProduction.petroleum;
                if( total > -1 && coal > -1  && naturalGas > -1 && petroleum > -1) {
                    let emissionsByKwh = co2Emissions(total, naturalGas, coal, petroleum);
                    output.push({
                        stateid : id,
                        totalEnergyProduced : total,
                        emissionsByKwh
                    });

                    console.log(id + ' is good!');
                    resolve(id + ' is good!');
                } else {
                    console.log(id + ' is bad');
                    missingData.push(id);
                    resolve(id, ' is BAD!!!!!!');
                }
            } else {
                console.log(id + ' is couldnt find energy data');
                noRes.push(id);
                resolve(id, ' Has no energy production data');
            }
            
        })
    });
}

const sortStates = (stateData, sortKey) => {
    stateData.sort((a, b) => {
        return  b[sortKey] - a[sortKey];
    });
    for (let i = 0; i < stateData.length; i++) {
        stateData[i][sortKey+'Rank'] = i + 1;
    }
    return stateData;
}

const formatOutput = sortedArray => {
    let finalOutput = {};
    sortedArray.forEach(state => {
        let id = state.stateid;
        delete state.stateid;
        finalOutput[id] = state;
    });
    return finalOutput;
}

MongoClient.connect(env, (err, db1) => {
    db = db1;
    if (err) {
        return console.log('Unable to connect to Mongodb server');
    }
    console.log('Connected to Mongodb server');
    let promises = states.map(getStateData);
    Promise.all(promises)
    .then(() => {
        console.log('passed output', output);
        console.log('missing data, ', missingData);
        console.log('no res, ', noRes);

        let sorted = sortStates(output, 'totalEnergyProduced');
        sorted  = sortStates(sorted, 'emissionsByKwh');
        let final = formatOutput(sorted);
        let written = 'module.exports =' + JSON.stringify(final);
        fs.writeFile(__dirname + "/formatted/state-comparison-data.js", written, function(err) {
            if(err) {
                return console.log(err);
            }

            console.log("The file was saved!");
        }); 
        db.close();
    })
    .catch(() => {
       console.log('rejected output', output);
       db.close(); 
    })
    ;
});

