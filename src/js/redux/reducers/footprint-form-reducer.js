const footprintFormReducer = (state = {
    step: 1,
    displayForm: false,
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
        case 'DISPLAY_FORM': {
            state = {...state, displayForm: action.payload }
            break;
        }
    }
    return state;
    
};


export default footprintFormReducer;