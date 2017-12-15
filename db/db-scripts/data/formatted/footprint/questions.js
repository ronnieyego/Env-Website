module.exports =[
  {
    "name": "grain",
    "kwh": 0.11,
    "calories/serving": 100,
    "co2": 0.23,
    "water": 45,
    "use-type": "serving",
    "sub-grouping": "produce",
    "validator": "standard-int",
    "subtext": "Serving size: 1 slice of bread or 0.5 cups of cooked rice",
    "": ""
  },
  {
    "name": "vegetables",
    "kwh": 0.11,
    "calories/serving": 59,
    "co2": 0.5,
    "water": 43,
    "use-type": "serving",
    "sub-grouping": "produce",
    "validator": "standard-int",
    "subtext": "Serving size: 1 cup of leafy veggies or 0.5 cups of others",
    "": ""
  },
  {
    "name": "milk",
    "kwh": 0.38,
    "calories/serving": 103,
    "co2": 0.52,
    "water": 44.2,
    "use-type": "serving",
    "sub-grouping": "dairy",
    "validator": "standard-int",
    "subtext": "Serving size: 1 cup",
    "": ""
  },
  {
    "name": "fruit",
    "kwh": 0.32,
    "calories/serving": 95,
    "co2": 0.38,
    "water": 54,
    "use-type": "serving",
    "sub-grouping": "produce",
    "validator": "standard-int",
    "subtext": "Serving size: 1 apple or 0.5 cups",
    "": ""
  },
  {
    "name": "eggs",
    "kwh": 0.55,
    "calories/serving": 89,
    "co2": 0.69,
    "water": 52.7,
    "use-type": "serving",
    "sub-grouping": "dairy",
    "validator": "standard-int",
    "subtext": "Serving size: 1 egg",
    "": ""
  },
  {
    "name": "chicken",
    "kwh": 0.83,
    "calories/serving": 204,
    "co2": 1.01,
    "water": 85.6,
    "use-type": "serving",
    "sub-grouping": "meat",
    "validator": "standard-int",
    "subtext": "Serving size: 3 oz about the size of a deck of cards",
    "": ""
  },
  {
    "name": "dairy",
    "kwh": 0.64,
    "calories/serving": 170,
    "co2": 4,
    "water": 59.6,
    "use-type": "serving",
    "sub-grouping": "meat",
    "validator": "standard-int",
    "subtext": "Serving size: 0.75 cups of yogurt or 1.5 oz of cheese",
    "": ""
  },
  {
    "name": "pork",
    "kwh": 2.3,
    "calories/serving": 206,
    "co2": 1.14,
    "water": 122.9,
    "use-type": "serving",
    "sub-grouping": "meat",
    "validator": "standard-int",
    "subtext": "Serving size: 3 oz about the size of a deck of cards",
    "": ""
  },
  {
    "name": "beef",
    "kwh": 5.9,
    "calories/serving": 213,
    "co2": 5.24,
    "water": 375.8,
    "use-type": "serving",
    "sub-grouping": "meat",
    "validator": "standard-int",
    "subtext": "Serving size: 3 oz about the size of a deck of cards",
    "": ""
  },
  {
    "name": "junk food",
    "kwh": 0.11,
    "calories/serving": 200,
    "co2": 0.5,
    "water": 45,
    "use-type": "serving",
    "sub-grouping": "junk-food",
    "validator": "standard-int",
    "subtext": "Serving size: 16 chips or 1 cookie or not enough cake",
    "": ""
  },
  {
    "name": "house-furnace",
    "kwh": 10.5,
    "use-type": "hour",
    "water": "",
    "sub-grouping": "heating",
    "use-bool": "",
    "validator": "hour-question",
    "subtext": "Standard full house heating system.",
    "": ""
  },
  {
    "name": "house-heat-pump",
    "kwh": 10,
    "use-type": "hour",
    "water": "",
    "sub-grouping": "heating",
    "use-bool": "",
    "validator": "hour-question",
    "subtext": "Heat pumps transfer cool underground air from the outside",
    "": ""
  },
  {
    "name": "portable-heater",
    "kwh": 1.5,
    "use-type": "hour",
    "water": "",
    "sub-grouping": "heating",
    "use-bool": "",
    "validator": "hour-question",
    "subtext": "",
    "": ""
  },
  {
    "name": "central-air-conditioning",
    "kwh": 3,
    "use-type": "hour",
    "water": "",
    "sub-grouping": "cooling",
    "use-bool": "",
    "validator": "hour-question",
    "subtext": "AC that's part of a house HVAC system",
    "": ""
  },
  {
    "name": "window-mount-air-conditioning",
    "kwh": 0.73,
    "use-type": "hour",
    "water": "",
    "sub-grouping": "cooling",
    "use-bool": "",
    "validator": "hour-question",
    "subtext": "A single unit positioned in a window",
    "": ""
  },
  {
    "name": "ceiling-fan",
    "kwh": 0.075,
    "use-type": "hour",
    "water": "",
    "sub-grouping": "cooling",
    "use-bool": "",
    "validator": "hour-question",
    "subtext": "",
    "": ""
  },
  {
    "name": "portable-fan",
    "kwh": 0.03,
    "use-type": "hour",
    "water": "",
    "sub-grouping": "cooling",
    "use-bool": "",
    "validator": "hour-question",
    "subtext": "",
    "": ""
  },
  {
    "name": "speakers",
    "kwh": 0.05,
    "use-type": "hour",
    "water": "",
    "sub-grouping": "entertainment",
    "use-bool": "",
    "validator": "hour-question",
    "subtext": "",
    "": ""
  },
  {
    "name": "tv",
    "kwh": 0.48,
    "use-type": "hour",
    "water": "",
    "sub-grouping": "entertainment",
    "use-bool": "",
    "validator": "hour-question",
    "subtext": "",
    "": ""
  },
  {
    "name": "standard-lightbulbs",
    "kwh": 0.1,
    "use-type": "hour",
    "water": "",
    "sub-grouping": "lighting",
    "use-bool": "",
    "validator": "hour-question",
    "subtext": "Total daily lightbulb hours",
    "": ""
  },
  {
    "name": "energy-efficient-lightbulbs",
    "kwh": 0.01,
    "use-type": "hour",
    "water": "",
    "sub-grouping": "lighting",
    "use-bool": "",
    "validator": "hour-question",
    "subtext": "Total daily lightbulb hours",
    "": ""
  },
  {
    "name": "game-console",
    "kwh": 0.15,
    "use-type": "hour",
    "water": "",
    "sub-grouping": "entertainment",
    "use-bool": "",
    "validator": "hour-question",
    "subtext": "",
    "": ""
  },
  {
    "name": "computer-laptop",
    "kwh": 0.04,
    "use-type": "hour",
    "water": "",
    "sub-grouping": "entertainment",
    "use-bool": "",
    "validator": "hour-question",
    "subtext": "",
    "": ""
  },
  {
    "name": "computer-desktop",
    "kwh": 0.15,
    "use-type": "hour",
    "water": "",
    "sub-grouping": "entertainment",
    "use-bool": "",
    "validator": "hour-question",
    "subtext": "",
    "": ""
  },
  {
    "name": "hot-shower",
    "kwh": 12.7,
    "use-type": "hour",
    "water": 60,
    "sub-grouping": "cleanliness",
    "use-bool": "",
    "validator": "hour-question",
    "subtext": "",
    "": ""
  },
  {
    "name": "oven",
    "kwh": 2.3,
    "use-type": "hour",
    "water": "",
    "sub-grouping": "cooking",
    "use-bool": "",
    "validator": "hour-question",
    "subtext": "",
    "": ""
  },
  {
    "name": "stove-top",
    "kwh": 1.25,
    "use-type": "hour",
    "water": "",
    "sub-grouping": "cooking",
    "use-bool": "",
    "validator": "hour-question",
    "subtext": "",
    "": ""
  },
  {
    "name": "toaster-oven",
    "kwh": 0.75,
    "use-type": "hour",
    "water": "",
    "sub-grouping": "cooking",
    "use-bool": "",
    "validator": "hour-question",
    "subtext": "",
    "": ""
  },
  {
    "name": "coffee-maker",
    "kwh": 0.12,
    "use-type": "hour",
    "water": "",
    "sub-grouping": "cooking",
    "use-bool": "",
    "validator": "hour-question",
    "subtext": "",
    "": ""
  },
  {
    "name": "refrigerator",
    "kwh": 215,
    "use-type": "monthly-own",
    "water": "",
    "sub-grouping": "cooking",
    "use-bool": "bool",
    "validator": "",
    "subtext": "",
    "": ""
  },
  {
    "name": "energy-efficient-refrigerator",
    "kwh": 70,
    "use-type": "monthly-own",
    "water": "",
    "sub-grouping": "cooking",
    "use-bool": "bool",
    "validator": "",
    "subtext": "",
    "": ""
  },
  {
    "name": "swimming-pool",
    "kwh": 806,
    "use-type": "monthly-own",
    "water": 3500,
    "sub-grouping": "entertainment",
    "use-bool": "bool",
    "validator": "",
    "subtext": "",
    "": ""
  },
  {
    "name": "clothes-washer-with-cold-water",
    "kwh": 2.3,
    "use-type": "monthly-use",
    "water": 35,
    "sub-grouping": "cleanliness",
    "use-bool": "",
    "validator": "standard-int",
    "subtext": "",
    "": ""
  },
  {
    "name": "clothes-washer-with-hot-water",
    "kwh": 6.3,
    "use-type": "monthly-use",
    "water": 35,
    "sub-grouping": "cleanliness",
    "use-bool": "",
    "validator": "standard-int",
    "subtext": "",
    "": ""
  },
  {
    "name": "dryer",
    "kwh": 3,
    "use-type": "monthly-use",
    "water": "",
    "sub-grouping": "cleanliness",
    "use-bool": "",
    "validator": "standard-int",
    "subtext": "",
    "": ""
  },
  {
    "name": "dishwasher",
    "kwh": 1,
    "use-type": "monthly-use",
    "water": 6,
    "sub-grouping": "cooking",
    "use-bool": "",
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
    "hideIf": [
      "noCar"
    ]
  },
  {
    "name": "How far is your average roadtrip?",
    "use-type": "transportation",
    "type": "int",
    "id": 6,
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
    "id": 10
  },
  {
    "name": "How many miles do you ride on the train each month?",
    "use-type": "transportation",
    "type": "int",
    "id": 11
  },
  {
    "name": "Within the last year, how many miles did you fly?",
    "use-type": "transportation",
    "type": "int",
    "id": 8
  }
]