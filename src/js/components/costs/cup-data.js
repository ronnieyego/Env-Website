const cupData = [
    {
        name: 'glass',
        co2: 1.1,
        kwh: 1.39
    },
    {
        name: 'steel',
        co2: 2.6,
        kwh: 3.3
    },
    {
        name: 'paper',
        co2: 0.06,
        kwh: 0.12
    },
    {
        name: 'styrafoam',
        co2: 0.02,
        kwh: 0.05
    },
    {
        name: 'polyethylene',
        co2: 0.66,
        kwh: 0.83
    }
];

const usesPerWash = 35;

const questions = [
    {    
        id: 1000,
        name: 'What type of cup are you interested in?',
        "selectOptions": ["Paper", "Paper with plastic lining", "Styrafoam", "Glass", "Steel"],
        value: "Paper",
        type: 'dropdown',
        forms: ['cup'],
        formType: 'costs'
    },
    {
        name: 'How many times do you use this cup before you wash it?',
        validator: "non-zero-int",
        type: 'int',
        hideIf: ['singleUseCup'],
        forms: ['cup'],
        formType: 'costs'
    },
    {    
        name: 'How do you clean your cup?',
        "selectOptions": ['Dishwasher', 'Handwash'],
        value: "Dishwasher",
        hideIf: ['singleUseCup'],
        type: 'dropdown',
        forms: ['cup'],
        formType: 'costs'
    }
    
]

module.exports = {
    cupData,
    usesPerWash,
    questions
};