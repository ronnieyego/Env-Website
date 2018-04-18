import ids from '../../../utils/ids/index';

// All units in LB Co2

export const laptopData = {
    apple: {
        total: 743,
        use: 106,
        production: 600,
        transportation: 28,
        recycling: 9
    },
    microsoft : {
        total: 350,
        use: 120,
        production: 222,
        transportation: 5,
        recycling: 3
    },
    dell: {
        total: 630,
        use: 146,
        production: 330,
        transportation: 110,
        recycling: 44
    },
    lenovo: {
        total: 699,
        use: 0,
        production: 521,
        transportation: 57,
        recycling: 8
    },
    average: {
        total: 605,
        use: 124,
        production: 418,
        transportation: 50,
        recycling: 16
    }
};


export const desktopData = {
    apple: {
        total: 2058,
        use: 1097,
        production: 851,
        transportation: 84,
        recycling: 25
    },
    microsoft: {
        total: 2028,
        use: 1182,
        production: 820,
        transportation: 13,
        recycling: 13
    },
    dell: {
        total: 1698,
        use: 1291,
        production: 330,
        transportation: 55,
        recycling: 22
    },
    average: {
        total: 1928,
        use: 1194,
        production: 667,
        transportation: 51,
        recycling: 24
    }
};

export const tabletData = {
    apple: {
        total: 297,
        production:	255,
        transportation:	9,
        use: 30,
        recycling:	3
    },
    microsoft: {
        total: 268.4,
        production:	191,
        transportation:	3,
        use: 75,
        recycling:	13
    },
    samsung: {  // Should be recalculated with device weight and wattage
        total: 345.4,
        production:	263,
        transportation:	21,
        use: 59,
        recycling:	3
    },
    dell: {
        total: 471.0,
        production:	334,
        transportation:	66,
        use: 70,
        recycling:	0.00 
    },
    amazon: {
        total: 370
    },
    average: {
        total: 346,
        production:	263,
        transportation:	21,
        use: 59,
        recycling:	3
    },
};

export const phoneData = {
    apple: {
        total: 114,
        use: 10,
        production: 98,
        transportation: 5,
        recycling: 1
    },
    samsung: {
        total: 215,
        use: 9,
        production: 200,
        transportation: 5,
        recycling: 1
    },
    microsoft: {
        total: 46,
        use: 14,
        production: 27,
        transportation: 5,
        recycling: 0
    },
    nokia: {
        total: 24,
        use: 13,
        production: 8,
        transportation: 3,
        recycling: 0
    },
    google: {
        total: 129,
        use: 9,
        production: 111,
        transportation: 8,
        recycling: 0
    },
    average: {
        total: 103,
        use: 9,
        production: 87,
        transportation: 4,
        recycling: 2
    }
};

export const computerQuestions = [
    {    
        id: ids.computerType,
        name: 'What kind of device do you own?',
        "selectOptions": [
            'Laptop',
            'Desktop',
            'Tablet',
            'Phone'
            ],
        value: "Laptop",
        type: 'dropdown',
        forms: ['computer'],
        formType: 'costs'
    },
    {    
        id: ids.computerBrand,
        name: 'What\'s the brand name?',
        "selectOptions": [
            'Apple',
            'Microsoft',
            'HP',
            'Dell',
            'Lenovo',
            'Sony',
            'Other'
            ],
        value: "Apple",
        type: 'dropdown',
        forms: ['computer'],
        formType: 'costs'
    },
    {    
        id: ids.phoneBrand,
        name: 'What brand of phone do you have?',
        "selectOptions": [
            'Apple',
            'Samsung',
            'Nokia',
            'Google',
            'Microsoft',
            'Other'
            ],
        value: "Apple",
        type: 'dropdown',
        forms: ['computer'],
        formType: 'costs'
    }
];
