import React from "react";
import { array } from 'prop-types';
import { connect } from 'react-redux';

import { sortAndFilterQuestions } from '../../../utils/question-utils';
import { renderQuestions, filterQuestions } from './utils';
import Question from '../../questions/QuestionHoc';
import ids from '../../../utils/ids/index';
import { getAnswerFromId, getAnswerIndex, getQuestionFromId } from '../../questions/utils';

import { foodAnswerServings, servingFacts } from '../data/food';

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

const AVERAGE_CALORIES = 2000;

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

    getServings(questions) {
        
        const caloriesA = getAnswerFromId(questions, ids.calories);
        const multiplier = Math.round(caloriesA/AVERAGE_CALORIES * 10)/10;

        const beefA = getAnswerFromId(questions, ids.beefFrequency);
        const beefServings = foodAnswerServings.beef[beefA];
        const chickenA = getAnswerFromId(questions, ids.chickenFrequency);
        const chickenServings = foodAnswerServings.chicken[chickenA];
        const porkA = getAnswerFromId(questions, ids.porkFrequency);
        const porkServings = foodAnswerServings.pork[porkA];
        const seafoodA = getAnswerFromId(questions, ids.seafoodFrequency);
        const seafoodServings = foodAnswerServings.seafood[seafoodA];
        const grainA = getAnswerFromId(questions, ids.grainsFrequency);
        const grainServings = foodAnswerServings.grain[grainA];
        const fruitA = getAnswerFromId(questions, ids.fruitsFrequency);
        const fruitServings = foodAnswerServings.fruits[fruitA];
        const vegetableA = getAnswerFromId(questions, ids.vegetablesFrequency);
        const vegetableServings = foodAnswerServings.vegetables[vegetableA];
        const dairyA = getAnswerFromId(questions, ids.dairyFrequency);
        const dairyServings = foodAnswerServings.dairy[dairyA];
        const cheeseA = getAnswerFromId(questions, ids.cheeseFrequency);
        const cheeseServings = foodAnswerServings.cheese[cheeseA];
        const junkFoodA = getAnswerFromId(questions, ids.junkFoodFrequency);
        const junkFoodServings = foodAnswerServings.junkFood[junkFoodA];

        const beefCalories = servingFacts.beef.calories * beefServings;
        const chickenCalories = servingFacts.chicken.calories * chickenServings;
        const porkCalories = servingFacts.pork.calories * porkServings;
        const seafoodCalories = servingFacts.seafood.calories * seafoodServings;
        const grainCalories = servingFacts.grain.calories * grainServings;
        const fruitCalories = servingFacts.fruits.calories * fruitServings;
        const vegetableCalories = servingFacts.vegetables.calories * vegetableServings;
        const dairyCalories = servingFacts.dairy.calories * dairyServings;
        const cheeseCalories = servingFacts.cheese.calories * cheeseServings;
        const junkFoodCalories = servingFacts.junkFood.calories * junkFoodServings;

        const totalCalories = beefCalories + chickenCalories + porkCalories + seafoodCalories + grainCalories + fruitCalories + vegetableCalories + dairyCalories + cheeseCalories + junkFoodCalories;
        
        // All options should lead to ~2000 calorie diet.  I then adjust based on your stated diet.
        const ratioError = Math.round(AVERAGE_CALORIES / totalCalories * 100)/100;

        const beefCaloriesAdjusted = Math.round(beefCalories * ratioError);
        const chickenCaloriesAdjusted = Math.round(chickenCalories * ratioError);
        const porkCaloriesAdjusted = Math.round(porkCalories * ratioError);
        const seafoodCaloriesAdjusted = Math.round(seafoodCalories * ratioError);
        const grainCaloriesAdjusted = Math.round(grainCalories * ratioError);
        const fruitCaloriesAdjusted = Math.round(fruitCalories * ratioError);
        const vegetableCaloriesAdjusted = Math.round(vegetableCalories * ratioError);
        const dairyCaloriesAdjusted = Math.round(dairyCalories * ratioError);
        const cheeseCaloriesAdjusted = Math.round(cheeseCalories * ratioError);
        const junkFoodCaloriesAdjusted = Math.round(junkFoodCalories * ratioError);

        const totalCaloriesAdjusted = beefCaloriesAdjusted + chickenCaloriesAdjusted + porkCaloriesAdjusted + seafoodCaloriesAdjusted + grainCaloriesAdjusted + fruitCaloriesAdjusted + vegetableCaloriesAdjusted + dairyCaloriesAdjusted + cheeseCaloriesAdjusted + junkFoodCaloriesAdjusted;

        const beefServingsAdjusted = Math.round(beefServings * ratioError * 10)/10;
        const chickenServingsAdjusted = Math.round(chickenServings * ratioError * 10)/10;
        const porkServingsAdjusted = Math.round(porkServings * ratioError * 10)/10;
        const seafoodServingsAdjusted = Math.round(seafoodServings * ratioError * 10)/10;
        const grainServingsAdjusted = Math.round(grainServings * ratioError * 10)/10;
        const fruitServingsAdjusted = Math.round(fruitServings * ratioError * 10)/10;
        const vegetableServingsAdjusted = Math.round(vegetableServings * ratioError * 10)/10;
        const dairyServingsAdjusted = Math.round(dairyServings * ratioError * 10)/10;
        const cheeseServingsAdjusted = Math.round(cheeseServings * ratioError * 10)/10;
        const junkFoodServingsAdjusted = Math.round(junkFoodServings * ratioError * 10)/10;


        console.log('Total CALORIES before and adjusted:', totalCalories, totalCaloriesAdjusted);
        console.log('Ratio Error:', ratioError);

        return { 
            beefServingsAdjusted,
            chickenServingsAdjusted,
            porkServingsAdjusted,
            seafoodServingsAdjusted,
            grainServingsAdjusted,
            fruitServingsAdjusted,
            vegetableServingsAdjusted,
            dairyServingsAdjusted,
            cheeseServingsAdjusted,
            junkFoodServingsAdjusted
        };
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



