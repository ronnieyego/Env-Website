import { getAnswerFromKey } from './get-question-utils';
import { 
    busMpgPerPerson,
    co2PerGallonOfGas,
    co2PerGallonOfJetFuel,
    kwhPer100MilesElectricCar,
    mpgPerPersonPlane,
    trainMpgPerPerson } from '../utils-data/constants';

const getFoodValue = question => {
    if(!question.value || question.value === ''){
        return 0;
    }
    if(typeof question.value === 'string') {
        question.value = question.value.trim();
        question.value = question.value.replace(' ', '');
    }
    question.value = parseFloat(question.value);
    if(question.value > 0 && question.co2) { // Standard question
        return question.co2 * question.value * 30; //Converts from daily to monthly
    }
    console.log('Problem with food/co2 question', question);
    return 0; // Something went wrong (ie. '' passed in);
};

const sumCo2QuestionSet = (questionSet, type, stateCo2) => {
    if(type === 'transportation') {
        return sumTransportationSet(questionSet);
    }
    let groupSum = 0;
    questionSet.forEach(question => {
        let questionTotal;
        switch(type) {
        case 'food':
            questionTotal = getFoodValue(question);
            break;
        case 'appliance':
            questionTotal = getApplianceValue(question, stateCo2);
            break;
        default:
            console.log('Error - Can not calculate co2 for this type and question set', type, questionSet);
            questionTotal = 0;
        }
        groupSum += parseInt(questionTotal);
    });
    return groupSum;
}

const getFoodSubcategories = (foodSet, stateCo2) => {
    let res = {};
    foodSet.forEach(question => {
        const subCategory = question['sub-grouping'] ? question['sub-grouping'] : 'other';
        if(res[subCategory]) {
            res[subCategory] += getFoodValue(question);
        } else {
            res[subCategory] = getFoodValue(question);
        }
    });
    return res;
};

const getApplianceSubcategories = (applianceSet, stateCo2) => {
    let res = {};
    applianceSet.forEach(question => {
        const subCategory = question['sub-grouping'] ? question['sub-grouping'] : 'other';
        if(res[subCategory]) {
            res[subCategory] += getApplianceValue(question, stateCo2);
        } else {
            res[subCategory] = getApplianceValue(question, stateCo2);
        }
    });
    return res;
}

const getApplianceValue = (question, stateCo2) => {
    if(question['use-bool'] && question.value === 'on') {
        return (question.kwh * stateCo2);
    }
    if(!question.value || question.value === ''){
        return 0;
    }
    if(question.selectOptions) { // Dropdown Question
        return (question.value * stateCo2);
    }
    if(typeof question.value === 'string'){
        question.value = question.value.trim();
        question.value = question.value.replace(' ', '');
    }
    question.value = parseFloat(question.value);
    if(question.value > 0 && question.kwh) { //Int question
        return (question.kwh * question.value *  stateCo2 * 30);
        // Times 30 since these are daily use
    }
    console.log('Problem with co2/appliance question', question);
    return 0; // Something went wrong (ie. '' passed in);
};

