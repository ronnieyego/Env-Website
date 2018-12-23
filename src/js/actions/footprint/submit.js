import getAnswers from './submit-get-all-answers';

export default () => {
    return (dispatch, getState) => {
        const store = getState();
        const questions = store.questions.questions;
        const answers = getAnswers(questions);
        const userState = store.userInfo.userState;
        answers.state = userState;

        const answerId = store.footprintFormAnswers.answerId;

        if( answerId ) {
            console.log('TODO:  Do an update not a post');
        } else {
            // /api/footprint-form/answer'  --- OLD Endpoint.  Deprecated in 2018
            return fetch('/api/footprint-form/submit-form', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    answers,
                    userState
                })
            })
            .then(res => res.json())
            .then(res => {
                if(res.error) {
                    console.log('Oh noes something went wrong on submit', res.message);
                } else {
                    dispatch({type: 'SET_FORM_ANSWER_ID', payload: res['_id']}); 
                    window.location.href = `/footprint/${res['_id']}`;  
                }
            })
            .catch(e => {
                console.log('Oh noes something went wrong on submit', e);
                dispatch({type: 'SET_FORM_ERROR', payload: e.message}); 
            });
        };
    }
}

//5b551aa4058c4c33e8460d8d