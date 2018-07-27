import { getAverageAmericanResultsFromProfile } from '../../data/average-american/average-american-profile';

const baseState = {
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

const averageAmerican =  (state = baseState, action) => {
    switch (action.type) {
        // For Compare
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
        case 'UPDATE_AVERAGE_AMERICAN_GENDER': {
            state = { ...state, averageAmericanGender: action.payload};
            break;
        }

        // For Costs
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

module.exports = averageAmerican;