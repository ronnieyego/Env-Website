import { getAverageAmericanResultsFromProfile } from '../../data/average-american/average-american-profile';
import { getAverage } from '../../utils/footprint/get-average-american-footprint';
const baseState = {
    answerId: '',
    displayAnswers: false,
    questions: [],
    formResults: {},
    errorGettingFormResults: false,
    resultsUnit: 'co2', // I think I can delete this
    resultsShown: 'compare',
    userState: 'US',
    averageAmerican: getAverageAmericanResultsFromProfile({
        state:'US', 
        age: 'American Average',
        gender: 'male',
        income: '$30k-$60k'
    }),
    averageAmericanState: 'US',
    averageAmericanAge: 'American Average',
    averageAmericanGender: 'male',
    averageAmericanIncome: '$30k-$60k',
    averageAmericanShoppingHabit: 'normal',
    averageAmericanSize: 'Medium',
    averageAmericanHouseType: 'Small Apartment'
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
                resultsShown: action.payload, 
            };
            break;
        }
        case 'UPDATE_USER_STATE': {
            state = { ...state, userState: action.payload, averageAmericanState: action.payload};
            break;
        }

        // v For Compare
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
        case 'UPDATE_AVERAGE_AMERICAN_INCOME': {
            state = { ...state, averageAmericanIncome: action.payload};
            break;
        }
        // ^ For Compare

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
        case 'UPDATE_AVERAGE_AMERICAN_HOUSE_TYPE': {
            state = { ...state, averageAmericanHouseType: action.payload};
            break;
        }
      }
    return state;
    
};


module.exports = {
    baseState,
    footprintFormAnswers
};