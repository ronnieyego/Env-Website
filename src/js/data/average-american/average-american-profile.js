import { americanCarMiles, demographicCalories } from './average-american-data';

import getResults from '../../actions/footprint/submit-with-all-answers';
import stateTemps from '../../components/footprint-form/data/average-temp-by-state';
import ids from '../../utils/ids/index';


const exampleProfile = {
    state: 'US',
    age: '20-34',
    gender: 'MALE',
    income: '$30k-$60k'
}

// Home
const getHomeMaterial = () => ids.wood;

// Home Activity
const getHoursTv = () => 3;
const getHoursComputer = () => 4;
const getCookAtHomeFrequency = () => ids.twoThreeTimesPerWeek;
const getDoesShowerDaily = () => true;
const getDoesMusicAtHome = () => true;
const getLaundryLoads = () => 4;

// Heating Cooling
const getHeatType = () => ids.gasVents;
const getInsulationType = () => ids.reasonableInsulated;
const getHoursHome = () => (6);
const getHeatingOnWhileSleeping = () => (false);
const getHeatWholeHome = () => true;
const getUsesPersonalHeater = () => true;
const getCoolingType = () => ids.centralAc;
const getCoolingWhileSleeping = () => true;
const getUsesPersonalFan = () => true;

const getSummerTemp = state => {
    // Assumes 75 degreeids.house or outside temp.
    const summerTemp = stateTemps[state].summer;
    if(summerTemp > 75) {
        return 75;
    }
    return summerTemp;
}

const getWinterTemp = state => {
    // Assumes 70 degreeids.house or outside temp.
    const winterTemp = stateTemps[state].winter;
    if(winterTemp < 70) {
        return 70;
    }
    return winterTemp;
}


// Transportation
const getDoesDrive = () => true;
const getCarFuelType = () => ids.gasoline;
const getCarMpg = () => 25;
const getCarpoolFrequency = () => ids.justToAndFromWork;
const getCarMilesMonth = (age, gender) => {
    return Math.round(americanCarMiles[age][gender] / 12);
};
const getDoesPublicTransit = () => true;
const getBusMiles = () => 50;
const getTrainMiles = () => 50;

// Food
const getCalories = (age, gender) =>  (demographicCalories[age][gender]);
const getBeef = () => ids.onceAWeek;
const getChicken = () => ids.onceAWeek;
const getPork = () => ids.onceAWeek;
const getSeafood = () => ids.onceAWeek;
const getGrain = () => ids.onceADay;
const getFruit = () => ids.onceADay;
const getVegetables = () => ids.onceADay;
const getDairy = () => ids.onceADay;
const getCheese = () => ids.onceADay;
const getJunkFood = () => ids.onceADay;

const getPets = () => [ids.dog, ids.cat];


const getAnswersOnIncome = income => {
    let furnitureAmount,
        stuffAmount, 
        clothingProfile,
        flyMiles,
        carClass,
        carBuildType,
        homeSqft,
        homeType;

    switch(income) {
        case ids.underThirtyK:
            furnitureAmount = ids.veryLittleFurniture;
            stuffAmount = ids.practicallyEmpty; 
            clothingProfile = ids.justTheEssentials;
            flyMiles = 1000;
            carClass = ids.compactCar;
            carBuildType = ids.standard;
            homeSqft = 1000;
            homeType = ids.apartment;
            break;
        case ids.thirtySixtyK:
            furnitureAmount = ids.spareslyFurnished;
            stuffAmount = ids.reasonablyFull; 
            clothingProfile = ids.aGoodAmount;
            flyMiles = 5000;
            carClass = ids.midsizeCar;
            carBuildType = ids.standard;
            homeSqft = 1500;
            homeType = ids.apartment;
            break;
        case ids.sixtyOneHundredK:
            furnitureAmount = ids.allTheEssentials;
            stuffAmount = ids.extremelyFull; 
            clothingProfile = ids.packedCloset;
            flyMiles = 10000;
            carClass = ids.midsizeSuv;
            carBuildType = ids.luxurious;
            homeSqft = 2500;
            homeType = ids.house;
            break;
        case ids.overOneHundredK:
            furnitureAmount = ids.crampedHome;
            stuffAmount = ids.noRoom; 
            clothingProfile = ids.wayTooMany;
            flyMiles = 20000;
            carClass = ids.largeSuv;
            carBuildType = ids.luxurious;
            homeSqft = 3500;
            homeType = ids.house;
            break;
        default:
            console.log('Error in getting AA fields by income.', income, ' did not match any values');
    }
    return { furnitureAmount, stuffAmount, clothingProfile, flyMiles, carClass, carBuildType, homeSqft, homeType };
};

