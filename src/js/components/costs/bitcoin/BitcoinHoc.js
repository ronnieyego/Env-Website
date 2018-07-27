import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ids from '../../../utils/ids/index';
import { bitcoinKwh } from './bitcoin-data';
import Bitcoin from './Bitcoin';
import { utilityEmissionsPerState }from '../../../utils/utils-data/state-energy-and-emissions';
import { getAnswerFromId, getQuestionFromId } from '../../../utils/footprint/get-question-utils';

@connect((store, props) => {
	return {
        questions: store.questions.questions
    };
})
export default class BitcoinHoc extends React.Component {

    getCo2(questions) {
        const estimationType = getAnswerFromId(questions, ids.bitcoinEstimateType);
        const kwhPerBitCoin = bitcoinKwh[estimationType];
        const co2 = Math.round(utilityEmissionsPerState['US'] * kwhPerBitCoin);
        return co2;
    }

	render() {
        const questions = this.props.questions.filter(question => { 
            const forms = question['forms'];
            const index = forms.indexOf('bitcoin');
            return index !== -1 && !question.hidden; 
        });

        const totalCo2 = this.getCo2(questions)
        
		return (
            <Bitcoin
                dispatch={this.props.dispatch}    
                questions={questions}
                totalCo2={totalCo2}
             />
		);
	}
}


