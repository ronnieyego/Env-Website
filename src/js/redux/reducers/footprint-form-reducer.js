const footprintFormReducer = (state = {
    step: 1,
    isSubmitReady: true,
    errorQuestions: []
}, action) => {
    switch (action.type) {
        case 'SET_STEP': {
            state = {...state, step: action.payload}
            break;
        }
        case 'SET_ERROR_QUESTIONS': {
            state = {...state, errorQuestions: action.payload }
            break;
        }
    }
    return state;
    
};


module.exports = footprintFormReducer;