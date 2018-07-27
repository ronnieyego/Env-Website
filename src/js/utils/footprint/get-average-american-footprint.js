// DEPRECATED

const { americanCarMiles, americanDietCalories, americanFood, demographicCalories, kwhPerMonthAppliance } = require('../utils-data/american-averages');
const { utilityEmissionsPerState, utilityUse, waterUsePerKwhPerState } = require('../utils-data/state-energy-and-emissions');
const {
    gasKwh, 
    jetFuelKwh, 
    mpgPerPersonPlane,
    co2PerGallonOfJetFuel,
    co2PerGallonOfGas

} = require('../utils-data/constants');

const mpg = 23.6;
const planeMiles = 2000;

const getTransit = (state, age, gender) => ({
        carMiles: (americanCarMiles[age][gender])/mpg/12,
        planeMiles: planeMiles/mpgPerPersonPlane/12
});

const getAverageCo2 = (state, age, gender) => {
    const {carMiles, planeMiles } = getTransit(state, age, gender);

    const carCo2 = carMiles * co2PerGallonOfGas;
    const planeCo2 = planeMiles * co2PerGallonOfJetFuel;
    const transportation = parseInt(carCo2 + planeCo2);

    const appliance = parseInt(utilityUse[state] * utilityEmissionsPerState[state]);

    // Food multiplier is because AmericanFood is based off a 3890 calorie diet.
    const cals = demographicCalories[age][gender];
    const foodMultiplier = cals / americanDietCalories;
    let foodKeys = Object.keys(americanFood);
    const totalYearFoodCo2 = foodKeys.reduce((total, current) => {
        const food = americanFood[current];
        const energy = food.yearServings * food.co2PerServing * foodMultiplier;
        return total + energy;
    }, 0);

    const food = parseInt(totalYearFoodCo2/12);
    const total = parseInt(appliance + food + transportation);
    return {
        appliance,
        food,
        transportation,
        total
    };

}

const getAverage = (state, age, gender) => {
    const co2 = getAverageCo2(state, age, gender);
    return {
        co2
    }
}

const AVERAGE_AMERICAN = getAverage('US', '20-34', 'MALE');

module.exports = {
    AVERAGE_AMERICAN,
    getAverage
}
