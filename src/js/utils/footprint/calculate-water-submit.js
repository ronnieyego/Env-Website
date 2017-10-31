import { getAnswerFromKey } from './get-question-utils';

const co2PerGallonOfGas = 19.6;
const co2PerGallonOfJetFuel = 21.1;
const mpgPerPersonPlane = 84.9;

const getMonthlyValue = question => {
   if(!question.value || question.value === '' || !question.water || question.water === ''){
        return 0;
    } 
    if(question['use-type'] === 'monthly-use'){
        return question.water * question.value;
    }
    if(question['use-type'] === 'monthly-own'){
        return question.water;
    }
    if(question.selectOptions) { // Dropdown Question
        return question.value;
    }
    if(typeof question.value === 'string') {
        question.value = question.value.trim();
        question.value = question.value.replace(' ', '');
    }
    question.value = parseFloat(question.value);
    if(question.value > 0 && question.kwh) { //Int question
            return question.water * question.value * 30;
    }
    console.log('Problem getting water for question', question);
    return 0; // Something went wrong (ie. '' passed in);
}

const sumWaterQuestionSet = (questionSet, type) => {
    let groupSum = 0;
    questionSet.forEach(question => {
        let questionTotal;
        switch(type) {
        case 'food':
            questionTotal = getMonthlyValue(question);
            break;
        case 'appliance':
            questionTotal = getMonthlyValue(question);
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

const getWaterApplianceSubcategories = applianceSet => {
    let res = {};
    applianceSet.forEach(question => {
        const subCategory = question['sub-grouping'] ? question['sub-grouping'] : 'other';
        if(res[subCategory]) {
            res[subCategory] += getMonthlyValue(question);
        } else {
            res[subCategory] = getMonthlyValue(question);
        }
    });
    return res;
}


module.exports = {
    getWaterApplianceSubcategories,
    getWaterFoodSubcategories,
    sumWaterQuestionSet
}