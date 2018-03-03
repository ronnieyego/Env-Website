import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { 
    clothesQuestions,
    co2PerPoundOfFabric,
    sizeDifference,
    weightOfClothes,
    womenWeightDiff 
} from './clothes-data';
import Clothes from './Clothes';


import { getAnswerFromId, getQuestionFromId } from '../../utils/footprint/get-question-utils';


@connect((store, props) => {
	return {
        questions: store.costsForms.questions
    };
})
export default class ClothesHoc extends React.Component {

    componentDidMount() {
        const questions = _.filter(this.props.questions, question => { question['forms'].indexOf('clothes') !== -1 });
        if(questions.length < clothesQuestions.length) {
            const questionsToAdd = clothesQuestions.filter(question => {
                const isNotQuestionInSet = getQuestionFromId(questions, question.id) ? false : true;
                return isNotQuestionInSet;
            });
            this.props.dispatch({type: 'ADD_QUESTIONS_TO_COST_QUESTIONS', payload: questionsToAdd});
        }
    }

    
	render() {
        const questions = _.filter(this.props.questions, question => { 
            const forms = question['forms'];
            const index = forms.indexOf('clothes');
            return index !== -1 && !question.hidden; 
        });

		return (
            <Clothes
                dispatch={this.props.dispatch}    
                questions={questions}
             />
		);
	}
}


