import { resolveBasicZipCodeData, resolveZipCodeEnergy, resolveZipCodeTemp } from '../zip/actions';

export default ({dispatch, getState, question}) => {
    if(question.errorText) { // Not valid input.  Dont even try.
        return;
    }
    const inputZip = question.value;
    resolveBasicZipCodeData({dispatch, getState, question})
    resolveZipCodeEnergy({dispatch, getState, inputZip})
    resolveZipCodeTemp({dispatch, getState, question});
};
