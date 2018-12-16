import ids from '../../../utils/ids/index';
import isVegan from './is-vegan';
import isVegetarian from './is-vegetarian';

export const TRIGGER_QUESTION_IDS = [ids.isVegan, ids.isVegetarian, ids.userZip]

export default ({
    dispatch,
    getState,
    triggerCode,
    allQuestions
}) => {
    switch(triggerCode) {
        case 'is-vegan':
            return isVegan({dispatch, allQuestions});
        case 'is-vegetarian':
            return isVegetarian({dispatch, allQuestions});
        case 'zip-code':
            return isVegetarian(allQuestions);
    }
};
