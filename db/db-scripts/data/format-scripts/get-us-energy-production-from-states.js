const stateProduction =require('../raw/state-energy-production-data');
const energyKeys = ["coal", "geothermal",  "hydroelectric",  "naturalGas",  "nuclear",  "other",  "biomass",  "othergases",  "us.petroleum",  "us.pumpStorage",  "solar",  "wind",  "woodBurning",  "total"];


    
let us = {
    "stateId": "US",
    "coal": 0,
    "geothermal": 0,
    "hydroelectric": 0,
    "naturalGas": 0,
    "nuclear": 0,
    "other": 0,
    "biomass": 0,
    "othergases": 0,
    "petroleum": 0,
    "pumpStorage": 0,
    "solar": 0,
    "wind": 0,
    "woodBurning": 0,
    "total": 0
};

stateProduction.forEach(state => {
    energyKeys.forEach(key => {
        if(state[key] > 0) {
            us[key] += state[key];
        }
    })
    
});
const total = us.total;
console.log(us);


us.pCoal = (us.coal/total).toFixed(2);
us.pGeothermal = (us.geothermal/total).toFixed(2);
us.pHydroelectric = (us.hydroelectric/total).toFixed(2);
us.pNaturalGas = (us.naturalGas/total).toFixed(2);
us.pNuclear = (us.nuclear/total).toFixed(2);
us.pOther = (us.other/total).toFixed(2);
us.pBiomass = (us.biomass/total).toFixed(2);
us.pOtherGases = (us.othergases/total).toFixed(2);
us.pPetroleum = (us.petroleum/total).toFixed(2);
us.pPumpStorage = (us.pumpStorage/total).toFixed(2);
us.pSolar = (us.solar/total).toFixed(2);
us.pWind = (us.wind/total).toFixed(2);
us.pWoodBurning = (us.woodBurning/total).toFixed(2);

console.log(JSON.stringify(us, null, 2));