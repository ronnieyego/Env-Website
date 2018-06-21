import React from "react";
import { array } from 'prop-types';
import { connect } from 'react-redux';

import { sortAndFilterQuestions } from '../../../utils/question-utils';
import Question from '../../questions/QuestionHoc';
import ids from '../../../utils/ids/index';

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
	render() {
        const questions = sortAndFilterQuestions('food', QUESTION_ORDER, this.props.questions);

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



