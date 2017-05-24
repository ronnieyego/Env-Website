const emissionData = require('../../../db/db-scripts/data/co2-by-energy-source');

//TODO:  Add a unit test!
export default (data) => {
    // These represent pounds of CO2 for every MILLION btus generated
    // I should get this from the DB instead of hardcoding it.
        // Will this impact perf?

    // The p stands for percent
    let totalEnergy = parseInt(data.totalEnergyConsumption.replace(/,/g, ''));
    let pNaturalGas = data.naturalGas/totalEnergy;
    let pCoal = data.coal/totalEnergy;
    let pPetroleum = data.petroleum/totalEnergy;


    let ng = pNaturalGas * emissionData.naturalGas;
    let coal = pCoal * emissionData.coal;
    let petroleum = pPetroleum * emissionData.gasoline;
    let avgCO2PerBTU = ng + coal + petroleum;

    return (avgCO2PerBTU/3412).toFixed(4); //3412 is BTUs/kWh.  ToFixed just means 4 decimal places
};

