
// Main source:  http://www.dunand.northwestern.edu/courses/Case%20study/Scott%20Cronin%20-%20Coffee%20Cup%20Comparison.pdf

const cupData = [
    {
        name: 'Ceramic Mug',
        co2: 1.9,
        kwh: 1.31
    },
    {
        name: 'Reuseable Plastic',
        co2: 0.85,
        kwh: 0.58
    },
    {
        name: 'Glass',
        co2: 1.1,
        kwh: 1.39
    },
    {
        name: 'Steel',
        co2: 2.6,
        kwh: 3.3
    },
    {
        name: 'Paper',
        co2: 0.06,
        kwh: 0.12
    },
    {
        name: 'Styrafoam',
        co2: 0.02,
        kwh: 0.05
    },
];

const usesPerWash = 40;

const cupQuestions = [
    {    
        id: 1000,
        name: 'What type of cup are you interested in?',
        "selectOptions": ['Ceramic Mug', 'Reuseable Plastic', 'Glass', "Paper", "Styrafoam", ],
        value: "Ceramic Mug",
        type: 'dropdown',
        forms: ['cup'],
        formType: 'costs'
    },
    {    
        id: 1002,
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
    cupQuestions
};