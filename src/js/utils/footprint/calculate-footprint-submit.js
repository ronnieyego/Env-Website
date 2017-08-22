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
    const compiledFootprint = {
        transportationData: {}
    };
    
    const applinaceQuestionSet = Object.assign(data.applianceHour,data.boolean);
    compiledFootprint.appliance = parseInt(sumQuestionSet(applinaceQuestionSet));
    compiledFootprint.applianceSubCategories = getSubcategories(applinaceQuestionSet);
    compiledFootprint.foodDaily = sumQuestionSet(data.foodQuestions);
    compiledFootprint.food = parseInt(compiledFootprint.foodDaily) * 28;
    const transportationResults = sumTransportantSet(data.transportation);
    compiledFootprint.transportation = transportationResults.transportation;

    compiledFootprint.monthlyRoadTrip = transportationResults.monthlyRoadTrip;
    compiledFootprint.monthlyCommute = transportationResults.monthlyCommute;
    compiledFootprint.monthlyCar = transportationResults.monthlyCar;
    compiledFootprint.monthlyFly = transportationResults.monthlyFly;

    compiledFootprint.totalEnergy = (parseInt(compiledFootprint.appliance) + parseInt(compiledFootprint.food) + parseInt(compiledFootprint.transportation)).toLocaleString();

    return compiledFootprint;
}

const getAnswerValue = answer => {
    if(answer.value > 0) { //Int question
        return answer.kwh * answer.value;
    } else if (answer.value) { // boolean question
         return answer.kwh;
    }
};

const sumQuestionSet = questionSet => {
    let groupSum = 0;
    Object.keys(questionSet).forEach(key => {
        let answer = questionSet[key];
        let questionTotal = getAnswerValue(answer);
        groupSum += questionTotal;
    });
    return groupSum.toFixed(1);
}

const getSubcategories = questionSet => {
    let res = {};
    Object.keys(questionSet).forEach(key => {
        let answer = questionSet[key];
        const subCategory = answer['sub-grouping'] ? answer['sub-grouping'] : 'other';
        if(res[subCategory]) {
            res[subCategory] += getAnswerValue(answer);
        } else {
            res[subCategory] = getAnswerValue(answer);
        }
    });
    return res;
};



const sumTransportantSet = answers => {
    const results = {};
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

    const totalCommuteCar = monthlyGas * gasKwh;
    const totalRoadTripCar = roadTripMonthGas * gasKwh;
    const totalMonthlyCar = totalCommuteCar + totalRoadTripCar;
    const totalMonthlyFly = montlyFlyGas * jetFuelKwh;
    const monthlyEnergyFromTransportation = totalMonthlyCar + totalMonthlyFly;

    results.monthlyRoadTrip = totalRoadTripCar.toFixed(1);
    results.monthlyCommute = totalCommuteCar.toFixed(1);
    results.monthlyCar = totalMonthlyCar.toFixed(1);
    results.monthlyFly = totalMonthlyFly.toFixed(1);
    results.transportation = monthlyEnergyFromTransportation.toFixed(1);
    return results
}

