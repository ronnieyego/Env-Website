// Most pet food breakdown came from https://www.dogfoodadvisor.com/dog-food-reviews/dry/
// I got a breakdown of meat vs carbs from that and assumed there was a proportional breakdown of meat (https://www.meatinstitute.org/index.php?ht=d/sp/i/47465/pid/47465)
// From there I used exist meat Co2 derivations to get co2 per pet food

import ids from '../../../utils/ids/index';

export const petFoodCo2 = {
    Dry: {
        'Premium/Expensive': {
            co2: 9.13,
            meatPercent: .75
        },
        'Cheapest Option': {
            co2: 5.87,
            meatPercent: .4
        },
        Average: {
            co2: 7.16,
            meatPercent: .55
        }
    },
    Wet: {
        'Premium/Expensive': {
            co2: 10.82,
            meatPercent: .91
        },
        'Cheapest Option': {
            co2: 9.2,
            meatPercent: .75
        },
        Average: {
            co2: 9.76,
            meatPercent: .81
        }
    },
    Mix: {
        'Premium/Expensive': {
            co2: 9.98,
            meatPercent: .85
        },
        'Cheapest Option': {
            co2: 7.5,
            meatPercent: .58
        },
        Average: {
            co2: 8.46,
            meatPercent: .68
        }
    },
    Hamster: 1.23, // Same as grain,
    Gecko: 0.01, // 3 crickets a day at 4lb co2 /lb cricket  Super low
    Turtle: 6.5
};

// https://www.themandaringarden.com/cost-to-run-fish-tank.html
// Heating is only on for 1/4 of the day
export const turtleTank = {
    '10 Gallons': {
        filter: 5,
        heating: 12.5
    },
    '20 Gallons': {
        filter: 7.5,
        heating: 19
    },
    '30-50 Gallons': {
        filter: 10,
        heating: 25
    },
    '50-100 Gallons': {
        filter: 15,
        heating: 50
    }
};

export const foodPerDayByAnimal = {
    Cat: .2,
    Hamster: .03125,
    Gecko: .05,
    Turtle: .062
}

export const getLbFoodFromWeight = petWeight => {
    // Returns pounds of food
    if(petWeight === '0-10 pounds')
        return .125;
    else if (petWeight === '10-25 pounds')
        return .25
    else if (petWeight === '25-50 pounds')
        return .375
    else if (petWeight === '50-75 pounds')
        return .563
    else if (petWeight === 'Over 75 pounds')
        return .75
    else
        console.log('Error in getLbFoodFromWeight().  Could not get how much a doggo/kitteh eats');
};

export const lifeExpectancy = {
    Cat: 15,
    Dog: {
        '0-10 pounds': 13,
        '10-25 pounds': 12,
        '25-50 pounds': 11,
        '50-75 pounds': 10,
        'Over 75 pounds': 9,
    },
    Hamster: 3,
    Gecko: 8,
    Turtle: 40
}

export const petQuestions = [
    {    
        id: ids.petType,
        name: 'What type of pet do you own?',
        "selectOptions": [
            'Dog',
            'Cat',
            'Turtle',
            'Hamster',
            'Gecko'
        ],
        value: "Dog",
        type: 'dropdown',
        forms: ['pet'],
        formType: 'costs'
    },
    {    
        id: ids.petWeight,
        name: 'How much does she/he weigh?',
        "selectOptions": [
            '0-10 pounds',
            '10-25 pounds',
            '25-50 pounds',
            '50-75 pounds',
            'Over 75 pounds',
        ],
        value: "10-25 pounds",
        type: 'dropdown',
        forms: ['pet'],
        formType: 'costs'
    },
    {    
        id: ids.petFood,
        name: 'What kind of pet food do you buy?',
        "selectOptions": [
            'Premium/Expensive',
            'Average',
            'Cheapest Option'
        ],
        value: "Average",
        type: 'dropdown',
        forms: ['pet'],
        formType: 'costs'
    },
    {    
        id: ids.catFoodType,
        name: 'Do you usually feed you cat wet food or dry food?',
        "selectOptions": [
            'Wet',
            'Dry',
            'Mix'
        ],
        value: "Wet",
        type: 'dropdown',
        forms: ['pet'],
        formType: 'costs'
    },
    {    
        id: ids.turtleTankSize,
        name: 'How big is your turtle\'s tank?',
        "selectOptions": [
            '10 Gallons',
            '20 Gallons',
            '30-50 Gallons',
            '50-100 Gallons',
        ],
        value: "20 Gallons",
        type: 'dropdown',
        forms: ['pet'],
        formType: 'costs'
    },
    {    
        id: ids.petHeatingLamp,
        name: 'Do you have a heating lamp?',
        "selectOptions": [
            'Yes',
            'No'
        ],
        value: "Yes",
        type: 'dropdown',
        forms: ['pet'],
        formType: 'costs'
    },
    {
        id: ids.userState,
        type: 'user-state',
        forms: ['pet', 'tv', 'package']
    }
];