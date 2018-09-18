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

const transportCo2 = 0.0007233003012; // LB CO2 per LB/Mile
const co2Landfill = 0.51; // Lb Co2 per Lb trash.  Mostly from CO2 and methane
const kwhPerPound = 0.058;  // kwh per lb trash if methane capture.
const averageCo2PerPoundGarbage = 0.6; // TODO: Estimated.  Need to fix


const garbageQuestions = [
    {    
        id: ids.poundsOfGarbage,
        name: 'How much garbage do you generate every week?',
        subtext: 'This is whatever gets put in the garbage bin.  It excludes recycling and compost.  The average person produces about 30 pounds per week.',
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
        value: ids.noIdea,
        answerText: [
            'No worries.  Most people don\'t know where their trash goes.  We\'re going to guess about 200 miles.',
            '',
            '',
            ''
        ],
        index: 0,
        type: 'dropdown',
        forms: ['garbage'],
        formType: 'costs'
    },
    {    
        id: ids.landfillMethaneCapture,
        name: 'Does the landfill capture methane?',
        hoverText: 'Most (75%) landfills capture escaping methane and burn it to produce energy.',
        type: 'bool',
        value: 'on',
        checked: true,
        forms: ['garbage'],
    }
];

module.exports= {
    averageCo2PerPoundGarbage,
    co2Landfill,
    GARBAGE_FACTS,
    garbageQuestions,
    kwhPerPound,
    transportCo2
}