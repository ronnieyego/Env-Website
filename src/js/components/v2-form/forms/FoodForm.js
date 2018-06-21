import React from "react";
import { array } from 'prop-types';
import { connect } from 'react-redux';

import { sortAndFilterQuestions } from '../../../utils/question-utils';
import { filterQuestions } from './utils';
import Question from '../../questions/QuestionHoc';
import ids from '../../../utils/ids/index';

import { getAnswerFromId } from '../../../utils/footprint/get-question-utils';

const QUESTION_ORDER = [
    ids.isVegan,
    ids.isVegetarian,
    ids.beefFrequency,
    ids.chickenFrequency,
    ids.porkFrequency,
    ids.dairyFrequency,
    ids.cheeseFrequency,
    ids.vegetablesFrequency,
    ids.fruitsFrequency,
    ids.grainsFrequency,
    ids.junkFoodFrequency,
];

export default class HouseholdFormActivities extends React.Component {
    static propTypes = {
        questions: array.isRequired
    }

    getFilterIds(questions) {
        let filterIds = [];
        const isVegan = getAnswerFromId(questions, ids.isVegan);
        const isVegetarian = getAnswerFromId(questions, ids.isVegetarian);

        if( isVegan || isVegetarian ) {
            filterIds.push(ids.beefFrequency, ids.chickenFrequency, ids.porkFrequency);
            if( isVegan ) {
                filterIds.push(ids.dairyFrequency, ids.cheeseFrequency, ids.isVegetarian);
            }
        } else {
            filterIds = []; // Probably shouldn't clear but rather remove keys explicitly
        }

        return filterIds
    }

	render() {
        let questions = sortAndFilterQuestions('food', QUESTION_ORDER, this.props.questions);
        const filterIds = this.getFilterIds(questions);
        questions = filterQuestions(questions, filterIds);

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
                    <p className="footprint-form-sub-header">Food usually accounts for a third of a person's CO<sub>2</sub>.</p>
                    { questionComponents }
                </div>
            </div>
		);
	}
};



