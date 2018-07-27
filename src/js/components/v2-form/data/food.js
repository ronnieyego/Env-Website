import ids from '../../../utils/ids/index';

const bacon = 'lol'

export const foodAnswerServings = {
    beef: {
        'Never': 0,
        'A few times per month': 0.1,
        'Once a week': 0.6,
        '2-3 times per week': 1.5,
        'Everyday': 4,
    },
    chicken: {
        'Never': 0,
        'A few times per month': 0.1,
        'Once a week': 0.6,
        '2-3 times per week': 1.5,
        'Everyday': 4,
    },
    pork: {
        'Never': 0,
        'A few times per month': 0.1,
        'Once a week': 0.6,
        '2-3 times per week': 1.5,
        'Everyday': 4,
    },
    seafood: {
        'Never': 0,
        'A few times per month': 0.1,
        'Once a week': 0.6,
        '2-3 times per week': 1.5,
        'Everyday': 4,
    },
    dairy: {
        'Never': 0,
        'Rarely': .5,
        'Once a day': 1.5,
        'Few times per day': 3,
        'As much as possible': 6 
    },
    cheese: {
        'Never': 0,
        'Rarely': .5,
        'Once a day': 1.5,
        'Few times per day': 3,
        'As much as possible': 6 
    },

    grain: {
        'Never': 0,
        'Rarely': .25,
        'Once a day': 1.5,
        'Few times per day': 3,
        'As much as possible': 6
    },
    fruit: {
        'Never': 0,
        'Rarely': .25,
        'Once a day': 1,
        'Few times per day': 2,
        'As much as possible': 6
    },
    vegetables: {
        'Never': 0,
        'Rarely': .25,
        'Once a day': 1.5,
        'Few times per day': 3,
        'As much as possible': 6 
    },
    junkFood: {
        'Never': 0,
        'Rarely': .25,
        'Once a day': 1.5,
        'Few times per day': 3,
        'As much as possible': 6
    }
};

// All of these are per serving.
export const servingFacts = {
    beef: {
        calories: 213,
        co2: 5.24
    },
    chicken: {
        calories: 204,
        co2: 1.01
    },
    pork: {
        calories: 206,
        co2: 1.14
    },
    seafood: {
        calories: 144,
        co2: 1.14
    },
    grain: {
        calories: 100,
        co2: 0.23
    },
    vegetables: {
        calories: 59,
        co2: 0.5
    },
    fruit: {
        calories: 95,
        co2: 0.38
    },
    cheese: {
        calories: 170,
        co2: 1.3
    },
    dairy: {
        calories: 103,
        co2: 0.52
    },
    junkFood: {
        calories: 200,
        co2: 0.5
    }
};
