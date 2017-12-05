// Main source:  http://www.siliconvalleypower.com/for-residents/save-energy/name-energy-use-chart
// I updated the names a bit and validated some of the numbers.
// All in all it looks decent.  Might want to add more later.

// Water use is just from google.
// Combined refrigerator/freeze and desktop/monitor into 1 question

module.exports = [
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
    "name": "computer-monitor",
    "kwh": 0.08,
    "use-type": "hour",
    "water": "",
    "sub-grouping": "entertainment",
    "use-bool": "",
    "validator": "hour-question",
    "subtext": "Stand alone monitor",
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
    "name": "freezer",
    "kwh": 90,
    "use-type": "monthly-own",
    "water": "",
    "sub-grouping": "cooking",
    "use-bool": "bool",
    "validator": "",
    "subtext": "Not included in refrigerator",
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
  }
];