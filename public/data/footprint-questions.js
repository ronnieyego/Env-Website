module.exports = [
  {
    "name": "grain",
    "kwh": 0.11,
    "calories/serving": 100,
    "co2": 0.23,
    "water": 45,
    "type": "int",
    "use-type": "serving",
    "sub-grouping": "produce",
    "validator": "standard-int",
    "subtext": "Serving size: 1 slice of bread or 0.5 cups of cooked rice",
    "id": 101,
    "": ""
  },
  {
    "name": "vegetables",
    "kwh": 0.11,
    "calories/serving": 59,
    "co2": 0.5,
    "water": 43,
    "type": "int",
    "use-type": "serving",
    "sub-grouping": "produce",
    "validator": "standard-int",
    "subtext": "Serving size: 1 cup of leafy veggies or 0.5 cups of others",
    "id": 102,
    "": ""
  },
  {
    "name": "milk",
    "kwh": 0.38,
    "calories/serving": 103,
    "co2": 0.52,
    "water": 44.2,
    "type": "int",
    "use-type": "serving",
    "sub-grouping": "dairy",
    "validator": "standard-int",
    "subtext": "Serving size: 1 cup",
    "id": 103,
    "": ""
  },
  {
    "name": "fruit",
    "kwh": 0.32,
    "calories/serving": 95,
    "co2": 0.38,
    "water": 54,
    "type": "int",
    "use-type": "serving",
    "sub-grouping": "produce",
    "validator": "standard-int",
    "subtext": "Serving size: 1 apple or 0.5 cups",
    "id": 104,
    "": ""
  },
  {
    "name": "eggs",
    "kwh": 0.55,
    "calories/serving": 89,
    "co2": 0.69,
    "water": 52.7,
    "type": "int",
    "use-type": "serving",
    "sub-grouping": "dairy",
    "validator": "standard-int",
    "subtext": "Serving size: 1 egg",
    "id": 105,
    "": ""
  },
  {
    "name": "chicken",
    "kwh": 0.83,
    "calories/serving": 204,
    "co2": 1.01,
    "water": 85.6,
    "type": "int",
    "use-type": "serving",
    "sub-grouping": "meat",
    "validator": "standard-int",
    "subtext": "Serving size: 3 oz about the size of a deck of cards",
    "id": 106,
    "": ""
  },
  {
    "name": "dairy",
    "kwh": 0.64,
    "calories/serving": 170,
    "co2": 4,
    "water": 59.6,
    "type": "int",
    "use-type": "serving",
    "sub-grouping": "meat",
    "validator": "standard-int",
    "subtext": "Serving size: 0.75 cups of yogurt or 1.5 oz of cheese",
    "id": 107,
    "": ""
  },
  {
    "name": "pork",
    "kwh": 2.3,
    "calories/serving": 206,
    "co2": 1.14,
    "water": 122.9,
    "type": "int",
    "use-type": "serving",
    "sub-grouping": "meat",
    "validator": "standard-int",
    "subtext": "Serving size: 3 oz about the size of a deck of cards",
    "id": 108,
    "": ""
  },
  {
    "name": "beef",
    "kwh": 5.9,
    "calories/serving": 213,
    "co2": 5.24,
    "water": 375.8,
    "type": "int",
    "use-type": "serving",
    "sub-grouping": "meat",
    "validator": "standard-int",
    "subtext": "Serving size: 3 oz about the size of a deck of cards",
    "id": 109,
    "": ""
  },
  {
    "name": "junk food",
    "kwh": 0.11,
    "calories/serving": 200,
    "co2": 0.5,
    "water": 45,
    "type": "int",
    "use-type": "serving",
    "sub-grouping": "junk-food",
    "validator": "standard-int",
    "subtext": "Serving size: 16 chips or 1 cookie or not enough cake",
    "id": 110,
    "": ""
  },
  {
    "id": 10,
    "name": "house-furnace",
    "kwh": 10.5,
    "use-type": "hour",
    "water": "",
    "sub-grouping": "heating",
    "type": "int",
    "validator": "hour-question",
    "subtext": "Standard full house heating system.",
    "": ""
  },
  {
    "id": 11,
    "name": "house-heat-pump",
    "kwh": 10,
    "use-type": "hour",
    "water": "",
    "sub-grouping": "heating",
    "type": "int",
    "validator": "hour-question",
    "subtext": "Heat pumps transfer cool underground air from the outside",
    "": ""
  },
  {
    "id": 12,
    "name": "portable-heater",
    "kwh": 1.5,
    "use-type": "hour",
    "water": "",
    "sub-grouping": "heating",
    "type": "int",
    "validator": "hour-question",
    "subtext": "",
    "": ""
  },
  {
    "id": 13,
    "name": "central-air-conditioning",
    "kwh": 3,
    "use-type": "hour",
    "water": "",
    "sub-grouping": "cooling",
    "type": "int",
    "validator": "hour-question",
    "subtext": "AC that's part of a house HVAC system",
    "": ""
  },
  {
    "id": 14,
    "name": "window-mount-air-conditioning",
    "kwh": 0.73,
    "use-type": "hour",
    "water": "",
    "sub-grouping": "cooling",
    "type": "int",
    "validator": "hour-question",
    "subtext": "A single unit positioned in a window",
    "": ""
  },
  {
    "id": 15,
    "name": "ceiling-fan",
    "kwh": 0.075,
    "use-type": "hour",
    "water": "",
    "sub-grouping": "cooling",
    "type": "int",
    "validator": "hour-question",
    "subtext": "",
    "": ""
  },
  {
    "id": 16,
    "name": "portable-fan",
    "kwh": 0.03,
    "use-type": "hour",
    "water": "",
    "sub-grouping": "cooling",
    "type": "int",
    "validator": "hour-question",
    "subtext": "",
    "": ""
  },
  {
    "id": 17,
    "name": "speakers",
    "kwh": 0.05,
    "use-type": "hour",
    "water": "",
    "sub-grouping": "entertainment",
    "type": "int",
    "validator": "hour-question",
    "subtext": "",
    "": ""
  },
  {
    "id": 18,
    "name": "tv",
    "kwh": 0.48,
    "use-type": "hour",
    "water": "",
    "sub-grouping": "entertainment",
    "type": "int",
    "validator": "hour-question",
    "subtext": "",
    "": ""
  },
  {
    "id": 19,
    "name": "standard-lightbulbs",
    "kwh": 0.1,
    "use-type": "hour",
    "water": "",
    "sub-grouping": "lighting",
    "type": "int",
    "validator": "<300",
    "subtext": "Total daily lightbulb hours",
    "": ""
  },
  {
    "id": 20,
    "name": "energy-efficient-lightbulbs",
    "kwh": 0.01,
    "use-type": "hour",
    "water": "",
    "sub-grouping": "lighting",
    "type": "int",
    "validator": "<300",
    "subtext": "Total daily lightbulb hours",
    "": ""
  },
  {
    "id": 21,
    "name": "game-console",
    "kwh": 0.15,
    "use-type": "hour",
    "water": "",
    "sub-grouping": "entertainment",
    "type": "int",
    "validator": "hour-question",
    "subtext": "",
    "": ""
  },
  {
    "id": 22,
    "name": "computer-laptop",
    "kwh": 0.04,
    "use-type": "hour",
    "water": "",
    "sub-grouping": "entertainment",
    "type": "int",
    "validator": "hour-question",
    "subtext": "",
    "": ""
  },
  {
    "id": 23,
    "name": "computer-desktop",
    "kwh": 0.15,
    "use-type": "hour",
    "water": "",
    "sub-grouping": "entertainment",
    "type": "int",
    "validator": "hour-question",
    "subtext": "",
    "": ""
  },
  {
    "id": 24,
    "name": "hot-shower",
    "kwh": 12.7,
    "use-type": "hour",
    "water": 60,
    "sub-grouping": "cleanliness",
    "type": "int",
    "validator": "hour-question",
    "subtext": "",
    "": ""
  },
  {
    "id": 25,
    "name": "oven",
    "kwh": 2.3,
    "use-type": "hour",
    "water": "",
    "sub-grouping": "cooking",
    "type": "int",
    "validator": "hour-question",
    "subtext": "",
    "": ""
  },
  {
    "id": 26,
    "name": "stove-top",
    "kwh": 1.25,
    "use-type": "hour",
    "water": "",
    "sub-grouping": "cooking",
    "type": "int",
    "validator": "hour-question",
    "subtext": "",
    "": ""
  },
  {
    "id": 27,
    "name": "toaster-oven",
    "kwh": 0.75,
    "use-type": "hour",
    "water": "",
    "sub-grouping": "cooking",
    "type": "int",
    "validator": "hour-question",
    "subtext": "",
    "": ""
  },
  {
    "id": 28,
    "name": "coffee-maker",
    "kwh": 0.12,
    "use-type": "hour",
    "water": "",
    "sub-grouping": "cooking",
    "type": "int",
    "validator": "hour-question",
    "subtext": "",
    "": ""
  },
  {
    "id": 29,
    "name": "refrigerator",
    "kwh": 215,
    "use-type": "monthly-own",
    "water": "",
    "sub-grouping": "cooking",
    "type": "bool",
    "validator": "",
    "subtext": "",
    "": ""
  },
  {
    "id": 30,
    "name": "energy-efficient-refrigerator",
    "kwh": 70,
    "use-type": "monthly-own",
    "water": "",
    "sub-grouping": "cooking",
    "type": "bool",
    "validator": "",
    "subtext": "",
    "": ""
  },
  {
    "id": 31,
    "name": "swimming-pool",
    "kwh": 806,
    "use-type": "monthly-own",
    "water": 3500,
    "sub-grouping": "entertainment",
    "type": "bool",
    "validator": "",
    "subtext": "",
    "": ""
  },
  {
    "id": 32,
    "name": "clothes-washer-with-cold-water",
    "kwh": 2.3,
    "use-type": "monthly-use",
    "water": 35,
    "sub-grouping": "cleanliness",
    "type": "int",
    "validator": "standard-int",
    "subtext": "",
    "": ""
  },
  {
    "id": 33,
    "name": "clothes-washer-with-hot-water",
    "kwh": 6.3,
    "use-type": "monthly-use",
    "water": 35,
    "sub-grouping": "cleanliness",
    "type": "int",
    "validator": "standard-int",
    "subtext": "",
    "": ""
  },
  {
    "id": 34,
    "name": "dryer",
    "kwh": 3,
    "use-type": "monthly-use",
    "water": "",
    "sub-grouping": "cleanliness",
    "type": "int",
    "validator": "standard-int",
    "subtext": "",
    "": ""
  },
  {
    "id": 35,
    "name": "dishwasher",
    "kwh": 1,
    "use-type": "monthly-use",
    "water": 6,
    "sub-grouping": "cooking",
    "type": "int",
    "validator": "standard-int",
    "subtext": "",
    "": ""
  },
  {
    "name": "Do you drive?",
    "use-type": "transportation",
    "type": "bool",
    "value": "on",
    "id": 9
  },
  {
    "name": "What's the fuel for your car?",
    "use-type": "transportation",
    "selectOptions": [
      "Gasoline",
      "Diesel",
      "Electric"
    ],
    "value": "Gasoline",
    "type": "dropdown",
    "id": 1,
    "hideIf": [
      "noCar"
    ]
  },
  {
    "name": "What's the MPG of your car?",
    "use-type": "transportation",
    "validator": "mpg",
    "type": "int",
    "id": 2,
    "hideIf": [
      "noCar",
      "electricCar"
    ]
  },
  {
    "name": "On average, how many miles do you drive for work, school, and errands each day?",
    "use-type": "transportation",
    "type": "int",
    "id": 3,
    "value": 0,
    "hideIf": [
      "noCar"
    ]
  },
  {
    "name": "Do you carpool?",
    "use-type": "transportation",
    "type": "bool",
    "id": 4,
    "hideIf": [
      "noCar"
    ]
  },
  {
    "name": "Within the last year, how many times did you take a roadtrip or drive for an extended distance?",
    "use-type": "transportation",
    "validator": "non-zero-int",
    "type": "int",
    "id": 5,
    "value": 0,
    "hideIf": [
      "noCar"
    ]
  },
  {
    "name": "How far is your average roadtrip?",
    "use-type": "transportation",
    "type": "int",
    "id": 6,
    "value": 0,
    "hideIf": [
      "noCar"
    ]
  },
  {
    "name": "Do you usually carpool for roadtrips?",
    "use-type": "transportation",
    "type": "bool",
    "id": 7,
    "hideIf": [
      "noCar"
    ]
  },
  {
    "name": "How many miles do you bus each month?",
    "use-type": "transportation",
    "type": "int",
    "value": 0,
    "id": 10
  },
  {
    "name": "How many miles do you ride on the train each month?",
    "use-type": "transportation",
    "type": "int",
    "value": 0,
    "id": 11
  },
  {
    "name": "Within the last year, how many miles did you fly?",
    "belowText": "The US is about 3,000 miles wide and 1,000 miles long.",
    "belowText2": "Its about 5,500 miles from LA to Tokyo and 3,500 from New York to Paris",
    "subtext": "Planes get about 90 mpg per person!",
    "use-type": "transportation",
    "type": "int",
    "value": 0,
    "id": 8
  }
]