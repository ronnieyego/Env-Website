// Main sources:  How bad are bannanas, ted talk on green houses, british study on apartments, and a korean study on concrete apartments.
// Brick:  http://emptyhomes.com/wp-content/uploads/2011/06/New-Tricks-With-Old-Bricks-final-12-03-081.pdf
// Concrete:  http://www.mdpi.com/2071-1050/8/6/579
// Wood https://www.youtube.com/watch?v=SQbqthgn15w

import ids from '../../../utils/ids/index';
import { getAnswerFromId, getQuestionFromId } from '../../../utils/footprint/get-question-utils';

const co2PerSqFt = {
    Brick: 100,
    Wood: 160,
    Concrete: 94
};

// Derived from concrete example.  This is all non material CO2.
// In practice, the real value will be smaller since this has non-transportation energy
const homeTypeAdjuster = {
    House: 1,
    Apartment: .98
};

// All in percent
const co2Breakdown = {
    Brick : {
        Foundation: 0.10,
        Brick: 0.65,
        Wood: 0.16,
        Plaster: 0.02,
        Electric: 0.02,
        HVAC: 0.04,
        Decor: 0.02
    },
    Wood: {
        Foundation: 0.15,
        Frame: 0.14,
        Doors:	0.15,
        HVAC: 0.07,
        Insulation: 0.14,
        Drywall: 0.08,
        Finish: 0.16,
        Floor: 0.12,
    },
    Concrete: {
        Concrete:0.72,
        Steel:0.10,
        Cement:0.08,
        Glass:0.01,
        Other: 0.09,
    }
}

const houseQuestions = [
    {    
        id: ids.homeMaterial,
        name: 'What is the primary building material of the house?',
        "selectOptions": [
            'Brick',
            'Wood',
            'Concrete'
        ],
        value: "Wood",
        type: 'dropdown',
        forms: ['house'],
        formType: 'costs'
    },
    {    
        id: ids.homeType,
        name: 'Do you live in a house or apartment?',
        "selectOptions": ['House', 'Apartment'],
        value: "House",
        type: 'dropdown',
        forms: ['house'],
        formType: 'costs'
    },
    {    
        id: ids.homeSqft,
        name: 'How many square feet is your home?',
        subtext: 'A "standard" house is about 2,500 sqft while a 2-bedroom apartment is about 1,000 sqft.',
        value: 1,
        type: 'int',
        forms: ['house'],
        formType: 'costs'
    },
];



module.exports = {
    co2PerSqFt,
    co2Breakdown,
    homeTypeAdjuster,
    houseQuestions
}
