import { combineReducers } from 'redux';

import footprintForm from './footprint-form-reducer.js';
import footprintFormAnswers from './footprint-form-answers-reducer.js';

export default combineReducers({
    footprintForm,
    footprintFormAnswers
});