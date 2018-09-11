// TODO THE VALIDATION SUCKS AND DOESNT WORK!

import { getAnswerFromId, getQuestionFromId } from '../../../utils/footprint/get-question-utils';
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

            if (typeof parseInt(hoursComputer) !== 'number' || !parseInt(hoursAtHome) < 0) {
                errorQuestions.push(ids.hoursAtHome);
            }

            if (typeof parseInt(hoursComputer) !== 'number' || !parseInt(tvWatchHours) < 0) {
                errorQuestions.push(ids.tvWatchHours);
            }

            if (typeof parseInt(hoursComputer) !== 'number' || !parseInt(hoursComputer) < 0) {
                errorQuestions.push(ids.hoursComputer);
            }

            if ([ids.onceAWeek, ids.mostNights, ids.twoThreeTimesPerWeek, ids.underOnceAWeek].indexOf(cookingFrequency) === -1) {
                errorQuestions.push(ids.cookingFrequency);
            }

            if([true, false].indexOf(showEveryday) === -1 ) {
                errorQuestions.push(ids.showerEveryDay)
            }

            if([true, false].indexOf(playMusicHome) === -1 ) {
                errorQuestions.push(ids.playMusicHome)
            }

            if (typeof parseInt(hoursComputer) !== 'number' || !parseInt(laundryMonth) < 0) {
                errorQuestions.push(ids.laundryMonth);
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