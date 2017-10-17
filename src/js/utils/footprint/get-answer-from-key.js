export default (questionSet, key) => {
    let answer = null;
    questionSet.forEach(question => {
        if(question.name === key) {
            answer = question.value;
            return;
        }
    });
    return answer;
}