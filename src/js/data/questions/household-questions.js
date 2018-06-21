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
        value: '0',
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
        name: 'Do you cook most nights?',
        type: 'bool',
        value: 'off',
        checked: false,
        forms: ['household-activities'],
        id: ids.doesCook
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
        name: 'What temperature do you keep your home in the winter (use Fahrenheit)?',
        type: 'int',
        value: '70',
        forms: ['household-temperature'],
        validator: 'home-temp',
        id: ids.winterTemp
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
            'Central gas HVAC',
            'Electric radiator'
        ],
        value: 'Central gas HVAC',
        forms: ['household-temperature'],
        id: ids.heatingSystem
    },
    {
        name: 'What type of cooling system do you have?',
        type: 'dropdown',
        selectOptions: [
            'Central AC',
            'Window Mount AC',
            'Lots of Fans'
        ],
        value: 'Window Mount AC',
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
