import { combineReducers } from 'redux';

import averageAmerican from './average-american-reducer'
import questions from './questions-reducer';
import footprintForm from './footprint-form-reducer';
import { footprintFormAnswers } from './footprint-form-answers-reducer';
import stateEnergy from './state-energy-reducer';
import localEnergy from './local-energy-reducer';
import usEnergyMap from './us-energy-map-reducer';
import userInfo from './user-reducer';
import session from './session-reducer';

export default combineReducers({
    averageAmerican,
    footprintForm,
    footprintFormAnswers,
    localEnergy,
    questions,
    stateEnergy,
    session,
    usEnergyMap,
    userInfo
});