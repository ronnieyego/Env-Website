const stateEnergyReducer = (state = {
    energyConsumption: {},
    energyProduction: {},
    misc: {},
    stateComparisons: {},
    stateId: '',
    stateName: ''
}, action) => {
    switch (action.type) {
        case 'SET_STATE_ENERGY_DATA': {
            state = { ...state, state: action.payload };
            break;
        }
    }
    return state;
};

export default stateEnergyReducer;