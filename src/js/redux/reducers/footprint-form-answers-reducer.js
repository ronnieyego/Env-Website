export const baseState = {
    answerId: '',
    displayAnswers: false,
    questions: [],
    formResults: {},
    errorGettingFormResults: false,
    resultsUnit: 'co2', // I think I can delete this
    resultsShown: 'compare',
    userState: 'US',
};

export const footprintFormAnswers = (state = baseState, action) => {
    switch (action.type) {
        case 'DISPLAY_ANSWERS': {
            state = { ...state, displayAnswers: action.payload};
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
        case 'SET_FORM_ANSWER_ID': {
            state = { ...state, answerId: action.payload};
            break;
        }
        case 'UPDATE_RESULTS_SHOWN': {
            state = { 
                ...state,
                resultsShown: action.payload, 
            };
            break;
        }
        case 'UPDATE_USER_STATE': {
            state = { ...state, userState: action.payload, averageAmericanState: action.payload};
            break;
        }
      }
    return state;
    
};
