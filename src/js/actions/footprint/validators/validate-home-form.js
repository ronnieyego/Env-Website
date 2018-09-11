import { getAnswerFromId, getQuestionFromId } from '../../../utils/footprint/get-question-utils';
import ids from '../../../utils/ids/index';

export default () => {
    return (dispatch, getState) => {
        try {
            const store = getState();
            const questions = store.questions.questions;
            const errorQuestions = [];

            const userState = store.userInfo.userState;
            const homeType = getAnswerFromId(questions, ids.homeType);
            const homeSqft = getAnswerFromId(questions, ids.homeSqft);
            const homeMaterial = getAnswerFromId(questions, ids.homeMaterial);
            const liveWith = getAnswerFromId(questions, ids.liveWith);

            if (!userState || userState.length !== 2) {
                errorQuestions.push(ids.userState);
            }

            if ([ids.house, ids.apartment].indexOf(homeType) === -1) {
                errorQuestions.push(ids.homeType);
            }

            if ([ids.brick, ids.wood, ids.concrete].indexOf(homeMaterial) === -1) {
                errorQuestions.push(ids.homeMaterial);
            }

            if (parseInt(homeSqft) < 0 ) {
                errorQuestions.push(ids.homeType);
            }

            if (parseInt(liveWith) < 0 || parseInt(liveWith) % 1 !== 0) {
                errorQuestions.push(ids.liveWith);
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