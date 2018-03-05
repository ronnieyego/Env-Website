import { getAverage } from '../../utils/footprint/get-average-american-footprint';
const baseState = {
    answerId: '',
    displayAnswers: false,
    questions: [],
    formResults: {},
    errorGettingFormResults: false,
    resultsUnit: 'co2',
    resultsShown: 'compare',
    userState: 'US',
    averageAmerican: getAverage('US', 'American Average', 'male'),
    averageAmericanState: 'US',
    averageAmericanAge: 'American Average',
    averageAmericanGender: 'male',
    averageAmericanShoppingHabit: 'normal',
    averageAmericanSize: 'Medium'
};

const footprintFormAnswers = (state = baseState, action) => {
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
                resultsShown: action.payload.resultsShown, 
                resultsUnit: action.payload.resultsUnit
            };
            break;
        }
        case 'UPDATE_USER_STATE': {
            state = { ...state, userState: action.payload, averageAmericanState: action.payload};
            break;
        }
        case 'UPDATE_AVERAGE_AMERICAN': {
            state = { ...state, averageAmerican: action.payload};
            break;
        }
        case 'UPDATE_AVERAGE_AMERICAN_STATE': {
            state = { ...state, averageAmericanState: action.payload};
            break;
        }
        case 'UPDATE_AVERAGE_AMERICAN_AGE': {
            state = { ...state, averageAmericanAge: action.payload};
            break;
        }
        case 'UPDATE_AVERAGE_AMERICAN_GENDER': {
            state = { ...state, averageAmericanGender: action.payload};
            break;
        }
        case 'UPDATE_AVERAGE_AMERICAN_SHOPPING_HABIT': {
            state = { ...state, averageAmericanShoppingHabit: action.payload};
            break;
        }
        case 'UPDATE_AVERAGE_AMERICAN_SIZE': {
            state = { ...state, averageAmericanSize: action.payload};
            break;
        }
      }
    return state;
    
};


module.exports = {
    baseState,
    footprintFormAnswers
};