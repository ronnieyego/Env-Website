import _ from 'lodash';
import { getApplianceSubcategories, getFoodSubcategories, sumCo2QuestionSet } from './calculate-co2-submit';
import { getEnergySubcategories, sumEnergyQuestionSet } from './calculate-energy-submit';
import { getWaterApplianceSubcategories, getWaterFoodSubcategories, sumWaterQuestionSet } from './calculate-water-submit';
import { getAnswerFromKey } from './get-question-utils';

import { utilityEmissionsPerState, waterUsePerKwhPerState } from '../utils-data/state-energy-and-emissions';



// This util takes in data and calculates your energy footprint.  Yay!
const daysInMonth = 30;
const kwhPer100MilesElectricCar = 30; // kwhs for an average electric car to go 100mi
const gasKwh = 34.4;
const jetFuelKwh = 37.12;
const mpgPerPersonPlane = 84.9;

module.exports = payload => {
    const { questions, state } = payload;
    let stateCo2;
    let stateWater;
    try {
        stateCo2 = utilityEmissionsPerState[state];
        stateWater = waterUsePerKwhPerState[state];
    } catch (e) {
        throw Error(`Could not find co2e/kwh for ${state}`);
    }

// Get Questions
    const compiledFootprint = {};
    const applianceHour = _.filter(questions, function(o) { return o['use-type'] === 'hour'; });
    const houseHoldQuestions = _.filter(questions, function(o) { return o['use-type'] === 'monthly-own' || o['use-type'] === 'monthly-use'; });
    const foodQuestions = _.filter(questions, function(o) { return o['use-type'] === 'serving'; });
    const transportation = _.filter(questions, function(o) { return o['use-type'] === 'transportation'; });
    const applinaceQuestionSet = applianceHour.concat(houseHoldQuestions);

// Energy
    compiledFootprint.energy = {};
    compiledFootprint.energy.appliance = sumEnergyQuestionSet(applinaceQuestionSet, 'appliance');
    compiledFootprint.energy.applianceSubCategories = getEnergySubcategories(applinaceQuestionSet);
    compiledFootprint.energy.food = sumEnergyQuestionSet(foodQuestions, 'food');
    compiledFootprint.energy.foodSubCategories = getEnergySubcategories(foodQuestions);
    
    const transportationResults = sumEnergyQuestionSet(transportation, 'transportation');
    compiledFootprint.energy.transportationSubCategories = transportationResults;
    compiledFootprint.energy.transportation = transportationResults.transportation;
    
    compiledFootprint.energy.totalEnergy = (parseInt(compiledFootprint.energy.appliance) + parseInt(compiledFootprint.energy.food) + parseInt(compiledFootprint.energy.transportation));

// Co2
    compiledFootprint.co2 = {};
    compiledFootprint.co2.transportationSubCategories = sumCo2QuestionSet(transportation, 'transportation', stateCo2);
    compiledFootprint.co2.transportation = compiledFootprint.co2.transportationSubCategories.monthlyCo2FromTransportation;
    compiledFootprint.co2.food = sumCo2QuestionSet(foodQuestions, 'food', stateCo2);
    compiledFootprint.co2.appliance = sumCo2QuestionSet(applinaceQuestionSet, 'appliance', stateCo2);
    compiledFootprint.co2.foodSubCategories = getFoodSubcategories(foodQuestions, stateCo2);
    compiledFootprint.co2.applianceSubCategories = getApplianceSubcategories(applinaceQuestionSet, stateCo2);
    compiledFootprint.co2.totalCo2 = parseInt(compiledFootprint.co2.transportation) + parseInt(compiledFootprint.co2.food) + parseInt(compiledFootprint.co2.appliance);

// Water
    compiledFootprint.water = {};
    compiledFootprint.water.food = sumWaterQuestionSet(foodQuestions, 'food', stateWater);
    compiledFootprint.water.appliance = sumWaterQuestionSet(applinaceQuestionSet, 'appliance', stateWater);
    compiledFootprint.water.foodSubCategories = getWaterFoodSubcategories(foodQuestions, stateWater);
    compiledFootprint.water.applianceSubCategories = getWaterApplianceSubcategories(applinaceQuestionSet, stateWater);
    compiledFootprint.water.totalWater = parseInt(compiledFootprint.water.food) + parseInt(compiledFootprint.water.appliance);

// Meta
    compiledFootprint.meta = {};
    compiledFootprint.meta.stateCo2 = stateCo2;

    return compiledFootprint;
}



