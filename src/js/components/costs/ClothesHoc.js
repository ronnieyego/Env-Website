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


import { getAnswerFromId, getQuestionFromId } from '../../utils/footprint/get-question-utils';


@connect((store, props) => {
	return {
        questions: store.costsForms.questions
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

    getShirtCo2(questions) {
        const shirts = getAnswerFromId(questions, 1008) || 0;
        const material = getAnswerFromId(questions, 1011) || 'Cotton';
        const shirtWeight = weightOfClothes.shirt;
        const co2PerShirt = co2PerPoundOfFabric[material] * shirtWeight;
        const totalCo2 = co2PerShirt * shirts;
        return totalCo2;
    }

    getJacketCo2(questions) {
        const jackets = getAnswerFromId(questions, 1009) || 0;
        const material = getAnswerFromId(questions, 1011) || 'Cotton';
        const jacketWeight = weightOfClothes.jacket;
        const co2PerJacket = co2PerPoundOfFabric[material] * jacketWeight;
        const totalCo2 = co2PerJacket * jackets;
        return totalCo2;
    }

    getPantsCo2(questions) {
        const pants = getAnswerFromId(questions, 1010) || 0;
        const material = getAnswerFromId(questions, 1018) || 'Mostly demin';
        const pantsWeight = pantsMaterial[material].weight;
        const pantsCo2 = pantsMaterial[material].co2;
        const co2PerPant = pantsCo2 * pantsWeight;
        const totalPantCo2 = co2PerPant * pants;
        return totalPantCo2;
    }

    getShortsCo2(questions) {
        const shorts = getAnswerFromId(questions, 1012) || 0;
        const material = getAnswerFromId(questions, 1018) || 'Mostly demin';
        const shortWeight = weightOfClothes.shorts;
        const co2PerShort = pantsMaterial[material].co2 * shortWeight;
        const totalShortCo2 = co2PerShort * shorts;
        return totalShortCo2;
    }

    getShoeCo2(questions) {
        const shoes = getAnswerFromId(questions, 1013) || 0;
        const shoeType = getAnswerFromId(questions, 1014) || 'Boots';
        const shoeWeight = weightOfClothes[shoeType];
        const leatherWeight = (shoeWeight * (1-percentShoeIsRubber));
        const rubberWeight = (shoeWeight * percentShoeIsRubber);
        const co2PerShoe = (co2PerPoundOfFabric.Leather * leatherWeight) + (co2PerPoundOfFabric.Rubber * rubberWeight);
        const totalCo2 = co2PerShoe * shoes;
        return totalCo2;
    }

    getSocksUnderwearCo2(questions) {
        const socksUndies = getAnswerFromId(questions, 1015) || 0;
        // They have the same weight
        const socksUndiesWeight = weightOfClothes.socks;
        const co2PerSockUndie = socksUndiesWeight * co2PerPoundOfFabric.Cotton;
        const totalCo2 = co2PerSockUndie * socksUndies;
        return totalCo2;
    }

    getAccessoriesCo2(questions) {
        const accessories = getAnswerFromId(questions, 1016) || 0;
        const accessoriesWeight = weightOfClothes.scarf //just guessing here.  Is pretty middle of the road
        const co2PerAccessory = accessoriesWeight * co2PerPoundOfFabric.Cotton;
        const totalCo2 = co2PerAccessory * accessories;
        return totalCo2;
    }

    // This is size and gender
    getMultiplier(questions) {
        const gender = getAnswerFromId(questions, 1017) || 'Female';
        const genderMultiplier = gender === 'Male' ? 1 : womenWeightDiff;
        const size = getAnswerFromId(questions, 1007) || 'Medium';
        const sizeMultiplier = sizeDifference[size];
        const multiplier = genderMultiplier * sizeMultiplier;
        return multiplier;
    }

    getTotalCo2(questions) {
        const multiplier = this.getMultiplier(questions);
        const shirts = Math.round(this.getShirtCo2(questions) * multiplier);
        const jackets = Math.round(this.getJacketCo2(questions) * multiplier);
        const pants = Math.round(this.getPantsCo2(questions) * multiplier);
        const shorts = Math.round(this.getShortsCo2(questions) * multiplier);
        const socksUndies = Math.round(this.getSocksUnderwearCo2(questions) * multiplier);
        const accessories = Math.round(this.getAccessoriesCo2(questions) * multiplier);
        const shoes = Math.round(this.getShoeCo2(questions) * multiplier);
        const total = shirts + jackets + pants + shorts + socksUndies + accessories + shoes;
        
        return { total, shirts, jackets, pants, shorts, socksUndies, accessories, shoes }
    }

    
	render() {
        const questions = _.filter(this.props.questions, question => { 
            const forms = question['forms'];
            const index = forms.indexOf('clothes');
            return index !== -1 && !question.hidden; 
        });

        const co2 = this.getTotalCo2(questions);

		return (
            <Clothes
                dispatch={this.props.dispatch}    
                questions={questions}
                co2={co2}
             />
		);
	}
}


