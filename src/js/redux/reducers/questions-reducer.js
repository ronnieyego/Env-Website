import allQuestions from '../../data/questions/index';

export default (state = {
    questions: allQuestions
}, action) => {
    switch (action.type) {
        case 'UPDATE_QUESTIONS': {
            state = {...state, questions: action.payload}
            break;
        }
        case 'ADD_QUESTION': {
            const questions = [ ...state.questions];
            questions.push(action.payload);
            state = { ...state, questions }
            break;
        }
        case 'REMOVE_QUESTION': {
            const newQuestions = state.questions.filter( question => question.id !== action.payload );
            state = {...state, questions: newQuestions }
            break;
        }
    }
    return state;
};
