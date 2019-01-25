export default (state = {
    zip: null,
    energySources: null,
    energySourcesError: false,
    onlyUtility: true,
    searchDistance: 200,
    maxDistance: 200
 }, action) => {
    switch (action.type) {
        case 'SET_LOCAL_ENERGY_DATA': {
            state = { ...state, energySources: action.payload };
            break;
        }
        case 'SET_LOCAL_ENERGY_DATA_ERROR': {
            state = { ...state, energySourcesError: action.payload };
            break;
        }
        case 'SET_ONLY_UTILITY': {
            state = { ...state, onlyUtility: action.payload };
            break;
        }
        case 'SET_MAX_DISTANCE': {
            state = { ...state, maxDistance: action.payload };
            break;
        }
        case 'SET_SEARCH_DISTANCE': {
            state = { ...state, searchDistance: action.payload };
            break;
        }
    }
    return state;
};
