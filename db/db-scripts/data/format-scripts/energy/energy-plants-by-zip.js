const fs = require('fs');
const PLANTS = require('../../formatted/energy/all-us-energy-plants.json');

const ZIP_PLANTS = {};

Object.keys(PLANTS).forEach(key => {
    const plant = PLANTS[key];
    const zip = plant.zip;
    if(ZIP_PLANTS[zip]) {
        ZIP_PLANTS[zip].push(plant);
    }
    else {
        ZIP_PLANTS[zip] = [plant];
    }
})

const data = JSON.stringify(ZIP_PLANTS, null, 2);
fs.writeFile('db/db-scripts/data/formatted/energy/all-us-energy-plants-by-zip.json', data, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("US energy plants by zip written");
});