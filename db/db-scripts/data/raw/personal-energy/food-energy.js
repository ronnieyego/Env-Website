// Hard to get this data
// Source http://www.inference.org.uk/withouthotair/c13/page_77.shtml
// Data shouls be viewed as approximations not fact

// CO2 mean is from the FAO
//Co2 veggies/produce mostly came from a canadian and sweedish study
// Not super accurate

// Water is from waterfootprint.org  Reasonably accurate

// Changed some values
/*
    grain and vegetables were corn
    dairy was cheese
*/



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
  }
];