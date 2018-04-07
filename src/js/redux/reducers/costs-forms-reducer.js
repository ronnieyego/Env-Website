import costQuestions from '../../components/costs/questions-index';

const costsFormsReducer = (state = {
    questions: costQuestions,
    cupCo2: 0,
    cupWashCo2: 0,
    cupTextDisplay: ''
}, action) => {
    switch (action.type) {
        case 'ADD_QUESTIONS_TO_COST_QUESTIONS': {
            state = { ...state, questions: [...state.questions, ...action.payload ] };
            break;
        }
        case 'UPDATE_COST_QUESTIONS': {
            state= { ...state, questions: action.payload };
            break;
        }
        case 'UPDATE_CUP_RESULTS': {
            state= { 
                ...state,
                cupCo2: action.payload.cupCo2,
                cupWashCo2: action.payload.cupWashCo2
                };
            break;
        }
    }
    return state;
};

module.exports = costsFormsReducer;