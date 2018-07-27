import { combineReducers } from 'redux';

import questions from './questions-reducer';
import costsForms from './costs-forms-reducer';
import footprintForm from './footprint-form-reducer';
import { footprintFormAnswers } from './footprint-form-answers-reducer';
import metadata from './metadata-reducer';
import stateEnergy from './state-energy-reducer';
import usEnergyMap from './us-energy-map-reducer';
import userInfo from './user-reducer';

export default combineReducers({
    costsForms,
    footprintForm,
    footprintFormAnswers,
    metadata,
    questions,
    stateEnergy,
    usEnergyMap,
    userInfo
});