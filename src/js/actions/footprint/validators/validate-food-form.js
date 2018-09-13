import { getAnswerFromId } from '../../../utils/footprint/get-question-utils';
import { isNaturalNumber, isGreaterThanZero,  isInArray, isBoolean } from './validators';
import ids from '../../../utils/ids/index';

export default () => {
    return (dispatch, getState) => {
        try {
            const store = getState();
            const questions = store.questions.questions;
            const errorQuestions = [];

            const calories  = getAnswerFromId(questions, ids.calories);
            const isVegan  = getAnswerFromId(questions, ids.isVegan);
            const isVegetarian  = getAnswerFromId(questions, ids.isVegetarian);
            const beefFrequency  = getAnswerFromId(questions, ids.beefFrequency);
            const chickenFrequency  = getAnswerFromId(questions, ids.chickenFrequency);
            const porkFrequency  = getAnswerFromId(questions, ids.porkFrequency);
            const seafoodFrequency  = getAnswerFromId(questions, ids.seafoodFrequency);
            const dairyFrequency  = getAnswerFromId(questions, ids.dairyFrequency);
            const cheeseFrequency  = getAnswerFromId(questions, ids.cheeseFrequency);
            const vegetablesFrequency  = getAnswerFromId(questions, ids.vegetablesFrequency);
            const fruitsFrequency  = getAnswerFromId(questions, ids.fruitsFrequency);
            const grainsFrequency  = getAnswerFromId(questions, ids.grainsFrequency);
            const junkFoodFrequency  = getAnswerFromId(questions, ids.junkFoodFrequency);

            if (!isGreaterThanZero(calories)) {
                errorQuestions.push(ids.calories);
            }

            if (!isBoolean(isVegan)) {
                errorQuestions.push(ids.isVegan);
            }

            if (!isBoolean(isVegetarian)) {
                errorQuestions.push(ids.isVegetarian);
            }

            if (!isInArray(beefFrequency, [ids.never, ids.fewTimesPerMonth, ids.onceAWeek, ids.twoThreeTimesPerWeek, ids.everyday])) {
                errorQuestions.push(ids.beefFrequency);
            }

            if (!isInArray(chickenFrequency, [ids.never, ids.fewTimesPerMonth, ids.onceAWeek, ids.twoThreeTimesPerWeek, ids.everyday])) {
                errorQuestions.push(ids.chickenFrequency);
            }

            if (!isInArray(porkFrequency, [ids.never, ids.fewTimesPerMonth, ids.onceAWeek, ids.twoThreeTimesPerWeek, ids.everyday])) {
                errorQuestions.push(ids.porkFrequency);
            }

            if (!isInArray(seafoodFrequency, [ids.never, ids.fewTimesPerMonth, ids.onceAWeek, ids.twoThreeTimesPerWeek, ids.everyday])) {
                errorQuestions.push(ids.seafoodFrequency);
            }

            if (!isInArray(dairyFrequency, [ids.never, ids.rarely, ids.onceADay, ids.fewTimesPerDay, ids.asMuchAsPossible])) {
                errorQuestions.push(ids.dairyFrequency);
            }

            if (!isInArray(cheeseFrequency, [ids.never, ids.rarely, ids.onceADay, ids.fewTimesPerDay, ids.asMuchAsPossible])) {
                errorQuestions.push(ids.cheeseFrequency);
            }

            if (!isInArray(vegetablesFrequency, [ids.never, ids.rarely, ids.onceADay, ids.fewTimesPerDay, ids.asMuchAsPossible])) {
                errorQuestions.push(ids.vegetablesFrequency);
            }

            if (!isInArray(grainsFrequency, [ids.never, ids.rarely, ids.onceADay, ids.fewTimesPerDay, ids.asMuchAsPossible])) {
                errorQuestions.push(ids.grainsFrequency);
            }

            if (!isInArray(fruitsFrequency, [ids.never, ids.rarely, ids.onceADay, ids.fewTimesPerDay, ids.asMuchAsPossible])) {
                errorQuestions.push(ids.fruitsFrequency);
            }

            if (!isInArray(junkFoodFrequency, [ids.never, ids.rarely, ids.onceADay, ids.fewTimesPerDay, ids.asMuchAsPossible])) {
                errorQuestions.push(ids.junkFoodFrequency);
            }

            const valid = errorQuestions.length === 0;

            return {
                valid,
                errorQuestions
            }
        } catch(e) {
            return {
                valid: true,
                errorQuestions: [-1]
            }
        }
        
    }
};