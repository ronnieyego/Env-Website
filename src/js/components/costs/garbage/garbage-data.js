import ids from '../../../utils/ids/index';

// https://www3.epa.gov/ttnecas1/regdata/EIAs/LandfillsNSPSProposalEIA.pdf	

const GARBAGE_FACTS = {
    // All Million Tons
    total: 250,
    landfill: 136,
    recycled: 65,
    composted: 20,
    burned: 29,
    
};

const kwhPerPound = 0.029; // KWH generated per pound of waste
const transportCo2 = 0.0007233003012; // LB CO2 per LB/Mile


const garbageQuestions = [
    {    
        id: ids.poundsOfGarbage,
        name: 'How much garbage do you generate every week?',
        subtext: 'The average person produces about 30 pounds per week.',
        value: "30",
        type: 'int',
        forms: ['garbage'],
        formType: 'costs'
    },
    {    
        id: ids.distanceToLandfill,
        name: 'How close do you live to your landfill',
        selectOptions: [
            ids.noIdea,
            ids.under100Miles,
            ids.oneHundredTwoHundredMiles,
            ids.over200Miles
            ],
        value: "No idea",
        answerText: [
            'No worries.  Most people don\'t know where their trash goes.  We\'re going to guess about 200 miles.',
            '',
            '',
            ''
        ],
        type: 'dropdown',
        forms: ['garbage'],
        formType: 'costs'
    },
    {    
        id: ids.landfillMethaneCapture,
        name: 'Does the landfill capture methane?',
        hoverText: 'Some landfills capture escaping methane and burn it to produce energy.',
        type: 'bool',
        value: 'off',
        checked: false,
        forms: ['food'],
    }
];

module.exports= {
    GARBAGE_FACTS,
    garbageQuestions,
    kwhPerPound,
    transportCo2
}