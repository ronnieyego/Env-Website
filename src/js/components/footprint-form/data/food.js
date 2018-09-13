import ids from '../../../utils/ids/index';

const bacon = 'lol'

export const foodAnswerServings = {
    beef: {
        [ids.never]: 0,
        [ids.fewTimesPerMonth]: 0.1,
        [ids.onceAWeek]: 0.6,
        [ids.twoThreeTimesPerWeek]: 1.5,
        [ids.everyday]: 4,
    },
    chicken: {
        [ids.never]: 0,
        [ids.fewTimesPerMonth]: 0.1,
        [ids.onceAWeek]: 0.6,
        [ids.twoThreeTimesPerWeek]: 1.5,
        [ids.everyday]: 4,
    },
    pork: {
        [ids.never]: 0,
        [ids.fewTimesPerMonth]: 0.1,
        [ids.onceAWeek]: 0.6,
        [ids.twoThreeTimesPerWeek]: 1.5,
        [ids.everyday]: 4,
    },
    seafood: {
        [ids.never]: 0,
        [ids.fewTimesPerMonth]: 0.1,
        [ids.onceAWeek]: 0.6,
        [ids.twoThreeTimesPerWeek]: 1.5,
        [ids.everyday]: 4,
    },
    dairy: {
        [ids.never]: 0,
        [ids.rarely]: .5,
        [ids.onceADay]: 1.5,
        [ids.fewTimesPerDay]: 3,
        [ids.asMuchAsPossible]: 6 
    },
    cheese: {
        [ids.never]: 0,
        [ids.rarely]: .5,
        [ids.onceADay]: 1.5,
        [ids.fewTimesPerDay]: 3,
        [ids.asMuchAsPossible]: 6 
    },

    grain: {
        [ids.never]: 0,
        [ids.rarely]: .25,
        [ids.onceADay]: 1.5,
        [ids.fewTimesPerDay]: 3,
        [ids.asMuchAsPossible]: 6
    },
    fruit: {
        [ids.never]: 0,
        [ids.rarely]: .25,
        [ids.onceADay]: 1,
        [ids.fewTimesPerDay]: 2,
        [ids.asMuchAsPossible]: 6
    },
    vegetables: {
        [ids.never]: 0,
        [ids.rarely]: .25,
        [ids.onceADay]: 1.5,
        [ids.fewTimesPerDay]: 3,
        [ids.asMuchAsPossible]: 6 
    },
    junkFood: {
        [ids.never]: 0,
        [ids.rarely]: .25,
        [ids.onceADay]: 1.5,
        [ids.fewTimesPerDay]: 3,
        [ids.asMuchAsPossible]: 6
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
