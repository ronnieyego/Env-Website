const costsFormsReducer = (state = {
    questions: []
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
    }
    return state;
};

module.exports = costsFormsReducer;