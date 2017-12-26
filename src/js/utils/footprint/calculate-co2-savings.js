import _ from 'lodash';
import { utilityEmissionsPerState } from '../utils-data/state-energy-and-emissions';

const co2PerGallonOfGas = 19.6;
const kwhPer100MilesElectricCar = 30;

const betterDriving = res => {
    const currentMpg = res.co2.transportationSubCategories.carMpg;
    const monthlyCar = res.co2.transportationSubCategories.monthlyCar;
    const percentImprovement = currentMpg/(currentMpg * 1.15);
    return  (monthlyCar - (monthlyCar * percentImprovement)).toFixed(1);
};

const electricCar = res => {
    const carType = _.get(res, 'co2.transportationSubCategories.carType', 'Electric'); // If error then return 0 and not show card
    if(carType === 'Electric') {
        return 0;
    }
    const totalMiles = _.get(res, 'co2.transportationSubCategories.totalMilesDriven', 0);
    const mpg = _.get(res, 'co2.transportationSubCategories.carMpg', 0);
    const gallonsUsed = totalMiles/mpg;
    const gasCo2 = gallonsUsed * co2PerGallonOfGas; // Current co2 used
    const electricEnergy = kwhPer100MilesElectricCar * totalMiles / 100; // kwhs for electric car
    const stateCo2 = _.get(res, 'meta.stateCo2', 0.05);
    const co2FromElectric = electricEnergy * stateCo2;
    const diff = parseInt(gasCo2 - co2FromElectric);
    if(diff < 0) {
        return {
            amount: diff,
            subtext: 'Wow you have a very energy efficient car.  Keep it!'
        }
    }
    return {
        amount: diff,
        subtext: 'An electric car releases less than 1/100th Co2 than a combustible engine.'
    };
};

const moveToWa = res => {
    const applianceKwh = res.energy.appliance;
    const currentApplianceCo2 = applianceKwh * res.meta.stateCo2;
    const waCo2 = utilityEmissionsPerState['WA'];
    const waApplianceCo2 = applianceKwh * waCo2;
    console.log('got wa savings', currentApplianceCo2 - waApplianceCo2);
    return currentApplianceCo2 - waApplianceCo2;
}


const getCo2Savings = (res, questions) => {
    let results = [
        {
            display: 'Drive more efficiently',
            card: true,
            amount: betterDriving(res),
            subtext: 'This can be done by staying under 65 mph, slowly accelerating, and making sure you have fully inflated tires.',
            learnMore: 'https://www.fueleconomy.gov/feg/driveHabits.jsp'
        },
        {
            display: 'Switch to an electric car',
            card: true,
            amount: electricCar(res).amount,
            subtext: electricCar(res).subtext
        },
        {
            display: 'Go vegan',
            card: true,
            amount: _.get(res, 'co2.foodSubCategories.meat', 0) + _.get(res, 'co2.foodSubCategories.dairy', 0)
        },
        {
            display: 'Go vegetarian',
            card: true,
            amount: _.get(res, 'co2.foodSubCategories.meat', 0)
        },
        {
            display: 'Move to Washington',
            subtext: 'WA produces most of its electricity from hydroelectric',
            card: true,
            amount: moveToWa(res)
        }
    ];

    results.map(result => {
        result.amount = parseInt(result.amount);
        return result;
    })
    results.sort((a,b) => {
        return a.amount < b.amount
    });
    return results;
};


module.exports = {
    getCo2Savings
};
