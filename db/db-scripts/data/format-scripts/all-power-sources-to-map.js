const fs = require('fs');
const plants = require('../formatted/energy/all-power-plants');
const us = require('../formatted/energy/us');
const stateAbbrMapping = require('./utils/state-abbr-mapping');
const missingCounty = require('./utils/county-map');

let noCounty = 0;
let found1 = 0;
let notFound = 0;

let geos = us.objects.counties.geometries;

for(let i = 0; i< plants.length; i++) {
    if (!plants[i].county) {
        console.log('county ot found', plants[i]);
        noCounty++;
    } else {
        let state = plants[i].state;
        let key = plants[i].county + ' County, ' + stateAbbrMapping[state];

        let found = false;
        geos.forEach( el => {
            let name = el.properties.name;
            name = name.trim();
            name = name.toLowerCase();
            key = key.trim();
            key = key.toLowerCase();
            if(key === name || missingCounty[key] === name) {
                found = true;

                el.properties["numberOfPlants"] = el.properties["numberOfPlants"] ? el.properties["numberOfPlants"] + plants[i].numberOfPlants : plants[i].numberOfPlants;
                el.properties["hydroelectric"] = el.properties["hydroelectric"] ? el.properties["hydroelectric"] + plants[i].hydroelectric : plants[i].hydroelectric;
                el.properties["wind"] = el.properties["wind"] ? el.properties["wind"] + plants[i].wind : plants[i].wind;
                el.properties["coal"] = el.properties["coal"] ? el.properties["coal"] + plants[i].coal : plants[i].coal;
                el.properties["naturalGas"] = el.properties["naturalGas"] ? el.properties["naturalGas"] + plants[i].naturalGas : plants[i].naturalGas;
                el.properties["petroleum"] = el.properties["petroleum"] ? el.properties["petroleum"] + plants[i].petroleum : plants[i].petroleum;
                el.properties["geothermal"] = el.properties["geothermal"] ? el.properties["geothermal"] + plants[i].geothermal : plants[i].geothermal;
                el.properties["solar"] = el.properties["solar"] ? el.properties["solar"] + plants[i].solar : plants[i].solar;
                el.properties["nuclear"] = el.properties["nuclear"] ? el.properties["nuclear"] + plants[i].nuclear : plants[i].nuclear;
                el.properties["entityName"] = plants[i].entityName;
                el.properties["entityCapactity"] = plants[i].entityCapactity;
                el.properties["state"] = plants[i].state;
                // If any plants are a utility, then call the whole county a utility
                el.properties["sector"] = el.properties["sector"] === 'Electric Utility' ? el.properties["sector"] : plants[i].sector;
            } 
        })
        if(found) {
            //console.log('MATCH FOUND!! -- ', key);
            found1++;
        } else {
            console.log('Not found -- ', key);
            notFound++;
        }
    }
}

geos.forEach( el => {
    let powerSource = ['coal', 'hydroelectric', 'wind', 'naturalGas', 'petroleum', 'solar', 'nuclear'];
    powerSource.forEach( power => {
        if(!el.properties[power]){
            el.properties[power] = 0;
        } else {
            el.properties[power] = Math.round(el.properties[power]);
        }
    })
});

let entities = JSON.stringify(us, null, 2);
    fs.writeFile(__dirname + "/../formatted/energy/us.json", entities, function(err) {
        if(err) {
            return console.log(err);
        }
        
        console.log("US geo map data written");
    }); 

console.log('count of plants', plants.length);
console.log('noCounty', noCounty);
console.log('not Found', notFound);
console.log('found', found1);


/* it looks like i ahve a 50% match rate for this list.  Might be worth to start with it an god from there.
Otherwise, I can try to resolve the county by lat long.  That's probbly better actually
*/