import React from "react";
import { array } from 'prop-types';

import { sortAndFilterQuestions } from '../../../utils/question-utils';
import { renderQuestions, filterQuestions } from './utils';
import { getAnswerFromId } from '../../questions/utils';
import Question from '../../questions/QuestionHoc';
import ids from '../../../utils/ids/index';

const QUESTION_ORDER = [
    ids.homeInsulation,
    ids.summerTemp,
    ids.coolingSystem,
    ids.coolWholeHouse,
    ids.usesFan,
    ids.winterTemp,
    ids.heatingSystem,
    ids.heatWholeHouse,
    ids.usesPortableHeater
];

export default class HouseholdFormTemperature extends React.Component {
    static propTypes = {
        questions: array.isRequired
    }

    getFilterIds(questions) {
        let filterIds = [];
        const heatingType = getAnswerFromId(questions, ids.heatingSystem);
        const coolingType = getAnswerFromId(questions, ids.coolingSystem);

        if( heatingType === 'None' ) {
            filterIds.push(ids.heatWholeHouse);
        } 
        if(coolingType === 'None') {
            filterIds.push(ids.coolWholeHouse);
        } else if (coolingType === 'Lots of Fans') {
            filterIds.push(ids.usesFan);
        }

        return filterIds
    }

	render() {
        let questions = sortAndFilterQuestions('household-temperature', QUESTION_ORDER, this.props.questions);
        const filterIds = this.getFilterIds(questions);
        questions = filterQuestions(questions, filterIds);

        const questionComponents = renderQuestions(questions);
		return (
            <div>
                <div>
                    <p className="footprint-form-sub-header">Heating and cooling usually compromise the majority of household CO<sub>2</sub>.  This form will determine how much.</p>
                    { questionComponents }
                </div>
            </div>
		);
	}
};



