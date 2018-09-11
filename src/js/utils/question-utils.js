import React from 'react';
import Question from '../components/questions/QuestionHoc';

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
};

export const sortAndFilterQuestions = (formName, idOrder, questions) => {
    const filtered = filterQuestionsByForm(formName, questions);
    const sorted = sortQuestionsByIds(idOrder, filtered);
    return sorted;
};

export const sortAndFilterAndCreateQuestions = (formName, idOrder, questions) => {
    const filtered = filterQuestionsByForm(formName, questions);
    const sorted = sortQuestionsByIds(idOrder, filtered);
    const createdQuestions = sorted.map(question => (
        <Question
            questionType={question.type}
            key={`${question.name}-${question.id}`}
            question={question}
            value={question.value}
            errorText={question.errorText} // Added so you can update it and have React render it.
                                           // If its nested in the question object and changes, React doesn't realize anything has changed and wnt re-render
        />
    ));
    return createdQuestions;
}