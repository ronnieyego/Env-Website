const stateEnergyReducer = (state = {
    energyConsumption: {},
    energyProduction: {},
    misc: {},
    stateComparisons: {},
    stateId: ''
}, action) => {
    switch (action.type) {
        case 'SET_STATE_ENERGY_DATA': {
            state = { state: action.payload };
            break;
        }
    }
    return state;
    
};


module.exports = stateEnergyReducer;