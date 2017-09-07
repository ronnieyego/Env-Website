// This util takes in data and calculates your energy footprint.  Yay!
const daysInMonth = 30;
const gasKwh = 34.4;
const jetFuelKwh = 37.12;
const mpgPerPersonPlane = 84.9;

module.exports = function(data, metaData) {
    const compiledFootprint = {
        transportationData: {}
    };

    // console.log('Questions with values', JSON.stringify(data, null, 2));
    const applinaceQuestionSet = Object.assign(data.applianceHour,data.household);
    compiledFootprint.appliance = parseInt(sumQuestionSet(applinaceQuestionSet));
    compiledFootprint.applianceSubCategories = getSubcategories(applinaceQuestionSet);
    compiledFootprint.food = parseInt(sumQuestionSet(data.foodQuestions)) * 28;
    compiledFootprint.foodSubCategories = getSubcategories(data.foodQuestions);
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
    if(answer.value === ''){
        return 0;
    }
    if(typeof answer.value === 'boolean') {
        return answer.kwh;
    }
    answer.value = answer.value.trim();
    answer.value = answer.value.replace(' ', '');
    answer.value = parseFloat(answer.value).toFixed(2);
    if(answer.value > 0) { //Int question
        if(answer.kwh) { // Standard question
            return answer.kwh * answer.value;
        }
        return answer.value;  // Transportation form
    }
    console.log('Problem with answer', answer);
    return 0; // Something went wrong (ie. '' passed in);
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
    const carMpg = getAnswerValue(answers['Whats the MPG of you car?']);
    const dailyMiles = getAnswerValue(answers['On average, how many miles do you drive for work, school, and errands each day?']);
    const doesCarpool = answers['Do you carpool?'] ? getAnswerValue(answers['Do you carpool?']) : false;
    const numOfRoadTrips = getAnswerValue(answers['Within the last year, how many times did you take a roadtrip or drive for an extended distance?']);
    const roadTripMiles = getAnswerValue(answers['How many far is your average roadtrip?']);
    const doesRoadTripCarpool = answers['Do you usually carpool for roadtrips?'] ? getAnswerValue(answers['Do you usually carpool for roadtrips?']) : false;
    const flyMiles = getAnswerValue(answers['Within the last year, how many miles did you fly?']);

    const carpool = doesCarpool ? 2 : 1;
    const monthlyGas = dailyMiles * 30/(carMpg * carpool); // unit is gallons
    const roadTripCarpool = doesRoadTripCarpool ? 2 : 1;
    const roadTripMonthGas =  (numOfRoadTrips * roadTripMiles / (carMpg * roadTripCarpool))/12; // 12 months/year
    const montlyFlyGas = flyMiles/(mpgPerPersonPlane * 12); // Gallons per person each month

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

