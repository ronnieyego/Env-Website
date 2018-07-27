import ids from '../../../utils/ids/index';

import { getAnswerFromId } from '../../../components/questions/utils';
import { utilityEmissionsPerState } from '../../../utils/utils-data/state-energy-and-emissions';
import { co2PerGallonOfGas, kwhPer100MilesElectricCar } from '../../footprint-form/data/transportation';

const betterDriving = res => {
    const monthlyCar = res.transportation.car;
    const percentImprovement =  1.15;
    return  ((monthlyCar * percentImprovement) - monthlyCar).toFixed(1);
};

const electricCar = (res, questions) => {
    const carType = getAnswerFromId(questions, ids.carType);
    const totalMiles = getAnswerFromId(questions, ids.milesDrivenMonth);
    const mpg = getAnswerFromId(questions, ids.carMpg);
    const userState = res.userState;
    const stateCo2 = utilityEmissionsPerState[userState];
    if(carType === 'Electric') {
        return 0;
    }

    const gallonsUsed = totalMiles/mpg;
    const gasCo2 = gallonsUsed * co2PerGallonOfGas; // Current co2 used
    const electricEnergy = kwhPer100MilesElectricCar * totalMiles / 100; // kwhs for electric car
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
    const currentApplianceCo2 = res.homeActivities.monthlyCo2;
    const percentReduction = utilityEmissionsPerState['WA'] / utilityEmissionsPerState[res.userState];
    const waApplianceCo2 = currentApplianceCo2 * percentReduction;
    return Math.round(currentApplianceCo2 - waApplianceCo2);
};

// Update these 2 to up calories of veggies (and dairy/cheese)
const getVegetarianSavings = res => {
    const foodCo2 = res.food.co2;
    const {total, vegetables, dairy, cheese } = foodCo2;
    return total - vegetables - dairy - cheese;
};

const getVeganSavings = res => {
    const foodCo2 = res.food.co2;
    const {total, vegetables } = foodCo2;
    return total - vegetables;
};

export default (res, questions) => {
    const results = [
        {
            display: 'Drive more efficiently',
            card: true,
            amount: betterDriving(res),
            subtext: 'This can be done by not staying under 65 mph, slowly accelerating, and making sure you have fully inflated tires.',
            learnMore: 'https://www.fueleconomy.gov/feg/driveHabits.jsp'
        },
        {
            display: 'Switch to an electric car',
            card: true,
            amount: electricCar(res, questions).amount,
            subtext: electricCar(res, questions).subtext
        },
        {
            display: 'Go vegan',
            card: true,
            amount: getVeganSavings(res)
        },
        {
            display: 'Go vegetarian',
            card: true,
            amount: getVegetarianSavings(res)
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
