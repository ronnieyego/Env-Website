import _ from 'lodash';
import calculateFootprintSubmit from '../../utils/footprint/calculate-footprint-submit';

// Utils. . . maybe make own file eventually?
const updateQuestion = (allQuestions, id, value) => {
    return allQuestions.forEach(question => {
        if (question.name === id) {
            question.value = value;
        };
        return;
    });
};

const getAnswerFromKey = (questionSet, key) => {
    let answer = null;
    questionSet.forEach(question => {
        if(question.name === key) {
            answer = question.value;
            return;
        }
    });
    return answer;
}

const validateForm = questions => {
      const transportationQuestions = _.filter(questions, function(o) { return o['use-type'] === 'transportation'; });
      let filteredTransportationQuestions = _.filter(transportationQuestions, function(o) { return o['useBool'] !== true; })
      let missingQuestions = [];
      filteredTransportationQuestions.forEach(question => {
        if(!question.value || question.value === '') {
          if(getAnswerFromKey(questions, "What's the fuel for your car?") !== 'Electric' || question.name !== 'What\'s the MPG of your car?') {
            missingQuestions.push(question);
          }
        }
      });
      if(getAnswerFromKey(questions, 'What\'s the MPG of your car?') == 0) {
          return false;
        }
      if(missingQuestions.length > 0) {
        console.log('missing questions', missingQuestions);
        return false;
      }
      return true;
}


//
//
//
// Actions
export const getQuestionData = () => {
    return dispatch => {
        fetch('/data/temp-footprint-questions.json')
        .then(response => {
            return response.json();
        })
        .then(response => {
            const questions = response.questions;
            dispatch({type: 'GET_QUESTIONS', payload: questions});
        })
        .catch(err => {
            dispatch({type: 'ERROR_LOADING_QUESTIONS', payload: true});
        });
    }
};

export const updateQuestions = (id, value) => {
    return (dispatch, getState) => {
        const state = getState();
        const allQuestions = state.footprintForm.questions.slice();
        const updatedQuestions = updateQuestion(allQuestions, id, value);
        dispatch({type: 'UPDATE_QUESTIONS', payload: allQuestions});
    }
};

export const increaseStep = () => {
    return dispatch => {
        dispatch({type: 'INCREASE_STEP'});
    }
};

export const decreaseStep = () => {
    return dispatch => {
        dispatch({type: 'DECREASE_STEP', payload: {}});
    }
};

export const submitForm = questionPayload => {
    return dispatch => {
        let valid = validateForm(questionPayload);  
        const state = 'WA';  
        if (valid) {
            const payload = {
                questions: questionPayload,
                state
            };
            const footprintResults = calculateFootprintSubmit(payload);
            console.log('Footprint results are back.  Values in kwh/period', footprintResults);
            fetch('/api/footprint-form/answer', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    formName: 'footprint-finder',
                    formAnswers: questionPayload,
                    results: footprintResults
                })
            });
            dispatch({type: 'SUBMIT_FORM_RESULTS', payload: footprintResults});
            dispatch({type: 'DISPLAY_ANSWERS', payload: true});
            
        } else {
            alert('Please fill out all of the fields');
        }
    }
};

const updateAverageAmerican = averageAmerican => {
    dispatch => {
        dispatch({type: 'UPDATE_AVERAGE_AMERICAN', payload: averageAmerican})
    }
};
