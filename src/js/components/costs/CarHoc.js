import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { carQuestions, classData, co2PerPound, creationBreakdown } from './car-data';
import Car from './Car';

import { co2PerGallonOfGas } from '../../utils/utils-data/constants';


import { getAnswerFromId, getQuestionFromId } from '../../utils/footprint/get-question-utils';

@connect((store, props) => {
	return {
        questions: store.costsForms.questions
    };
})
export default class CarHoc extends React.Component {

    componentDidMount() {
        const questions = _.filter(this.props.questions, question => { question['forms'].indexOf('car') !== -1 });
        if(questions.length < carQuestions.length) {
            const questionsToAdd = carQuestions.filter(question => {
                const isNotQuestionInSet = getQuestionFromId(questions, question.id) ? false : true;
                return isNotQuestionInSet;
            });
            this.props.dispatch({type: 'ADD_QUESTIONS_TO_COST_QUESTIONS', payload: questionsToAdd});
        }
    }

    calculateCreationCo2(carQuestions) {
        const carClass = getAnswerFromId(carQuestions, 1003) || 'Midsize car';
        const carWeight = classData[carClass].weight;
        const carRuggedness = getAnswerFromId(carQuestions, 1004) || 'Standard';
        const carCo2PerPound = co2PerPound[carRuggedness];

        const carCo2 = Math.round(carWeight * carCo2PerPound);
        return carCo2;
    }

    calculateDrivingCo2(carQuestions) {
        const mpg = getAnswerFromId(carQuestions, 1005);
        const miles = getAnswerFromId(carQuestions, 1006); 

        const carCo2 = Math.round(co2PerGallonOfGas * miles / mpg);
        return carCo2;
    }

    getCo2text(carQuestions, carCreationCo2, carMileageCo2) {
        const carClass = (getAnswerFromId(carQuestions, 1003) || 'Midsize car').toLowerCase();
        const carRuggedness = (getAnswerFromId(carQuestions, 1004) || 'Standard').toLowerCase();

        const text = `A ${carRuggedness} ${carClass} emits ${carCreationCo2.toLocaleString()} pounds of CO2 during its creation process and ${carMileageCo2.toLocaleString()} pounds of CO2 via driving.`;
        return text;
    }

	render() {
        const questions = _.filter(this.props.questions, question => { 
            const forms = question['forms'];
            const index = forms.indexOf('car');
            return index !== -1 && !question.hidden; 
        });

        const carCreationCo2 = this.calculateCreationCo2(questions);
        const carMileageCo2 = this.calculateDrivingCo2(questions);
        const totalCo2 = carCreationCo2 + carMileageCo2;
        const text = this.getCo2text(questions, carCreationCo2, carMileageCo2);

		return (
            <Car
                dispatch={this.props.dispatch}    
                questions={questions}
                creationBreakdown={creationBreakdown}
                totalCo2={totalCo2}
                text={text}
             />
		);
	}
}


