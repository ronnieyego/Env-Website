import getAnswers from '../../../actions/footprint/submit-get-all-answers';

import getFoodResults from '../../footprint-form/calculations/food';
import getHomeResults from '../../footprint-form/calculations/home';
import getHomeActivitiesResults from '../../footprint-form/calculations/home-activities';
import getHomeHeatingResults from '../../footprint-form/calculations/heating';
import getHomeCoolingResults from '../../footprint-form/calculations/cooling';
import getTransportationResults from '../../footprint-form/calculations/transportation';
import getPetsResults from '../../footprint-form/calculations/pets';
import getStuffResults from '../../footprint-form/calculations/stuff';
import getClothesResults from '../../footprint-form/calculations/clothes';
import getFurnitureResults from '../../footprint-form/calculations/furniture';

import { utilityEmissionsPerState } from '../../../utils/utils-data/state-energy-and-emissions';

const betterDriving = res => {
    const monthlyCar = res.transportation.car;
    const percentImprovement =  1.15;
    return  ((monthlyCar * percentImprovement) - monthlyCar).toFixed(1);
};

const electricCar = (res, answers) => {
    const newAnswers = {...answers, carFuelType: 'Electric'};
    const newRes = getTransportationResults(newAnswers);
    const diff  = res.transportation.totalCo2 - newRes.totalCo2;
    if(diff < 0) {
        return {
            amount: diff,
            subtext: 'Wow you have a very energy efficient car.  Keep it!'
        }
    }
    return {
        amount: diff,
        subtext: 'Utilities are more efficient at producing energy than car engines.'
    };
};

const oneDegreeWarmer = (res, answers) => {
    const summerTemp = parseInt(answers.summerTemp) + 1;  // answers is a string trlolololol
    const newAnswers = { ...answers, summerTemp };
    const newRes = getHomeCoolingResults(newAnswers);
    const diff = newRes.monthlyCo2 - res.cooling.monthlyCo2;
    return Math.round(diff);
};

const oneDegreeCooler = (res, answers) => {
    const winterTemp = parseInt(answers.winterTemp) - 1;  // answers is a string trlolololol
    const newAnswers = { ...answers, winterTemp };
    const newRes = getHomeHeatingResults(newAnswers);
    const diff = newRes.monthlyCo2 - res.heating.monthlyCo2;
    const subtext = diff ? '' : 'Gas vents are surprisingly environmentally friendly';
    return {
        display: 'Keep your home 1 degree cooler in winter',
        amount: diff,
        subtext
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
    const answers = getAnswers(questions);
    answers.state = res.userState;
    const oneDegreeCoolerResults = oneDegreeCooler(res, answers)
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
            amount: electricCar(res, answers).amount,
            subtext: electricCar(res, answers).subtext
        },
        {
            display: 'Keep your home 1 degree warmer in summer',
            amount: oneDegreeWarmer(res, answers),
        },
        {
            ...oneDegreeCoolerResults
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
