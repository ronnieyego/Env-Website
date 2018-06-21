import React from "react";
import { array } from 'prop-types';
import { connect } from 'react-redux';

import { sortAndFilterQuestions } from '../../../utils/question-utils';
import Question from '../../questions/QuestionHoc';
import ids from '../../../utils/ids/index';

const QUESTION_ORDER = [
    ids.hoursAtHome,
    ids.tvWatchHours,
    ids.hoursComputer,
    ids.doesCook,
    ids.showEveryday,
    ids.playMusicHome,
    ids.laundryMonth,
];

export default class HouseholdFormActivities extends React.Component {
    static propTypes = {
        questions: array.isRequired
    }
	render() {
        const questions = sortAndFilterQuestions('household-activities', QUESTION_ORDER, this.props.questions);

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
                <div>
                    <p className="footprint-form-sub-header">The following questions will help caluclate your utility CO<sub>2</sub>.</p>
                    { questionComponents }
                </div>
            </div>
		);
	}
};



