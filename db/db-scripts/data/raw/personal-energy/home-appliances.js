// Main source:  http://www.siliconvalleypower.com/for-residents/save-energy/name-energy-use-chart
// I updated the names a bit and validated some of the numbers.
// All in all it looks decent.  Might want to add more later.

module.exports = [
  {
    "name": "house-furnace",
    "kwh": 10.5,
    "use-type": "hour",
    "sub-grouping": "heating",
    "use-bool": ""
  },
  {
    "name": "house-heat-pump",
    "kwh": 10,
    "use-type": "hour",
    "sub-grouping": "heating",
    "use-bool": ""
  },
  {
    "name": "portable-heater",
    "kwh": 1.5,
    "use-type": "hour",
    "sub-grouping": "heating",
    "use-bool": ""
  },
  {
    "name": "central-ac",
    "kwh": 3,
    "use-type": "hour",
    "sub-grouping": "cooling",
    "use-bool": ""
  },
  {
    "name": "ceiling-fan",
    "kwh": 0.075,
    "use-type": "hour",
    "sub-grouping": "cooling",
    "use-bool": ""
  },
  {
    "name": "wall-ac",
    "kwh": 0.73,
    "use-type": "hour",
    "sub-grouping": "cooling",
    "use-bool": ""
  },
  {
    "name": "portable-fan",
    "kwh": 0.03,
    "use-type": "hour",
    "sub-grouping": "cooling",
    "use-bool": ""
  },
  {
    "name": "speakers",
    "kwh": 0.05,
    "use-type": "hour",
    "sub-grouping": "entertainment",
    "use-bool": ""
  },
  {
    "name": "tv",
    "kwh": 0.48,
    "use-type": "hour",
    "sub-grouping": "entertainment",
    "use-bool": ""
  },
  {
    "name": "lightbulb-cfl",
    "kwh": 0.01,
    "use-type": "hour",
    "sub-grouping": "other",
    "use-bool": ""
  },
  {
    "name": "lightbulb-halogen",
    "kwh": 0.1,
    "use-type": "hour",
    "sub-grouping": "other",
    "use-bool": ""
  },
  {
    "name": "game-console",
    "kwh": 0.15,
    "use-type": "hour",
    "sub-grouping": "entertainment",
    "use-bool": ""
  },
  {
    "name": "computer-desktop",
    "kwh": 0.15,
    "use-type": "hour",
    "sub-grouping": "entertainment",
    "use-bool": ""
  },
  {
    "name": "computer-laptop",
    "kwh": 0.04,
    "use-type": "hour",
    "sub-grouping": "entertainment",
    "use-bool": ""
  },
  {
    "name": "computer-monitor",
    "kwh": 0.08,
    "use-type": "hour",
    "sub-grouping": "entertainment",
    "use-bool": ""
  },
  {
    "name": "hot-shower",
    "kwh": 12.7,
    "use-type": "hour",
    "sub-grouping": "cleanliness",
    "use-bool": ""
  },
  {
    "name": "hair-dryer",
    "kwh": 1.5,
    "use-type": "hour",
    "sub-grouping": "cleanliness",
    "use-bool": ""
  },
  {
    "name": "oven",
    "kwh": 2.3,
    "use-type": "hour",
    "sub-grouping": "cooking",
    "use-bool": ""
  },
  {
    "name": "stove-top",
    "kwh": 1.25,
    "use-type": "hour",
    "sub-grouping": "cooking",
    "use-bool": ""
  },
  {
    "name": "toaster-oven",
    "kwh": 0.75,
    "use-type": "hour",
    "sub-grouping": "cooking",
    "use-bool": ""
  },
  {
    "name": "coffee-maker",
    "kwh": 0.12,
    "use-type": "hour",
    "sub-grouping": "cooking",
    "use-bool": ""
  },
  {
    "name": "refridgerator",
    "kwh": 125,
    "use-type": "monthly-own",
    "sub-grouping": "cooking",
    "use-bool": "bool"
  },
  {
    "name": "energy-efficient-refridgerator",
    "kwh": 37.5,
    "use-type": "monthly-own",
    "sub-grouping": "cooking",
    "use-bool": "bool"
  },
  {
    "name": "freezer",
    "kwh": 90,
    "use-type": "monthly-own",
    "sub-grouping": "cooking",
    "use-bool": "bool"
  },
  {
    "name": "tivo",
    "kwh": 28.8,
    "use-type": "monthly-own",
    "sub-grouping": "entertainment",
    "use-bool": "bool"
  },
  {
    "name": "pool",
    "kwh": 806,
    "use-type": "monthly-own",
    "sub-grouping": "entertainment",
    "use-bool": "bool"
  },
  {
    "name": "clothes-washer-cold",
    "kwh": 2.3,
    "use-type": "monthly-use",
    "sub-grouping": "cleanliness",
    "use-bool": ""
  },
  {
    "name": "clothes-washer-hot",
    "kwh": 6.3,
    "use-type": "monthly-use",
    "sub-grouping": "cleanliness",
    "use-bool": ""
  },
  {
    "name": "clothes-dryer",
    "kwh": 3,
    "use-type": "monthly-use",
    "sub-grouping": "cleanliness",
    "use-bool": ""
  },
  {
    "name": "dishwasher",
    "kwh": 1,
    "use-type": "monthly-use",
    "sub-grouping": "cooking",
    "use-bool": ""
  }
];