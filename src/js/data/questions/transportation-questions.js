import ids from '../../utils/ids/index';

export default [
    {
        name: 'Do you drive?',
        type: 'bool',
        forms: ['transportation'],
        value: 'on',
        id: ids.doesDrive
    },
    {
        name: 'About how many miles do you drive each month?',
        type: 'int',
        subtext: 'This should include your commute, errands, and road trips.',
        hoverText: 'The average American drives around 1,000 miles each month.  Women drive about 30% les than men.',
        forms: ['transportation'],
        id: ids.milesDrivenMonth,
        value: 1000
    },
    {
        name: 'What\'s the fuel for your car?',
        selectOptions: [
            'Gasoline',
            'Diesel',
            'Electricity'
        ],
        value: 'Gasoline',
        type: 'dropdown',
        forms: ['transportation'],
        id: ids.carFuel
    },
    {
        name: 'How often do you carpool?',
        selectOptions: [
            'Never',
            'Just to and from work',
            'Most of the time',
            'Always',
        ],
        type: 'dropdown',
        forms: ['transportation'],
        id: ids.carpoolFrequency
    },
    {
        name: 'Did you take any public transit in the last month?',
        type: 'bool',
        forms: ['transportation'],
        value: 'on',
        id: ids.doesPublicTransit
    },
    {
        name: 'How many miles do you bus each month?',
        type: 'int',
        forms: ['transportation'],
        value: 0,
        id: ids.milesBusMonth
    },
    {
        name: 'How many miles do you ride on the train/subway each month?',
        type: 'int',
        forms: ['transportation'],
        value: 0,
        id: ids.milesTrainMonth
    },
    {
        name: 'Within the last year, how many miles did you fly?',
        belowText: 'The US is about 3,000 miles wide and 1,000 miles long.',
        belowText2: 'Its about 5,500 miles from LA to Tokyo and 3,500 from New York to Paris',
        hoverText: 'Planes get about 90 mpg per person!',
        type: 'int',
        forms: ['transportation'],
        value: 0,
        id: ids.milesFlyYear
    }
];
