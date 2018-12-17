import ids from '../../../utils/ids/index';
import isVegan from './is-vegan';
import isVegetarian from './is-vegetarian';
import resolveZip from './resolve-zip-code';

export const TRIGGER_QUESTION_IDS = [ids.isVegan, ids.isVegetarian, ids.userZip]

export default ({
    dispatch,
    getState,
    triggerCode,
    allQuestions,
    question
}) => {
    switch(triggerCode) {
        case 'is-vegan':
            return isVegan({dispatch, allQuestions});
        case 'is-vegetarian':
            return isVegetarian({dispatch, allQuestions});
        case 'resolve-zip':
            return resolveZip({dispatch, getState, question});
    }
};
