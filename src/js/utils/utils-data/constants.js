const daysInMonth = 30;

const co2PerGallonOfGas = 19.6;
const co2PerGallonOfJetFuel = 21.1;
const gasKwh = 34.4;
const jetFuelKwh = 37.12;
const kwhPer100MilesElectricCar = 30;

const busMpgPerPerson = 31.46;  // https://www.afdc.energy.gov/data/10311
const mpgPerPersonPlane = 84.9;
const trainMpgPerPerson = 50.59 // https://www.afdc.energy.gov/data/10311

// rough estimate of kwh cost to move water from the utility to the tap
const kwhPerGallon = 0.1;  // https://www.buildinggreen.com/primer/embodied-energy-tap-water

// ROugh guess at 9 oz per dish.  
const gallonsPerWashedDish = 0.07; //https://www.treehugger.com/kitchen-design/built-in-dishwashers-vs-hand-washing-which-is-greener.html

module.exports = {
    busMpgPerPerson,
    co2PerGallonOfGas,
    co2PerGallonOfJetFuel,
    gallonsPerWashedDish,
    gasKwh,
    jetFuelKwh,
    kwhPer100MilesElectricCar,
    kwhPerGallon,
    mpgPerPersonPlane,
    trainMpgPerPerson
}