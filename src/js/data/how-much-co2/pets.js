import { co2PerPoundOfPoop, petPoopWeight, getLbFoodFromWeight, foodPerDayByAnimal, petFoodCo2, lifeExpectancy, turtleTank } from '../../components/costs/pet/pet-data';
import { utilityEmissionsPerState } from '../../utils/utils-data/state-energy-and-emissions';
import ids from '../../utils/ids/index';

const getDogLife = weight => {
    const petLifeExpectancy = lifeExpectancy.Dog[weight];
    const co2PerPoundOfFood = petFoodCo2['Dry']['Average'].co2;
    const foodPerDay = getLbFoodFromWeight(weight);
    const co2FoodPerDay = foodPerDay * co2PerPoundOfFood;
    const co2FoodPerLife = Math.round(co2FoodPerDay * petLifeExpectancy * 365);
    const dogPoopWeight = petPoopWeight.dog(weight);
    const dogPoopCo2PerDay = dogPoopWeight * co2PerPoundOfPoop;
    const poopCo2PerLife = Math.round(dogPoopCo2PerDay * petLifeExpectancy * 365);
    return Math.round(co2FoodPerLife + poopCo2PerLife);
};

const getCatLife = () => {
    const petLifeExpectancy = lifeExpectancy['Cat'];
    const co2PerPoundOfFood = petFoodCo2['Mix']['Average'].co2;
    const foodPerDay = foodPerDayByAnimal['Cat'];
    const co2FoodPerLife = Math.round(foodPerDay * co2PerPoundOfFood * petLifeExpectancy * 365);

    const poopWeight = petPoopWeight.cat('0-10 pounds');
    const poopCo2PerDay = poopWeight * co2PerPoundOfPoop;
    const poopCo2PerLife = Math.round(poopCo2PerDay * petLifeExpectancy * 365);

    return Math.round(co2FoodPerLife + poopCo2PerLife);
};

const getHamsterLife = () => {
    const petLifeExpectancy = lifeExpectancy['Hamster'];
    const co2PerPoundOfFood = petFoodCo2['Hamster'];
    const foodPerDay = foodPerDayByAnimal['Hamster'];
    const co2FoodPerLife = Math.round(foodPerDay * co2PerPoundOfFood * petLifeExpectancy * 365);

    const poopWeight = petPoopWeight.hamster;
    const poopCo2PerDay = poopWeight * co2PerPoundOfPoop;
    const poopCo2PerLife = Math.round(poopCo2PerDay * petLifeExpectancy * 365);

    return Math.round(co2FoodPerLife + poopCo2PerLife);
};

const getGeckoLife = () => {
    const petLifeExpectancy = lifeExpectancy['Gecko'];
    const co2PerPoundOfFood = petFoodCo2['Gecko'];
    const foodPerDay = foodPerDayByAnimal['Gecko'];
    const co2FoodPerLife = Math.round(foodPerDay * co2PerPoundOfFood * petLifeExpectancy * 365);
    const geckoHeatingWattage = turtleTank['10 Gallons']['heating'];
    const kwhPerDay = geckoHeatingWattage * 24 / 1000;
    const dailyElectricity = kwhPerDay * utilityEmissionsPerState['US'];
    const lifetimeElectricityCo2 = Math.round(dailyElectricity * petLifeExpectancy * 365);
    const poopWeight = petPoopWeight.gecko;
    const poopCo2PerDay = poopWeight * co2PerPoundOfPoop;
    const poopCo2PerLife = Math.round(poopCo2PerDay * petLifeExpectancy * 365);

    return Math.round(co2FoodPerLife + poopCo2PerLife + lifetimeElectricityCo2);
}

const getTurtleCo2 = () => {
    const petLifeExpectancy = lifeExpectancy['Turtle'];
    const foodPerDay = foodPerDayByAnimal['Turtle'];
    const co2PerPoundOfFood = petFoodCo2['Turtle'];
    const turtleTankWattage = turtleTank['20 Gallons']['filter'] + turtleTank['20 Gallons']['heating'];
    const kwhPerDay = turtleTankWattage * 24 / 1000;
    const dailyElectricity = kwhPerDay * utilityEmissionsPerState['US'];
    const daysAlive = petLifeExpectancy * 365;
    const co2FoodPerLife = Math.round(foodPerDay * co2PerPoundOfFood * daysAlive);
    const lifetimeElectricityCo2 = Math.round(dailyElectricity * daysAlive);

    const poopWeight = petPoopWeight.turtle;
    const poopCo2PerDay = poopWeight * co2PerPoundOfPoop;
    const poopCo2PerLife = Math.round(poopCo2PerDay * petLifeExpectancy * 365);

    return Math.round(co2FoodPerLife + poopCo2PerLife + lifetimeElectricityCo2);
}

const smallDog = getDogLife('0-10 pounds')
const petDog = getDogLife('10-25 pounds');
const petBigDog = getDogLife('50-75 pounds');
const petCat = getCatLife();
const petHamster = getHamsterLife();
const petGecko = getGeckoLife();
const petTurtle = getTurtleCo2();

export default {
    [ids.petSmallDog]: smallDog,
    [ids.petDog]: petDog,
    [ids.petBigDog]: petBigDog,
    [ids.petCat]: petCat,
    [ids.petHamster]: petHamster,
    [ids.petGecko]: petGecko,
    [ids.petTurtle]: petTurtle
};