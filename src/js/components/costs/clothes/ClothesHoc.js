import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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
            pantsMaterial: 'Its a mix',
            shorts: averageProfile.shorts,
            shoes: averageProfile.shoes,
            shoeType: 'Its a mix of shoes',
            socksUndies: averageProfile.socksUndies,
            accessories: averageProfile.accessories,
            gender: averageGender,
            size: averageSize
        }

        const totalCo2Payload = {
            shirts: getAnswerFromId(questions, 1008) || 0,
            jackets: getAnswerFromId(questions, 1009) || 0,
            shirtMaterial: getAnswerFromId(questions, 1011) || 'Cotton',
            pants: getAnswerFromId(questions, 1010) || 0,
            pantsMaterial: getAnswerFromId(questions, 1018) || 'Mostly demin',
            shorts: getAnswerFromId(questions, 1012) || 0,
            shoes: getAnswerFromId(questions, 1013) || 0,
            shoeType: getAnswerFromId(questions, 1014) || 'Boots',
            socksUndies: getAnswerFromId(questions, 1015) || 0,
            accessories: getAnswerFromId(questions, 1016) || 0,
            gender: getAnswerFromId(questions, 1017) || 'Female',
            size: getAnswerFromId(questions, 1007) || 'Medium',
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


