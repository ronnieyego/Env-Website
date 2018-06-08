import React from "react";
import { array } from 'prop-types';

import { sortAndFilterQuestions } from '../../../utils/question-utils';
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
        console.log(this.props.questions);
        const questions = sortAndFilterQuestions('transportation', QUESTION_ORDER, this.props.questions);

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
            <h3 className="footprint-form-header">Transportation</h3>
                <div>
                    <p className="footprint-form-sub-header">GIVE ME YOUR DATA</p>
                    { questionComponents }
                </div>
            </div>
		);
	}
};



