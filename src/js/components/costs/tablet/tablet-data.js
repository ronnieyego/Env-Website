// Main sources:  Each major tech company besides Samsung has detailed environmental reports


import ids from '../../../utils/ids/index';

export const tabletCo2 = {
    ipad: {
        co2: 297,
        production:	0.86,
        transportation:	0.03,
        use: 0.1,
        recycling:	0.01
    },
    surface: {
        co2: 268.4,
        production:	0.71,
        transportation:	0.01,
        use: 0.28,
        recycling:	0.05
    },
    galaxy: {
        co2: 345.4,
        production:	0.76,
        transportation:	0.06,
        use: 0.17,
        recycling:	0.01
    },
    venue: {
        co2: 471.0,
        production:	0.71,
        transportation:	0.15,
        use: 0.14,
        recycling:	0.00 
    },
    kindle: {
        co2: 370
    },
    other: {
        co2: 345.4,
        production:	0.76,
        transportation:	0.06,
        use: 0.17,
        recycling:	0.01
    },
};

export const materialBreakdown = {
    boards:	0.46,
    lcd: 0.05,
    battery: 0.04,
    circuts: 0.13,
    other: 0.04,
    assembly: 0.14,
    transport: 0.14,
}

export const wattage = {
    use : {
        ipad: 2.98,
        surface: 4.53,
        galaxy: 4.7, // Not known.
        venue: 6.6,
        kindle: .43,
        other: 4.7 // Average.
    },
    sleep: {
        ipad: .22,
        surface: 4.5,
        galaxy: 2.7, // Not known.
        venue: 3.4,
        kindle: .43,
        other: 2.7 // Average
    }
}

export const tabletQuestions = [
    {    
        id: ids.tabletType,
        name: 'What tablet do you own?',
        "selectOptions": [
            'Apple iPad',
            'Microsoft Surface',
            'Samsung Galaxy',
            'Dell Venue',
            // 'Amazon Kindle',  Doesn't really fit data model and type
            'Other',
        ],
        value: "Apple iPad",
        type: 'dropdown',
        forms: ['tablet'],
        formType: 'costs'
    }
];

export const nameMapping = name => {
    let mapping;
    switch(name) {
        case 'Apple iPad':
            mapping = 'ipad';
            break;
        case 'Microsoft Surface':
            mapping = 'surface';
            break;
        case 'Samsung Galaxy':
            mapping = 'galaxy';
            break; 
        case 'Dell Venue':
            mapping = 'venue';
            break;
        case 'Amazon Kindle':
            mapping = kindle;
            break;
        case 'Other':
            mapping = 'other';
            break;
    }
    return mapping;
}
