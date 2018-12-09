// Main source:  How bad are bannanas.
// From 3 car classes and their CO2, I extrapolated CO2 by weight
// This gave a range of 7-15Lb/CO2 per lb.  From there i got the weight of each car class times the "Ruggedness" or each car.
import ids from '../../../utils/ids/index';


export const classData = {
    [ids.smartCar]: { 
        weight: 1800,
         mpg: 38
    },
    [ids.compactCar]: { 
        weight: 2979,
        mpg: 26
    },
    [ids.midsizeCar]: { 
        weight: 3497,
        mpg: 25.8
    },
    [ids.largeCar]: { 
        weight: 4366,
        mpg: 20.9
    },
    [ids.compactSuv]: { 
        weight: 3470,
        mpg: 24
    },
    [ids.midsizeSuv]: { 
        weight: 4259,
        mpg: 18.5
    },
    [ids.largeSuv]: { 
        weight: 5411,
        mpg: 13
    },
    [ids.compactTruck]: { 
        weight: 3470,
        mpg: 20
    },
    [ids.midsizeTruck]: { 
        weight: 4259,
        mpg: 18.3
    },
    [ids.largeTruck]: { 
        weight: 5411,
        mpg: 15
    }
};

export const co2PerPound = {
    [ids.leightweight]: 7.3,
    [ids.standard]: 9.1,
    [ids.luxurious]: 13.5,
    [ids.rugged]: 15.7
};

export const creationBreakdown = [ // Modified from how bad are banannas
    {name: 'Other', Phase: 20.8 },
    {name: 'Electricity', Phase: 10.6},
    {name: 'Production Equipment', Phase: 9.9 },
    {name: 'Metal processing', Phase: 10.5},
    {name: 'Metal extraction', Phase: 35.8},
    {name: 'Plastics, resins, rubber', Phase: 11.4}
]

export const carQuestions = [
    {    
        id: ids.carSize,
        name: 'What class of car do you drive?',
        "selectOptions": [
            ids.smartCar,
            ids.compactCar,
            ids.midsizeCar,
            ids.largeCar,
            ids.compactSuv,
            ids.midsizeSuv,
            ids.largeSuv,
            ids.compactTruck,
            ids.midsizeTruck,
            ids.largeTruck],
        value: ids.midsizeCar,
        type: 'dropdown',
        forms: ['car', 'transportation'],
        formType: 'costs'
    },
    {    
        id: ids.carRuggedness,
        name: 'Which of the following best describes your vehicle?',
        "selectOptions": [ids.lightweight, ids.standard, ids.luxurious, ids.rugged ],
        subtext: 'This question helps estimate the composition of your vehicle.  Rugged cars tend to use more metals and less plastic which makes them more CO2 intensive to create',
        value: "Standard",
        type: 'dropdown',
        forms: ['car', 'transportation'],
        formType: 'costs'
    },
    {    
        id: ids.carMpg,
        name: 'What\'s the MPG of your vehicle?',
        value: 25,
        type: 'int',
        forms: ['car', 'transportation'],
        formType: 'costs'
    },
    {    
        id: ids.carMileage,
        name: 'What\' the total mileage of the vehicle?',
        value: 100000,
        type: 'int',
        forms: ['car'],
        formType: 'costs'
    }
    
];
