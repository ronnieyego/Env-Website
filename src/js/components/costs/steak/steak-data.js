import ids from '../../../utils/ids/index';

// Grass fed takes 170% longer to get to slaughter
// But grass feed takes no CO2 to grow.  Corn is about 10% of a cows total CO2
// 1 * .9 * 1.7 = 1.53
export const percentIncreaseForGrassFed = 1.53;

// Kobe takes 2x as long to riase
// But grass fed so reduced.  But + daily beer so lets guess 10% increase
// 10% less weight than normal cow
export const percentIncreaseForKobe = 2.42;

// Units are lb CO2 / lb cow
export const cornFedCowEmissions = 28;

// It takes about 40 lb of CO2 to transport 1 lb from china to US (38 CA and 43 NY)
export const kobeTransportCO2 = 40;

export const steakQuestions = [
    {    
        id: ids.steakWeight,
        name: 'How much does your steak weigh (oz)',
        value: 16,
        type: 'int',
        forms: ['steak'],
        formType: 'costs'
    },
    {    
        id: ids.steakFeed,
        name: 'Which of the following best describes your steak',
        subtext: 'Unless otherwise stated, the cow is likely corn fed',
        selectOptions: [
            'Grass fed',
            'Corn fed',
            'Real Kobe beef'
        ],
        value: "Corn fed",
        type: 'dropdown',
        forms: ['steak'],
        formType: 'costs'
    }
];