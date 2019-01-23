const fs = require('fs');
const PLANTS = require('../../formatted/energy/all-us-energy-plants.json');

const ZIP_PLANTS = {};

// should be in line with components/local-energy/utils;
const NAME_MAPPING = {
    coal: 'Coal',
    oil: 'Oil',
    naturalGas: 'Natural Gas',
    biofuel: 'Biofuel',
    solar: 'Solar',
    wind: 'Wind',
    geothermal: 'Geothermal',
    hydro: 'Hydroelectric',
    nuclear: 'Nuclear',
    other: 'Other',
};
const SOURCE_NAMES = Object.keys(NAME_MAPPING);


const sumSourceTotalEnergy = source => {
    return SOURCE_NAMES.reduce((total, key) => {
        return total + source[key];
    }, 0);
};

const appendTotalEnergyToSource = source => {
    source.total = sumSourceTotalEnergy(source);
    return source;
};

const appendPrimaryFuel = source => {
    let fuel = '';
    let max = 0;
    SOURCE_NAMES.forEach(fuelType => {
        if(source[fuelType] > max) {
            fuel = fuelType;
            max = source[fuelType];
        }
    });
    source.primaryFuel = fuel;
    return source;
};

const latLongAsNumber = source => {
    source.lat = parseFloat(source.lat, 10);
    source.long = parseFloat(source.long, 10);
    return source;
}

const updatePlant = source => {
    const withTotals = appendTotalEnergyToSource(source);
    const withPrimary = appendPrimaryFuel(withTotals);
    const latLongAsNumbers = latLongAsNumber(withPrimary);
    return latLongAsNumbers;
};

Object.keys(PLANTS).forEach(key => {
    const plant = PLANTS[key];
    const updatedPlant = updatePlant(plant);
    const zip = updatedPlant.zip;
    if(ZIP_PLANTS[zip]) {
        ZIP_PLANTS[zip].push(updatedPlant);
    }
    else {
        ZIP_PLANTS[zip] = [updatedPlant];
    }
})

const data = JSON.stringify(ZIP_PLANTS, null, 2);
fs.writeFile('db/db-scripts/data/formatted/energy/all-us-energy-plants-by-zip.json', data, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("US energy plants by zip written");
});