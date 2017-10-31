export const getAnswerFromKey = (questionSet, key) => {
    let answer = null;
    questionSet.forEach(question => {
        if(question.name === key) {
            answer = question.value;
            return;
        }
    });
    return answer;
}

export const getQuestionFromKey = (questionSet, key) => {
    let foundQuestion = null;
    questionSet.forEach(question => {
        if(question.name === key) {
            foundQuestion = question;
            return;
        }
    });
    return foundQuestion;
}