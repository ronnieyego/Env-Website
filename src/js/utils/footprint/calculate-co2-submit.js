import getAnswerFromKey from './get-answer-from-key';

const co2PerGallonOfGas = 19.6;
const co2PerGallonOfJetFuel = 21.1;
const mpgPerPersonPlane = 84.9;

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
        return question.co2 * question.value;
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
        return (question.kwh * question.value *  stateCo2);
    }
    console.log('Problem with co2/appliance question', question);
    return 0; // Something went wrong (ie. '' passed in);
};

const sumTransportationSet = (transportatioSet, stateCo2) => {
    const results = {};
    const carType = getAnswerFromKey(transportatioSet, 'What\'s the fuel for your car?');
    let carMpg;
    if(carType !== 'Electric') {
        carMpg = getAnswerFromKey(transportatioSet, 'What\'s the MPG of your car?');
    }
    const dailyMiles = getAnswerFromKey(transportatioSet, 'On average, how many miles do you drive for work, school, and errands each day?');
    const doesCarpool = getAnswerFromKey(transportatioSet, 'Do you carpool?') ? getAnswerFromKey(transportatioSet, 'Do you carpool?') : false;
    const numOfRoadTrips = getAnswerFromKey(transportatioSet, 'Within the last year, how many times did you take a roadtrip or drive for an extended distance?');
    const roadTripMiles = getAnswerFromKey(transportatioSet, 'How many far is your average roadtrip?');
    const doesRoadTripCarpool = getAnswerFromKey(transportatioSet, 'Do you usually carpool for roadtrips?') ? getAnswerFromKey(transportatioSet, 'Do you usually carpool for roadtrips?') : false;
    const flyMiles = getAnswerFromKey(transportatioSet, 'Within the last year, how many miles did you fly?');

    const carpool = doesCarpool ? 2 : 1;
    const roadTripCarpool = doesRoadTripCarpool ? 2 : 1;
    const monthlyCommuteMiles = dailyMiles * 30/carpool;
    const monthlyRoadTripMiles = (numOfRoadTrips * roadTripMiles / roadTripCarpool)/12; // 12 months/year

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
    
    const montlyFlyGas = flyMiles/(mpgPerPersonPlane * 12); // Gallons per person each month
    const totalMonthlyFlyCo2 = montlyFlyGas * co2PerGallonOfJetFuel;
    const totalMonthlyCarCo2 = totalCommuteCarCo2 + totalRoadTripCarCo2;
    const monthlyCo2FromTransportation = totalMonthlyCarCo2 + totalMonthlyFlyCo2;

    results.carMpg = carMpg;
    results.totalMilesDriven = Math.round((monthlyCommuteMiles + monthlyRoadTripMiles) * 100)/100;
    results.monthlyCar = Math.round(totalMonthlyCarCo2 * 100)/100;
    results.monthlyCommute = Math.round(totalCommuteCarCo2 * 100)/100;
    results.monthlyRoadTrip = Math.round(totalRoadTripCarCo2 * 100)/100;
    results.monthlyFly = Math.round(totalMonthlyFlyCo2 * 100)/100;
    results.monthlyCo2FromTransportation = Math.round(monthlyCo2FromTransportation * 100)/100;

    return results;
}


module.exports = {
    getApplianceSubcategories,
    getFoodSubcategories,
    sumCo2QuestionSet
}