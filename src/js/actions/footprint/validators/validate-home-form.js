import { getAnswerFromId } from '../../../utils/footprint/get-question-utils';
import { isNaturalNumber, isGreaterThanZero,  isInArray } from './validators';
import ids from '../../../utils/ids/index';

export default () => {
    return (dispatch, getState) => {
        try {
            const store = getState();
            const questions = store.questions.questions;
            const errorQuestions = [];

            const userState = store.userInfo.userState;
            const userZip = getAnswerFromId(questions, ids.userZip);
            const homeType = getAnswerFromId(questions, ids.homeType);
            const homeSqft = getAnswerFromId(questions, ids.homeSqft);
            const homeMaterial = getAnswerFromId(questions, ids.homeMaterial);
            const liveWith = getAnswerFromId(questions, ids.liveWith);

            if (!userState || userState.length !== 2) {
                errorQuestions.push(ids.userState);
            }
            if (!isGreaterThanZero(userZip)) {
                errorQuestions.push(ids.userZip);
            }

            if (!isInArray(homeType, [ids.house, ids.apartment])) {
                errorQuestions.push(ids.homeType);
            }

            if (!isInArray(homeMaterial, [ids.brick, ids.wood, ids.concrete])) {
                errorQuestions.push(ids.homeMaterial);
            }

            if (!isGreaterThanZero(homeSqft)) {
                errorQuestions.push(ids.homeType);
            }

            if (!isNaturalNumber(liveWith)) {
                errorQuestions.push(ids.liveWith);
            }

            const valid = errorQuestions.length === 0;

            return {
                valid,
                errorQuestions
            }
        } catch(e) {
            return {
                valid: false,
                errorQuestions: [-1]
            }
        }
        
    }
};