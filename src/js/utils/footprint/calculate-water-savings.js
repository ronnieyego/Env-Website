import _ from 'lodash';
import getAnswer from './get-answer-from-key';

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
            amount: getAnswer(questions, 'hot-shower')/4 // They're about 4 times more efficient
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