const sumTransportationSet = (transportationSet, stateCo2) => {
    const results = {};

    const doesDrive = getAnswerFromKey(transportationSet, 'Do you drive?') === 'on';
    let carRes = {};
    if(doesDrive) {
        carRes = sumCar(transportationSet, stateCo2);
    }
    const carMpg = carRes.carMpg;
    const monthlyCommuteMiles = carRes.monthlyCommuteMiles || 0;
    const monthlyRoadTripMiles = carRes.monthlyRoadTripMiles || 0;
    const totalCommuteCarCo2 = carRes.totalCommuteCarCo2 || 0;
    const totalRoadTripCarCo2 = carRes.totalRoadTripCarCo2 || 0;

    const busMiles = getAnswerFromKey(transportationSet, 'How many miles do you bus each month?');
    const trainMiles = getAnswerFromKey(transportationSet, 'How many miles do you ride on the train each month?');
    const flyMiles = getAnswerFromKey(transportationSet, 'Within the last year, how many miles did you fly?');
    const montlyFlyGas = flyMiles/(mpgPerPersonPlane * 12); // Gallons per person each month
    
    const totalMonthlyFlyCo2 = montlyFlyGas * co2PerGallonOfJetFuel;
    const totalMonthlyCarCo2 = totalCommuteCarCo2 + totalRoadTripCarCo2;
    const totalMonthlyBusCo2 = Math.round((busMiles / busMpgPerPerson) * co2PerGallonOfGas, 2);
    const totalMonthlyTrainCo2 = Math.round((trainMiles / trainMpgPerPerson) * co2PerGallonOfGas, 2);
    const monthlyCo2FromTransportation = totalMonthlyCarCo2 + totalMonthlyFlyCo2 + totalMonthlyBusCo2 + totalMonthlyTrainCo2;

    results.carMpg = carMpg;
    results.totalMilesDriven = Math.round((monthlyCommuteMiles + monthlyRoadTripMiles) * 100)/100;
    results.monthlyCar = Math.round(totalMonthlyCarCo2 * 100)/100;
    results.monthlyCommute = Math.round(totalCommuteCarCo2 * 100)/100;
    results.monthlyRoadTrip = Math.round(totalRoadTripCarCo2 * 100)/100;
    results.monthlyFly = Math.round(totalMonthlyFlyCo2 * 100)/100;
    results.monthlyBus = totalMonthlyBusCo2;
    results.monthlyTrain = totalMonthlyTrainCo2;
    results.monthlyCo2FromTransportation = Math.round(monthlyCo2FromTransportation * 100)/100;

    return results;
};

const sumCar = (transportationSet, stateCo2) => {
    const carType = getAnswerFromKey(transportationSet, 'What\'s the fuel for your car?');
    const carMpg = getAnswerFromKey(transportationSet, 'What\'s the MPG of your car?');
    const dailyMiles = getAnswerFromKey(transportationSet, 'On average, how many miles do you drive for work, school, and errands each day?');
    const doesCarpool = getAnswerFromKey(transportationSet, 'Do you carpool?') ? getAnswerFromKey(transportationSet, 'Do you carpool?') : false;
    const numOfRoadTrips = getAnswerFromKey(transportationSet, 'Within the last year, how many times did you take a roadtrip or drive for an extended distance?');
    const roadTripMiles = getAnswerFromKey(transportationSet, 'How far is your average roadtrip?');
    const doesRoadTripCarpool = getAnswerFromKey(transportationSet, 'Do you usually carpool for roadtrips?') ? getAnswerFromKey(transportationSet, 'Do you usually carpool for roadtrips?') : false;

    const carpool = doesCarpool ? 2 : 1;
    const roadTripCarpool = doesRoadTripCarpool ? 2 : 1;
    const monthlyCommuteMiles = dailyMiles * 30 / carpool;
    const monthlyRoadTripMiles = (numOfRoadTrips * roadTripMiles / roadTripCarpool) / 12; // 12 months/year
    
    let totalCommuteCarCo2;
    let totalRoadTripCarCo2;
    if(carType !== 'Electric') {
        
        const monthlyGas = monthlyCommuteMiles/carMpg; // unit is gallons
        const roadTripMonthGas =  monthlyRoadTripMiles/carMpg; // 12 months/year
        totalCommuteCarCo2 = monthlyGas * co2PerGallonOfGas;
        totalRoadTripCarCo2 = roadTripMonthGas * co2PerGallonOfGas;
    } else {
        totalCommuteCarCo2 = monthlyCommuteMiles * kwhPer100MilesElectricCar/100 * stateCo2;
        totalRoadTripCarCo2 = monthlyRoadTripMiles * kwhPer100MilesElectricCar/100 * stateCo2;
    }

    return {
        carMpg,
        monthlyCommuteMiles,
        monthlyRoadTripMiles,
        totalCommuteCarCo2,
        totalRoadTripCarCo2
    };
}



module.exports = {
    getApplianceSubcategories,
    getFoodSubcategories,
    sumCo2QuestionSet
}