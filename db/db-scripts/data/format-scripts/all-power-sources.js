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
        if(!row.county) {
            console.log(row);
        }
        uniquePlants.push(row);
    }
});

uniquePlants.forEach( el => {
    let row = {};
    let oldRow = el;
    let entityId = el.entityId

    // New entity.  Just add it
    if (knownEntities.indexOf(entityId) === -1) {
        knownEntities.push(entityId);
        row['entityId'] = el.entityId;
        row['entityName'] = el.entityName;        
        row['entityCapactity'] = el.plantCapacity;
        row['states'] = [el.state];
        row['numberOfPlants'] = 1;
        row["hydroelectric"] = el.hydroelectric;
        row["wind"] = el.wind;
        row["coal"] = el.coal;
        row["naturalGas"] = el.naturalGas;
        row["nuclear"] = el.solar;
        row["petroleum"] = el.petroleum;
        row["geothermal"] = el.geothermal;
        row["solar"] = el.solar;
        row["sector"] = el.sector;
        row["solar"] = el.solar;

        uniqueEntities.push(row);
    //Entity exists.  Append plant data
    } else {
        for(let i = 0; i< uniqueEntities.length; i++) {
            let entity = uniqueEntities[i];
            if (entityId === entity['entityId']) {
                entity.numberOfPlants++;
                entity.entityCapactity += el.plantCapacity;
                entity.hydroelectric += el.hydroelectric;
                entity.wind += el.wind;
                entity.coal += el.coal;
                entity.solar += el.solar;
                entity.nuclear += el.nuclear;
                entity.petroleum += el.petroleum;
                entity.naturalGas += el.naturalGas;
                entity.geothermal += el.geothermal;
                if(entity.states.indexOf(el.state) === -1 ) {
                    entity.states.push(el.state);
                }
            }
        }
    }

});


let plants = 'module.exports =' + JSON.stringify(uniquePlants, null, 2);
    fs.writeFile(__dirname + "/../formatted/energy/all-power-plants.js", plants, function(err) {
        if(err) {
            return console.log(err);
        }

        console.log("All power plants saved");
    }); 
let entities = 'module.exports =' + JSON.stringify(uniqueEntities, null, 2);
    fs.writeFile(__dirname + "/../formatted/energy/all-power-entities.js", entities, function(err) {
        if(err) {
            return console.log(err);
        }
        
        console.log("All power entities saved");
    }); 

console.log('completedPlants: ', completedPlants.length, ' plants total');
console.log('uniqueEntities: ', uniqueEntities.length, ' entities total');
