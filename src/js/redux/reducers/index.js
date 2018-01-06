import { combineReducers } from 'redux';

import footprintForm from './footprint-form-reducer';
import {footprintFormAnswers} from './footprint-form-answers-reducer';
import stateEnergy from './state-energy-reducer';
import usEnergyMap from './us-energy-map-reducer';
import userInfo from './user-reducer';

export default combineReducers({
    footprintForm,
    footprintFormAnswers,
    stateEnergy,
    usEnergyMap,
    userInfo
});