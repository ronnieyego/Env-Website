const transportationQuestions = [
    {
        name: 'What\'s the fuel for your car?',
        "use-type": "transportation",
        "selectOptions": ["Gasoline", "Diesel", "Electric"]
    },
    {
        name: 'What\'s the MPG of your car?',
        "use-type": "transportation"
    },
    {
        name: 'On average, how many miles do you drive for work, school, and errands each day?',
        "use-type": "transportation"
    },
    {
        name: 'Do you carpool?',
        "use-type": "transportation",
        useBool: true
    },
    {
        name: 'Within the last year, how many times did you take a roadtrip or drive for an extended distance?',
        "use-type": "transportation"
    },
    {
        name: 'How many far is your average roadtrip?',
        "use-type": "transportation"
    },
    {
        name: 'Do you usually carpool for roadtrips?',
        "use-type": "transportation",
        useBool: true
    },
    {
        name: 'Within the last year, how many miles did you fly?',
        "use-type": "transportation"
    }
];

module.exports = { transportationQuestions };