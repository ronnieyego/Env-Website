// Main source:  How bad are bannanas.
// From 3 car classes and their CO2, I extrapolated CO2 by weight
// This gave a range of 7-15Lb/CO2 per lb.  From there i got the weight of each car class times the "Ruggedness" or each car.


const classData = {
    'Smart car': { 
        weight: 1800,
         mpg: 38
    },
    'Compact car': { 
        weight: 2979,
        mpg: 26
    },
    'Midsize car': { 
        weight: 3497,
        mpg: 25.8
    },
    'Large car': { 
        weight: 4366,
        mpg: 20.9
    },
    'Compact SUV': { 
        weight: 3470,
        mpg: 24
    },
    'Midsize SUV': { 
        weight: 4259,
        mpg: 18.5
    },
    'Large SUV': { 
        weight: 5411,
        mpg: 13
    },
    'Compact truck': { 
        weight: 3470,
        mpg: 20
    },
    'Midsize truck': { 
        weight: 4259,
        mpg: 18.3
    },
    'Large truck': { 
        weight: 5411,
        mpg: 15
    }
};

const co2PerPound = {
    'Lightweight': 7.3,
    'Standard': 9.1,
    'Luxurious': 13.5,
    'Rugged' :15.7
};

const creationBreakdown = [ // Modified from how bad are banannas
    {source: 'Other', amount: 20.8 },
    {source: 'Electricity', amount: 10.6},
    {source: 'Production Equipment', amount: 9.9 },
    {source: 'Metal processing', amount: 10.5},
    {source: 'Metal extraction', amount: 35.8},
    {source: 'Plastics, resins, rubber', amount: 11.4}
]

const carQuestions = [
    {    
        id: 1003,
        name: 'What class of car do you drive?',
        "selectOptions": [
            'Smart car',
            'Compact car',
            'Midsize car',
            'Large car',
            'Compact SUV',
            'Midsize SUV',
            'Large SUV',
            'Compact truck',
            'Midsize truck',
            'Large truck'],
        value: "Midsize car",
        type: 'dropdown',
        forms: ['car'],
        formType: 'costs'
    },
    {    
        id: 1004,
        name: 'Which of the following best descibes your vehicle?',
        "selectOptions": ['Lightweight', 'Standard', 'Luxurious', 'Rugged' ],
        subtext: 'This question helps estimate the composition of your vehicle.  Rugged cars tend to use more metals and less plastic which make them more CO2 intensive to create',
        value: "Standard",
        type: 'dropdown',
        forms: ['car'],
        formType: 'costs'
    },
    {    
        id: 1005,
        name: 'What\'s the MPG of your vehicle?',
        value: 25,
        type: 'int',
        forms: ['car'],
        formType: 'costs'
    },
    {    
        id: 1006,
        name: 'What\' the total mileage of the vehicle?',
        value: 100000,
        type: 'int',
        forms: ['car'],
        formType: 'costs'
    }
    
];



module.exports = {
    carQuestions,
    classData,
    co2PerPound,
    creationBreakdown
}




// 138891 pound wood weight of a 2 story house
// 3,812 pounds of CO2 per short ton

// 4012 oak weight per cord

// 133420 lb CO2 per house