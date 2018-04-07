import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ids from '../../../utils/ids/index';
import { co2PerBurnerHour, co2PerChimney, foodCo2 } from './bbq-data';
import Bbq from './Bbq';

import { utilityEmissionsPerState }from '../../../utils/utils-data/state-energy-and-emissions';
import { getAnswerFromId, getQuestionFromId } from '../../../utils/footprint/get-question-utils';

@connect((store, props) => {
	return {
        questions: store.costsForms.questions,
        userState: store.userInfo.userState
    };
})
export default class BbqHoc extends React.Component {

    getFoodCo2(questions) {
        const chicken = getAnswerFromId(questions, ids.poundsChicken);
        const beef = getAnswerFromId(questions, ids.poundsBeef);
        const pork = getAnswerFromId(questions, ids.poundsPork);
        const vegetables = getAnswerFromId(questions, ids.poundsVegetables);
        const chickenCo2 = chicken * foodCo2.chicken;
        const porkCo2 = pork * foodCo2.pork;
        const beefCo2 = beef * foodCo2.beef;
        const vegetablesCo2 = vegetables * foodCo2.vegetables;
        const totalFoodCo2 = chickenCo2 + porkCo2 + beefCo2 + vegetablesCo2;
        return { totalFoodCo2, chickenCo2, porkCo2, beefCo2, vegetablesCo2};
    }

    getBbqCo2AndQuestions(questions) {
        let grillCo2;
        let questionsToRemove = [];
        const grillType = getAnswerFromId(questions, ids.grillType);
        if (grillType === 'Charcoal') {
            const chimneys = getAnswerFromId(questions, ids.numberChimneys);
            grillCo2 = chimneys * co2PerChimney;
            questionsToRemove = [ids.numberBurners, ids.hoursGrilling];
        } else {
            questionsToRemove = [ids.numberChimneys];
            const burners = getAnswerFromId(questions, ids.numberBurners);
            const hours = getAnswerFromId(questions, ids.hoursGrilling);
            if (grillType === 'Propane') {
                grillCo2 = burners * hours * co2PerBurnerHour;
            } else if(grillType === 'Electric') {
                const electricalEmissions = utilityEmissionsPerState[this.props.userState];
                grillCo2 = burners * hours * electricalEmissions;
            } else {
                throw new Error('BBQ type not found');
            }
        }
        grillCo2 = Math.round(grillCo2 * 10)/10;
        const totalFoodCo2 = this.getFoodCo2(questions);
        const totalCo2 = grillCo2 + totalFoodCo2.totalFoodCo2;
        return { totalCo2, questionsToRemove, grillCo2, ...totalFoodCo2 };

    }

	render() {
        let questions = _.filter(this.props.questions, question => { 
            const forms = question['forms'];
            const index = forms.indexOf('bbq');
            return index !== -1 && !question.hidden; 
        });
        
        const {totalCo2, questionsToRemove, grillCo2, totalFoodCo2, chickenCo2, porkCo2, beefCo2, vegetablesCo2} = this.getBbqCo2AndQuestions(questions);
        questions = _.filter(questions, question => {
            return questionsToRemove.indexOf(question.id) === -1;
        });

        const graphData = [
            {name: 'Grilling', BBQ: grillCo2 || 0},
            {name: 'Beef', BBQ: beefCo2 || 0},
            {name: 'Chicken', BBQ: chickenCo2 || 0},
            {name: 'Pork', BBQ: porkCo2 || 0},
            {name: 'Vegetables', BBQ: vegetablesCo2 || 0}
        ]
		return (
            <Bbq
                dispatch={this.props.dispatch}    
                questions={questions}
                totalCo2={totalCo2}
                totalFoodCo2={totalFoodCo2}
                grillCo2={grillCo2}
                graphData={graphData}
             />
		);
	}
}


