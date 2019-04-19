import ids from '../../../utils/ids/index';
import MAP_DB from '../../../server/daos/map-db';

const updateZipErrorText = (allQuestions, errorText, dispatch) => {
    const updatedQuestions = allQuestions.map(question => {
        if (question.id === ids.userZip) {
            question.errorText = errorText;
        }
        return question;
    });
    dispatch({type: 'UPDATE_QUESTIONS', payload: updatedQuestions});
}

export const resolveZipCodeEnergySources = ({searchDistance, inputZip }) => {
    return (dispatch, getState) => resolveZipCodeEnergy({searchDistance, inputZip, dispatch, getState});
}

// Search distance is not included in the question trigger, but it is called in LocalEnergyResults.
export const resolveZipCodeEnergy = ({getState, dispatch, searchDistance, inputZip}) => {
    const store = getState();
    const distance = searchDistance || store.localEnergy.distance;
    const onlyUtility = store.localEnergy.onlyUtility;
    // v1 api route is get-energy-sources-by-zip.  Payload is maxDistance, inputZip, onlyUtility
    fetch('/api/get-nearest-power-plants', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            zipdeCode: inputZip,
            distance,
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
    // V1 endpoint is get-nearest-zip-code-temperature-data
    fetch(`/api/get-zip-temperature-data/${inputZip}`)
    .then(res => res.json())
    .then(tempDataResults => {
        const store = getState();
        const allQuestions = store.questions.questions;
        if(tempDataResults.error) {
            updateZipErrorText(allQuestions, tempDataResults.message, dispatch);
            
        } else if (tempDataResults.results) {
            const mappedData = MAP_DB(tempDataResults.results)
            return dispatch({type: 'UPDATE_NEAREST_TEMPERATURE_ZIP', payload: mappedData });
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
    // V1 is get-basic-zip-data
    fetch(`/api/get-zip-data/${inputZip}`)
    .then(res => res.json())
    .then(userZipDataResults => {
        const store = getState();
        const allQuestions = store.questions.questions;
        if(userZipDataResults.error) {
            updateZipErrorText(allQuestions, userZipDataResults.message, dispatch);
            
        } else if (userZipDataResults.results) {
            const userZipData = MAP_DB(userZipDataResults.results);
            console.log('GOT IT', userZipData);
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