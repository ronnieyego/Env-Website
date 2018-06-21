import React from "react";
import { array } from 'prop-types';

import { sortAndFilterAndCreateQuestions } from '../../../utils/question-utils';
import Question from '../../questions/QuestionHoc';
import ids from '../../../utils/ids/index';

const QUESTION_ORDER = [
    ids.doesDrive,
    ids.carSize,
    ids.carRuggedness,
    ids.carMpg,
    ids.milesDrivenMonth,
    ids.carFuel,
    ids.carpoolFrequency,
    ids.doesPublicTransit,
    ids.milesBusMonth,
    ids.milesTrainMonth,
    ids.milesFlyYear
];

export default class Transportation extends React.Component {
    static propTypes = {
        questions: array.isRequired
    }
	render() {
        const questions = sortAndFilterAndCreateQuestions('transportation', QUESTION_ORDER, this.props.questions);

		return (
            <div>
            <h3 className="footprint-form-header">Transportation</h3>
                <div>
                    <p className="footprint-form-sub-header">Transportation usually accounts of a third of a person's footprint.</p>
                    { questions }
                </div>
            </div>
		);
	}
};



