import React from "react";
import { connect } from 'react-redux';

import ids from '../../../utils/ids/index';
import Garbage from './Garbage';
import { co2Landfill, kwhPerPound, transportCo2 } from './garbage-data';

import { getAnswerFromId } from '../../../utils/footprint/get-question-utils';
import { utilityEmissionsPerState } from '../../../utils/utils-data/state-energy-and-emissions';

@connect((store, props) => {
	return {
        questions: store.questions.questions
    };
})
export default class GarbageHoc extends React.Component {

    getCo2(questions) {
        const distanceText = getAnswerFromId(questions, ids.distanceToLandfill);
        const pounds = parseInt(getAnswerFromId(questions, ids.poundsOfGarbage));
        const methaneCapture = getAnswerFromId(questions, ids.landfillMethaneCapture);

        const poundsOfGarbage = typeof pounds === 'number' && pounds > 0 ? pounds : 0;

        let distance;
        if (distanceText === ids.under100Miles) {
            distance = 50;
        } else if (distanceText === ids.oneHundredTwoHundredMiles) {
            distance = 150;
        } else if (distanceText === ids.over200Miles) {
            distance = 250;
        } else if (distanceText === ids.noIdea) {
            distance = 100;
        }

        let total = (poundsOfGarbage * distance * transportCo2) + (poundsOfGarbage * co2Landfill);
        if (methaneCapture) {
            const methaneDifference = poundsOfGarbage * kwhPerPound * utilityEmissionsPerState.US;
            total -= methaneDifference;
        }


        return { totalCo2: total };
    }

	render() {
        const questions = this.props.questions.filter(question => { 
            const forms = question.forms;
            const index = forms.indexOf('garbage');
            return index !== -1 && !question.hidden; 
        });

        const results = this.getCo2(questions);

		return (
            <Garbage
                dispatch={this.props.dispatch}    
                questions={questions}
                totalCo2={results.totalCo2}
             />
		);
	}
}


