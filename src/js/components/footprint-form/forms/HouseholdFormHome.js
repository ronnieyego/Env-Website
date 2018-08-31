import React from "react";
import { array } from 'prop-types';

import { sortAndFilterAndCreateQuestions } from '../../../utils/question-utils';
import ids from '../../../utils/ids/index';

const QUESTION_ORDER = [
    ids.userState,
    ids.homeType,
    ids.homeSqft,
    ids.homeMaterial,
    ids.liveWith
    //ids.homeAge Currently not used
];

export default class Household extends React.Component {
    static propTypes = {
        questions: array.isRequired
    }
	render() {
        const questions = sortAndFilterAndCreateQuestions('household-home', QUESTION_ORDER, this.props.questions);

		return (
            <div>
                <p className="footprint-form-sub-header">Your home is one of the largest CO<sub>2</sub> costs in your life.  Answering the following questions will let you discover exactly how much.</p>
                { questions }
            </div>
		);
	}
};



