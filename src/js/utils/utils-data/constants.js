const daysInMonth = 30;

const co2PerGallonOfGas = 19.6;
const co2PerGallonOfJetFuel = 21.1;
const gasKwh = 34.4;
const jetFuelKwh = 37.12;
const kwhPer100MilesElectricCar = 30;

const busMpgPerPerson = 31.46;  // https://www.afdc.energy.gov/data/10311
const mpgPerPersonPlane = 84.9;
const trainMpgPerPerson = 50.59 // https://www.afdc.energy.gov/data/10311

module.exports = {
    busMpgPerPerson,
    co2PerGallonOfGas,
    co2PerGallonOfJetFuel,
    gasKwh,
    jetFuelKwh,
    kwhPer100MilesElectricCar,
    mpgPerPersonPlane,
    trainMpgPerPerson
}