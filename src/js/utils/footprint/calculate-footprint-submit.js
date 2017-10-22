import _ from 'lodash';
import { getApplianceSubcategories, getFoodSubcategories, sumCo2QuestionSet } from './calculate-co2-submit';
import { getEnergySubcategories, sumEnergyQuestionSet } from './calculate-energy-submit';
import getAnswerFromKey from './get-answer-from-key';



// This util takes in data and calculates your energy footprint.  Yay!
const daysInMonth = 30;
const kwhPer100MilesElectricCar = 30; // kwhs for an average electric car to go 100mi
const gasKwh = 34.4;
const jetFuelKwh = 37.12;
const mpgPerPersonPlane = 84.9;

module.exports = payload => {
    const compiledFootprint = {
        transportationData: {}
    };
    const applianceHour = _.filter(payload.questions, function(o) { return o['use-type'] === 'hour'; });
    const houseHoldQuestions = _.filter(payload.questions, function(o) { return o['use-type'] === 'monthly-own' || o['use-type'] === 'monthly-use'; });
    const foodQuestions = _.filter(payload.questions, function(o) { return o['use-type'] === 'serving'; });
    const transportation = _.filter(payload.questions, function(o) { return o['use-type'] === 'transportation'; });
    const applinaceQuestionSet = Object.assign(applianceHour, houseHoldQuestions);

// Energy
    compiledFootprint.energy = {};
    compiledFootprint.energy.appliance = sumEnergyQuestionSet(applinaceQuestionSet, 'appliance');
    compiledFootprint.energy.applianceSubCategories = getEnergySubcategories(applinaceQuestionSet);
    compiledFootprint.energy.food = sumEnergyQuestionSet(foodQuestions, 'food') * 28;
    compiledFootprint.energy.foodSubCategories = getEnergySubcategories(foodQuestions);
    
    const transportationResults = sumEnergyQuestionSet(transportation, 'transportation');
    compiledFootprint.energy.transportationSubCategories = transportationResults;
    compiledFootprint.energy.transportation = transportationResults.transportation;
    
    compiledFootprint.energy.totalEnergy = (parseInt(compiledFootprint.energy.appliance) + parseInt(compiledFootprint.energy.food) + parseInt(compiledFootprint.energy.transportation));

// Co2
    compiledFootprint.co2 = {};
    compiledFootprint.co2.transportationSubCategories = sumCo2QuestionSet(transportation, 'transportation');
    compiledFootprint.co2.transportation = compiledFootprint.co2.transportationSubCategories.monthlyCo2FromTransportation;
    compiledFootprint.co2.food = sumCo2QuestionSet(foodQuestions, 'food');
    compiledFootprint.co2.appliance = sumCo2QuestionSet(applinaceQuestionSet, 'appliance');
    compiledFootprint.co2.foodSubCategories = getFoodSubcategories(foodQuestions);
    compiledFootprint.co2.applianceSubCategories = getApplianceSubcategories(applinaceQuestionSet);
    compiledFootprint.co2.totalCo2 = parseInt(compiledFootprint.co2.transportation) + parseInt(compiledFootprint.co2.food) + parseInt(compiledFootprint.co2.appliance);
    return compiledFootprint;
}