const getAnswersOnAge = age => {
    let numHousemates;
    switch(age) {
    case ids.sixteenNineteen:
        numHousemates = 1;
        break;
    case ids.twentyThirtyFour:
        numHousemates = 1;
        break;
    case ids.thirtyFiveFiftyFour:
        numHousemates = 2;
        break;
    case ids.fiftyFiveSixtyFour:
        numHousemates = 2;
        break;
    case ids.sixtyFivePlus:
        numHousemates = 1;
        break;
    case ids.americanAverage:
        numHousemates = 2;
        break;
    default:
        console.log('Error in getting AA fields by age.', age, ' did not match any values');
    }
    return { numHousemates };
};

export const getAverageAmericanResultsFromProfile = averageAmericanprofile => {
    const { state, age, gender, income } = averageAmericanprofile;
    const { furnitureAmount, stuffAmount, clothingProfile, flyMiles, carClass, carBuildType, homeSqft, homeType } = getAnswersOnIncome(income);
    const { numHousemates } = getAnswersOnAge(age);
    const answers = {
        state,
        // Home
        homeMaterial: getHomeMaterial(),
        homeType,
        homeSqft,
        numHousemates, // Age

        // Home Activities
        hoursTv: getHoursTv(),
        hoursComputer: getHoursComputer(),
        cookAtHomeFrequency: getCookAtHomeFrequency(),
        doesShowerDaily: getDoesShowerDaily(),
        doesMusicAtHome: getDoesMusicAtHome(),
        laundryLoads: getLaundryLoads(),

        // Heating Cooling
        heatType: getHeatType(),
        insulationType: getInsulationType(),
        houseSqft: homeSqft, // Dupe cause everywhere uses home.  Fix at some point
        summerTemp: getSummerTemp(state),
        winterTemp: getWinterTemp(state),
        hoursHome: getHoursHome(),
        heatingOnWhileSleeping: getHeatingOnWhileSleeping(),
        heatWholeHome: getHeatWholeHome(),
        usesPersonalHeater: getUsesPersonalHeater(),
        coolingType: getCoolingType(),
        coolingWhileSleeping: getCoolingWhileSleeping(),
        usesPersonalFan: getUsesPersonalFan(),

        // Transportation
        doesDrive: getDoesDrive(),
        carClass, // Income
        carBuildType, //Income
        carFuelType: getCarFuelType(),
        carMpg: getCarMpg(),
        carpoolFrequency: getCarpoolFrequency(),
        carMilesMonth: getCarMilesMonth(age,gender),
        doesPublicTransit: getDoesPublicTransit(),
        busMiles: getBusMiles(),
        trainMiles: getTrainMiles(),
        flyMiles, // Income

        // Food
        calories: getCalories(age, gender),
        beef: getBeef(),
        chicken: getChicken(),
        pork: getPork(),
        seafood: getSeafood(),
        grain: getGrain(),
        fruit: getFruit(),
        vegetables: getVegetables(),
        dairy: getDairy(),
        cheese: getCheese(),
        junkFood: getJunkFood(),

        // Stuff
        furnitureAmount, // Income
        stuffAmount, // Income
        clothingProfile, // Income
        pets: getPets()
    };

    return getResults(answers);
};
