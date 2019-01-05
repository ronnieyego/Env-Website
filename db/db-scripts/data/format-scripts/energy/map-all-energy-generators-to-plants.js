const fs = require('fs');
const generatorStream = fs.createReadStream('db/db-scripts/data/raw/energy/2017-all-energy-generators.csv');
const plantsStream = fs.createReadStream('db/db-scripts/data/raw/energy/2017-all-plant-locations.csv');
const csv = require('fast-csv');
 
const PLANTS = [];
const GENERATORS = [];
let plantsLoaded = false;
let generatorsLoaded = false;

const csvStreamPlants = csv()
    .on("data", function(data){
         PLANTS.push(data);
    })
    .on("end", function(){
        plantsLoaded = true;
        if(plantsLoaded && generatorsLoaded) {
            run();
        }
    });
 
plantsStream.pipe(csvStreamPlants);

const csvStreamGenerators = csv()
    .on("data", function(data){
         GENERATORS.push(data);
    })
    .on("end", function(){
        generatorsLoaded = true;
        if(plantsLoaded && generatorsLoaded) {
            run();
        }
    });
 
generatorStream.pipe(csvStreamGenerators);

// Eample generator row
// Utility ID,Utility Name,Plant Code,Plant Name,State,County,Generator ID,Technology,Prime Mover,Capacity (MW),Operating Year,Sector Name,Sector,Energy Source 1,Energy source code
// 195,Alabama Power Co,2,Bankhead Dam,AL,Tuscaloosa,1,Conventional Hydroelectric,HY,53.0,1963,Electric Utility,1,WAT,8
// Indexes.  Capacity: 9, sourceCode: 14

// Example plant row 
// Utility ID,Utility Name,Plant Code,Plant Name,Street Address,City,State,Zip,County,Latitude,Longitude
// 195,Alabama Power Co,2,Bankhead Dam,19001 Lock 17 Road,Northport,AL,35476,Tuscaloosa,33.458665,-87.356823

const MAPPED_PLANTS = {};
const PLANT_TYPES = ['utility', 'industrial', 'commercial', 'independent'];

const getPlantTypeFromCode = code => {
    switch(code) {
    case '1':
        return 'utility';
    case '2':
        return 'independent';
    case '3':
        return 'independent';
    case '4':
        return 'commercial';
    case '5':
        return 'commercial';
    case '6':
        return 'industrial';
    case '7':
        return 'industrial';
    default:
        console.log('bad plant source code', code);
        return 'other';
    }
};

const ENERGY_SOURCES = ['coal', 'oil', 'naturalGas', 'biofuel', 'solar', 'wind', 'geothermal', 'hydro', 'nuclear', 'other'];
const getSourceFromEnergyCode = code => {
    switch(code) {
    case '1':
        return 'coal';
    case '2':
        return 'oil';
    case '3':
        return 'naturalGas';
    case '4':
        return 'biofuel';
    case '5':
        return 'solar';
    case '6':
        return 'wind';
    case '7':
        return 'geothermal';
    case '8':
        return 'hydro';
    case '9':
        return 'nuclear';
    case '10':
        return 'other';
    default:
        console.log('bad energy source code', code);
        return 'other'
    }
};

const initializePlant = plantRow => {
    const id = plantRow[2];
    const name = plantRow[3];
    const utilityName = plantRow[1];
    const city = plantRow[5];
    const state = plantRow[6];
    const zip = plantRow[7];
    const county = plantRow[8];
    const lat = plantRow[9];
    const long = plantRow[10];
    MAPPED_PLANTS[id] = { id, name, utilityName, city, state, zip, county, lat, long };
    // Initialize all energy sources to 0 so the names are consistent.
    ENERGY_SOURCES.forEach(source => {
        MAPPED_PLANTS[id][source] = 0;
    })
};

const addGeneratorToPlant = row => {
    const plantId = row[2];
    const energySourceCode = row[14];
    const capacity = parseInt(row[9]);
    const plantTypeCode = row[12];

    const energySource = getSourceFromEnergyCode(energySourceCode);
    const plantType = getPlantTypeFromCode(plantTypeCode);

    if(!MAPPED_PLANTS[plantId]) {
        console.log('No location for plantId: ', plantId);
        return false;
    }
    MAPPED_PLANTS[plantId][energySource] = MAPPED_PLANTS[plantId][energySource] + capacity;
    // Last plant type wins.  They should all be the same hopefully.
    MAPPED_PLANTS[plantId].plantType = plantType;
};

const writeResults = () => {
    const data = JSON.stringify(MAPPED_PLANTS, null, 2);
    fs.writeFile('db/db-scripts/data/formatted/energy/all-us-energy-plants.json', data, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("US energy plants written");
    });
}
 

const run = () => {
    PLANTS.forEach(plant => initializePlant(plant));
    GENERATORS.forEach(generator => addGeneratorToPlant(generator))
    writeResults();
    console.log('completed');
};
