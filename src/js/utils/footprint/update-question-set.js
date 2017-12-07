import { getAnswerFromKey } from './get-question-utils';

export const updateHiddenQuestions = questionSet => {
    const noCar = getAnswerFromKey(questionSet, 'Do you drive?') === 'on' ? false : true;
    const electricCar = getAnswerFromKey(questionSet, 'What\'s the fuel for your car?') === 'Electric' ? true : false;
    let hideIfArray = [];
    if(noCar) {
        hideIfArray.push('noCar');
    }
    if(electricCar) {
        hideIfArray.push('electricCar');
    }
    const updatedQuestionSet = questionSet.map(question => {
        const hideIf = question.hideIf;
        let hideQuestion = false;
        if(hideIf) {
            hideIf.forEach(hide => {
                if(hideIfArray.indexOf(hide) !== -1) {
                    hideQuestion = true;
                    return;
                }
            }); 
        };
        if(hideQuestion) {
            question.hidden = true;
            return question;
        }
        question.hidden = false;
        return question;
    });
    return updatedQuestionSet;
}

export const updateQuestion = (allQuestions, id, value) => {
    return allQuestions.map(question => {
        if (question.name === id) {
            question.value = value;
        };
        return question;
    });
};

export const updateQuestionErrorText = (allQuestions, id, errorText) => {
    return allQuestions.map(question => {
        if (question.name === id) {
            question.errorText = errorText;
        };
        return question;
    });
};

export const updateQuestionSet = (allQuestions, questionInfo) => {
    const {id, errorText, value} = questionInfo;
    const updatedValues = updateQuestion(allQuestions, id, value);
    const updatedErrors = updateQuestionErrorText(updatedValues, id, errorText);
    const updatedHidden = updateHiddenQuestions(updatedErrors);
    return updatedHidden;
}