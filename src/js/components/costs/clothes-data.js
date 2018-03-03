
const co2PerPoundOfFabric = { // Mishmash of sources see google sheet
    'Cotton':	1.848,
    'Organic Cotton':	1.18,
    'US Organic Cotton':	0.74,
    'Polyester':	3.256,
    'Demin':	13.6,
    'Leather':	11.76,
    'Rubber':	3.1
};

const weightOfClothes = { // In pounds
    'Shirt':	0.4,
    'Jeans':	1.75,
    'Running shoes':	2.25,
    'Sandals':	1.75,
    'Heels':	1.25,
    'Dress shoes':	1.875,
    'Boots':	5,
    'Dress':	0.625,
    'Underwear':	0.1,
    'Scarf':	0.375,
    'Socks':	0.125,
    'shorts':	1.0625,
    'Jacket':	2.3
};

const sizeDifference = { 
    'X-small':	-0.14,
    'Small':	-0.07,
    'Medium':	0.00,
    'Large':	0.05,
    'X-large':	0.17,
     
};

// Womens clothing weighs 69% as much as mens clothing on average.
const womenWeightDiff = 0.69;

const clothesQuestions = [
    {    
        id: 1007,
        name: 'What size do you usually buy?',
        "selectOptions": [
            'X-Small',
            'Small',
            'Medium',
            'Large',
            'X-Large'
        ],
        subtext: 'X-small uses ~25% less material than X-large clothes.',
        value: "Medium",
        type: 'dropdown',
        forms: ['clothes'],
        formType: 'costs'
    },
    {    
        id: 1017,
        name: 'Are you a girl or guy?',
        "selectOptions": [
            'Female',
            'Male'
        ],
        subtext: 'A men\'s medium is larger than a woman\'s medium.',
        value: "Female",
        type: 'dropdown',
        forms: ['clothes'],
        formType: 'costs'
    },
    {    
        id: 1011,
        name: 'What\'s the primary material for your shirts',
        "selectOptions": [
            'Cotton',
            'Organic Cotton',
            'Local Organic Cotton',
            'Polyester'
        ],
        subtext: 'If you\'re not sure if a shirt is local/organic, its not.',
        value: "Cotton",
        type: 'dropdown',
        forms: ['clothes'],
        formType: 'costs'
    },
    {    
        id: 1008,
        name: 'How many shirts do you own?',
        type: 'int',
        forms: ['clothes'],
        formType: 'costs'
    },
    {    
        id: 1009,
        name: 'How many jackets, coats, and sweaters do you own',
        type: 'int',
        forms: ['clothes'],
        formType: 'costs'
    },
    {    
        id: 1010,
        name: 'How many pants do you own?',
        value: 0,
        type: 'int',
        forms: ['clothes'],
        formType: 'costs'
    },
    {    
        id: 1012,
        name: 'How many shorts do you own?',
        value: 0,
        type: 'int',
        forms: ['clothes'],
        formType: 'costs'
    },
    {    
        id: 1013,
        name: 'How many shoes do you own?',
        value: 0,
        type: 'int',
        forms: ['clothes'],
        formType: 'costs'
    },
    {    
        id: 1014,
        name: 'What\'s the primary type of shoe you own',
        "selectOptions": [
            'Leather',
            'Sneakers',
            'Open (e.g. heels)',
            'Its a mix'
        ],
        value: "Its a mix",
        type: 'dropdown',
        forms: ['clothes'],
        formType: 'costs'
    },
    {    
        id: 1015,
        name: 'How many pairs of socks and underwear do you own?',
        value: 0,
        type: 'int',
        forms: ['clothes'],
        formType: 'costs'
    },
    {    
        id: 1016,
        name: 'How many accessories (scarves, hats, belts, gloves, etc) do you own?',
        value: 0,
        type: 'int',
        forms: ['clothes'],
        formType: 'costs'
    }
];


module.exports = {
    clothesQuestions,
    co2PerPoundOfFabric,
    sizeDifference,
    weightOfClothes,
    womenWeightDiff
}