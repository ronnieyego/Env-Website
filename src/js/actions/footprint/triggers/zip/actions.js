import ids from '../../../../utils/ids/index';

const updateZipErrorText = (allQuestions, errorText, dispatch) => {
    const updatedQuestions = allQuestions.map(question => {
        if (question.id === ids.userZip) {
            question.errorText = errorText;
        }
        return question;
    });
    dispatch({type: 'UPDATE_QUESTIONS', payload: updatedQuestions});
}

export const resolveZipCodeEnergy = ({question, getState, dispatch}) => {
    const store = getState();
    const maxDistance = store.localEnergy.maxDistance;
    const onlyUtility = store.localEnergy.onlyUtility;
    const inputZip = question.value;
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
    .catch((e)=> {
        console.log('ERROR -- resolving zip code energy', e);
        const allQuestions = store.questions.questions;
        updateZipErrorText(allQuestions, `Could not resolve zip code: ${inputZip}.  Please try a different zip code.`, dispatch);
    });
};

export const resolveZipCodeTemp = ({dispatch, getState, question}) => {
    if(question.errorText) { // Not valid input.  Dont even try.
        return;
    }
    const inputZip = question.value;
    fetch(`/api/get-nearest-zip-code-temperature-data/${inputZip}`)
    .then(res => res.json())
    .then(res => {
        const store = getState();
        const allQuestions = store.questions.questions;
        if(res.error) {
            updateZipErrorText(allQuestions, res.message, dispatch);
            
        } else if (res.zip) {
            const nearestZip = res.zip;
            dispatch({type: 'UPDATE_NEAREST_TEMPERATURE_ZIP', payload: nearestZip});
        }
    })
    .catch((e)=> {
        console.log('ERROR -- resolving zip code temp', e);
        const store = getState();
        const allQuestions = store.questions.questions;
        updateZipErrorText(allQuestions, `Could not resolve zip code: ${inputZip}.  Please try a different zip code.`, dispatch);
    });

};

export const resolveBasicZipCodeData = ({dispatch, getState, question}) => {
    if(question.errorText) { // Not valid input.  Dont even try.
        return;
    }
    const inputZip = question.value;
    fetch(`/api/get-basic-zip-data/${inputZip}`)
    .then(res => res.json())
    .then(userZipData => {
        const store = getState();
        const allQuestions = store.questions.questions;
        if(userZipData.error) {
            updateZipErrorText(allQuestions, userZipData.message, dispatch);
            
        } else if (userZipData.zip) {
            const updateQuestions = allQuestions.slice().map(question => {
                if (question.id === ids.userState) {
                    question.errorText = '';
                }
                return question;
            });
            
            const zipState = userZipData.state;
            dispatch({type: 'UPDATE_USER_ZIP_CODE', payload: inputZip});
            dispatch({type: 'UPDATE_USER_ZIP_CODE_DATA', payload: userZipData});
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