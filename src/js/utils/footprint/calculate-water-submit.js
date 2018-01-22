import { getAnswerFromKey } from './get-question-utils';
import { waterUsePerKwhPerState } from '../utils-data/state-energy-and-emissions';
import { co2PerGallonOfGas, co2PerGallonOfJetFuel, daysInMonth, mpgPerPersonPlane } from '../utils-data/constants';

const getMonthlyValue = (question, stateWater) => {
    // Current logic bug on things that use water, I dont include the electricity cost
    // SHould be a very small diff though
    if(typeof question.value === 'string') {
        question.value = question.value.trim();
        question.value = question.value.replace(' ', '');
    }
    question.value = parseFloat(question.value);
    if(!question.value || question.value === ''){
        return 0;
    }
    if(question.selectOptions) { // Dropdown Question
        return question.value;
    }
    if(question.water) { // Group all questions that have water
        if(question['use-type'] === 'monthly-use'){
            return question.water * question.value;
        }
        if(question['use-type'] === 'monthly-own'){
            return question.water;
        }
        return question.water * question.value * 30; // Food ends up here
    }
    if(!question.water || question.water === '') { // No water values.  Use water to make electricity
        question.value = parseFloat(question.value);
        if(question.kwh && question['use-type'] === 'hour') {
            return question.kwh * question.value * stateWater;
        } 
        if(question.kwh && question['use-type'] === 'monthly-use') {
            return question.kwh * question.value * stateWater;
        } 
        if(question.kwh && question['use-type'] === 'monthly-own') {
            return question.kwh * stateWater;
        } 
    }   
    console.log('Problem getting water for question', question);
    return 0; // Something went wrong (ie. '' passed in);
}

const sumWaterQuestionSet = (questionSet, type, stateWater) => {
    let groupSum = 0;
    questionSet.forEach(question => {
        let questionTotal;
        switch(type) {
        case 'food':
            questionTotal = getMonthlyValue(question, stateWater);
            break;
        case 'appliance':
            questionTotal = getMonthlyValue(question, stateWater);
            break;
        default:
            console.log('Error - Can not calculate water for this type and question set--', type, questionSet);
            questionTotal = 0;
        }
        groupSum += parseInt(questionTotal);
    });
    return groupSum;
}

const getWaterFoodSubcategories = foodSet => {
    let res = {};
    foodSet.forEach(question => {
        const subCategory = question['sub-grouping'] ? question['sub-grouping'] : 'other';
        if(res[subCategory]) {
            res[subCategory] += getMonthlyValue(question);
        } else {
            res[subCategory] = getMonthlyValue(question);
        }
    });
    return res;
};

const getWaterApplianceSubcategories = (applianceSet, stateWater) => {
    let res = {};
    applianceSet.forEach(question => {
        const subCategory = question['sub-grouping'] ? question['sub-grouping'] : 'other';
        if(res[subCategory]) {
            res[subCategory] += getMonthlyValue(question, stateWater);
        } else {
            res[subCategory] = getMonthlyValue(question, stateWater);
        }
    });
    return res;
}


module.exports = {
    getWaterApplianceSubcategories,
    getWaterFoodSubcategories,
    sumWaterQuestionSet
}