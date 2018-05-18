// most wattage came from here http://www.energy.ca.gov/appliances/2009_tvregs/documents/2009-09-25_TV_Model_List.pdf
// broken down by type

import ids from '../../../utils/ids/index';

export const embodiedCo2PerInch = 9.03;
export const transportationCo2PerInch = 3.5;
export const wattagePerInch = {
    LCD: 4.3,
    Plasma: 3.22,
    Other: 3.05,
    Average: 3.3
};

export const tvLife = { // hours
    LCD: 60000,
    Plasma: 100000,
    Other: 80000,
    Average: 80000
}

export const tvQuestions = [
    {    
        id: ids.tvSize,
        name: 'How big is your TV?',
        subtext: 'This is the diagonal length of the tv.  Its likely between 35" and 80".',
        value: 50,
        type: 'int',
        forms: ['tv'],
        formType: 'costs',
        validator: 'tv-size'
    },
    {    
        id: ids.tvType,
        name: 'What type of TV do you own?',
        "selectOptions": [
            'LCD',
            'Plasma',
            'Other'
        ],
        value: "LCD",
        type: 'dropdown',
        forms: ['tv'],
        formType: 'costs'
    },
    {    
        id: ids.tvWatchHours,
        name: 'About how many hours a day do you watch TV?',
        value: 4,
        type: 'int',
        forms: ['tv'],
        formType: 'costs',
        validator: 'hour-question'
    },
    {    
        id: ids.tvKnowWattage,
        name: 'Do you know its wattage?',
        "selectOptions": [
            'Yes',
            'No'
        ],
        value: "No",
        type: 'dropdown',
        forms: ['tv'],
        formType: 'costs'
    },
    {    
        id: ids.tvWattage,
        name: 'What is the wattage of your TV?',
        value: 100,
        type: 'int',
        forms: ['tv'],
        formType: 'costs',
        validator: 'tv-wattage'
    }
    
];