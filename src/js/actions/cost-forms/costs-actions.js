import _ from 'lodash';

import { isValidateAnswer, getAnswerFromId, getQuestionFromId } from '../../utils/footprint/get-question-utils';
import { updateQuestionSet } from '../../utils/footprint/update-question-set';



// Data
import footprintQuestions from '../../../../public/data/footprint-questions.js';
import { utilityEmissionsPerState }from '../../utils/utils-data/state-energy-and-emissions';
import { gallonsPerWashedDish, kwhPerGallon } from '../../utils/utils-data/constants';


import { cupData, usesPerWash } from '../../components/costs/cup-data';

// For costs form
export const updateCostsQuestions = questionInfo => {
    return (dispatch, getState) => {
        const state = getState();
        const allQuestions = state.costsForms.questions.slice();
        const updatedQuestionSet = updateQuestionSet(allQuestions, questionInfo);
        dispatch({type: 'UPDATE_COST_QUESTIONS', payload: updatedQuestionSet});
    }  
};

// Cup

export const calculateCupCO2 = () => {
    return (dispatch, getState) => {
        const state = getState();
        const allQuestions = state.costsForms.questions.slice();
        const cupType = getAnswerFromId(allQuestions, 1000);
        const cupCo2 = cupData.filter(type => type.name === cupType )[0].co2;

        const washTypeQ = getQuestionFromId(allQuestions, 1002);
        const washType = washTypeQ && !washTypeQ.hidden && washTypeQ.value;
        let cupWashCo2 = 0;
        if(washType === 'Dishwasher') {
            const dishwasher = getQuestionFromId(footprintQuestions, 35); //Id for dishwasher is 35
            const Co2FromWater = dishwasher.water * kwhPerGallon;
            cupWashCo2 = ((dishwasher.kwh * utilityEmissionsPerState.US) + Co2FromWater) / usesPerWash;
        } else if (washType === 'Handwash') {
            cupWashCo2 = kwhPerGallon * gallonsPerWashedDish;
        }
        cupWashCo2 = Math.round(cupWashCo2 * 100)/100;
        dispatch({type: 'UPDATE_CUP_RESULTS', payload: {cupCo2, cupWashCo2}});
    } 
}