import ids from '../../../utils/ids/index';

const updateZipErrorText = (allQuestions, errorText, dispatch) => {
    const updatedQuestions = allQuestions.map(question => {
        if (question.id === ids.userZip) {
            question.errorText = errorText;
        }
        return question;
    });
    dispatch({type: 'UPDATE_QUESTIONS', payload: updatedQuestions});
}

const resolveZipCodeEnergy = (inputZip, getState, dispatch) => {
    const store = getState();
    const maxDistance = store.localEnergy.maxDistance;
    const onlyUtility = store.localEnergy.onlyUtility;
    fetch('/api/get-energy-sources-by-zip', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            inputZip,
            maxDistance,
            onlyUtility
        })
    })
    .then(res => res.json())
    .then(res => {
        if(res.error) {
            dispatch({ type: 'SET_LOCAL_ENERGY_DATA', payload: [] });
            return dispatch({ type: 'SET_LOCAL_ENERGY_DATA_ERROR', payload: true });
        }
        dispatch({ type: 'SET_LOCAL_ENERGY_DATA', payload: res });
    })
}

export default ({dispatch, getState, question}) => {
    if(question.errorText) { // Not valid input.  Dont even try.
        return;
    }
    const inputZip = question.value;
    resolveZipCodeEnergy(inputZip, getState, dispatch);
    fetch(`/api/get-nearest-zip-code-temperature-data/${inputZip}`)
    .then(res => res.json())
    .then(res => {
        const store = getState();
        const allQuestions = store.questions.questions;
        if(res.error) {
            updateZipErrorText(allQuestions, res.message, dispatch);
            
        } else if (res.zip) {
            const updateQuestions = allQuestions.slice().map(question => {
                if (question.id === ids.userState) {
                    question.errorText = '';
                }
                return question;
            });
            
            const nearestZip = res.zip;
            const zipState = res.state;
            dispatch({type: 'UPDATE_NEAREST_TEMPERATURE_ZIP', payload: nearestZip});
            dispatch({type: 'UPDATE_QUESTIONS', payload: updateQuestions});
            dispatch({type: 'UPDATE_USER_STATE', payload: zipState});
        }
    })
    .catch((e)=> {
        console.log('ERROR -- resolving zip code', e);
        const store = getState();
        const allQuestions = store.questions.questions;
        updateZipErrorText(allQuestions, `Could not resolve zip code: ${inputZip}.  Please try a different zip code.`, dispatch);
    });
};
