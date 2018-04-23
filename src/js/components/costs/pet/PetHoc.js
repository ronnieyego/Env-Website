import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ids from '../../../utils/ids/index';
import { getLbFoodFromWeight, foodPerDayByAnimal, petFoodCo2, petQuestions, lifeExpectancy, turtleTank } from './pet-data';
import Pet from './Pet';

import { utilityEmissionsPerState } from '../../../utils/utils-data/state-energy-and-emissions';
import { getAnswerFromId, getQuestionFromId } from '../../../utils/footprint/get-question-utils';

@connect((store, props) => {
	return {
        questions: store.costsForms.questions,
        userState: store.userInfo.userState
    };
})
export default class PetHoc extends React.Component {

    getDogCo2(questions) {
        const petType = getAnswerFromId(questions, ids.petType);
        const petWeight = getAnswerFromId(questions, ids.petWeight);
        const foodPerDay = getLbFoodFromWeight(petWeight);
        const foodQuality = getAnswerFromId(questions, ids.petFood);
        const co2PerPoundOfFood = petFoodCo2['Dry'][foodQuality].co2;
        let petLifeExpectancy = lifeExpectancy[petType][petWeight];
        const co2PerLife = foodPerDay * co2PerPoundOfFood * petLifeExpectancy * 365;
        return Math.round(co2PerLife);
    }

    getCatCo2(questions) {
        const foodQuality = getAnswerFromId(questions, ids.petFood);
        const wetOrDry = getAnswerFromId(questions, ids.catFoodType);
        const petLifeExpectancy = lifeExpectancy['Cat'];
        const co2PerPoundOfFood = petFoodCo2[wetOrDry][foodQuality].co2;
        const foodPerDay = foodPerDayByAnimal['Cat'];
        const co2PerLife = foodPerDay * co2PerPoundOfFood * petLifeExpectancy * 365;

        return Math.round(co2PerLife);
    }

    getHamsterCo2(questions) {
        const petLifeExpectancy = lifeExpectancy['Hamster'];
        const co2PerPoundOfFood = petFoodCo2['Hamster'];
        const foodPerDay = foodPerDayByAnimal['Hamster'];
        const co2PerLife = foodPerDay * co2PerPoundOfFood * petLifeExpectancy * 365;

        return Math.round(co2PerLife);
    }

    getGeckoCo2(questions) {
        const petLifeExpectancy = lifeExpectancy['Gecko'];
        const co2PerPoundOfFood = petFoodCo2['Gecko'];
        const foodPerDay = foodPerDayByAnimal['Gecko'];
        const lifeTimeFoodCo2 = foodPerDay * co2PerPoundOfFood * petLifeExpectancy * 365;
        const heatingLamp = getAnswerFromId(questions, ids.petHeatingLamp);
        const hasHeatingLamp = heatingLamp === 'Yes' ? true : false;
        const geckoHeatingWattage = heatingLamp === 'Yes' ? turtleTank['10 Gallons']['heating'] : 0;
        const kwhPerDay = geckoHeatingWattage * 24 / 1000;
        const dailyElectricity = kwhPerDay * utilityEmissionsPerState[this.props.userState];

        const co2PerLife = lifeTimeFoodCo2 + (dailyElectricity * petLifeExpectancy * 365);

        return Math.round(co2PerLife);
    }

    getTurtleCo2(questions) {
        const petLifeExpectancy = lifeExpectancy['Turtle'];
        const foodPerDay = foodPerDayByAnimal['Turtle'];
        const co2PerPoundOfFood = petFoodCo2['Turtle'];
        const tankSize = getAnswerFromId(questions, ids.turtleTankSize);
        const heatingLamp = getAnswerFromId(questions, ids.petHeatingLamp);
        const hasHeatingLamp = heatingLamp === 'Yes' ? true : false;
        let turtleTankWattage = turtleTank[tankSize]['filter']
        turtleTankWattage = hasHeatingLamp ? turtleTankWattage + turtleTank[tankSize]['heating'] : turtleTankWattage;
        const kwhPerDay = turtleTankWattage * 24 / 1000;
        const dailyElectricity = kwhPerDay * utilityEmissionsPerState[this.props.userState];
        const daysAlive = petLifeExpectancy * 365;
        const foodCo2PerLife = foodPerDay * co2PerPoundOfFood * daysAlive;
        const electricityCo2 = dailyElectricity * daysAlive;
        
        return Math.round(foodCo2PerLife + electricityCo2);
    }

    getCo2(questions) {
        const petType = getAnswerFromId(questions, ids.petType);
        let questionsToRemove = [];
        let co2PerLife;
        if(petType === 'Dog') {
            questionsToRemove.push(ids.catFoodType, ids.turtleTankSize, ids.petHeatingLamp, ids.userState);
            co2PerLife = this.getDogCo2(questions);
        } else if(petType === 'Cat') {
            questionsToRemove.push(ids.petWeight, ids.turtleTankSize, ids.petHeatingLamp, ids.userState);
            co2PerLife = this.getCatCo2(questions);
        } else if(petType === 'Hamster') {
            questionsToRemove.push(ids.petFood, ids.catFoodType, ids.petWeight, ids.turtleTankSize, ids.petHeatingLamp, ids.userState);
            co2PerLife = this.getHamsterCo2(questions);
        } else if(petType === 'Turtle') {
            questionsToRemove.push(ids.petWeight, ids.catFoodType, ids.petFood);
            co2PerLife = this.getTurtleCo2(questions);
        } else if(petType === 'Gecko') {
            questionsToRemove.push(ids.petFood, ids.catFoodType, ids.petWeight, ids.turtleTankSize);
            co2PerLife = this.getGeckoCo2(questions);
        } 
        return { questionsToRemove, co2PerLife };
    }

	render() {
        let questions = this.props.questions.filter(question => { 
            const forms = question['forms'];
            const index = forms.indexOf('pet');
            return index !== -1 && !question.hidden; 
        });
        
        const { questionsToRemove, co2PerLife } = this.getCo2(questions);
        const petType = getAnswerFromId(questions, ids.petType);

        questions = questions.filter(question => {
            return questionsToRemove.indexOf(question.id) === -1;
        });

		return (
            <Pet
                dispatch={this.props.dispatch}    
                questions={questions}
                totalCo2={co2PerLife}
                petType={petType}
             />
		);
	}
}


