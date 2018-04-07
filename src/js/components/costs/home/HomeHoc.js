import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ids from '../../../utils/ids/index';
import { homeTypeAdjuster, co2PerSqFt, co2Breakdown, houseQuestions } from './home-data';
import Home from './Home';

import { getAnswerFromId, getQuestionFromId } from '../../../utils/footprint/get-question-utils';

@connect((store, props) => {
	return {
        questions: store.costsForms.questions,
        userState: store.userInfo.userState
    };
})
export default class HomeHoc extends React.Component {

    componentDidMount() {
        const questions = _.filter(this.props.questions, question => { question['forms'].indexOf('house') !== -1 });
        if(questions.length < houseQuestions.length) {
            const questionsToAdd = houseQuestions.filter(question => {
                const isNotQuestionInSet = getQuestionFromId(questions, question.id) ? false : true;
                return isNotQuestionInSet;
            });
            this.props.dispatch({type: 'ADD_QUESTIONS_TO_COST_QUESTIONS', payload: questionsToAdd});
        }
    }

    getHomeCo2(questions) {
        const material = getAnswerFromId(questions, ids.homeMaterial) || 'Wood';
        const homeType = getAnswerFromId(questions, ids.homeType) || 'House';
        const sqft = getAnswerFromId(questions, ids.homeSqft) || 0;

        const adjuster = homeTypeAdjuster[homeType];
        const materialCo2PerSqft = co2PerSqFt[material];

        const totalCo2 = Math.round(sqft *  materialCo2PerSqft * adjuster);
        return { totalCo2, homeType, material };
    }


	render() {
        const questions = _.filter(this.props.questions, question => { 
            const forms = question['forms'];
            const index = forms.indexOf('house');
            return index !== -1 && !question.hidden; 
        });



        const { totalCo2, homeType, material } = this.getHomeCo2(questions);

        const keys = Object.keys(co2Breakdown[material]);
        const graphData = keys.map(key => {
            const amount = co2Breakdown[material][key];
            return {name: key, Breakdown: amount *  totalCo2 }
        });

		return (
            <Home
                dispatch={this.props.dispatch}    
                questions={questions}
                totalCo2={totalCo2}
                homeType={homeType}
                graphData={graphData}
             />
		);
	}
}


