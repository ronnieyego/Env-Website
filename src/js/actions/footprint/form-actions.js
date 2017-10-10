// Utils. . . maybe make own file eventually?
const updateQuestion = (allQuestions, id, value) => {
    return allQuestions.forEach(question => {
        if (question.name === id) {
            question.value = value;
        };
        return;
    });
};


//
//
//
// Actions
export const getQuestionData = () => {
    return dispatch => {
        fetch('/data/temp-footprint-questions.json')
        .then(response => {
            return response.json();
        })
        .then(response => {
            const questions = response.questions;
            dispatch({type: 'GET_QUESTIONS', payload: questions});
        })
        .catch(err => {
            dispatch({type: 'ERROR_LOADING_QUESTIONS', payload: true});
        });
    }
};

export const updateQuestions = (id, value) => {
    return (dispatch, getState) => {
        const state = getState();
        const allQuestions = state.footprintForm.questions.slice();
        const updatedQuestions = updateQuestion(allQuestions, id, value);
        dispatch({type: 'UPDATE_QUESTIONS', payload: allQuestions});
    }
};

export const increaseStep = () => {
    return dispatch => {
        dispatch({type: 'INCREASE_STEP'});
    }
};

export const decreaseStep = () => {
    return dispatch => {
        dispatch({type: 'DECREASE_STEP', payload: {}});
    }
};