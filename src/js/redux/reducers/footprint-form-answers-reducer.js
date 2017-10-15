import { getAverage } from '../../utils/footprint/get-average-american-footprint';

const footprintFormAnswersReducer = (state = {
    displayAnswers: false,
    questions: [],
    formResults: {},
    errorGettingFormResults: false,
    resultsShown: '',
    userState: 'US',
    stateCo2PerKwh: 0,
    averageAmerican: getAverage('US', 'American Average', 'male'),
    averageAmericanState: 'US',
    averagaeAmericanAge: 'average',
    averageAmericanGender: 'male'
}, action) => {
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
        case 'UPDATE_USER_STATE': {
            state = { ...state, userState: action.payload};
            break;
        }
        case 'UPDATE_CO2_PER_KWH': {
            state = { ...state, stateCo2PerKwh: action.payload};
            break;
        }
        case 'UPDATE_RESULTS_SHOWN': {
            state = { ...state, resultsShown: action.payload};
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
      }
    return state;
    
};


module.exports = footprintFormAnswersReducer;