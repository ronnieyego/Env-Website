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

const getTransit = (stage, age, gender) => ({
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

const getAverageEnergy = (state, age, gender) => {
    const {carMiles, planeMiles } = getTransit(state, age, gender);
    const monthlyCar = carMiles * gasKwh;
    const monthlyPlane = planeMiles * jetFuelKwh;
    const monthlyTransportation = monthlyCar + monthlyPlane;

    // Food multiplier is because AmericanFood is based off a 3890 calorie diet.
    const cals = demographicCalories[age][gender];
    const foodMultiplier = cals / americanDietCalories;
    let foodKeys = Object.keys(americanFood);
    const totalYearFood = foodKeys.reduce((total, current) => {
        const food = americanFood[current];
        const energy = food.yearServings * food.co2PerServing * foodMultiplier;
        return total + energy;
    }, 0);
    
    const totalMonthFood = totalYearFood/12;
    const appliance = utilityUse[state];
    const energyTotal = totalMonthFood + monthlyTransportation + appliance;

    return {
        food: totalMonthFood.toFixed(1),
        transportation: monthlyTransportation.toFixed(1),
        appliance: appliance.toFixed(1),
        total: energyTotal.toFixed(0)
    };
};

const getAverageWater = (state, age, gender, energy) => {
    const foodKeys = Object.keys(americanFood);
    const totalYearFood = foodKeys.reduce((total, current) => {
        const food = americanFood[current];
        const water = food.yearServings * food.water;
        return total + water;
    }, 0);
    const totalMonthFood = totalYearFood/12;
    const applianceMonthly = energy.total * waterUsePerKwhPerState[state];
    const total = totalMonthFood + applianceMonthly;
    return {
        food: totalMonthFood,
        appliance: applianceMonthly,
        total
    };
}

const getAverage = (state, age, gender) => {
    const co2 = getAverageCo2(state, age, gender);
    const energy = getAverageEnergy(state, age, gender);
    const water = getAverageWater(state, age, gender, energy);
    return {
        co2,
        energy,
        water 
    }
}

module.exports = {
    getAverage
}
