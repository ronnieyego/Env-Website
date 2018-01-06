import _ from 'lodash';
import { getQuestionFromKey } from './get-question-utils';

const showerSavings = questions => {
    const question = getQuestionFromKey(questions, 'hot-shower');
    if(!question) {
        return 0;
    }
    const answer = question.value;
    if (typeof answer === 'NaN') {
        return 0;
    }
    const monthlyUse = answer * question.water * 30;
    return monthlyUse/4; // They're about 4 times more efficient
}

const getWaterSavings = (res, questions) => {
    let results = [
        {
            display: 'Go vegan',
            card: true,
            amount: _.get(res, 'water.foodSubCategories.meat', 0) + _.get(res, 'water.foodSubCategories.dairy', 0)
        },
        {
            display: 'Go vegetarian',
            card: true,
            amount: _.get(res, 'water.foodSubCategories.meat', 0)
        },
        {
            display: 'Use a water saving showerhead',
            card: true,
            amount:  showerSavings(questions) 
        },
    ];

    results.map(result => {
        result.amount = parseFloat(result.amount);
        return result;
    })
    results.sort((a,b) => {
        return a.amount < b.amount
    });
    return results;
};


module.exports = {
    getWaterSavings
};
