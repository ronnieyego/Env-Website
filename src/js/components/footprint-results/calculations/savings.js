import ids from '../../../utils/ids/index';
import getAnswers from '../../../actions/footprint/submit-get-all-answers';
import getResults from '../../../actions/footprint/submit-with-all-answers';
import { getAnswerFromId } from '../../questions/utils';

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

import { servingFacts } from '../../footprint-form/data/food';

import { utilityEmissionsPerState } from '../../../utils/utils-data/state-energy-and-emissions';

// TODO.  
  // 1.  Add get a roomate.
  // 3.  Double payne windows?
  // 4.  Buy clothes second hand
  // 5.  Move to a smaller apartment


const betterDriving = res => {
    const monthlyCar = res.transportation.car;
    const percentImprovement =  1.15;
    return  ((monthlyCar * percentImprovement) - monthlyCar).toFixed(1);
};

const smallerHome = (res, answers) => {
    const updatedSqft = answers.homeSqft * .75;
    // gotta do homeSqft and houseSqft cause I failed to name them the same for home vs heating/cooling calcs ><
    const updatedAnswers = { ...answers, homeSqft: updatedSqft, houseSqft: updatedSqft };
    const newRes = getResults(updatedAnswers);
    const savings = res.monthlyCo2 - newRes.monthlyCo2;
    return {
        display: 'Move to a smaller home',
        amount: savings,
        subtext: 'Downsize to a home that\'s 25% smaller.  The savings come mostly from reduced heating and cooling.'
    };
}

const improvedInsulation = (res, questions, answers) => {
    const insulation = getAnswerFromId(questions, ids.homeInsulation);
    if(insulation === ids.extremelyInsulated) {
        return {
            display: 'Improve insulation',
            amount: 0,
            subtext: 'You already have great insulation'
        }
    }
    let improvedInsulation;
    if(insulation === ids.reasonableInsulated) {
        improvedInsulation = ids.extremelyInsulated;
    } else if(insulation === ids.somewhatInsulated) {
        improvedInsulation = ids.reasonableInsulated;
    } else if(insulation === ids.poorlyInsulated) {
        improvedInsulation = ids.somewhatInsulated;
    };

    const updatedAnswers = { ...answers, insulationType: improvedInsulation };
    const updatedHeating = getHomeHeatingResults(updatedAnswers);
    const updatedCooling = getHomeCoolingResults(updatedAnswers);
    const heatingSavings = res.heating.monthlyCo2 - updatedHeating.monthlyCo2;
    const coolingSavings = res.cooling.monthlyCo2 - updatedCooling.monthlyCo2;
    const totalSavings = heatingSavings + coolingSavings;
    const totalCostSavings = Math.round(totalSavings / (res.cooling.monthlyCo2 + res.heating.monthlyCo2) * 100);
    
    return {
        display: 'Improve insulation around your home.',
        amount: totalSavings,
        subtext: `By reducing heat loss by 33%, you'll reduce heating CO2 and save up to ${totalCostSavings}% on your utilities bill!`
    };
};

const bikeToWorkOneDay = res => {
    const monthlyCommute = res.transportation.car + res.transportation.bus +res.transportation.car;
    const percentDailyCommute = 0.114;
    const savings = monthlyCommute * percentDailyCommute;
    return {
        display: 'Bike to work 1 day a week',
        amount: savings,
        subtext: 'The assumes your commute is ~80% of your total driving.'
    };
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

const getVegetarianSavings = res => {
    // get total meat calories. 
    // get calories back from grain
    const { beef, pork, chicken, seafood } = res.food.calories;
    const meatCalories = beef + pork + chicken + seafood;
    const totalSavings = (res.food.co2.beef + res.food.co2.pork + res.food.co2.chicken + res.food.co2.seafood);
    const extraGrainServings = servingFacts['grain']['calories'] / meatCalories;
    const co2FromMoreGrain = servingFacts['grain']['co2'] * extraGrainServings;
    return Math.round((totalSavings - co2FromMoreGrain) * 30);
};

const getVeganSavings = res => {
    // get total meat + dairy calories. 
    // get calories back from grain
    const { beef, pork, chicken, seafood, cheese, dairy } = res.food.calories;
    const meatDairyCalories = beef + pork + chicken + seafood + cheese + dairy;
    const totalSavings = (res.food.co2.beef + res.food.co2.pork + res.food.co2.chicken + res.food.co2.seafood +  res.food.co2.dairy +  res.food.co2.cheese);
    const extraGrainServings = servingFacts['grain']['calories'] / meatDairyCalories;
    const co2FromMoreGrain = servingFacts['grain']['co2'] * extraGrainServings;
    return Math.round((totalSavings - co2FromMoreGrain) * 30);
};

const meatlessMondaySavings = res => {
    // get total meat calories.  Divide meat CO2 by 1/7
    // get calories back from grain
    const { beef, pork, chicken, seafood } = res.food.calories;
    const meatCalories = beef + pork + chicken + seafood;
    const totalSavings = (res.food.co2.beef + res.food.co2.pork + res.food.co2.chicken + res.food.co2.seafood) / 7;
    const extraGrainServings = servingFacts['grain']['calories'] / meatCalories;
    const co2FromMoreGrain = servingFacts['grain']['co2'] * extraGrainServings;
    return Math.round((totalSavings - co2FromMoreGrain) * 30);
};



export default (res, questions) => {
    const answers = getAnswers(questions);
    answers.state = res.userState;
    const oneDegreeCoolerResults = oneDegreeCooler(res, answers)
    const results = [
        {
            display: 'Drive more efficiently',
            amount: betterDriving(res),
            subtext: 'This can be done by not staying under 65 mph, slowly accelerating, and making sure you have fully inflated tires.',
            learnMore: 'https://www.fueleconomy.gov/feg/driveHabits.jsp'
        },
        {
            display: 'Switch to an electric car',
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
            ...bikeToWorkOneDay(res)
        },
        {
            ...improvedInsulation(res, questions, answers)
        },
        {
            ...smallerHome(res, answers)
        },
        {
            display: 'Go vegan',
            amount: getVeganSavings(res)
        },
        {
            display: 'Go vegetarian',
            amount: getVegetarianSavings(res)
        },
        {
            display: 'Do meatless Monday',
            amount: meatlessMondaySavings(res)
        },
        {
            display: 'Move to Washington',
            subtext: 'WA produces most of its electricity from hydroelectric',
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
