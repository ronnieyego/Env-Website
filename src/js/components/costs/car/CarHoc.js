import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ids from '../../../utils/ids/index';
import { classData, co2PerPound, creationBreakdown } from './car-data';
import Car from './Car';

import { co2PerGallonOfGas } from '../../../utils/utils-data/constants';


import { getAnswerFromId, getQuestionFromId } from '../../../utils/footprint/get-question-utils';

@connect((store, props) => {
	return {
        questions: store.costsForms.questions
    };
})
export default class CarHoc extends React.Component {

    calculateCreationCo2(carQuestions) {
        const carClass = getAnswerFromId(carQuestions, ids.carSize);
        const carWeight = classData[carClass].weight;
        const carRuggedness = getAnswerFromId(carQuestions, ids.carRuggedness);
        const carCo2PerPound = co2PerPound[carRuggedness];

        const carCo2 = Math.round(carWeight * carCo2PerPound);
        return carCo2;
    }

    calculateDrivingCo2(carQuestions) {
        const mpg = getAnswerFromId(carQuestions, ids.carMpg)
        const miles = getAnswerFromId(carQuestions, ids.carMileage) 

        const carCo2 = Math.round(co2PerGallonOfGas * miles / mpg);
        return carCo2;
    }

    getCo2text(carQuestions, carCreationCo2, carMileageCo2) {
        const carClass = (getAnswerFromId(carQuestions, ids.carSize)).toLowerCase();
        const carRuggedness = (getAnswerFromId(carQuestions, ids.carRuggedness)).toLowerCase();

        const text = `A ${carRuggedness} ${carClass} emits ${carCreationCo2.toLocaleString()} pounds of CO2 during its creation process and ${carMileageCo2.toLocaleString()} pounds of CO2 via driving.`;
        return text;
    }

	render() {
        const questions = this.props.questions.filter(question => { 
            const forms = question['forms'];
            const index = forms.indexOf('car');
            return index !== -1 && !question.hidden; 
        });

        const carCreationCo2 = this.calculateCreationCo2(questions);
        const carMileageCo2 = this.calculateDrivingCo2(questions);
        const totalCo2 = carCreationCo2 + carMileageCo2;
        const text = this.getCo2text(questions, carCreationCo2, carMileageCo2);
        const graphData = creationBreakdown.map(row => ({name: row.name, Phase: Math.round(carCreationCo2 * row.Phase / 100)}));

		return (
            <Car
                dispatch={this.props.dispatch}    
                questions={questions}
                graphData={graphData}
                totalCo2={totalCo2}
                text={text}
             />
		);
	}
}


