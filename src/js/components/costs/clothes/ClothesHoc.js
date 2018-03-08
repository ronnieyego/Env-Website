import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ids from '../../../utils/ids/index';
import { 
    clothesQuestions,
    co2PerPoundOfFabric,
    pantsMaterial,
    percentShoeIsRubber,
    sizeDifference,
    weightOfClothes,
    womenWeightDiff 
} from './clothes-data';
import Clothes from './Clothes';

import { getTotalCo2 } from './clothes-calculations';
import { getAnswerFromId, getQuestionFromId } from '../../../utils/footprint/get-question-utils';
import { americanClothing } from '../../../utils/utils-data/american-averages';


@connect((store, props) => {
	return {
        questions: store.costsForms.questions,
        averageAmericanGender: store.footprintFormAnswers.averageAmericanGender,
        averageAmericanShoppingHabit: store.footprintFormAnswers.averageAmericanShoppingHabit,
        averageAmericanSize: store.footprintFormAnswers.averageAmericanSize
    };
})
export default class ClothesHoc extends React.Component {

    componentDidMount() {
        const questions = _.filter(this.props.questions, question => { question['forms'].indexOf('clothes') !== -1 });
        if(questions.length < clothesQuestions.length) {
            const questionsToAdd = clothesQuestions.filter(question => {
                const isNotQuestionInSet = getQuestionFromId(questions, question.id) ? false : true;
                return isNotQuestionInSet;
            });
            this.props.dispatch({type: 'ADD_QUESTIONS_TO_COST_QUESTIONS', payload: questionsToAdd});
        }
    }

    getCompareGraphData(you, aa) {
        return [
                {name: 'Shirts', You: you.shirtsCo2 || 0, 'Average American': aa.shirtsCo2},
                {name: 'Jackets', You: you.jacketsCo2 || 0, 'Average American': aa.jacketsCo2},
                {name: 'Pants', You: you.pantsCo2 || 0, 'Average American': aa.pantsCo2 || 0},
                {name: 'Shorts', You: you.shortsCo2 || 0, 'Average American': aa.shortsCo2 || 0},
                {name: 'Shoes', You: you.shoesCo2 || 0, 'Average American': aa.shoesCo2 || 0},
                {name: 'Socks', You: you.socksUndiesCo2 || 0, 'Average American': aa.socksUndiesCo2 || 0},
                {name: 'Accessories', You: you.accessoriesCo2 || 0, 'Average American': aa.accessoriesCo2 || 0}
            ];
    }

    updateHabitDropdown(event, index, value) {
        this.props.dispatch({type: 'UPDATE_AVERAGE_AMERICAN_SHOPPING_HABIT', payload: value});
    }
    updateSizeDropdown(event, index, value) {
        this.props.dispatch({type: 'UPDATE_AVERAGE_AMERICAN_SIZE', payload: value});
    }

    updateGenderDropdown(event, index, value) {
        this.props.dispatch({type: 'UPDATE_AVERAGE_AMERICAN_GENDER', payload: value});
    }
    
	render() {
        const questions = _.filter(this.props.questions, question => { 
            const forms = question['forms'];
            const index = forms.indexOf('clothes');
            return index !== -1 && !question.hidden; 
        });

        const averageGender = this.props.averageAmericanGender;
        const habit = this.props.averageAmericanShoppingHabit;
        const averageSize = this.props.averageAmericanSize;
        const averageProfile = americanClothing[habit][averageGender];
        const averagePayload = {
            shirts: averageProfile.shirts,
            jackets: averageProfile.jackets,
            shirtMaterial: 'Cotton',
            pants: averageProfile.pants,
            pantsMaterial: 'Mostly demin',
            shorts: averageProfile.shorts,
            shoes: averageProfile.shoes,
            shoeType: 'Its a mix of shoes',
            socksUndies: averageProfile.socksUndies,
            accessories: averageProfile.accessories,
            gender: averageGender,
            size: averageSize
        }

        const totalCo2Payload = {
            shirts: getAnswerFromId(questions, ids.shirtsOwn) || 0,
            jackets: getAnswerFromId(questions, ids.jacketsOwn) || 0,
            shirtMaterial: getAnswerFromId(questions, ids.shirtPrimaryMaterial) || 'Cotton',
            pants: getAnswerFromId(questions, ids.pantsOwn) || 0,
            pantsMaterial: getAnswerFromId(questions, ids.shortsPrimaryMaterial) || 'Mostly demin',
            shorts: getAnswerFromId(questions, ids.shortsOwn) || 0,
            shoes: getAnswerFromId(questions, ids.shoesOwn) || 0,
            shoeType: getAnswerFromId(questions, ids.shoeType) || 'Boots',
            socksUndies: getAnswerFromId(questions, ids.socksOwn) || 0,
            accessories: getAnswerFromId(questions, ids.accessoriesOwn) || 0,
            gender: getAnswerFromId(questions, ids.yourGender) || 'Female',
            size: getAnswerFromId(questions, ids.clothesSize) || 'Medium',
        }
         

        const co2 = getTotalCo2(totalCo2Payload);
        const averageAmerican = getTotalCo2(averagePayload);
        averageAmerican.gender = averageGender;
        averageAmerican.size = averageSize; 
        averageAmerican.habit = habit;

        const graphData = this.getCompareGraphData(co2, averageAmerican);

		return (
            <Clothes
                dispatch={this.props.dispatch}    
                questions={questions}
                averageAmerican={averageAmerican}
                co2={co2}
                graphData={graphData}
                habit={habit}
                size={averageSize}
                gender={averageGender}
                updateHabitDropdown={this.updateHabitDropdown}
                updateSizeDropdown={this.updateSizeDropdown}
                updateGenderDropdown={this.updateGenderDropdown}
             />
		);
	}
}


