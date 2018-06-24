import React from "react";
import { array } from 'prop-types';
import { connect } from 'react-redux';

import { sortAndFilterQuestions } from '../../../utils/question-utils';
import { renderQuestions, filterQuestions } from './utils';
import Question from '../../questions/QuestionHoc';
import ids from '../../../utils/ids/index';
import { getAnswerFromId, getAnswerIndex, getQuestionFromId } from '../../questions/utils';
import BarChart from '../../bar-chart/BarChartHoc';
import getFoodResults from '../calculations/food';


const QUESTION_ORDER = [
    ids.calories,
    ids.isVegan,
    ids.isVegetarian,
    ids.beefFrequency,
    ids.chickenFrequency,
    ids.porkFrequency,
    ids.seafoodFrequency,
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
            filterIds.push(ids.beefFrequency, ids.chickenFrequency, ids.porkFrequency, ids.seafoodFrequency);
            if( isVegan ) {
                filterIds.push(ids.dairyFrequency, ids.cheeseFrequency, ids.isVegetarian);
            }
        } else {
            filterIds = []; // Probably shouldn't clear but rather remove keys explicitly
        }

        return filterIds
    }

    getServings(questions) {
        const calories = getAnswerFromId(questions, ids.calories);
        const beef = getAnswerFromId(questions, ids.beefFrequency);
        const chicken = getAnswerFromId(questions, ids.chickenFrequency);
        const pork = getAnswerFromId(questions, ids.porkFrequency);
        const seafood = getAnswerFromId(questions, ids.seafoodFrequency);
        const grain = getAnswerFromId(questions, ids.grainsFrequency);
        const fruit = getAnswerFromId(questions, ids.fruitsFrequency);
        const vegetables = getAnswerFromId(questions, ids.vegetablesFrequency);
        const dairy = getAnswerFromId(questions, ids.dairyFrequency);
        const cheese = getAnswerFromId(questions, ids.cheeseFrequency);
        const junkFood = getAnswerFromId(questions, ids.junkFoodFrequency);

        return getFoodResults({calories, beef, chicken, pork, seafood, grain, fruit, vegetables, dairy, cheese, junkFood });
    }

	render() {
        let questions = sortAndFilterQuestions('food', QUESTION_ORDER, this.props.questions);
        this.getServings(questions);
        const filterIds = this.getFilterIds(questions);
        questions = filterQuestions(questions, filterIds);

        const questionComponents = renderQuestions(questions);

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



