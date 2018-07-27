import ids from '../../utils/ids/index';
import { getAnswerFromId, getQuestionFromId, getQuestionsThatMatchId } from '../../components/questions/utils';

export default questions => {
    const answers = {};
    answers.calories = getAnswerFromId(questions, ids.calories);
    answers.beef = getAnswerFromId(questions, ids.beefFrequency);
    answers.chicken = getAnswerFromId(questions, ids.chickenFrequency);
    answers.pork = getAnswerFromId(questions, ids.porkFrequency);
    answers.seafood = getAnswerFromId(questions, ids.seafoodFrequency);
    answers.dairy = getAnswerFromId(questions, ids.dairyFrequency)
    answers.cheese = getAnswerFromId(questions, ids.cheeseFrequency)
    answers.vegetables = getAnswerFromId(questions, ids.vegetablesFrequency)
    answers.fruit = getAnswerFromId(questions, ids.fruitsFrequency)
    answers.grain = getAnswerFromId(questions, ids.grainsFrequency);
    answers.junkFood = getAnswerFromId(questions, ids.junkFoodFrequency);

    answers.homeType = getAnswerFromId(questions, ids.homeType);
    answers.homeSqft = getAnswerFromId(questions, ids.homeSqft);
    answers.homeMaterial = getAnswerFromId(questions, ids.homeMaterial);
    answers.numHousemates = getAnswerFromId(questions, ids.liveWith);

    answers.hoursHome = getAnswerFromId(questions, ids.hoursAtHome);
    answers.hoursTv = getAnswerFromId(questions, ids.tvWatchHours);
    answers.hoursComputer = getAnswerFromId(questions, ids.hoursComputer);
    answers.cookAtHomeFrequency = getAnswerFromId(questions, ids.cookingFrequency);
    answers.doesShowerDaily = getAnswerFromId(questions, ids.showEveryday);
    answers.doesMusicAtHome = getAnswerFromId(questions, ids.playMusicHome);
    answers.laundryLoads = getAnswerFromId(questions, ids.laundryMonth);

    answers.insulationType = getAnswerFromId(questions, ids.homeInsulation);
    answers.summerTemp = getAnswerFromId(questions, ids.summerTemp);
    answers.coolingType = getAnswerFromId(questions, ids.coolingSystem);
    answers.coolWholeHouse = getAnswerFromId(questions, ids.coolWholeHouse);
    answers.usesPersonalFan = getAnswerFromId(questions, ids.usesFan);
    answers.winterTemp = getAnswerFromId(questions, ids.winterTemp);
    answers.heatType = getAnswerFromId(questions, ids.heatingSystem);
    answers.heatWholeHome = getAnswerFromId(questions, ids.heatWholeHouse);
    answers.heatWholeHouseRadiantFlooring = getAnswerFromId(questions, ids.heatWholeHouseRadiantFlooring);
    answers.usesPersonalHeater = getAnswerFromId(questions, ids.usesPortableHeater);
    
    answers.houseSqft = getAnswerFromId(questions, ids.homeSqft);

    answers.doesDrive = getAnswerFromId(questions, ids.doesDrive);
    answers.carClass = getAnswerFromId(questions, ids.carSize);
    answers.carBuildType = getAnswerFromId(questions, ids.carRuggedness);
    answers.carMpg = getAnswerFromId(questions, ids.carMpg);
    answers.carMilesMonth = getAnswerFromId(questions, ids.milesDrivenMonth);
    answers.carFuelType = getAnswerFromId(questions, ids.carFuel);
    answers.carpoolFrequency = getAnswerFromId(questions, ids.carpoolFrequency);
    answers.doesPublicTransit = getAnswerFromId(questions, ids.doesPublicTransit);
    answers.busMiles = getAnswerFromId(questions, ids.milesBusMonth);
    answers.trainMiles = getAnswerFromId(questions, ids.milesTrainMonth);
    answers.flyMiles = getAnswerFromId(questions, ids.milesFlyYear);
    
    const petQuestion = getQuestionFromId(questions, ids.allPets);
    const petQuestions = getQuestionsThatMatchId(questions, petQuestion.childQuestionName);
    answers.pets = petQuestions.map(question => {
        return question.value;
    });

    answers.stuffAmount = getAnswerFromId(questions, ids.houseClutter);
    answers.furnitureAmount = getAnswerFromId(questions, ids.totalHouseFurniture);
    answers.clothingProfile = getAnswerFromId(questions, ids.totalWardrobe);
    return answers;
};