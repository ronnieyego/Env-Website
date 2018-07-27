import React from "react";
import Question from '../../questions/QuestionHoc';


export const STEPS = {
    home: 1,
    homeActivities: 2,
    heatingCooling: 3,
    transportation: 4,
    food: 5,
    stuff: 6
}

export const filterQuestions = (questions, filterArray) => {
    return questions.filter(question => filterArray.indexOf(question.id) === -1);
}

export const renderQuestions = questions => {
    return questions.map(question => (
        <Question
            questionType={question.type}
            key={question.name}
            question={question}
            value={question.value}
        />
    ));
}; 