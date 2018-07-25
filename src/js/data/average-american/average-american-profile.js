import getResults from '../../actions/footprint/submit-with-all-fields';
import stateTemps from '../../components/v2-form/data/average-temp-by-state';


const exampleProfile = {
    state: 'US',
    age: '20-34',
    gender: 'MALE',
    income: '$30k-$60k'
}

// Home
const getHomeSqft = income => {
    switch(income) {
        case '$30k-$60k':
            return 1500;
    }
};

const getHomeMaterial = () => 'Wood';
const getHomeType = income => {
    switch(income) {
        case '$30k-$60k':
            return 'House';
    }
};

const getNumHousemates = age => {
    switch(age) {
        case '20-34':
            return 1;
    }
};

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
    const summerTemp = stateTemps[state];
    if(summerTemp > 75) {
        return 75;
    }
    return summerTemp;
}

const getWinterTemp = state => {
    // Assumes 70 degree house or outside temp.
    const winterTemp = stateTemps[state];
    if(winterTemp < 70) {
        return 70;
    }
    return winterTemp;
}


// Transportation

const getDoesDrive = () => true;
const getCarClass = (income) => {
    switch(income) {
    case '$30k-$60k':
        return 'Midsize car';
    }
};
const getCarBuildType = (income) => {
    switch(income) {
    case '$30k-$60k':
        return 'Luxurious';
    }
};
const getCarFuelType = () => 'Gasoline';
const getCarMpg = () => 25;
const getCarpoolFrequency = () => 'Just to and from work';
const getCarMilesMonth = () => 1000;
const getDoesPublicTransit = () => true;
const getBusMiles = () => 50;
const getTrainMiles = () => 50;
const getFlyMiles = (income) => {
    switch(income) {
    case '$30k-$60k':
        return 1000;
    }
};

// Food
const getCalories = (gender) => gender === 'Male' ? 2200 : 1800;
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

// Stuff
const getFurnitureAmount = (income) => {
    switch(income) {
        case '$30k-$60k':
            return 'I have all of the essentials';
        }
};
const getStuffAmount = (income) => {
    switch(income) {
        case '$30k-$60k':
            return 'Reasonably full';
        } 
};
const getClothingProfile = (income) => {
    switch(income) {
        case '$30k-$60k':
            return 'A good amount';
        }
};

const getPets = () => ['Dog', 'Cat'];

const getAnswers = averageAmericanprofile => {
    const { state, age, gender, income } = averageAmericanprofile
    return {
        state,

        // Home
        homeMaterial: getHomeMaterial(),
        homeType: getHomeType(income),
        homeSqft: getHomeSqft(income),
        numHousemates: getNumHousemates(age),

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
        houseSqft: getHomeSqft(income), // Dupe cause everywhere uses home.  Fix at some point
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
        carClass: getCarClass(income),
        carBuildType: getCarBuildType(income),
        carFuelType: getCarFuelType(),
        carMpg: getCarMpg(),
        carpoolFrequency: getCarpoolFrequency(),
        carMilesMonth: getCarMilesMonth(),
        doesPublicTransit: getDoesPublicTransit(),
        busMiles: getBusMiles(),
        trainMiles: getTrainMiles(),
        flyMiles: getFlyMiles(income),

        // Food
        calories: getCalories(gender),
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
        furnitureAmount: getFurnitureAmount(income),
        stuffAmount: getStuffAmount(income),
        clothingProfile: getClothingProfile(income),
        pets: getPets()
    }
};

console.log(getAnswers(exampleProfile));

const answers = getAnswers(exampleProfile);
const results = getResults(answers);
console.log(results);
