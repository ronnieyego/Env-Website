import React from "react";
import { array } from 'prop-types';
import { connect } from 'react-redux';

import { sortAndFilterQuestions } from '../../../utils/question-utils';
import Question from '../../questions/QuestionHoc';
import ids from '../../../utils/ids/index';

const QUESTION_ORDER = [
    ids.userState,
    ids.homeType,
    ids.homeSqft,
    ids.homeMaterial,
    ids.liveWith,
    ids.homeAge
];

export default class Household extends React.Component {
    static propTypes = {
        questions: array.isRequired
    }
	render() {
        const questions = sortAndFilterQuestions('household-home', QUESTION_ORDER, this.props.questions);

        const questionComponents = questions.map( question => (
            <Question
                questionType={question.type}
                key={question.name}
                question={question}
                value={question.value}
            />
        ));

		return (
            <div>
                <p className="footprint-form-sub-header">Your home is one of the largest CO<sub>2</sub> costs in your life.  Answering the following questions will let you discover exactly how much.</p>
                { questionComponents }
            </div>
		);
	}
};



