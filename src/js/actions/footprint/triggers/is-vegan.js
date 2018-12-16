import ids from '../../../utils/ids/index';

const NON_VEGAN_QUESTIONS = [ ids.beefFrequency, ids.chickenFrequency, ids.porkFrequency, ids.seafoodFrequency, ids.dairyFrequency, ids.cheeseFrequency, ids.isVegetarian ];

export default ({dispatch, allQuestions}) => {
    const modifiedQuestions = allQuestions.map(question => {
        if (NON_VEGAN_QUESTIONS.indexOf(question.id) !== -1) {
            question.hidden = true;
            question.value = ids.never;
            question.index = 0;
        }
        return question;
    });
    dispatch({type: 'UPDATE_QUESTIONS', payload: modifiedQuestions});
};
