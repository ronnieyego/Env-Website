const fs = require('fs');
const data = require('../raw/all-power-sources.js');

const uniquePlants = [];  // A plant is a single source of power.  It can have multiple generators
const completedPlants = [];
const uniqueEntities = []; // An entity is usually a whole state utility
const knownEntities = [];


data.forEach(el => {
    let row = el;
    let plantId = row.plantId;
    if (completedPlants.indexOf(plantId) === -1) {
        completedPlants.push(plantId);
        uniquePlants.push(row);
    }
});

uniquePlants.forEach( el => {
    let row = el;
    let entityId = row.entityId

    // New entity.  Just add it
    if (knownEntities.indexOf(entityId) === -1) {
        knownEntities.push(entityId);
        row['entityCapactity'] = row.plantCapacity;
        row['states'] = [row.state];
        row['numberOfPlants'] = 1;
        delete row.plantId;
        delete row.plantName;
        delete row.county;
        delete row.lat;
        delete row.long;
        delete row.plantCapacity;
        delete row.nameplateCapacity;

        uniqueEntities.push(row);
    //Entity exists.  Append plant data
    } else {
        for(let i = 0; i< uniqueEntities.length; i++) {
            let entity = uniqueEntities[i];
            if (entityId === entity['entityId']) {
                entity.numberOfPlants++;
                entity.entityCapactity += row.plantCapacity;
                entity.hydroelectric += row.hydroelectric;
                entity.wind += row.wind;
                entity.coal += row.coal;
                entity.solar += row.solar;
                entity.nuclear += row.nuclear;
                entity.petroleum += row.petroleum;
                entity.naturalGas += row.naturalGas;
                entity.geothermal += row.geothermal;
                if(entity.states.indexOf(row.state) === -1 ) {
                    entity.states.push(row.state);
                }
            }
        }
    }

});


let plants = 'module.exports =' + JSON.stringify(uniquePlants);
    fs.writeFile(__dirname + "/../formatted/energy/all-power-plants.js", plants, function(err) {
        if(err) {
            return console.log(err);
        }

        console.log("All power plants saved");
    }); 
let entities = 'module.exports =' + JSON.stringify(uniqueEntities);
    fs.writeFile(__dirname + "/../formatted/energy/all-power-entities.js", entities, function(err) {
        if(err) {
            return console.log(err);
        }
        
        console.log("All power entities saved");
    }); 

console.log('completedPlants: ', completedPlants.length, ' plants total');
console.log('uniqueEntities: ', uniqueEntities.length, ' entities total');
