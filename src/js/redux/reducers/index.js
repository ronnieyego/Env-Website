import { combineReducers } from 'redux';

import footprintForm from './footprint-form-reducer.js';
import footprintFormAnswers from './footprint-form-answers-reducer.js';
import usEnergyMap from './us-energy-map-reducer';

export default combineReducers({
    footprintForm,
    footprintFormAnswers,
    usEnergyMap
});