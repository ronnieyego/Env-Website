import ids from '../../utils/ids/index';

export default [
    {
        name: 'How many other people do you live with?',
        type: 'int',
        hoverText: 'There\'s significant efficiencies on heating, cooking, and utilities by living with others.',
        value: '0',
        forms: ['household-home'],
        id: ids.liveWith
    },
    {
        name: 'When was your home built?',
        type: 'dropdown',
        selectOptions: [
            'After 2000',
            '1970-2000',
            '1930-1970',
            'Before 1930',
        ],
        hoverText: 'This question will help determine the materials used to build this house and how well it retains heat.',
        value: '1930-1970',
        forms: ['household-home'],
        id: ids.homeAge
    },

    // Activities question
    {
        name: 'How many hours a day are you at home (ignoring sleep)?',
        type: 'int',
        subtext: 'The goal of this question is to measure how much electricity you use at home.',
        forms: ['household-activities'],
        id: ids.hoursAtHome,
        value: 6
    },
    {
        name: 'How often do you cook at home?',
        type: 'dropdown',
        selectOptions: [
            'Most nights',
            '2-3 times per week',
            'Once a week',
            'Less than once a week'
        ],
        value: '2-3 times per week',
        forms: ['household-activities'],
        id: ids.cookingFrequency
    },
    {
        name: 'Do you shower every day?',
        type: 'bool',
        value: 'off',
        checked: false,
        forms: ['household-activities'],
        id: ids.showEveryday
    },
    {
        name: 'How many loads of laundry do you do each month?',
        type: 'int',
        value: '0',
        id: ids.laundryMonth,
        forms: ['household-activities'],
        validation: 'standard-int'
    },
    {
        name: 'Do you usually play music at home?',
        type: 'bool',
        value: 'off',
        checked: false,
        forms: ['household-activities'],
        id: ids.playMusicHome
    },
    {
        name: 'How many hours are you on the computer each day?',
        type: 'int',
        value: '0',
        id: ids.hoursComputer,
        forms: ['household-activities'],
        validation: 'hourQuestion'
    },

// Heating cooling
    {
        name: 'How insulated is your home?',
        type: 'dropdown',
        selectOptions: [
            'Extremely Insulated',
            'Reasonably Insulated',
            'Somewhat Insulated',
            'Poorly Insulated'
        ],
        value: 'Reasonably Insulated',
        answerText: [
            'There are no cracks in the envelope of your home.  Your windows are double payne and doors have a weather strip.  If you have an attic/crawlspace,  there is insulation.',
            'Your home was likely built after 1950.  Your windows are single payne and doors have a small gap to the outside.',
            'Your home has small cracks to the outside in places.  Your windows might rattle a bit and you can see a gap beneath your door.',
            'You can sometimes feel a draft through your house.  Your windows rattle a bit and a lot of light/air seeps in through your door.'
        ],
        forms: ['household-temperature'],
        hintText: 'This helps calculate how much additionaly heating/cooling your home needs.',
        id: ids.homeInsulation
    },
    {
        name: 'What temperature do you keep your home in the winter (use Fahrenheit)?',
        type: 'int',
        value: '70',
        forms: ['household-temperature'],
        validator: 'home-temp',
        id: ids.winterTemp
    },
    {
        name: 'Do you heat your entire home or just a part of it?',
        type: 'dropdown',
        selectOptions: [
            'Entire home',
            'Some rooms',
            'Just my current room'
        ],
        value: 'Entire home',
        forms: ['household-temperature'],
        id: ids.heatWholeHouse
    },
    {
        name: 'How much of your home is covered by radiant flooring?',
        type: 'dropdown',
        selectOptions: [
            'Entire home',
            'Most rooms',
            'Half of rooms',
            'Quarted of rooms',
        ],
        value: 'Entire home',
        forms: ['household-temperature'],
        id: ids.heatWholeHouseRadiantFlooring
    },
    {
        name: 'Do you cool your entire home or just a part of it?',
        type: 'dropdown',
        selectOptions: [
            'Entire home',
            'Some rooms',
            'Just my current room'
        ],
        value: 'Entire home',
        forms: ['household-temperature'],
        id: ids.coolWholeHouse
    },
    {
        name: 'What temperature do you keep your home in the summer (use Fahrenheit)?',
        type: 'int',
        value: '80',
        forms: ['household-temperature'],
        validator: 'home-temp',
        id: ids.summerTemp
    },
    {
        name: 'What type of heating system do you have?',
        type: 'dropdown',
        selectOptions: [
            'Radiant floors',
            'Heat pump',
            'Gas Vents',
            'Radiator',
            'None'
        ],
        value: 'Gas Vents',
        forms: ['household-temperature'],
        id: ids.heatingSystem
    },
    {
        name: 'What type of cooling system do you have?',
        type: 'dropdown',
        selectOptions: [
            'Central AC',
            'Window Mount AC',
            'Lots of Fans',
            'None'
        ],
        value: 'Window Mount AC',
        answerText: [
            'This is one large AC unit connected to your HVAC.  It cools the entire house at once',
            'This assumes that you have a few smaller AC units that are on while you\'re home',
            'This assumes you have a fan for most rooms in your home.'
        ],
        forms: ['household-temperature'],
        id: ids.coolingSystem
    },
    {
        name: 'Do you use a portable heater in the winter?',
        type: 'bool',
        value: 'off',
        checked: false,
        forms: ['household-temperature'],
        id: ids.usesPortableHeater
    },
    {
        name: 'Do you use a personal fan in the summer?',
        type: 'bool',
        value: 'off',
        checked: false,
        forms: ['household-temperature'],
        id: ids.usesFan
    },
];
