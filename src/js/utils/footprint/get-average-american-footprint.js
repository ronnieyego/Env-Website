const averages = require('../utils-data/american-averages');

// Hacky V1 to get us average energy
const kwhPerGallon = 34.4;
const mpg = 23.6;
const kwhPerGallonJetFuel = 37.12;
const mpgPerPersonPlane = 84.9;

// All of the below are US average per year

const planeMiles = 2000;


const getAverage = (state, age, gender) => {
    let foodKeys = Object.keys(averages.food);
    const totalYearFood = foodKeys.reduce((total, current) => {
        const food = averages.food[current];
        const energy = food[0] * food[1]; // Servings/year, energy/serving
        return total + energy;
    }, 0);
    const carMiles = averages.americanCarMiles[age][gender];
    const totalMonthFood = totalYearFood/12;
    const monthlyCar = carMiles/mpg/12 * kwhPerGallon;
    const monthlyPlane = planeMiles/mpgPerPersonPlane/12 * kwhPerGallonJetFuel;
    const monthlyTransportation = monthlyCar + monthlyPlane;
    const appliance = averages.utilityUse[state];
    const energyTotal = totalMonthFood + monthlyTransportation + appliance;

    return {
        food: totalMonthFood.toFixed(1),
        transportation: monthlyTransportation.toFixed(1),
        appliance: appliance.toFixed(1),
        total: energyTotal.toFixed(0)
    }
}

module.exports = {
    getAverage
}
