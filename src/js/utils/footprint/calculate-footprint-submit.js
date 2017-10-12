import _ from 'lodash';

// This util takes in data and calculates your energy footprint.  Yay!
const daysInMonth = 30;
const kwhPer100MilesElectricCar = 30; // kwhs for an average electric car to go 100mi
const gasKwh = 34.4;
const jetFuelKwh = 37.12;
const mpgPerPersonPlane = 84.9;

module.exports = function(questions) {
    const compiledFootprint = {
        transportationData: {}
    };
    const applianceHour = _.filter(questions, function(o) { return o['use-type'] === 'hour'; });
    const houseHoldQuestions = _.filter(questions, function(o) { return o['use-type'] === 'monthly-own' || o['use-type'] === 'monthly-use'; });
    const foodQuestions = _.filter(questions, function(o) { return o['use-type'] === 'serving'; });
    const transportation = _.filter(questions, function(o) { return o['use-type'] === 'transportation'; });

    const applinaceQuestionSet = Object.assign(applianceHour, houseHoldQuestions);
    compiledFootprint.appliance = parseInt(sumQuestionSet(applinaceQuestionSet));
    compiledFootprint.applianceSubCategories = getSubcategories(applinaceQuestionSet);
    compiledFootprint.food = parseInt(sumQuestionSet(foodQuestions)) * 28;
    compiledFootprint.foodSubCategories = getSubcategories(foodQuestions);
    
    const transportationResults = sumTransportantSet(transportation);
    compiledFootprint.transportationBreakdown = transportationResults;
    compiledFootprint.transportation = transportationResults.transportation;
    
    // Remove these and swap out their data grabs in Results
    compiledFootprint.monthlyRoadTrip = transportationResults.monthlyRoadTrip;
    compiledFootprint.monthlyCommute = transportationResults.monthlyCommute;
    compiledFootprint.monthlyCar = transportationResults.monthlyCar;
    compiledFootprint.monthlyFly = transportationResults.monthlyFly;

    compiledFootprint.totalEnergy = (parseInt(compiledFootprint.appliance) + parseInt(compiledFootprint.food) + parseInt(compiledFootprint.transportation));

    return compiledFootprint;
}

const getAnswerValue = question => {
    if(!question.value || question.value === ''){
        return 0;
    }
    if(typeof question.value === 'boolean') {
        return question.kwh;
    }
    if(question.selectOptions) { // Dropdown Question
        return question.value;
    }
    question.value = question.value.trim();
    question.value = question.value.replace(' ', '');
    question.value = parseFloat(question.value).toFixed(2);
    if(question.value > 0) { //Int question
        if(question.kwh) { // Standard question
            return question.kwh * question.value;
        }
        return question.value;  // Transportation form
    }
    console.log('Problem with question', question);
    return 0; // Something went wrong (ie. '' passed in);
};

const sumQuestionSet = questionSet => {
    let groupSum = 0;
    questionSet.forEach(question => {
        let questionTotal = getAnswerValue(question);
        groupSum += questionTotal;
    });
    return groupSum.toFixed(1);
}

const getSubcategories = questionSet => {
    let res = {};
    questionSet.forEach(question => {
        const subCategory = question['sub-grouping'] ? question['sub-grouping'] : 'other';
        if(res[subCategory]) {
            res[subCategory] += getAnswerValue(question);
        } else {
            res[subCategory] = getAnswerValue(question);
        }
    });
    return res;
};

const getAnswerFromKey = (questionSet, key) => {
    let answer = null;
    questionSet.forEach(question => {
        if(question.name === key) {
            answer = question.value;
            return;
        }
    });
    return answer;
}



const sumTransportantSet = questionSet => {


    const results = {};
    const carType = getAnswerFromKey(questionSet, 'What\'s the fuel for your car?');
    let carMpg;
    if(carType !== 'Electric') {
        carMpg = getAnswerFromKey(questionSet, 'What\'s the MPG of your car?');
    }
    const dailyMiles = getAnswerFromKey(questionSet, 'On average, how many miles do you drive for work, school, and errands each day?');
    const doesCarpool = getAnswerFromKey(questionSet, 'Do you carpool?') ? getAnswerFromKey(questionSet, 'Do you carpool?') : false;
    const numOfRoadTrips = getAnswerFromKey(questionSet, 'Within the last year, how many times did you take a roadtrip or drive for an extended distance?');
    const roadTripMiles = getAnswerFromKey(questionSet, 'How many far is your average roadtrip?');
    const doesRoadTripCarpool = getAnswerFromKey(questionSet, 'Do you usually carpool for roadtrips?') ? getAnswerFromKey(questionSet, 'Do you usually carpool for roadtrips?') : false;
    const flyMiles = getAnswerFromKey(questionSet, 'Within the last year, how many miles did you fly?');

    const carpool = doesCarpool ? 2 : 1;
    const roadTripCarpool = doesRoadTripCarpool ? 2 : 1;
    const monthlyCommuteMiles = dailyMiles * 30/carpool;
    const monthlyRoadTripMiles = (numOfRoadTrips * roadTripMiles / roadTripCarpool)/12; // 12 months/year

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
    
    const montlyFlyGas = flyMiles/(mpgPerPersonPlane * 12); // Gallons per person each month
    
    const totalMonthlyCar = totalCommuteCar + totalRoadTripCar;
    const totalMonthlyFly = montlyFlyGas * jetFuelKwh;
    const monthlyEnergyFromTransportation = totalMonthlyCar + totalMonthlyFly;

    results.carMpg = carMpg;
    results.carType = carType;
    results.carPoolWork = doesCarpool;
    results.carPoolTrips = doesRoadTripCarpool;
    results.totalMilesDriven = (monthlyCommuteMiles + monthlyRoadTripMiles).toFixed(1);
    results.monthlyRoadTrip = totalRoadTripCar.toFixed(1);
    results.monthlyCommute = totalCommuteCar.toFixed(1);
    results.monthlyCar = totalMonthlyCar.toFixed(1);
    results.monthlyFly = totalMonthlyFly.toFixed(1);
    results.transportation = monthlyEnergyFromTransportation.toFixed(1);
    return results
}

