const CALC_PAYLOAD = {
  "applianceHour": {
    "portable-heater": {
      "name": "portable-heater",
      "kwh": 1.5,
      "use-type": "hour",
      "value": "2"
    },
    "electric-furnace": {
      "name": "electric-furnace",
      "kwh": 10.5,
      "use-type": "hour",
      "value": "2"
    },
    "central-ac": {
      "name": "central-ac",
      "kwh": 3,
      "use-type": "hour",
      "value": "2"
    },
    "computer-sleep-mode": {
      "name": "computer-sleep-mode",
      "kwh": 0.003,
      "use-type": "hour",
      "value": "3"
    },
    "computer-monitor": {
      "name": "computer-monitor",
      "kwh": 0.08,
      "use-type": "hour",
      "value": "3"
    },
    "lightbulb": {
      "name": "lightbulb",
      "kwh": 0.1,
      "use-type": "hour",
      "value": "3"
    }
  },
  "boolean": {
    "energy-efficient-refridgerator": {
      "name": "energy-efficient-refridgerator",
      "kwh": 37.5,
      "use-type": "month",
      "value": true
    },
    "tivo": {
      "name": "tivo",
      "kwh": 28.8,
      "use-type": "month",
      "value": true
    },
    "freezer": {
      "name": "freezer",
      "kwh": 90,
      "use-type": "month",
      "value": true
    }
  },
  "foodQuestions": {
    "chicken": {
      "name": "chicken",
      "kwh": 4.4,
      "calories-lb": 216,
      "use-type": "pound",
      "value": "3"
    },
    "grain": {
      "name": "grain",
      "kwh": 0.43,
      "calories-lb": 390,
      "use-type": "pound",
      "value": "2"
    },
    "beef": {
      "name": "beef",
      "kwh": 31.5,
      "calories-lb": 1176,
      "use-type": "pound",
      "value": "1"
    },
    "pork": {
      "name": "pork",
      "kwh": 12.6,
      "calories-lb": 480,
      "use-type": "pound",
      "value": "1"
    }
  },
  "transportation": {
    "Whats the MPG of you car?": {
      "name": "Whats the MPG of you car?",
      "use-type": "transportation",
      "value": "24"
    },
    "What's the fuel for your car?": {
      "name": "What's the fuel for your car?",
      "use-type": "transportation",
      "value": "1"
    },
    "How many miles do you drive for work, school, and errands each week?": {
      "name": "How many miles do you drive for work, school, and errands each week?",
      "use-type": "transportation",
      "value": "10"
    },
    "Within the last year, how many times did you take a roadtrip or drive for an extended distance?": {
      "name": "Within the last year, how many times did you take a roadtrip or drive for an extended distance?",
      "use-type": "transportation",
      "value": "15"
    },
    "How many far is your average roadtrip?": {
      "name": "How many far is your average roadtrip?",
      "use-type": "transportation",
      "value": "150"
    },
    "Do you usually carpool for roadtrips?": {
      "name": "Do you usually carpool for roadtrips?",
      "use-type": "transportation",
      "useBool": true,
      "value": true
    },
    "Within the last year, how many miles did you fly?": {
      "name": "Within the last year, how many miles did you fly?",
      "use-type": "transportation",
      "value": "2000"
    }
  }
};

module.exports = {
    CALC_PAYLOAD
};