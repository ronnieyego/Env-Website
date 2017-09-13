const transportationQuestions = [
    {
        name: 'What\'s the fuel for your car?',
        "use-type": "transportation",
        "selectOptions": ["Gasoline", "Diesel", "Electric"],
        id: 1
    },
    {
        name: 'What\'s the MPG of your car?',
        "use-type": "transportation",
        id: 2
    },
    {
        name: 'On average, how many miles do you drive for work, school, and errands each day?',
        "use-type": "transportation",
        id: 3
    },
    {
        name: 'Do you carpool?',
        "use-type": "transportation",
        id: 4,
        useBool: true
    },
    {
        name: 'Within the last year, how many times did you take a roadtrip or drive for an extended distance?',
        "use-type": "transportation",
        id: 5
    },
    {
        name: 'How many far is your average roadtrip?',
        "use-type": "transportation",
        id: 6
    },
    {
        name: 'Do you usually carpool for roadtrips?',
        "use-type": "transportation",
        id: 7,
        useBool: true
    },
    {
        name: 'Within the last year, how many miles did you fly?',
        "use-type": "transportation",
        id: 8
    }
];

module.exports = { transportationQuestions };