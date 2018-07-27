import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ids from '../../../utils/ids/index';
 import {
    cornFedCowEmissions,
    percentIncreaseForGrassFed,
    percentIncreaseForKobe,
    kobeTransportCO2
  } from './steak-data';
import Steak from './Steak';

import { getAnswerFromId } from '../../../utils/footprint/get-question-utils';

@connect((store, props) => {
	return {
        questions: store.questions.questions,
        userState: store.userInfo.userState
    };
})
export default class SteakHoc extends React.Component {
    getCo2(questions) {
        const weight = getAnswerFromId(questions, ids.steakWeight);
        const type = getAnswerFromId(questions, ids.steakFeed);
        const pounds = weight/16;
        let totalCo2 = pounds * cornFedCowEmissions;
        if(type === 'Grass fed') {
            totalCo2 = totalCo2 * percentIncreaseForGrassFed;
        } else if(type === 'Real Kobe beef') {
            totalCo2 = (totalCo2 * percentIncreaseForKobe) + kobeTransportCO2;
        }

        return { totalCo2, type };
    }


	render() {
        const questions = this.props.questions.filter(question => { 
            const forms = question['forms'];
            const index = forms.indexOf('steak');
            return index !== -1 && !question.hidden; 
        });
        const {totalCo2, type } = this.getCo2(questions);

		return (
            <Steak
                dispatch={this.props.dispatch}    
                questions={questions}
                totalCo2={totalCo2}
                type={type}
             />
		);
	}
}


