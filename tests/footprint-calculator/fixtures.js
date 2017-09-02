const CALC_PAYLOAD = {
  "applianceHour": {
    "house-furnace": {
      "name": "house-furnace",
      "kwh": 10.5,
      "use-type": "hour",
      "sub-grouping": "heating",
      "use-bool": "",
      "value": ".23.23"
    },
    "house-heat-pump": {
      "name": "house-heat-pump",
      "kwh": 10,
      "use-type": "hour",
      "sub-grouping": "heating",
      "use-bool": "",
      "value": "0.23"
    },
    "portable-heater": {
      "name": "portable-heater",
      "kwh": 1.5,
      "use-type": "hour",
      "sub-grouping": "heating",
      "use-bool": "",
      "value": ""
    },
    "central-ac": {
      "name": "central-ac",
      "kwh": 3,
      "use-type": "hour",
      "sub-grouping": "cooling",
      "use-bool": "",
      "value": "0.23.23"
    },
    "ceiling-fan": {
      "name": "ceiling-fan",
      "kwh": 0.075,
      "use-type": "hour",
      "sub-grouping": "cooling",
      "use-bool": "",
      "value": "323"
    },
    "wall-ac": {
      "name": "wall-ac",
      "kwh": 0.73,
      "use-type": "hour",
      "sub-grouping": "cooling",
      "use-bool": "",
      "value": "0003"
    },
    "speakers": {
      "name": "speakers",
      "kwh": 0.05,
      "use-type": "hour",
      "sub-grouping": "entertainment",
      "use-bool": "",
      "value": "11"
    },
    "tv": {
      "name": "tv",
      "kwh": 0.48,
      "use-type": "hour",
      "sub-grouping": "entertainment",
      "use-bool": "",
      "value": "1"
    },
    "lightbulb-cfl": {
      "name": "lightbulb-cfl",
      "kwh": 0.01,
      "use-type": "hour",
      "sub-grouping": "other",
      "use-bool": "",
      "value": "1"
    },
    "lightbulb-halogen": {
      "name": "lightbulb-halogen",
      "kwh": 0.1,
      "use-type": "hour",
      "sub-grouping": "other",
      "use-bool": "",
      "value": "1"
    },
    "game-console": {
      "name": "game-console",
      "kwh": 0.15,
      "use-type": "hour",
      "sub-grouping": "entertainment",
      "use-bool": "",
      "value": "1"
    },
    "computer-desktop": {
      "name": "computer-desktop",
      "kwh": 0.15,
      "use-type": "hour",
      "sub-grouping": "entertainment",
      "use-bool": "",
      "value": "1"
    },
    "computer-laptop": {
      "name": "computer-laptop",
      "kwh": 0.04,
      "use-type": "hour",
      "sub-grouping": "entertainment",
      "use-bool": "",
      "value": "1"
    },
    "computer-monitor": {
      "name": "computer-monitor",
      "kwh": 0.08,
      "use-type": "hour",
      "sub-grouping": "entertainment",
      "use-bool": "",
      "value": "1"
    },
    "hot-shower": {
      "name": "hot-shower",
      "kwh": 12.7,
      "use-type": "hour",
      "sub-grouping": "cleanliness",
      "use-bool": "",
      "value": "1"
    },
    "hair-dryer": {
      "name": "hair-dryer",
      "kwh": 1.5,
      "use-type": "hour",
      "sub-grouping": "cleanliness",
      "use-bool": "",
      "value": "1"
    },
    "oven": {
      "name": "oven",
      "kwh": 2.3,
      "use-type": "hour",
      "sub-grouping": "cooking",
      "use-bool": "",
      "value": "1"
    },
    "stove-top": {
      "name": "stove-top",
      "kwh": 1.25,
      "use-type": "hour",
      "sub-grouping": "cooking",
      "use-bool": "",
      "value": "1"
    },
    "toaster-oven": {
      "name": "toaster-oven",
      "kwh": 0.75,
      "use-type": "hour",
      "sub-grouping": "cooking",
      "use-bool": "",
      "value": "1"
    },
    "coffee-maker": {
      "name": "coffee-maker",
      "kwh": 0.12,
      "use-type": "hour",
      "sub-grouping": "cooking",
      "use-bool": "",
      "value": "1"
    }
  },
  "boolean": {
    "energy-efficient-refridgerator": {
      "name": "energy-efficient-refridgerator",
      "kwh": 37.5,
      "use-type": "monthly-own",
      "sub-grouping": "cooking",
      "use-bool": "bool",
      "value": true
    },
    "refridgerator": {
      "name": "refridgerator",
      "kwh": 125,
      "use-type": "monthly-own",
      "sub-grouping": "cooking",
      "use-bool": "bool",
      "value": true
    },
    "tivo": {
      "name": "tivo",
      "kwh": 28.8,
      "use-type": "monthly-own",
      "sub-grouping": "entertainment",
      "use-bool": "bool",
      "value": true
    },
    "pool": {
      "name": "pool",
      "kwh": 806,
      "use-type": "monthly-own",
      "sub-grouping": "entertainment",
      "use-bool": "bool",
      "value": true
    }
  },
  "foodQuestions": {
    "grain": {
      "name": "grain",
      "kwh": 0.43,
      "calories/lb": 390,
      "use-type": "pound",
      "sub-grouping": "produce",
      "value": "0.23"
    },
    "vegetables": {
      "name": "vegetables",
      "kwh": 0.43,
      "calories/lb": 390,
      "use-type": "pound",
      "sub-grouping": "produce",
      "value": ".232.3"
    },
    "fruit": {
      "name": "fruit",
      "kwh": 1.67,
      "calories/lb": 1824,
      "use-type": "pound",
      "sub-grouping": "produce",
      "value": "00.2"
    },
    "milk": {
      "name": "milk",
      "kwh": 0.75,
      "calories/lb": 291,
      "use-type": "pound",
      "sub-grouping": "dairy",
      "value": "1.2"
    },
    "eggs": {
      "name": "eggs",
      "kwh": 4,
      "calories/lb": 650,
      "use-type": "pound",
      "sub-grouping": "dairy",
      "value": "1"
    },
    "chicken": {
      "name": "chicken",
      "kwh": 4.4,
      "calories/lb": 216,
      "use-type": "pound",
      "sub-grouping": "meat",
      "value": "1"
    },
    "dairy": {
      "name": "dairy",
      "kwh": 6.75,
      "calories/lb": 573,
      "use-type": "pound",
      "sub-grouping": "meat",
      "value": "1"
    },
    "pork": {
      "name": "pork",
      "kwh": 12.6,
      "calories/lb": 480,
      "use-type": "pound",
      "sub-grouping": "meat",
      "value": "1"
    },
    "beef": {
      "name": "beef",
      "kwh": 31.5,
      "calories/lb": 1176,
      "use-type": "pound",
      "sub-grouping": "meat",
      "value": "1"
    }
  },
  "transportation": {
    "What's the fuel for your car?": {
      "name": "What's the fuel for your car?",
      "use-type": "transportation",
      "selectOptions": [
        "Gasoline",
        "Diesel",
        "Electric"
      ],
      "value": "Gasoline"
    },
    "Whats the MPG of you car?": {
      "name": "Whats the MPG of you car?",
      "use-type": "transportation",
      "value": ".23"
    },
    "On average, how many miles do you drive for work, school, and errands each day?": {
      "name": "On average, how many miles do you drive for work, school, and errands each day?",
      "use-type": "transportation",
      "value": "5"
    },
    "Within the last year, how many times did you take a roadtrip or drive for an extended distance?": {
      "name": "Within the last year, how many times did you take a roadtrip or drive for an extended distance?",
      "use-type": "transportation",
      "value": "5"
    },
    "How many far is your average roadtrip?": {
      "name": "How many far is your average roadtrip?",
      "use-type": "transportation",
      "value": "5"
    },
    "Within the last year, how many miles did you fly?": {
      "name": "Within the last year, how many miles did you fly?",
      "use-type": "transportation",
      "value": "5"
    }
  }
}

module.exports = {
    CALC_PAYLOAD
};