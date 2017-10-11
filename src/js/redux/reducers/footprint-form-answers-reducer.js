const footprintFormAnswersReducer = (state = {
    displayAnswers: false,
    questions: [],
    formResults: {},
    errorGettingFormResults: false,
}, action) => {
    const newState ={...state}
    switch (action.type) {
        case 'DISPLAY_ANSWERS': {
            state = { ...state, displayAnswers: true};
            break;
        }
        case 'GET_QUESTIONS': {
            state = { ...state, questions: action.payload};
            break;
        }
        case 'ERROR_GETTONG_FORM_RESULTS': {
            state = {...state, errorGettingFormResults: true}
            break;
        }
        case 'SUBMIT_FORM_RESULTS': {
            state = { ...state, formResults: action.payload};
            break;
        }
      }
    return state;
    
};


module.exports = footprintFormAnswersReducer;