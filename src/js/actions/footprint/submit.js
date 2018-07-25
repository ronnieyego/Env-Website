import getAnswers from './submit-get-all-answers';
import getResults from './submit-with-all-answers';

export default () => {
    return (dispatch, getState) => {
        const store = getState();
        const questions = store.questions.questions;
        const answers = getAnswers(questions);
        const userState = store.userInfo.userState;
        answers.state = userState;

        const results = getResults(answers);

        const answerId = store.footprintFormAnswers.answerId;

        if( answerId ) {
            console.log('TODO:  Do an update not a post');
        } else {
            fetch('/api/footprint-form/answer', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    formName: 'footprint-finder-v2',
                    formAnswers: questions,
                    results: results,
                    userState
                })
            })
            .then(res => res.json())
            .then(res => {
                dispatch({type: 'SET_FORM_ANSWER_ID', payload: res['_id']}); 
                // window.location.href = '/footprint/5b01fe67387e61807639db89';  
            });
        };
    }
}

//5b551aa4058c4c33e8460d8d