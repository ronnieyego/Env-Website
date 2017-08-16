// This util takes in data and calculates your energy footprint.  Yay!
const daysInMonth = 30;

export default function(data, metaData) {
    // Calculate hourly
    // expected data structure
    // data: {
    //     applianceHour: {},
    //     boolean: {}
    //     ...
    // }
    const compiledFootprint = {};
    console.log('Inside calulating footprint');
    
    compiledFootprint.dailyUse = sumQuestionSet(data.applianceHour);
    compiledFootprint.monthlyUse = sumQuestionSet(data.boolean);
    compiledFootprint.food = sumQuestionSet(data.foodQuestions);

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
