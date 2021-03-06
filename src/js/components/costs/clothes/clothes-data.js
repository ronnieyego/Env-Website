import ids from '../../../utils/ids/index';

export const co2PerPoundOfFabric = { // Mishmash of sources see google sheet
    'Cotton':	1.848,
    'Organic Cotton':	1.18,
    'Local Organic Cotton':	0.74,
    'Polyester':	3.256,
    'Demin':	13.6,
    'Leather':	11.76,
    'Rubber':	3.1
};

export const weightOfClothes = { // In pounds
    'shirt':	0.4,
    'jeans':	1.75,
    'dress':	0.625,
    'socks':	0.125,
    'underwear':	0.125,
    'scarf':	0.375,
    'shorts':	1.0625,
    'jacket':	2.3,
    'tights':   0.125,
    'pants-average': 1,
// Shoes
    'Dress Shoes':	1.875,
    'Boots':	4,
    'Sneakers':	2.25,
    'Sandals':	1.75,
    'Open (e.g. heels and flats)':	1.25,
    'Its a mix of shoes': (1.25 + 2.25 + 4 + 1.875 + 1.75)/5 // All other shoes averaged
};

export const sizeDifference = { 
    'X Small':	0.86,
    'Small':	0.93,
    'Medium':	1.00,
    'Large':	1.05,
    'X Large':	1.17,
};

export const pantsMaterial = {
    'Mostly demin': {
        weight: weightOfClothes.jeans,
        co2: co2PerPoundOfFabric.Demin
    },
    'Mostly synthetic': {
        weight: weightOfClothes.jeans,
        co2: co2PerPoundOfFabric.Polyester
    },
    'Mostly cotton/nylon': {
        weight: weightOfClothes.tights,
        co2: co2PerPoundOfFabric.Cotton
    },
    'Its a mix': {
        weight: weightOfClothes['pants-average'],
        co2: (co2PerPoundOfFabric.Demin + co2PerPoundOfFabric.Cotton + co2PerPoundOfFabric.Polyester)/3
    }
}

// Womens clothing weighs 69% as much as mens clothing on average.
export const womenWeightDiff = 0.69;

// A shoe is roughly 8% rubber by weight
export const percentShoeIsRubber = .08

export const clothesQuestions = [
    {    
        id: ids.shirtsOwn,
        name: 'How many shirts do you own?',
        type: 'int',
        value: 0,
        forms: ['clothes'],
        formType: 'costs'
    },
    {    
        id: ids.shirtPrimaryMaterial,
        name: 'What\'s the primary material for your shirts?',
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
        id: ids.jacketsOwn,
        name: 'How many jackets, coats, and sweaters do you own?',
        type: 'int',
        value: 0,
        forms: ['clothes'],
        formType: 'costs'
    },
    {    
        id: ids.pantsOwn,
        name: 'How many pants do you own?',
        value: 0,
        type: 'int',
        forms: ['clothes'],
        formType: 'costs'
    },
    {    
        id: ids.shortsOwn,
        name: 'How many shorts do you own?',
        value: 0,
        type: 'int',
        forms: ['clothes'],
        formType: 'costs'
    },
    {    
        id: ids.shortsPrimaryMaterial,
        name: 'What\'s the primary material for your pants/shorts?',
        "selectOptions": [
            'Mostly demin',
            'Mostly synthetic',
            'Mostly cotton/nylon',
            'Its a mix'
        ],
        subtext: 'Khakis are synthetic.  Tights are cotton/nylon.',
        value: 'Mostly demin',
        type: 'dropdown',
        forms: ['clothes'],
        formType: 'costs'
    },
    {    
        id: ids.shoesOwn,
        name: 'How many shoes do you own?',
        value: 0,
        type: 'int',
        forms: ['clothes'],
        formType: 'costs'
    },
    {    
        id: ids.shoeType,
        name: 'What\'s the primary type of shoe you own?',
        "selectOptions": [
            'Dress Shoes',
            'Sneakers',
            'Sandals',
            'Boots',
            'Open (e.g. heels and flats)',
            'Its a mix of shoes'
        ],
        value: "Sneakers",
        type: 'dropdown',
        forms: ['clothes'],
        formType: 'costs'
    },
    {    
        id: ids.socksOwn,
        name: 'How many pairs of socks and underwear do you own?',
        value: 0,
        type: 'int',
        forms: ['clothes'],
        formType: 'costs'
    },
    {    
        id: ids.accessoriesOwn,
        name: 'How many accessories (scarves, hats, belts, gloves, etc) do you own?',
        value: 0,
        type: 'int',
        forms: ['clothes'],
        formType: 'costs'
    },
    {    
        id: ids.clothesSize,
        name: 'What size do you usually buy?',
        "selectOptions": [
            'X Small',
            'Small',
            'Medium',
            'Large',
            'X Large'
        ],
        subtext: 'X-small uses ~25% less material than X-large clothes.',
        value: "Medium",
        type: 'dropdown',
        forms: ['clothes'],
        formType: 'costs'
    },
    {    
        id: ids.yourGender,
        name: 'Are you a girl or guy?',
        "selectOptions": [
            'Female',
            'Male'
        ],
        subtext: 'Men\'s clothes are larger than women\'s clothes.',
        value: "Female",
        type: 'dropdown',
        forms: ['clothes'],
        formType: 'costs'
    },
];
