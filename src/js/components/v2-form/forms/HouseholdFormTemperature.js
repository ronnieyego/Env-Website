import React from "react";
import { array } from 'prop-types';

import { sortAndFilterAndCreateQuestions } from '../../../utils/question-utils';
import Question from '../../questions/QuestionHoc';
import ids from '../../../utils/ids/index';

const QUESTION_ORDER = [
    ids.summerTemp,
    ids.heatingSystem,
    ids.usesFan,
    ids.winterTemp,
    ids.coolingSystem,
    ids.usesPortableHeater
];

export default class HouseholdFormTemperature extends React.Component {
    static propTypes = {
        questions: array.isRequired
    }
	render() {
        const questions = sortAndFilterAndCreateQuestions('household-temperature', QUESTION_ORDER, this.props.questions);

		return (
            <div>
                <div>
                    <p className="footprint-form-sub-header">The following questions will help caluclate your utility CO<sub>2</sub>.</p>
                    { questions }
                </div>
            </div>
		);
	}
};



