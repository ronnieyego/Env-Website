const usEnergyMapReducer = (state = {

    allPlants: [],
    displayedPlants: [],
    currentSources: ['coal', 'oil', 'naturalGas', 'biofuel', 'solar', 'wind', 'geothermal', 'hydro', 'nuclear', 'other'],
    showMap: false
}, action) => {
    switch (action.type) {
        case 'LOADED_ENERGY_PLANTS': {
            state = {...state, allPlants: action.payload, showMap: true};
            break;
        }
        case 'SET_DISPLAYED_ENERGY_PLANTS': {
            state = {...state, displayedPlants: action.payload};
            break;
        }
       
        case 'SET_CURRENT_SOURCES': {
            state = {...state, currentSources: action.payload};
            break;
        }
    }
    return state;
    
};


module.exports = usEnergyMapReducer;