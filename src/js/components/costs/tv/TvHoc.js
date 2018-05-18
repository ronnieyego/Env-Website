import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ids from '../../../utils/ids/index';
import { 
    embodiedCo2PerInch,
    transportationCo2PerInch,
    wattagePerInch,
    tvQuestions,
    tvLife
} from './tv-data';
import Tv from './Tv';

import { utilityEmissionsPerState } from '../../../utils/utils-data/state-energy-and-emissions';
import { getAnswerFromId, getQuestionFromId } from '../../../utils/footprint/get-question-utils';

@connect((store, props) => {
	return {
        questions: store.costsForms.questions,
        userState: store.userInfo.userState
    };
})
export default class TvHoc extends React.Component {

    getCo2(questions) {
        const size = getAnswerFromId(questions, ids.tvSize);
        const type = getAnswerFromId(questions, ids.tvType);
        const userWattage = getAnswerFromId(questions, ids.tvWattage);
        const watchHours = getAnswerFromId(questions, ids.tvWatchHours);
        const knowWattage = getAnswerFromId(questions, ids.tvKnowWattage) === 'Yes' ? true : false;

        const embodiedCo2 = embodiedCo2PerInch * size;
        const transportCo2 = transportationCo2PerInch * size;
        const wattage = knowWattage ? userWattage : wattagePerInch[type] * size;
        const tvLifeHours = tvLife[type];
        
        const co2LifeUse = wattage * tvLifeHours / 1000 * utilityEmissionsPerState[this.props.userState];
        const yearsOfLife = Math.round((tvLifeHours/(watchHours * 365) * 10))/10;
        const totalCo2 = Math.round(embodiedCo2 + transportCo2 + co2LifeUse);

        return { totalCo2, yearsOfLife, embodiedCo2, transportCo2 };
    }

	render() {
        let questions = this.props.questions.filter(question => { 
            const forms = question['forms'];
            const index = forms.indexOf('tv');
            return index !== -1 && !question.hidden; 
        });

        const { totalCo2, yearsOfLife, embodiedCo2, transportCo2 } = this.getCo2(questions);

        const knowWattage = getAnswerFromId(questions, ids.tvKnowWattage);
        const removeWattageQuestion = knowWattage === 'Yes' ? false : true
        if (removeWattageQuestion) {
            questions = questions.filter(question => {
                return question.id !== ids.tvWattage;
            })
        }
        
        
		return (
            <Tv
                dispatch={this.props.dispatch}    
                questions={questions}
                totalCo2={totalCo2}
                yearsOfLife={yearsOfLife}
                embodiedCo2={embodiedCo2}
                transportCo2={transportCo2}
             />
		);
	}
}


