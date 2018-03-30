// Main source:  How bad are bannanas.
import ids from '../../../utils/ids/index';
import { getAnswerFromId, getQuestionFromId } from '../../../utils/footprint/get-question-utils';

const co2PerChimney = 15.2;
const co2PerBurnerHour = 1.99;

// This is per pound.  5.333 servings per pound
const foodCo2 = {
    chicken: 5.4,
    pork: 5.0,
    beef: 27.8,
    vegetables: 2.65
}

const bbqQuestions = [
    {    
        id: ids.grillType,
        name: 'What kind of BBQ do you own?',
        "selectOptions": [
            'Propane',
            'Electric',
            'Charcoal'
        ],
        value: "Propane",
        type: 'dropdown',
        forms: ['bbq'],
        formType: 'costs'
    },
    {    
        id: ids.numberBurners,
        name: 'How many burners are you using?',
        "selectOptions": ['1', '2', '3', '4' ],
        value: "4",
        type: 'dropdown',
        forms: ['bbq'],
        formType: 'costs'
    },
    {    
        id: ids.numberChimneys,
        name: 'How many chimneys of charcoal do you use?',
        "selectOptions": ['1', '2', '3', '4' ],
        value: "1",
        type: 'dropdown',
        forms: ['bbq'],
        formType: 'costs'
    },
    {    
        id: ids.hoursGrilling,
        name: 'How many hours do you grill for?',
        value: 1,
        type: 'int',
        forms: ['bbq'],
        formType: 'costs'
    },
    {    
        id: ids.poundsChicken,
        name: 'How many pounds of chicken are you cooking?',
        value: 1,
        type: 'int',
        forms: ['bbq'],
        formType: 'costs'
    },
    {    
        id: ids.poundsPork,
        name: 'How many pounds of pork are you cooking?',
        value: 1,
        type: 'int',
        forms: ['bbq'],
        formType: 'costs'
    },
    {    
        id: ids.poundsBeef,
        name: 'How many pounds of beef are you cooking?',
        value: 1,
        type: 'int',
        forms: ['bbq'],
        formType: 'costs'
    },
    {    
        id: ids.poundsVegetables,
        name: 'How many pounds of vegetables are you cooking?',
        value: 1,
        type: 'int',
        forms: ['bbq'],
        formType: 'costs'
    },
];



module.exports = {
    bbqQuestions,
    co2PerBurnerHour,
    co2PerChimney,
    foodCo2
}
