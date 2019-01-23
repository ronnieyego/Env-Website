const usEnergyMapReducer = (state = {

    allPlants: [],


    showMap: false,
    mapData: {},
    dataStates: {},
    circles: {},
    circleValue: (() => 0),
    tooltipContent: {},
    sourceTotals: {
        coal: 176260,
        hydroelectric: 121811,
        naturalGas: 636376,
        nuclear : 122851,
        petroleum: 24755,
        solar: 26868,
        wind: 115327
    },

    currentSources: ['coal', 'hydroelectric', 'wind', 'naturalGas', 'petroleum', 'solar', 'nuclear'],
    currentUtilities: ['IPP CHP', 'IPP Non-CHP', 'Electric Utility']

}, action) => {
    switch (action.type) {
        case 'LOADED_ENERGY_PLANTS': {
            state = {...state, allPlants: action.payload};
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
        case 'SET_CURRENT_UTILITIES': {
            state = {...state, currentUtilities: action.payload};
            break;
        }
        case 'SET_CIRCLES': {
            state = {
                ...state,
                circles: action.payload.circles,
                circleValue: action.payload.circleValue
            };
            break;
        }
     
    }
    return state;
    
};


module.exports = usEnergyMapReducer;