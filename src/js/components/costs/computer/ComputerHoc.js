import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ids from '../../../utils/ids/index';
import { laptopData, desktopData, tabletData, computerQuestions, phoneData } from './computer-data';
import Computer from './Computer';

import { getAnswerFromId, getQuestionFromId } from '../../../utils/footprint/get-question-utils';

@connect((store, props) => {
	return {
        questions: store.questions.questions
    };
})
export default class ComputerHoc extends React.Component {

    getBrand(questions, computerType) {
        if(computerType === 'Phone') {
            return getAnswerFromId(questions, ids.phoneBrand);
        } else {
            return getAnswerFromId(questions, ids.computerBrand);
        }
    }

    getCo2(questions) {
        const computerType = getAnswerFromId(questions, ids.computerType);
        let brand = this.getBrand(questions, computerType);
        const loweredBrand = brand.toLowerCase();
        let resultData;
        let graphDefaultMax = 500;
        if(computerType === 'Laptop') {
            resultData = laptopData[loweredBrand] || laptopData.average;
        } else if(computerType === 'Desktop') {
            graphDefaultMax = 1500;
            resultData = desktopData[loweredBrand] || desktopData.average;
        } else if(computerType === 'Tablet') {
            graphDefaultMax = 300;
            resultData = tabletData[loweredBrand] || tabletData.average;
        } else if(computerType === 'Phone') {
            graphDefaultMax = 150;
            resultData = phoneData[loweredBrand] || phoneData.average;
        }
         else {
            console.log('Error -- data not found for computer type', computerType);
        }
        const { total, use, production, transportation, recycling } =  resultData;
        return { total, use, production, transportation, recycling, brand, graphDefaultMax };
    }

	render() {
        let questions = this.props.questions.filter(question => { 
            const forms = question['forms'];
            const index = forms.indexOf('computer');
            return index !== -1 && !question.hidden; 
        });
        const computerType = getAnswerFromId(questions, ids.computerType);
        
        const { total, use, production, transportation, recycling, brand, graphDefaultMax } = this.getCo2(questions);

        if(computerType === 'Phone') {
            questions = questions.filter(question => question.id !== ids.computerBrand);
        } else {
            questions = questions.filter(question => question.id !== ids.phoneBrand);
        }

        const graphData = [
            {name: 'Production', Phase: production},
            {name: 'Use', Phase: use},
            {name: 'Transportation', Phase: transportation},
            {name: 'End of life', Phase: recycling},
        ];

		return (
            <Computer
                dispatch={this.props.dispatch}    
                questions={questions}
                computerType={computerType}
                brand={brand}
                totalCo2={total}
                use={use}
                production={production}
                transportation={transportation}
                recycling={recycling}
                graphData={graphData}
                graphDefaultMax={graphDefaultMax}
             />
		);
	}
}


