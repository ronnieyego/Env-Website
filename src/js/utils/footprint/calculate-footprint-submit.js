// This util takes in data and calculates your energy footprint.  Yay!
const daysInMonth = 30;
const gasKwh = 34.4;
const jetFuelKwh = 37.12;


module.exports = function(data, metaData) {
    // Calculate hourly
    // expected data structure
    // data: {
    //     applianceHour: {},
    //     boolean: {}
    //     ...
    // }
    const compiledFootprint = {};
    
    compiledFootprint.applianceDaily = sumQuestionSet(data.applianceHour);
    compiledFootprint.applianceMonthly = sumQuestionSet(data.boolean);
    compiledFootprint.food = sumQuestionSet(data.foodQuestions);
    compiledFootprint.transportation = sumTransportantSet(data.transportation);

    return compiledFootprint;
}

const sumQuestionSet = questionSet => {
    let groupSum = 0;
    Object.keys(questionSet).forEach(key => {
        let answer = questionSet[key];
        let questionTotal = 0;
        if(answer.value > 0) { //Int question
            questionTotal = answer.kwh * answer.value;
        } else if (answer.value) { // boolean question
            questionTotal = answer.kwh;
        }
        
        groupSum += questionTotal;
    });
    return groupSum.toFixed(1);
}

const sumTransportantSet = answers => {
    const carMpg = answers['Whats the MPG of you car?'].value;
    const dailyMiles = answers['On average, how many miles do you drive for work, school, and errands each day?'].value;
    const doesCarpool = answers['Do you carpool?'] ? answers['Do you carpool?'].value : false;
    const numOfRoadTrips = answers['Within the last year, how many times did you take a roadtrip or drive for an extended distance?'].value;
    const roadTripMiles = answers['How many far is your average roadtrip?'].value;
    const doesRoadTripCarpool = answers['Do you usually carpool for roadtrips?'] ? answers['Do you usually carpool for roadtrips?'].value : false;
    const flyMiles = answers['Within the last year, how many miles did you fly?'].value;

    const carpool = doesCarpool ? 2 : 1;
    const monthlyGas = dailyMiles * 30/(carMpg * carpool);
    const roadTripCarpool = doesRoadTripCarpool ? 2 : 1;
    const roadTripMonthGas =  (numOfRoadTrips * roadTripMiles / (carMpg * roadTripCarpool))/12; // 12 months/year
    const montlyFlyGas = flyMiles/12;

    const totalMonthlyCar = (monthlyGas + roadTripMonthGas) * gasKwh;
    const totalMonthlyFly = montlyFlyGas * jetFuelKwh;
    const monthlyEnergyFromTransportation = totalMonthlyCar + totalMonthlyFly;

    return monthlyEnergyFromTransportation.toFixed(1);
    
}

