const CALC_PAYLOAD = [
  {
  "name": "grain",
  "kwh": 0.11,
  "calories/serving": 100,
  "use-type": "serving",
  "sub-grouping": "produce",
  "subtext": "Serving size: 1 slice of bread or 1 cup of cereal or 0.5 cups of cooked rice",
  "value": "2"
},
{
  "name": "vegetables",
  "kwh": 0.11,
  "calories/serving": 59,
  "use-type": "serving",
  "sub-grouping": "produce",
  "subtext": "Serving size: 1 cup of leafy vegetables or 0.5 cups of other veggies",
  "value": "2"
},
{
  "name": "milk",
  "kwh": 0.38,
  "calories/serving": 103,
  "use-type": "serving",
  "sub-grouping": "dairy",
  "subtext": "Serving size: 1 cup",
  "value": "2"
},
{
  "name": "fruit",
  "kwh": 0.32,
  "calories/serving": 95,
  "use-type": "serving",
  "sub-grouping": "produce",
  "subtext": "Serving size: 1 apple or 0.5 cups",
  "value": "2"
},
{
  "name": "eggs",
  "kwh": 0.55,
  "calories/serving": 89,
  "use-type": "serving",
  "sub-grouping": "dairy",
  "subtext": "Serving size: 1 egg",
  "value": "2"
},
{
  "name": "chicken",
  "kwh": 0.83,
  "calories/serving": 204,
  "use-type": "serving",
  "sub-grouping": "meat",
  "subtext": "Serving size: 3 oz about the size of a deck of cards",
  "value": "2"
},
{
  "name": "dairy",
  "kwh": 0.64,
  "calories/serving": 170,
  "use-type": "serving",
  "sub-grouping": "meat",
  "subtext": "Serving size: 0.75 cups of yogurt or 1.5 oz of cheese",
  "value": "2"
},
{
  "name": "pork",
  "kwh": 2.3,
  "calories/serving": 206,
  "use-type": "serving",
  "sub-grouping": "meat",
  "subtext": "Serving size: 3 oz about the size of a deck of cards",
  "value": "2"
},
{
  "name": "beef",
  "kwh": 5.9,
  "calories/serving": 213,
  "use-type": "serving",
  "sub-grouping": "meat",
  "subtext": "Serving size: 3 oz about the size of a deck of cards",
  "value": "0."
},
{
  "name": "junk food",
  "kwh": 0.11,
  "calories/serving": 200,
  "use-type": "serving",
  "sub-grouping": "junk-food",
  "subtext": "Serving size: 16 delicious chips or one glorious cookie or a refreshing soda or not enough cake",
  "value": "0.2"
},
{
  "name": "house-furnace",
  "kwh": 10.5,
  "use-type": "hour",
  "sub-grouping": "heating",
  "use-bool": "",
  "subtext": "Standard full house heating system.  Usually electric or natural gas",
  "value": "2"
},
{
  "name": "house-heat-pump",
  "kwh": 10,
  "use-type": "hour",
  "sub-grouping": "heating",
  "use-bool": "",
  "subtext": "Heat pumps generally transfer cool underground air from the outside to cool a house",
  "value": "0"
},
{
  "name": "portable-heater",
  "kwh": 1.5,
  "use-type": "hour",
  "sub-grouping": "heating",
  "use-bool": "",
  "subtext": "",
  "value": "0.23"
},
{
  "name": "central-air-conditioning",
  "kwh": 3,
  "use-type": "hour",
  "sub-grouping": "cooling",
  "use-bool": "",
  "subtext": "AC that's part of a house HVAC system",
  "value": ".23"
},
{
  "name": "window-mount-air-conditioning",
  "kwh": 0.73,
  "use-type": "hour",
  "sub-grouping": "cooling",
  "use-bool": "",
  "subtext": "A single unit positioned in a window",
  "value": "2"
},
{
  "name": "ceiling-fan",
  "kwh": 0.075,
  "use-type": "hour",
  "sub-grouping": "cooling",
  "use-bool": "",
  "subtext": "",
  "value": ".32"
},
{
  "name": "portable-fan",
  "kwh": 0.03,
  "use-type": "hour",
  "sub-grouping": "cooling",
  "use-bool": "",
  "subtext": "",
  "value": "0.0"
},
{
  "name": "speakers",
  "kwh": 0.05,
  "use-type": "hour",
  "sub-grouping": "entertainment",
  "use-bool": "",
  "subtext": "",
  "value": ""
},
{
  "name": "tv",
  "kwh": 0.48,
  "use-type": "hour",
  "sub-grouping": "entertainment",
  "use-bool": "",
  "subtext": "",
  "value": "1"
},
{
  "name": "energy-efficient-lightbulb",
  "kwh": 0.01,
  "use-type": "hour",
  "sub-grouping": "lighting",
  "use-bool": "",
  "subtext": "Enter the total number of light bulbs times the number of hours each one is on",
  "value": "1"
},
{
  "name": "standard-lightbulb",
  "kwh": 0.1,
  "use-type": "hour",
  "sub-grouping": "lighting",
  "use-bool": "",
  "subtext": "Enter the total number of light bulbs times the number of hours each one is on",
  "value": "1"
},
{
  "name": "game-console",
  "kwh": 0.15,
  "use-type": "hour",
  "sub-grouping": "entertainment",
  "use-bool": "",
  "subtext": "",
  "value": "1"
},
{
  "name": "computer-desktop",
  "kwh": 0.15,
  "use-type": "hour",
  "sub-grouping": "entertainment",
  "use-bool": "",
  "subtext": ""
},
{
  "name": "computer-laptop",
  "kwh": 0.04,
  "use-type": "hour",
  "sub-grouping": "entertainment",
  "use-bool": "",
  "subtext": ""
},
{
  "name": "computer-monitor",
  "kwh": 0.08,
  "use-type": "hour",
  "sub-grouping": "entertainment",
  "use-bool": "",
  "subtext": ""
},
{
  "name": "hot-shower",
  "kwh": 12.7,
  "use-type": "hour",
  "sub-grouping": "cleanliness",
  "use-bool": "",
  "subtext": ""
},
{
  "name": "hair-dryer",
  "kwh": 1.5,
  "use-type": "hour",
  "sub-grouping": "cleanliness",
  "use-bool": "",
  "subtext": ""
},
{
  "name": "oven",
  "kwh": 2.3,
  "use-type": "hour",
  "sub-grouping": "cooking",
  "use-bool": "",
  "subtext": ""
},
{
  "name": "stove-top",
  "kwh": 1.25,
  "use-type": "hour",
  "sub-grouping": "cooking",
  "use-bool": "",
  "subtext": ""
},
{
  "name": "toaster-oven",
  "kwh": 0.75,
  "use-type": "hour",
  "sub-grouping": "cooking",
  "use-bool": "",
  "subtext": ""
},
{
  "name": "coffee-maker",
  "kwh": 0.12,
  "use-type": "hour",
  "sub-grouping": "cooking",
  "use-bool": "",
  "subtext": ""
},
{
  "name": "refridgerator",
  "kwh": 125,
  "use-type": "monthly-own",
  "sub-grouping": "cooking",
  "use-bool": "bool",
  "subtext": ""
},
{
  "name": "energy-efficient-refridgerator",
  "kwh": 37.5,
  "use-type": "monthly-own",
  "sub-grouping": "cooking",
  "use-bool": "bool",
  "subtext": "",
  "value": "on"
},
{
  "name": "freezer",
  "kwh": 90,
  "use-type": "monthly-own",
  "sub-grouping": "cooking",
  "use-bool": "bool",
  "subtext": ""
},
{
  "name": "tivo",
  "kwh": 28.8,
  "use-type": "monthly-own",
  "sub-grouping": "entertainment",
  "use-bool": "bool",
  "subtext": "",
  "value": "on"
},
{
  "name": "swimming-pool",
  "kwh": 806,
  "use-type": "monthly-own",
  "sub-grouping": "entertainment",
  "use-bool": "bool",
  "subtext": ""
},
{
  "name": "clothes-washer-with-cold-water",
  "kwh": 2.3,
  "use-type": "monthly-use",
  "sub-grouping": "cleanliness",
  "use-bool": "",
  "subtext": "",
  "value": "2"
},
{
  "name": "clothes-washer-with-hot-water",
  "kwh": 6.3,
  "use-type": "monthly-use",
  "sub-grouping": "cleanliness",
  "use-bool": "",
  "subtext": "",
  "value": "2"
},
{
  "name": "dryer",
  "kwh": 3,
  "use-type": "monthly-use",
  "sub-grouping": "cleanliness",
  "use-bool": "",
  "subtext": "",
  "value": "0.3"
},
{
  "name": "dishwasher",
  "kwh": 1,
  "use-type": "monthly-use",
  "sub-grouping": "cooking",
  "use-bool": "",
  "subtext": ""
},
{
  "name": "What's the fuel for your car?",
  "use-type": "transportation",
  "selectOptions": [
    "Gasoline",
    "Diesel",
    "Electric"
  ],
  "id": 1,
  "value": "Gasoline"
},
{
  "name": "What's the MPG of your car?",
  "use-type": "transportation",
  "id": 2,
  "value": "3"
},
{
  "name": "On average, how many miles do you drive for work, school, and errands each day?",
  "use-type": "transportation",
  "id": 3,
  "value": "3"
},
{
  "name": "Do you carpool?",
  "use-type": "transportation",
  "id": 4,
  "useBool": true
},
{
  "name": "Within the last year, how many times did you take a roadtrip or drive for an extended distance?",
  "use-type": "transportation",
  "id": 5,
  "value": "3"
},
{
  "name": "How many far is your average roadtrip?",
  "use-type": "transportation",
  "id": 6,
  "value": "3"
},
{
  "name": "Do you usually carpool for roadtrips?",
  "use-type": "transportation",
  "id": 7,
  "useBool": true,
  "value": "on"
},
{
  "name": "Within the last year, how many miles did you fly?",
  "use-type": "transportation",
  "id": 8,
  "value": "3"
}];

module.exports = {
    CALC_PAYLOAD
};