import { resolveBasicZipCodeData, resolveZipCodeEnergy, resolveZipCodeTemp } from './zip/actions';

export default ({dispatch, getState, question}) => {
    if(question.errorText) { // Not valid input.  Dont even try.
        return;
    }
    resolveBasicZipCodeData({dispatch, getState, question})
    resolveZipCodeEnergy({dispatch, getState, question})
    resolveZipCodeTemp({dispatch, getState, question});
};
