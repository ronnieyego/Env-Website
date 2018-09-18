import React from "react";
import Question from '../../questions/QuestionHoc';
import {
    NoOpValidator,
    HomeFormValidator,
    HomeUtilitiesValidator,
    HomeTemperatureValidator,
    TransportationValidator,
    FoodValidator,
    StuffValidator
} from '../../../actions/footprint/validators/index';

export const STEPS = {
    intro: 1,
    home: 2,
    homeActivities: 3,
    heatingCooling: 4,
    transportation: 5,
    food: 6,
    stuff: 7
};

export const getValidatorFromStep = step => {
    switch(step) {
        case STEPS.intro:
            return NoOpValidator;
        case STEPS.home:
            return HomeFormValidator;
        case STEPS.homeActivities:
            return HomeUtilitiesValidator;
        case STEPS.heatingCooling:
            return HomeTemperatureValidator;
        case STEPS.transportation:
            return TransportationValidator;
        case STEPS.food:
            return FoodValidator;
        case STEPS.stuff:
            return StuffValidator;
        default:
            console.log('ERROR - no validator for step: ', step);
    }
};

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