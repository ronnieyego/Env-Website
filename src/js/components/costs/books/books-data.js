// Main source:  How bad are bannanas.
import ids from '../../../utils/ids/index';
import { getAnswerFromId, getQuestionFromId } from '../../../utils/footprint/get-question-utils';

const co2PerBook = 5.95;

const timeToReadBook = 6; // Complete guess

// Should move to own component
const electronics = {
    ereader: {
        creation: 370, // unit is lb Co2
        energy: .0004  // unit is KW
    },
    tablet: {
        creation: 400, // unit is lb Co2
        energy: .015  // unit is KW
    },
    laptop: {
        creation: 543,
        energy: .045 // ranges between 25-60
    },
    desktop: {
        creation: 754,
        energy: .105
    }
};

const booksQuestions = [
    {    
        id: ids.numberBooks,
        name: 'How many books do you own?',
        subtext: 'A 7 by 4 foot bookcase contains about 70 books.',
        value: 50,
        type: 'int',
        forms: ['books'],
        formType: 'costs'
    },
];

module.exports = {
    booksQuestions,
    co2PerBook,
    electronics,
    timeToReadBook
}
