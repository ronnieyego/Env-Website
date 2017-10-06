const getAnswer = (input, answers) => {
    const isId = typeof input === 'number' ? true : false;
    let finalAnswer;
    Object.keys(answers).forEach(answerGroup => {
        const group = answers[answerGroup];
        Object.keys(group).forEach(answerName => {
            const answer = group[answerName];
            if(isId) {
                if(answer.id === input) {
                    finalAnswer = answer.value;
                }
            } else {
                if(answer.name === input) {
                    finalAnswer = answer.value;
                }
            }
        });
    });
    return finalAnswer;
};

module.exports = { getAnswer }