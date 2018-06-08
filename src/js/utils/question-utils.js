export const sortQuestionsByIds = (ids, questions) => {
    return questions.sort((a, b) => {
        if (ids.indexOf(a.id) === -1) {
            console.log('ERROR:  Tried to sort a question that isnt there', a);
        }
        return ids.indexOf(a.id) - ids.indexOf(b.id);
      });
};

export const filterQuestionsByForm = (formName, allQuestions) => {
    return allQuestions.filter(question => { 
        const forms = question.forms;
        const index = forms.indexOf(formName);
        return index !== -1 && !question.hidden; 
    });
}

export const sortAndFilterQuestions = (formName, idOrder, questions) => {
    const filtered = filterQuestionsByForm(formName, questions);
    const sorted = sortQuestionsByIds(idOrder, filtered);
    return sorted;
}