
import { foodAnswerServings, servingFacts } from '../data/food';
import { convertDailyToMonthly } from './utils';

const AVERAGE_CALORIES = 2000;

export default ({
    calories,
    beef,
    chicken,
    pork,
    seafood,
    grain,
    fruit,
    vegetables,
    dairy,
    cheese,
    junkFood
}) => {
    const multiplier = Math.round(calories/AVERAGE_CALORIES * 10)/10;

    const beefServings = foodAnswerServings.beef[beef];
    const chickenServings = foodAnswerServings.chicken[chicken];
    const porkServings = foodAnswerServings.pork[pork];
    const seafoodServings = foodAnswerServings.seafood[seafood];
    const grainServings = foodAnswerServings.grain[grain];
    const fruitServings = foodAnswerServings.fruit[fruit];
    const vegetableServings = foodAnswerServings.vegetables[vegetables];
    const dairyServings = foodAnswerServings.dairy[dairy];
    const cheeseServings = foodAnswerServings.cheese[cheese];
    const junkFoodServings = foodAnswerServings.junkFood[junkFood];

    const beefCalories = servingFacts.beef.calories * beefServings;
    const chickenCalories = servingFacts.chicken.calories * chickenServings;
    const porkCalories = servingFacts.pork.calories * porkServings;
    const seafoodCalories = servingFacts.seafood.calories * seafoodServings;
    const grainCalories = servingFacts.grain.calories * grainServings;
    const fruitCalories = servingFacts.fruit.calories * fruitServings;
    const vegetableCalories = servingFacts.vegetables.calories * vegetableServings;
    const dairyCalories = servingFacts.dairy.calories * dairyServings;
    const cheeseCalories = servingFacts.cheese.calories * cheeseServings;
    const junkFoodCalories = servingFacts.junkFood.calories * junkFoodServings;

    const totalCalories = beefCalories + chickenCalories + porkCalories + seafoodCalories + grainCalories + fruitCalories + vegetableCalories + dairyCalories + cheeseCalories + junkFoodCalories;

    // All options should lead to ~2000 (AVERAGE_CALORIES) calorie diet.  I then adjust based on your stated diet.
    const ratioError = Math.round(AVERAGE_CALORIES / totalCalories * 100)/100;

    const beefCaloriesAdjusted = Math.round(beefCalories * ratioError * multiplier);
    const chickenCaloriesAdjusted = Math.round(chickenCalories * ratioError * multiplier);
    const porkCaloriesAdjusted = Math.round(porkCalories * ratioError * multiplier);
    const seafoodCaloriesAdjusted = Math.round(seafoodCalories * ratioError * multiplier);
    const grainCaloriesAdjusted = Math.round(grainCalories * ratioError * multiplier);
    const fruitCaloriesAdjusted = Math.round(fruitCalories * ratioError * multiplier);
    const vegetablesCaloriesAdjusted = Math.round(vegetableCalories * ratioError * multiplier);
    const dairyCaloriesAdjusted = Math.round(dairyCalories * ratioError * multiplier);
    const cheeseCaloriesAdjusted = Math.round(cheeseCalories * ratioError * multiplier);
    const junkFoodCaloriesAdjusted = Math.round(junkFoodCalories * ratioError * multiplier);

    const totalCaloriesAdjusted = Math.round(beefCaloriesAdjusted + chickenCaloriesAdjusted + porkCaloriesAdjusted + seafoodCaloriesAdjusted + grainCaloriesAdjusted + fruitCaloriesAdjusted + vegetablesCaloriesAdjusted + dairyCaloriesAdjusted + cheeseCaloriesAdjusted + junkFoodCaloriesAdjusted);

    const beefServingsAdjusted = Math.round(beefServings * ratioError * multiplier * 10)/10;
    const chickenServingsAdjusted = Math.round(chickenServings * ratioError * multiplier * 10)/10;
    const porkServingsAdjusted = Math.round(porkServings * ratioError * multiplier * 10)/10;
    const seafoodServingsAdjusted = Math.round(seafoodServings * ratioError * multiplier * 10)/10;
    const grainServingsAdjusted = Math.round(grainServings * ratioError * multiplier * 10)/10;
    const fruitServingsAdjusted = Math.round(fruitServings * ratioError * multiplier * 10)/10;
    const vegetablesServingsAdjusted = Math.round(vegetableServings * ratioError * multiplier * 10)/10;
    const dairyServingsAdjusted = Math.round(dairyServings * ratioError * multiplier * 10)/10;
    const cheeseServingsAdjusted = Math.round(cheeseServings * ratioError * multiplier * 10)/10;
    const junkFoodServingsAdjusted = Math.round(junkFoodServings * ratioError * multiplier * 10)/10;

    const beefCo2 = Math.round(beefServingsAdjusted * servingFacts.beef.co2 * 10)/10;
    const chickenCo2 = Math.round(chickenServingsAdjusted * servingFacts.chicken.co2 * 10)/10;
    const porkCo2 = Math.round(porkServingsAdjusted * servingFacts.pork.co2 * 10)/10;
    const seafoodCo2 = Math.round(seafoodServingsAdjusted * servingFacts.seafood.co2 * 10)/10;
    const grainCo2 = Math.round(grainServingsAdjusted * servingFacts.grain.co2 * 10)/10;
    const fruitCo2 = Math.round(fruitServingsAdjusted * servingFacts.fruit.co2 * 10)/10;
    const vegetablesCo2 = Math.round(vegetablesServingsAdjusted * servingFacts.vegetables.co2 * 10)/10;
    const dairyCo2 = Math.round(dairyServingsAdjusted * servingFacts.dairy.co2 * 10)/10;
    const cheeseCo2 = Math.round(cheeseServingsAdjusted * servingFacts.cheese.co2 * 10)/10;
    const junkFoodCo2 = Math.round(junkFoodServingsAdjusted * servingFacts.junkFood.co2 * 10)/10;
    const totalCo2 = Math.round(beefCo2 + chickenCo2 + porkCo2 + seafoodCo2 + grainCo2 + fruitCo2 + vegetablesCo2 + dairyCo2 + cheeseCo2 + junkFoodCo2);
    const monthlyCo2 = convertDailyToMonthly(totalCo2);

    return {
        servings: {
            beef: beefServingsAdjusted,
            chicken: chickenServingsAdjusted,
            pork: porkServingsAdjusted,
            seafood: seafoodServingsAdjusted,
            grain: grainServingsAdjusted,
            fruit: fruitServingsAdjusted,
            vegetables: vegetablesServingsAdjusted,
            dairy: dairyServingsAdjusted,
            cheese: cheeseServingsAdjusted,
            junkFood: junkFoodServingsAdjusted,
        },
        calories: {
            total: totalCaloriesAdjusted,
            beef: beefCaloriesAdjusted,
            chicken: chickenCaloriesAdjusted,
            pork: porkCaloriesAdjusted,
            seafood: seafoodCaloriesAdjusted,
            grain: grainCaloriesAdjusted,
            fruit: fruitCaloriesAdjusted,
            vegetables: vegetablesCaloriesAdjusted,
            dairy: dairyCaloriesAdjusted,
            cheese: cheeseCaloriesAdjusted,
            junkFood: junkFoodCaloriesAdjusted,
        },
        totalCo2,
        monthlyCo2,
        co2: {
            total: totalCo2,
            beef: beefCo2,
            chicken: chickenCo2,
            pork: porkCo2,
            seafood: seafoodCo2,
            grain: grainCo2,
            fruit: fruitCo2,
            vegetables: vegetablesCo2,
            dairy: dairyCo2,
            cheese: cheeseCo2,
            junkFood: junkFoodCo2,
        },
        ratioError,
        multiplier
    };
}

