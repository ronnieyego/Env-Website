// Hacky V1 to get us average energy


const kwhPerGallon = 34.4;
const mpg = 23.6;
const kwhPerGallonJetFuel = 37.12;
const mpgPerPersonPlane = 84.9;

const kwhPerMonthAppliance = 901;
// All of the below are US average per year

const carMiles = 13476;
const planeMiles = 2000;
const dairy = [630, .75];
const grain = [197, .43];
const fruit = [273, 1.67];
const vegetables = [556, .43];  // Veges + fats/sugars
const chicken = [54, 4.4];
const pork = [60, 12.6];
const beef = [71, 31.5];

const getAverage = () => {
    const totalYearFood = [dairy, grain, fruit, vegetables, chicken, beef, pork].reduce((total, current) => {
        let energy = current[0] * current[1];
        return total + energy;
    }, 0);
    const totalMonthFood = totalYearFood/12;
    const monthlyCar = carMiles/mpg/12 * kwhPerGallon;
    const monthlyPlane = planeMiles/mpgPerPersonPlane/12 * kwhPerGallonJetFuel;
    const monthlyTransportation = monthlyCar + monthlyPlane;

    return {
        food: totalMonthFood.toFixed(1),
        transportation: monthlyTransportation.toFixed(1),
        appliance: kwhPerMonthAppliance
    }
}

module.exports = {
    getAverage
}