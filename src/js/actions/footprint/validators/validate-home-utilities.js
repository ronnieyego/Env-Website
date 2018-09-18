import { getAnswerFromId } from '../../../utils/footprint/get-question-utils';
import { isNaturalNumber,  isInArray } from './validators';
import ids from '../../../utils/ids/index';

export default () => {
    return (dispatch, getState) => {
        try {
            const store = getState();
            const questions = store.questions.questions;
            const errorQuestions = [];

            const hoursAtHome = getAnswerFromId(questions, ids.hoursAtHome);
            const tvWatchHours = getAnswerFromId(questions, ids.tvWatchHours);
            const hoursComputer = getAnswerFromId(questions, ids.hoursComputer);
            const cookingFrequency = getAnswerFromId(questions, ids.cookingFrequency);
            const showEveryday = getAnswerFromId(questions, ids.showEveryday);
            const playMusicHome = getAnswerFromId(questions, ids.playMusicHome);
            const laundryMonth = getAnswerFromId(questions, ids.laundryMonth);

            if (!isNaturalNumber(hoursAtHome)) {
                errorQuestions.push(ids.hoursAtHome);
            }

            if (!isNaturalNumber(tvWatchHours)) {
                errorQuestions.push(ids.tvWatchHours);
            }

            if (!isNaturalNumber(hoursComputer)) {
                errorQuestions.push(ids.hoursComputer);
            }

            if (!isInArray(cookingFrequency, [ids.onceAWeek, ids.mostNights, ids.twoThreeTimesPerWeek, ids.underOnceAWeek])) {
                errorQuestions.push(ids.cookingFrequency);
            }

            if(!isInArray(showEveryday, [true, false])) {
                errorQuestions.push(ids.showerEveryDay)
            }

            if(!isInArray(playMusicHome, [true, false])) {
                errorQuestions.push(ids.playMusicHome)
            }

            if(!isNaturalNumber(laundryMonth)) {
                errorQuestions.push(ids.laundryMonth);
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