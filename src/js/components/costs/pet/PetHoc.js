import React from "react";
import { connect } from 'react-redux';

import ids from '../../../utils/ids/index';
import { co2PerPoundOfPoop, petPoopWeight, getLbFoodFromWeight, foodPerDayByAnimal, petFoodCo2, lifeExpectancy, turtleTank } from './pet-data';
import Pet from './Pet';

import { utilityEmissionsPerState } from '../../../utils/utils-data/state-energy-and-emissions';
import { getAnswerFromId } from '../../../utils/footprint/get-question-utils';

@connect((store, props) => {
	return {
        questions: store.questions.questions,
        userState: store.userInfo.userState
    };
})
export default class PetHoc extends React.Component {

    getDogCo2(questions) {
        const petType = getAnswerFromId(questions, ids.petType);
        const petWeight = getAnswerFromId(questions, ids.petWeight);
        const foodPerDay = getLbFoodFromWeight(petWeight);
        const foodQuality = getAnswerFromId(questions, ids.petFood);
        const petLifeExpectancy = lifeExpectancy[petType][petWeight];
        const co2PerPoundOfFood = petFoodCo2['Dry'][foodQuality].co2;
        const co2FoodPerDay = foodPerDay * co2PerPoundOfFood;
        const co2FoodPerLife = Math.round(co2FoodPerDay * petLifeExpectancy * 365);
        
        const dogPoopWeight = petPoopWeight.dog(petWeight);
        const dogPoopCo2PerDay = dogPoopWeight * co2PerPoundOfPoop;
        const poopCo2PerLife = Math.round(dogPoopCo2PerDay * petLifeExpectancy * 365);

        const co2PerLife = co2FoodPerLife + poopCo2PerLife;
        return { co2PerLife, poopCo2PerLife, co2FoodPerLife };
    }

    getCatCo2(questions) {
        const foodQuality = getAnswerFromId(questions, ids.petFood);
        const wetOrDry = getAnswerFromId(questions, ids.catFoodType);
        const petLifeExpectancy = lifeExpectancy['Cat'];
        const co2PerPoundOfFood = petFoodCo2[wetOrDry][foodQuality].co2;
        const foodPerDay = foodPerDayByAnimal['Cat'];
        const co2FoodPerLife = Math.round(foodPerDay * co2PerPoundOfFood * petLifeExpectancy * 365);

        const poopWeight = petPoopWeight.cat('0-10 pounds');
        const poopCo2PerDay = poopWeight * co2PerPoundOfPoop;
        const poopCo2PerLife = Math.round(poopCo2PerDay * petLifeExpectancy * 365);

        const co2PerLife = co2FoodPerLife + poopCo2PerLife;

        return { co2PerLife, poopCo2PerLife, co2FoodPerLife };
    }

    getHamsterCo2() {
        const petLifeExpectancy = lifeExpectancy['Hamster'];
        const co2PerPoundOfFood = petFoodCo2['Hamster'];
        const foodPerDay = foodPerDayByAnimal['Hamster'];
        const co2FoodPerLife = Math.round(foodPerDay * co2PerPoundOfFood * petLifeExpectancy * 365);

        const poopWeight = petPoopWeight.hamster;
        const poopCo2PerDay = poopWeight * co2PerPoundOfPoop;
        const poopCo2PerLife = Math.round(poopCo2PerDay * petLifeExpectancy * 365);

        const co2PerLife = co2FoodPerLife + poopCo2PerLife;

        return { co2PerLife, poopCo2PerLife, co2FoodPerLife };
    }

