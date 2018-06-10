import { getAnswerFromKey } from './get-question-utils';

import { 
    busMpgPerPerson,
    co2PerGallonOfGas,
    co2PerGallonOfJetFuel,
    gasKwh,
    jetFuelKwh,
    kwhPer100MilesElectricCar,
    mpgPerPersonPlane,
    trainMpgPerPerson } from '../utils-data/constants';

// This util takes in data and calculates your energy footprint.  Yay!
const getMonthlyValue = question => {
   if(!question.value || question.value === ''){
        return 0;
    } 
    if(question['use-type'] === 'monthly-use'){
        return question.kwh * question.value;
    }
    if(question['use-type'] === 'monthly-own'){
        return question.kwh;
    }
    if(question.selectOptions) { // Dropdown Question
        return question.value;
    }
    if(typeof question.value === 'string') {
        question.value = question.value.trim();
        question.value = question.value.replace(' ', '');
    }
    question.value = parseFloat(question.value);
    if(question.value > 0 && question.kwh) { //Int question
            return question.kwh * question.value * 30;
    }
    console.log('Problem with question', question);
    return 0; // Something went wrong (ie. '' passed in);
}

const sumEnergyQuestionSet = (questionSet, type) => {
    if (type === 'transportation') {
        return sumTransportantSet(questionSet);
    }
    let groupSum = 0;
    questionSet.forEach(question => {
        groupSum += getMonthlyValue(question)
    });
    return Math.round(groupSum * 100)/100;
}

const getEnergySubcategories = questionSet => {
    let res = {};
    questionSet.forEach(question => {
        const subCategory = question['sub-grouping'] ? question['sub-grouping'] : 'other';
        if(res[subCategory]) {
            res[subCategory] += getMonthlyValue(question);
        } else {
            res[subCategory] = getMonthlyValue(question);
        }
    });
    return res;
};

const sumTransportantSet = questionSet => {
    const results = {};
    
    const doesDrive = getAnswerFromKey(questionSet, 'Do you drive?') === 'on';
    let carRes = {};
    if(doesDrive) {
        carRes = sumCar(questionSet);
    }
    const carMpg = carRes.carMpg || 'no car';
    const carType = carRes.carType || 'no car';
    const monthlyCommuteMiles = carRes.monthlyCommuteMiles || 0;
    const monthlyRoadTripMiles = carRes.monthlyRoadTripMiles || 0;
    const totalCommuteCar = carRes.totalCommuteCar || 0;
    const totalRoadTripCar = carRes.totalRoadTripCar || 0;
    
    const busMiles = getAnswerFromKey(questionSet, 'How many miles do you bus each month?');
    const trainMiles = getAnswerFromKey(questionSet, 'How many miles do you ride on the train each month?');
    const flyMiles = getAnswerFromKey(questionSet, 'Within the last year, how many miles did you fly?');
    const montlyFlyGas = flyMiles/(mpgPerPersonPlane * 12); // Gallons per person each month
    
    const totalMonthlyCar = totalCommuteCar + totalRoadTripCar;
    const totalMonthlyFly = montlyFlyGas * jetFuelKwh;
    const totalMonthlyBus = Math.round((busMiles / busMpgPerPerson) * gasKwh, 2);
    const totalMonthlyTrain = Math.round((trainMiles / trainMpgPerPerson) * gasKwh, 2);
    const monthlyEnergyFromTransportation = totalMonthlyCar + totalMonthlyFly + totalMonthlyBus + totalMonthlyTrain;

    results.carMpg = carMpg;
    results.carType = carType;
    results.totalMilesDriven = (monthlyCommuteMiles + monthlyRoadTripMiles).toFixed(1);
    results.monthlyRoadTrip = totalRoadTripCar.toFixed(1);
    results.monthlyCommute = totalCommuteCar.toFixed(1);
    results.monthlyCar = totalMonthlyCar.toFixed(1);
    results.monthlyFly = totalMonthlyFly.toFixed(1);
    results.monthlyBus = totalMonthlyBus;
    results.monthlyTrain = totalMonthlyTrain;
    results.transportation = monthlyEnergyFromTransportation.toFixed(1);
    return results
}

const sumCar = (transportationSet) => {
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
    
    let totalCommuteCar;
    let totalRoadTripCar;
    if(carType !== 'Electric') {
        console.log('Ah.  You don\'t drive an electric car.  JUDGEMENT!!');
        const monthlyGas = monthlyCommuteMiles/carMpg; // unit is gallons
        const roadTripMonthGas =  monthlyRoadTripMiles/carMpg; // 12 months/year
        totalCommuteCar = monthlyGas * gasKwh;
        totalRoadTripCar = roadTripMonthGas * gasKwh;
    } else {
        console.log('Congrats on driving an electric car.  Hope its a Tesla!');
        totalCommuteCar = monthlyCommuteMiles * kwhPer100MilesElectricCar/100;
        totalRoadTripCar = monthlyRoadTripMiles * kwhPer100MilesElectricCar/100;
    }

    return {
        carMpg,
        carType,
        doesCarpool,
        doesRoadTripCarpool,
        monthlyCommuteMiles,
        monthlyRoadTripMiles,
        totalCommuteCar,
        totalRoadTripCar
    };
}

module.exports = {
    getEnergySubcategories,
    sumEnergyQuestionSet
}