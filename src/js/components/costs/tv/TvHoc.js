import React from "react";
import { connect } from 'react-redux';

import ids from '../../../utils/ids/index';
import { 
    embodiedCo2PerInch,
    transportationCo2PerInch,
    wattagePerInch,
    tvLife
} from './tv-data';
import Tv from './Tv';

import { utilityEmissionsPerState } from '../../../utils/utils-data/state-energy-and-emissions';
import { getAnswerFromId } from '../../../utils/footprint/get-question-utils';

@connect((store, props) => {
	return {
        questions: store.questions.questions,
        userState: store.userInfo.userState
    };
})
export default class TvHoc extends React.Component {

    getCo2(questions) {
        const size = getAnswerFromId(questions, ids.tvSize);
        const type = getAnswerFromId(questions, ids.tvType);
        const userWattage = getAnswerFromId(questions, ids.tvWattage);
        const watchHours = getAnswerFromId(questions, ids.tvWatchHours);
        const yearsOwn = getAnswerFromId(questions, ids.tvOwnYears);
        const knowWattage = getAnswerFromId(questions, ids.tvKnowWattage) === 'Yes' ? true : false;

        const embodiedCo2 = Math.round(embodiedCo2PerInch * size);
        const transportCo2 = Math.round(transportationCo2PerInch * size);
        const wattage = knowWattage ? userWattage : wattagePerInch[type] * size;
        const tvLifeHours = tvLife[type];
        const yearlyUseCo2 = Math.round(wattage * watchHours * 365 / 1000 * utilityEmissionsPerState[this.props.userState]);
        const lifeUseCo2 = yearlyUseCo2 * yearsOwn;
        const totalCo2 = Math.round(embodiedCo2 + transportCo2 + lifeUseCo2);

        return { totalCo2, yearlyUseCo2, embodiedCo2, transportCo2, lifeUseCo2, tvLifeHours };
    }

	render() {
        let questions = this.props.questions.filter(question => { 
            const forms = question['forms'];
            const index = forms.indexOf('tv');
            return index !== -1 && !question.hidden; 
        });

        const { totalCo2, yearlyUseCo2, embodiedCo2, transportCo2, lifeUseCo2, tvLifeHours } = this.getCo2(questions);

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
                yearlyUseCo2={yearlyUseCo2}
                embodiedCo2={embodiedCo2}
                transportCo2={transportCo2}
                lifeUseCo2={lifeUseCo2}
                tvLifeHours={tvLifeHours}
             />
		);
	}
}