    getGeckoCo2(questions) {
        const petLifeExpectancy = lifeExpectancy['Gecko'];
        const co2PerPoundOfFood = petFoodCo2['Gecko'];
        const foodPerDay = foodPerDayByAnimal['Gecko'];
        const co2FoodPerLife = Math.round(foodPerDay * co2PerPoundOfFood * petLifeExpectancy * 365);
        const heatingLamp = getAnswerFromId(questions, ids.petHeatingLamp);
        const geckoHeatingWattage = heatingLamp === 'Yes' ? turtleTank['10 Gallons']['heating'] : 0;
        const kwhPerDay = geckoHeatingWattage * 24 / 1000;
        const dailyElectricity = kwhPerDay * utilityEmissionsPerState[this.props.userState];
        const lifetimeElectricityCo2 = Math.round(dailyElectricity * petLifeExpectancy * 365);

        const poopWeight = petPoopWeight.gecko;
        const poopCo2PerDay = poopWeight * co2PerPoundOfPoop;
        const poopCo2PerLife = Math.round(poopCo2PerDay * petLifeExpectancy * 365);

        const co2PerLife = co2FoodPerLife + poopCo2PerLife + lifetimeElectricityCo2;

        return { co2PerLife, poopCo2PerLife, co2FoodPerLife, lifetimeElectricityCo2 };
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
        const co2FoodPerLife = Math.round(foodPerDay * co2PerPoundOfFood * daysAlive);
        const lifetimeElectricityCo2 = Math.round(dailyElectricity * daysAlive);

        const poopWeight = petPoopWeight.turtle;
        const poopCo2PerDay = poopWeight * co2PerPoundOfPoop;
        const poopCo2PerLife = Math.round(poopCo2PerDay * petLifeExpectancy * 365);

        const co2PerLife = co2FoodPerLife + poopCo2PerLife + lifetimeElectricityCo2;

        return { co2PerLife, poopCo2PerLife, co2FoodPerLife, lifetimeElectricityCo2 };
    }

    getCo2(questions) {
        const petType = getAnswerFromId(questions, ids.petType);
        let questionsToRemove = [];
        if(petType === 'Dog') {
            questionsToRemove.push(ids.catFoodType, ids.turtleTankSize, ids.petHeatingLamp, ids.userState);
            const { co2PerLife, poopCo2PerLife, co2FoodPerLife } = this.getDogCo2(questions);
            return { co2PerLife, poopCo2PerLife, co2FoodPerLife, questionsToRemove };
        } else if(petType === 'Cat') {
            questionsToRemove.push(ids.petWeight, ids.turtleTankSize, ids.petHeatingLamp, ids.userState);
            const { co2PerLife, poopCo2PerLife, co2FoodPerLife } = this.getCatCo2(questions);
            return { co2PerLife, poopCo2PerLife, co2FoodPerLife, questionsToRemove };
        } else if(petType === 'Hamster') {
            questionsToRemove.push(ids.petFood, ids.catFoodType, ids.petWeight, ids.turtleTankSize, ids.petHeatingLamp, ids.userState);
            const { co2PerLife, poopCo2PerLife, co2FoodPerLife } = this.getHamsterCo2(questions);
            return { co2PerLife, poopCo2PerLife, co2FoodPerLife, questionsToRemove };
        } else if(petType === 'Turtle') {
            questionsToRemove.push(ids.petWeight, ids.catFoodType, ids.petFood);
            const { co2PerLife, poopCo2PerLife, co2FoodPerLife, lifetimeElectricityCo2 } = this.getTurtleCo2(questions);
            return { co2PerLife, poopCo2PerLife, co2FoodPerLife, lifetimeElectricityCo2, questionsToRemove };
        } else if(petType === 'Gecko') {
            questionsToRemove.push(ids.petFood, ids.catFoodType, ids.petWeight, ids.turtleTankSize);
            const { co2PerLife, poopCo2PerLife, co2FoodPerLife, lifetimeElectricityCo2 } = this.getGeckoCo2(questions);
            return { co2PerLife, poopCo2PerLife, co2FoodPerLife, lifetimeElectricityCo2, questionsToRemove };
        } else {
            console.log('Error-- Unknown pet type: ', petType);
        }
    }

	render() {
        let questions = this.props.questions.filter(question => { 
            const forms = question['forms'];
            const index = forms.indexOf('pet');
            return index !== -1 && !question.hidden; 
        });
        
        const { questionsToRemove, co2PerLife, poopCo2PerLife, co2FoodPerLife, lifetimeElectricityCo2 } = this.getCo2(questions);
        const petType = getAnswerFromId(questions, ids.petType);
        const co2Breakdown = {
            total: co2PerLife,
            poop: poopCo2PerLife,
            food: co2FoodPerLife,
            electricity: lifetimeElectricityCo2
        };

        questions = questions.filter(question => {
            return questionsToRemove.indexOf(question.id) === -1;
        });

		return (
            <Pet
                dispatch={this.props.dispatch}    
                questions={questions}
                co2Breakdown={co2Breakdown}
                petType={petType}
             />
		);
	}
}


