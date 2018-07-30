import { americanCarMiles, demographicCalories } from './average-american-data';

import getResults from '../../actions/footprint/submit-with-all-answers';
import stateTemps from '../../components/footprint-form/data/average-temp-by-state';


const exampleProfile = {
    state: 'US',
    age: '20-34',
    gender: 'MALE',
    income: '$30k-$60k'
}

// Home
const getHomeMaterial = () => 'Wood';

// Home Activity
const getHoursTv = () => 3;
const getHoursComputer = () => 4;
const getCookAtHomeFrequency = () => '2-3 times per week';
const getDoesShowerDaily = () => true;
const getDoesMusicAtHome = () => true;
const getLaundryLoads = () => 4;

// Heating Cooling
const getHeatType = () => ('Gas Vents');
const getInsulationType = () => ('Reasonably Insulated');
const getHoursHome = () => (6);
const getHeatingOnWhileSleeping = () => (false);
const getHeatWholeHome = () => true;
const getUsesPersonalHeater = () => true;
const getCoolingType = () => 'Central AC';
const getCoolingWhileSleeping = () => true;
const getUsesPersonalFan = () => true;

const getSummerTemp = state => {
    // Assumes 75 degree house or outside temp.
    const summerTemp = stateTemps[state].summer;
    if(summerTemp > 75) {
        return 75;
    }
    return summerTemp;
}

const getWinterTemp = state => {
    // Assumes 70 degree house or outside temp.
    const winterTemp = stateTemps[state].winter;
    if(winterTemp < 70) {
        return 70;
    }
    return winterTemp;
}


// Transportation
const getDoesDrive = () => true;
const getCarFuelType = () => 'Gasoline';
const getCarMpg = () => 25;
const getCarpoolFrequency = () => 'Just to and from work';
const getCarMilesMonth = (age, gender) => {
    return Math.round(americanCarMiles[age][gender] / 12);
};
const getDoesPublicTransit = () => true;
const getBusMiles = () => 50;
const getTrainMiles = () => 50;

// Food
const getCalories = (age, gender) =>  (demographicCalories[age][gender]);
const getBeef = () => 'Once a week';
const getChicken = () => 'Once a week';
const getPork = () => 'Once a week';
const getSeafood = () => 'Once a week';
const getGrain = () => 'Once a day';
const getFruit = () => 'Once a day';
const getVegetables = () => 'Once a day';
const getDairy = () => 'Once a day';
const getCheese = () => 'Once a day';
const getJunkFood = () => 'Once a day';

const getPets = () => ['Dog', 'Cat'];


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
        case 'Under $30k':
            furnitureAmount = 'I have almost no furniture';
            stuffAmount = 'Practically empty'; 
            clothingProfile = 'Just the essentials';
            flyMiles = 1000;
            carClass = 'Compact car';
            carBuildType = 'Standard';
            homeSqft = 1000;
            homeType = 'Apartment';
            break;
        case '$30k-$60k':
            furnitureAmount = 'My rooms are sparesly furnished';
            stuffAmount = 'Reasonably full'; 
            clothingProfile = 'A good amount';
            flyMiles = '';
            carClass = 'Midsize car';
            carBuildType = 'Standard';
            homeSqft = 1500;
            homeType = 'Apartment';
            break;
        case '$60k-$100k':
            furnitureAmount = 'I have all of the essentials';
            stuffAmount = 'Extremely full'; 
            clothingProfile = 'My closet it packed';
            flyMiles = '';
            carClass = 'Midsize SUV';
            carBuildType = 'Luxurious';
            homeSqft = 2500;
            homeType = 'House';
            break;
        case 'Over $100k':
            furnitureAmount = 'My home is cramped';
            stuffAmount = 'There\'s no more room'; 
            clothingProfile = 'Way too many';
            flyMiles = '';
            carClass = 'Large SUV';
            carBuildType = 'Luxurious';
            homeSqft = 3500;
            homeType = 'House';
            break;
        default:
            console.log('Error in getting AA fields by income.', income, ' did not match any values');
    }
    return { furnitureAmount, stuffAmount, clothingProfile, flyMiles, carClass, carBuildType, homeSqft, homeType };
};

const getAnswersOnAge = age => {
    let numHousemates;
    switch(age) {
    case '16-19':
        numHousemates = 1;
        break;
    case '20-34':
        numHousemates = 1;
        break;
    case '35-54':
        numHousemates = 2;
        break;
    case '55-64':
        numHousemates = 2;
        break;
    case '65+':
        numHousemates = 1;
        break;
    case 'American Average':
        numHousemates = 2;
        break;
    default:
        console.log('Error in getting AA fields by age.', age, ' did not match any values');
    }
    return { numHousemates };
};

export const getAverageAmericanResultsFromProfile = averageAmericanprofile => {
    console.log(averageAmericanprofile);
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
