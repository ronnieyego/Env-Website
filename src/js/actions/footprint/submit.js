import getFoodResults from '../../components/v2-form/calculations/food';
import getHomeResults from '../../components/v2-form/calculations/home';
import getHomeActivitiesResults from '../../components/v2-form/calculations/home-activities';
import getHomeHeatingResults from '../../components/v2-form/calculations/heating';
import getHomeCoolingResults from '../../components/v2-form/calculations/cooling';
import getTransportationResults from '../../components/v2-form/calculations/transportation';

import ids from '../../utils/ids/index';
import { getAnswerFromId, getQuestionFromId } from '../../components/questions/utils';


const getFood = questions => {
    const calories = getAnswerFromId(questions, ids.calories);
    const beef = getAnswerFromId(questions, ids.beefFrequency);
    const chicken = getAnswerFromId(questions, ids.chickenFrequency);
    const pork = getAnswerFromId(questions, ids.porkFrequency);
    const seafood = getAnswerFromId(questions, ids.seafoodFrequency);
    const dairy = getAnswerFromId(questions, ids.dairyFrequency)
    const cheese = getAnswerFromId(questions, ids.cheeseFrequency)
    const vegetables = getAnswerFromId(questions, ids.vegetablesFrequency)
    const fruit = getAnswerFromId(questions, ids.fruitsFrequency)
    const grain = getAnswerFromId(questions, ids.grainsFrequency);
    const junkFood = getAnswerFromId(questions, ids.junkFoodFrequency);
    return getFoodResults({
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
    });
};

const getHome = questions => {
    const homeType = getAnswerFromId(questions, ids.homeType);
    const homeSqft = getAnswerFromId(questions, ids.homeSqft);
    const homeMaterial = getAnswerFromId(questions, ids.homeMaterial);
    const numHousemates = getAnswerFromId(questions, ids.liveWith);

    return getHomeResults({
        homeMaterial,
        homeType,
        homeSqft,
        numHousemates
    });
};

const getHomeActivities = (questions, { userState }) => {
    const hoursHome = getAnswerFromId(questions, ids.hoursAtHome);
    const hoursTv = getAnswerFromId(questions, ids.tvWatchHours);
    const hoursComputer = getAnswerFromId(questions, ids.hoursComputer);
    const cookAtHomeFrequency = getAnswerFromId(questions, ids.cookingFrequency);
    const doesShowerDaily = getAnswerFromId(questions, ids.showEveryday);
    const doesMusicAtHome = getAnswerFromId(questions, ids.playMusicHome);
    const laundryLoads = getAnswerFromId(questions, ids.laundryMonth);
    const state = userState;
    const homeSqft = getAnswerFromId(questions, ids.homeSqft);

    return getHomeActivitiesResults({
        state,
        hoursHome,
        hoursTv,
        hoursComputer,
        cookAtHomeFrequency,
        doesShowerDaily,
        doesMusicAtHome,
        laundryLoads,
        homeSqft
    });
};

const getHomeTemperature = (questions, { userState }) => {

    const insulationType = getAnswerFromId(questions, ids.homeInsulation);
    const summerTemp = getAnswerFromId(questions, ids.summerTemp);
    const coolingType = getAnswerFromId(questions, ids.coolingSystem);
    const coolWholeHouse = getAnswerFromId(questions, ids.coolWholeHouse);
    const usesPersonalFan = getAnswerFromId(questions, ids.usesFan);
    const winterTemp = getAnswerFromId(questions, ids.winterTemp);
    const heatType = getAnswerFromId(questions, ids.heatingSystem);
    const heatWholeHome = getAnswerFromId(questions, ids.heatWholeHouse);
    const heatWholeHouseRadiantFlooring = getAnswerFromId(questions, ids.heatWholeHouseRadiantFlooring);
    const usesPersonalHeater = getAnswerFromId(questions, ids.usesPortableHeater);
    
    const state = userState;
    const houseSqft = getAnswerFromId(questions, ids.homeSqft);
    const hoursHome = getAnswerFromId(questions, ids.hoursAtHome);

    const heating = getHomeHeatingResults({
        state,
        heatType,
        insulationType,
        houseSqft,
        summerTemp,
        winterTemp,
        hoursHome,
        heatingOnWhileSleeping: false, // Need to add question
        heatWholeHome,
        usesPersonalHeater
    });

    const cooling = getHomeCoolingResults({
        state,
        coolingType,
        summerTemp,
        winterTemp,
        hoursHome,
        coolingWhileSleeping: true, // Need to add question
        houseSqft,
        usesPersonalFan
    });

    return { heating, cooling };
};

const getTransportation = (questions, { userState }) => {
    const state = userState;
    const doesDrive = getAnswerFromId(questions, ids.doesDrive);
    const carClass = getAnswerFromId(questions, ids.carSize);
    const carBuildType = getAnswerFromId(questions, ids.carRuggedness);
    const carMpg = getAnswerFromId(questions, ids.carMpg);
    const carMilesMonth = getAnswerFromId(questions, ids.milesDrivenMonth);
    const carFuelType = getAnswerFromId(questions, ids.carFuel);
    const carpoolFrequency = getAnswerFromId(questions, ids.carpoolFrequency);
    const doesPublicTransit = getAnswerFromId(questions, ids.doesPublicTransit);
    const busMiles = getAnswerFromId(questions, ids.milesBusMonth);
    const trainMiles = getAnswerFromId(questions, ids.milesTrainMonth);
    const flyMiles = getAnswerFromId(questions, ids.milesFlyYear);
    
    return getTransportationResults({
        doesDrive,
        carClass,
        carBuildType,
        carFuelType,
        carMpg,
        carpoolFrequency,
        carMilesMonth,
        doesPublicTransit,
        busMiles,
        trainMiles,
        flyMiles,
        state
    });
}


export default questionPayload => {
    return (dispatch, getState) => {
        const store = getState();
        const questions = store.questions.questions;
        const userState = store.userInfo.userState;
        const results = {};
        results.food = getFood(questions);
        results.home = getHome(questions);
        results.homeActivities = getHomeActivities(questions, { userState });
        const { heating, cooling } = getHomeTemperature(questions, { userState });
        results.heating = heating;
        results.cooling = cooling;
        results.transportation = getTransportation(questions, { userState });
        console.log(results);
        return results;
    }
}