import React from "react";
import { array } from 'prop-types';

import { sortAndFilterQuestions } from '../../../utils/question-utils';
import { renderQuestions, filterQuestions } from './utils';
import { getAnswerFromId } from '../../questions/utils';
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

    getFilterIds(questions) {
        let filterIds = [];
        const doesDrive = getAnswerFromId(questions, ids.doesDrive);
        const doesPublicTransit = getAnswerFromId(questions, ids.doesPublicTransit);

        if( !doesDrive ) {
            filterIds.push(ids.carSize, ids.carRuggedness, ids.carMpg, ids.milesDrivenMonth, ids.carFuel, ids.carpoolFrequency);
        }
        if( !doesPublicTransit ) {
            filterIds.push(ids.milesBusMonth, ids.milesTrainMonth);
        } 

        return filterIds
    }

	render() {
        let questions = sortAndFilterQuestions('transportation', QUESTION_ORDER, this.props.questions);

        const filterIds = this.getFilterIds(questions);
        questions = filterQuestions(questions, filterIds);

        const questionComponents = renderQuestions(questions);

		return (
            <div>
            <h3 className="footprint-form-header">Transportation</h3>
                <div>
                    <p className="footprint-form-sub-header">Transportation usually accounts of a third of a person's footprint.</p>
                    { questionComponents }
                </div>
            </div>
		);
	}
};



