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
        case 'INCREASE_STEP': {
            state = {...state, step: state.step + 1}
            break;
        }
        case 'DECREASE_STEP': {
            state = {...state, step: state.step - 1}
            break;
        }
        case 'SUBMIT_READY': {
            state = {...state, isSubmitReady: action.payload }
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