const averages = require('../utils-data/american-averages');

// Hacky V1 to get us average energy
const kwhPerGallon = 34.4;
const mpg = 23.6;
const kwhPerGallonJetFuel = 37.12;
const mpgPerPersonPlane = 84.9;

//Hacky V1 to get co2
const co2PerGallonOfJetFuel = 21.1;
const co2PerGallonOfGasoline = 19.64;

// All of the below are US average per year

const planeMiles = 2000;

const getTransit = (stage, age, gender) => ({
        carMiles: (averages.americanCarMiles[age][gender])/mpg/12,
        planeMiles: planeMiles/mpgPerPersonPlane/12
    });

const getAverageCo2 = (state, age, gender) => {
    const {carMiles, planeMiles } = getTransit(state, age, gender);

    const carCo2 = carMiles * co2PerGallonOfGasoline;
    const planeCo2 = planeMiles * co2PerGallonOfJetFuel;
    const transportationCo2 = parseInt(carCo2 + planeCo2);

    const applianceCo2 = parseInt(averages.utilityUse[state] * averages.utilityEmissionsPerState[state]);

    let foodKeys = Object.keys(averages.food);

    const totalYearFoodCo2 = foodKeys.reduce((total, current) => {
        const food = averages.food[current];
        const energy = food.yearServings * food.co2PerServing;
        return total + energy;
    }, 0);
    const foodCo2 = parseInt(totalYearFoodCo2/12);
    const totalCo2 = parseInt(applianceCo2 + foodCo2 + transportationCo2);

    return {
        applianceCo2,
        foodCo2,
        transportationCo2,
        totalCo2
    };

}

const getAverageEnergy = (state, age, gender) => {
    const {carMiles, planeMiles } = getTransit(state, age, gender);
    const monthlyCar = carMiles * kwhPerGallon;
    const monthlyPlane = planeMiles * kwhPerGallonJetFuel;
    const monthlyTransportation = monthlyCar + monthlyPlane;


    let foodKeys = Object.keys(averages.food);
    const totalYearFood = foodKeys.reduce((total, current) => {
        const food = averages.food[current];
        const energy = food.yearServings * food.energyPerServing;
        return total + energy;
    }, 0);
    
    const totalMonthFood = totalYearFood/12;
    const appliance = averages.utilityUse[state];
    const energyTotal = totalMonthFood + monthlyTransportation + appliance;

    return {
        food: totalMonthFood.toFixed(1),
        transportation: monthlyTransportation.toFixed(1),
        appliance: appliance.toFixed(1),
        total: energyTotal.toFixed(0)
    };
};


const getAverage = (state, age, gender) => {
    return {
        co2: getAverageCo2(state, age, gender),
        energy: getAverageEnergy(state, age, gender)
    }
}

module.exports = {
    getAverage
}
