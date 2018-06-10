import React from "react";
import { array } from 'prop-types';
import { connect } from 'react-redux';

import { sortAndFilterAndCreateQuestions } from '../../../utils/question-utils';
import Question from '../../questions/QuestionHoc';
import ids from '../../../utils/ids/index';

const QUESTION_ORDER = [
    ids.totalHouseFurniture,
    ids.totalWardrobe
];

export default class StuffFormHome extends React.Component {
    static propTypes = {
        questions: array.isRequired
    }
	render() {
        const questions = sortAndFilterAndCreateQuestions('stuff-home', QUESTION_ORDER, this.props.questions);
		return (
            <div>
                <p className="footprint-form-sub-header">Your home is one of the largest CO<sub>2</sub> costs in your life.  Answering the following questions will let you discover exactly how much.</p>
                { questions }
            </div>
		);
	}
};



