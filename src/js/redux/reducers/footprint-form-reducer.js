const footprintFormReducer = (state = {
    questions: [],
    answers: [],
    text: 'hello redux!'    
}, action) => {
    const newState ={...state}
    switch (action.type) {
        case 'ADD_QUESTION': {
            let newQuestions = state.questions.slice();
            newQuestions.push(action.payload);
            state = { ...state, questions: newQuestions};
            break;
        }
        case 'REMOVE_QUESTIONS': {
            state = { ...state, questions: []};
            break;
        }
    }
    return state;
    
};


module.exports = footprintFormReducer;