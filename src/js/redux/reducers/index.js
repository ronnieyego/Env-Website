import { combineReducers } from 'redux';

import footprintForm from './footprint-form-reducer.js';
import footprintFormAnswers from './footprint-form-answers-reducer.js';
import stateEnergy from './state-energy-reducer';
import usEnergyMap from './us-energy-map-reducer';

export default combineReducers({
    footprintForm,
    footprintFormAnswers,
    stateEnergy,
    usEnergyMap
});