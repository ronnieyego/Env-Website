const footprintFormReducer = (state = {
    questions: [],
    getQuestionsError: false,
    step: 1,
    text: 'hello redux!',
    isSubmitReady: true
}, action) => {
    const newState = {...state}
    switch (action.type) {
        case 'GET_QUESTIONS': {
            state = { ...state, questions: action.payload};
            break;
        }
        case 'ERROR_LOADING_QUESTIONS': {
            state = {...state, getQuestionsError: true}
            break;
        }
        case 'REMOVE_QUESTIONS': {
            state = { ...state, questions: []};
            break;
        }
        case 'UPDATE_QUESTIONS': {
            state = {...state, questions: action.payload}
            break;
        }
        case 'INCREASE_STEP': {
            state = {...state, step: state['step'] + 1}
            break;
        }
        case 'DECREASE_STEP': {
            state = {...state, step: state['step'] - 1}
            break;
        }
        case 'SUBMIT_READY': {
            state = {...state, isSubmitReady: action.payload }
            break;
        }
    }
    return state;
    
};


module.exports = footprintFormReducer;