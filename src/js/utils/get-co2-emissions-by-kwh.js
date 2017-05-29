"use strict";
const emissionData = require('../../../db/db-scripts/data/co2-by-energy-source');

module.exports = function(total, naturalGas, coal, petroleum) {
    // These represent pounds of CO2 for every MILLION btus generated
    // I should get this from the DB instead of hardcoding it.
        // Will this impact perf?

    // The p stands for percent
    let totalEnergy = total;
    let pNaturalGas = naturalGas/totalEnergy;
    let pCoal = coal/totalEnergy;
    let pPetroleum = petroleum/totalEnergy;


    let ngEmissions = pNaturalGas * emissionData.naturalGas;
    let coalEmissions = pCoal * emissionData.coal;
    let petroleumEmissions = pPetroleum * emissionData.gasoline;
    let avgCO2PerBTU = ngEmissions + coalEmissions + petroleumEmissions;

    return (avgCO2PerBTU/3412).toFixed(4); //3412 is BTUs/kWh.  ToFixed just means 4 decimal places
    // Return value is POUNDS of CO2 per kWh
};

