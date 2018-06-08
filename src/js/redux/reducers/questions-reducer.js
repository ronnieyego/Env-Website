import allQuestions from '../../data/questions/index';

export default (state = {
    questions: allQuestions
}, action) => {
    switch (action.type) {
        case 'UPDATE_QUESTIONS': {
            state = {...state, questions: action.payload}
            break;
        }
    }
    return state;
};
