import { getAnswerFromId, getAnswerFromKey } from './get-question-utils';

export const updateHiddenQuestions = questionSet => {
    // Footprint Form
    const noCar = getAnswerFromKey(questionSet, 'Do you drive?') === 'on' ? false : true;
    const electricCar = getAnswerFromKey(questionSet, 'What\'s the fuel for your car?') === 'Electric' ? true : false;
    
    // Costs form
    const answer = getAnswerFromId(questionSet, 1000);
    const isSingleUseCup = ["Paper", "Paper with plastic lining", "Styrafoam"].indexOf(getAnswerFromId(questionSet, 1000)) !== -1 ? true : false;
    let hideIfArray = [];
    
    // THis string needs to match the hideIf field in the question.  Yay for Magic Strings!
    if(noCar) { hideIfArray.push('noCar')}
    if(electricCar) { hideIfArray.push('electricCar');}
    if(isSingleUseCup) { hideIfArray.push('singleUseCup');}
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

export const updateQuestion = (allQuestions, id, value, index) => {
    return allQuestions.map(question => {
        if (question.id == id) { // I get id from the dom which stringifies it
            question.value = value;
            question.checked = value === 'on' ? true : false; // Only for bool questions
            question.index = index; // Only for Dropdown quesions
        };
        return question;
    });
};

export const updateQuestionErrorText = (allQuestions, id, errorText) => {
    return allQuestions.map(question => {
        if (question.id == id) { // I get id from the dom which stringifies it
            question.errorText = errorText;
        };
        return question;
    });
};

export const updateQuestionSet = (allQuestions, questionInfo) => {
    const { id, errorText, value, index } = questionInfo; // Index is only for Dropdown questions
    const updatedValues = updateQuestion(allQuestions, id, value, index);
    const updatedErrors = updateQuestionErrorText(updatedValues, id, errorText);
    const updatedHidden = updateHiddenQuestions(updatedErrors);
    return updatedHidden;
}