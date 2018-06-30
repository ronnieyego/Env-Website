
import { foodAnswerServings, servingFacts } from '../data/food';

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
    const fruitServings = foodAnswerServings.fruits[fruit];
    const vegetableServings = foodAnswerServings.vegetables[vegetables];
    const dairyServings = foodAnswerServings.dairy[dairy];
    const cheeseServings = foodAnswerServings.cheese[cheese];
    const junkFoodServings = foodAnswerServings.junkFood[junkFood];

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

    const totalCaloriesAdjusted = beefCaloriesAdjusted + chickenCaloriesAdjusted + porkCaloriesAdjusted + seafoodCaloriesAdjusted + grainCaloriesAdjusted + fruitCaloriesAdjusted + vegetablesCaloriesAdjusted + dairyCaloriesAdjusted + cheeseCaloriesAdjusted + junkFoodCaloriesAdjusted;

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
        ratioError,
        multiplier
    };
}

