// If I resolve a zip in a different state, that'd be bad.
// I can solve this better by having state on every zip
const chooseBestState = (getState, resolvedZipState) => {
    const store = getState();
    const existingUserState = store.userInfo.userState;
    const validExistingState = existingUserState && existingUserState !== 'US';
    return validExistingState ? existingUserState : resolvedZipState;
}

export default ({dispatch, getState, question}) => {
    if(question.errorText) { // Not valid input.  Dont even try.
        return;
    }
    const inputZip = question.value;
    fetch(`/api/get-nearest-zip-code-temperature-data/${inputZip}`)
    .then(res => res.json())
    .then(res => {
        if(res === -1) {
            dispatch({type: 'SET_NEAREST_TEMPERATURE_ZIP_ERROR', payload: true});
        } else if (res.zip) {
            const nearestZip = res.zip;
            const zipState = res.state;
            const bestState = chooseBestState(getState, zipState);
            dispatch({type: 'UPDATE_USER_STATE', payload: bestState});
            dispatch({type: 'UPDATE_NEAREST_TEMPERATURE_ZIP', payload: nearestZip});
        }
    })
    .catch(()=> dispatch({type: 'SET_NEAREST_TEMPERATURE_ZIP_ERROR', payload: true}));
};
