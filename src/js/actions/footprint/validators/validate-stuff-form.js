import { getAnswerFromId } from '../../../utils/footprint/get-question-utils';
import { isInArray } from './validators';
import ids from '../../../utils/ids/index';

export default () => {
    return (dispatch, getState) => {
        try {
            const store = getState();
            const questions = store.questions.questions;
            const errorQuestions = [];

            const totalHouseFurniture  = getAnswerFromId(questions, ids.totalHouseFurniture);
            const totalWardrobe  = getAnswerFromId(questions, ids.totalWardrobe);
            const allPets  = getAnswerFromId(questions, ids.allPets);
            const houseClutter  = getAnswerFromId(questions, ids.houseClutter);

            if (!isInArray(totalHouseFurniture, [ids.veryLittleFurniture, ids.spareslyFurnished, ids.allTheEssentials, ids.crampedHome])) {
                errorQuestions.push(ids.totalHouseFurniture);
            }

            if (!isInArray(totalWardrobe, [ids.hardlyAny, ids.justTheEssentials, ids.aGoodAmount, ids.packedCloset, ids.wayTooMany])) {
                errorQuestions.push(ids.totalWardrobe);
            }

            if (!allPets) { // Not sure how to handle this one.  I guess if the question exists?  Maybe I should check if there are questions that they have the correct answer??
                errorQuestions.push(ids.allPets);
            }

            if (!isInArray(houseClutter, [ids.practicallyEmpty, ids.quiteUncluttered, ids.reasonablyFull, ids.extremelyFull, ids.noRoom])) {
                errorQuestions.push(ids.houseClutter);
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