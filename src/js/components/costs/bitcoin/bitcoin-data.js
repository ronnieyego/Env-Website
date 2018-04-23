// Main source: http://www.wired.co.uk/article/how-much-energy-does-bitcoin-mining-really-use
// I used it to reference other sources

import ids from '../../../utils/ids/index';
import { getAnswerFromId, getQuestionFromId } from '../../../utils/footprint/get-question-utils';


export const bitcoinKwh = {
    High: 929,
    Medium: 498,
    Low: 67
};

export const bitcoinQuestions = [
    {    
        id: ids.bitcoinEstimateType,
        name: 'Which estimate do you want to use?',
        "selectOptions": ['High', 'Medium', 'Low'],
        value: "Medium",
        type: 'dropdown',
        forms: ['bitcoin'],
        formType: 'costs'
    }
];