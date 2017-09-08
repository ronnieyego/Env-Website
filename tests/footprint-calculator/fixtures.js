const CALC_PAYLOAD = {
  "applianceHour": {
    "house-furnace": {
      "name": "house-furnace",
      "kwh": 10.5,
      "use-type": "hour",
      "sub-grouping": "heating",
      "use-bool": "",
      "value": "23"
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
      "value": "0.2.23"
    },
    "central-ac": {
      "name": "central-ac",
      "kwh": 3,
      "use-type": "hour",
      "sub-grouping": "cooling",
      "use-bool": "",
      "value": ".23"
    },
    "ceiling-fan": {
      "name": "ceiling-fan",
      "kwh": 0.075,
      "use-type": "hour",
      "sub-grouping": "cooling",
      "use-bool": "",
      "value": ".23.23"
    },
    "wall-ac": {
      "name": "wall-ac",
      "kwh": 0.73,
      "use-type": "hour",
      "sub-grouping": "cooling",
      "use-bool": "",
      "value": ""
    },
    "portable-fan": {
      "name": "portable-fan",
      "kwh": 0.03,
      "use-type": "hour",
      "sub-grouping": "cooling",
      "use-bool": "",
      "value": "1"
    },
    "speakers": {
      "name": "speakers",
      "kwh": 0.05,
      "use-type": "hour",
      "sub-grouping": "entertainment",
      "use-bool": "",
      "value": "1"
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
  "household": {
    "refridgerator": {
      "name": "refridgerator",
      "kwh": 125,
      "use-type": "monthly-own",
      "sub-grouping": "cooking",
      "use-bool": "bool",
      "value": true
    },
    "energy-efficient-refridgerator": {
      "name": "energy-efficient-refridgerator",
      "kwh": 37.5,
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
    },
    "clothes-washer-cold": {
      "name": "clothes-washer-cold",
      "kwh": 2.3,
      "use-type": "monthly-use",
      "sub-grouping": "cleanliness",
      "use-bool": "",
      "value": ".23"
    },
    "clothes-washer-hot": {
      "name": "clothes-washer-hot",
      "kwh": 6.3,
      "use-type": "monthly-use",
      "sub-grouping": "cleanliness",
      "use-bool": "",
      "value": "0.23"
    },
    "clothes-dryer": {
      "name": "clothes-dryer",
      "kwh": 3,
      "use-type": "monthly-use",
      "sub-grouping": "cleanliness",
      "use-bool": "",
      "value": "..23.2.3"
    }
  },
  "foodQuestions": {
    "grain": {
      "name": "grain",
      "kwh": 0.11,
      "calories/serving": 100,
      "use-type": "serving",
      "sub-grouping": "produce",
      "subtext": "Serving size: 1 slice of bread",
      "value": "5"
    },
    "vegetables": {
      "name": "vegetables",
      "kwh": 0.11,
      "calories/serving": 59,
      "use-type": "serving",
      "sub-grouping": "produce",
      "subtext": "Serving size: 1 cup of leafy vegetables or 0.5 cups of other veggies",
      "value": "5"
    },
    "milk": {
      "name": "milk",
      "kwh": 0.38,
      "calories/serving": 103,
      "use-type": "serving",
      "sub-grouping": "dairy",
      "subtext": "Serving size: 1 cup",
      "value": "5"
    },
    "fruit": {
      "name": "fruit",
      "kwh": 0.32,
      "calories/serving": 95,
      "use-type": "serving",
      "sub-grouping": "produce",
      "subtext": "Serving size: 1 apple or 0.5 cups",
      "value": "5"
    },
    "eggs": {
      "name": "eggs",
      "kwh": 0.55,
      "calories/serving": 89,
      "use-type": "serving",
      "sub-grouping": "dairy",
      "subtext": "Serving size: 1 egg",
      "value": "5"
    },
    "chicken": {
      "name": "chicken",
      "kwh": 0.83,
      "calories/serving": 204,
      "use-type": "serving",
      "sub-grouping": "meat",
      "subtext": "Serving size: 3 oz",
      "value": "5"
    },
    "dairy": {
      "name": "dairy",
      "kwh": 0.64,
      "calories/serving": 170,
      "use-type": "serving",
      "sub-grouping": "meat",
      "subtext": "Serving size: 0.75 cups of yogurt or 1.5 oz of cheese",
      "value": "5"
    },
    "pork": {
      "name": "pork",
      "kwh": 2.3,
      "calories/serving": 206,
      "use-type": "serving",
      "sub-grouping": "meat",
      "subtext": "Serving size: 3 oz",
      "value": "5"
    },
    "beef": {
      "name": "beef",
      "kwh": 5.9,
      "calories/serving": 213,
      "use-type": "serving",
      "sub-grouping": "meat",
      "subtext": "Serving size: 3 oz",
      "value": "5"
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
    "What\'s the MPG of your car?": {
      "name": "Whats the MPG of you car?",
      "use-type": "transportation",
      "value": "0.23"
    },
    "On average, how many miles do you drive for work, school, and errands each day?": {
      "name": "On average, how many miles do you drive for work, school, and errands each day?",
      "use-type": "transportation",
      "value": ".23"
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
};

module.exports = {
    CALC_PAYLOAD
};