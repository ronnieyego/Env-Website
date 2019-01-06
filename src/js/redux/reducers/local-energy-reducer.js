export default (state = {
    zip: null,
    zipData: null,
    zipDataError: false,
    onlyUtility: true,
    maxDistance: 200
 }, action) => {
    switch (action.type) {
        case 'SET_LOCAL_ENERGY_DATA': {
            state = { ...state, zipData: action.payload };
            break;
        }
        case 'SET_LOCAL_ENERGY_DATA_ERROR': {
            state = { ...state, zipDataError: action.payload };
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
    }
    return state;
};
