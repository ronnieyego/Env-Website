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
    // intro: 1,
    home: 1,
    homeActivities: 2,
    heatingCooling: 3,
    transportation: 4,
    food: 5,
    stuff: 6
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