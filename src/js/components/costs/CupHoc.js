import React from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import _ from 'lodash';
import cupData from './cup-data';
import Cup from './Cup';

import { getQuestionFromKey } from '../../utils/footprint/get-question-utils';

@connect((store, props) => {
	return {
        questions: store.costsForms.questions
    };
})
export default class CupHoc extends React.Component {

    componentDidMount() {
        const questions = _.filter(this.props.questions, question => { question['forms'].indexOf('cup') !== -1 });
        const cupQuestions = cupData.questions;
        if(questions.length < cupQuestions.length) {
            const questionsToAdd = cupQuestions.filter(question => {
                const isNotQuestionInSet = getQuestionFromKey(questions, question.name) ? false : true;
                return isNotQuestionInSet;
            });
            this.props.dispatch({type: 'ADD_QUESTIONS_TO_COST_QUESTIONS', payload: questionsToAdd});
        }
    }

	render() {
        const questions = _.filter(this.props.questions, question => { 
            const forms = question['forms'];
            const index = forms.indexOf('cup');
            return index !== -1 && !question.hidden; 
        });

		return (
            <Cup
                dispatch={this.props.dispatch}    
                questions={questions}
            />
        );
	}
}