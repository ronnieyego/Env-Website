const usEnergyMapReducer = (state = {

    allPlants: [],
    displayedPlants: [],
    currentSources: ['coal', 'oil', 'naturalGas', 'biofuel', 'solar', 'wind', 'geothermal', 'hydro', 'nuclear', 'other'],

    showMap: false,
}, action) => {
    switch (action.type) {
        case 'LOADED_ENERGY_PLANTS': {
            state = {...state, allPlants: action.payload};
            break;
        }
        case 'SET_DISPLAYED_ENERGY_PLANTS': {
            state = {...state, displayedPlants: action.payload};
            break;
        }

        case 'RECEIVE_MAP_DATA': {
            state = { ...state, 
                showMap: true,
                mapData: action.payload.mapData,
                dataStates: action.payload.dataStates,
                dataCounties: action.payload.dataCounties,
                circles: action.payload.circles,
                circleValue: action.payload.circleValue,
                tooltipContent: action.payload.tooltipContent,
                sourceTotals: action.payload.sourceTotals
            };
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