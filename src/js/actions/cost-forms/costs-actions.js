import { isValidateAnswer, getAnswerFromId, getQuestionFromId } from '../../utils/footprint/get-question-utils';
import { updateQuestionSet } from '../../utils/footprint/update-question-set';

// For costs form
export const updateCostsQuestions = questionInfo => {
    return (dispatch, getState) => {
        const state = getState();
        const allQuestions = state.costsForms.questions.slice();
        const updatedQuestionSet = updateQuestionSet(allQuestions, questionInfo);
        dispatch({type: 'UPDATE_COST_QUESTIONS', payload: updatedQuestionSet});
    }  
};
