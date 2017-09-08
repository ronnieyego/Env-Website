// Hard to get this data
// Source http://www.inference.org.uk/withouthotair/c13/page_77.shtml
// Data shouls be viewed as approximations not fact

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
    "use-type": "serving",
    "sub-grouping": "produce",
    "subtext": "Serving size: 1 slice of bread or 1 cup of cereal or 0.5 cups of cooked rice"
  },
  {
    "name": "vegetables",
    "kwh": 0.11,
    "calories/serving": 59,
    "use-type": "serving",
    "sub-grouping": "produce",
    "subtext": "Serving size: 1 cup of leafy vegetables or 0.5 cups of other veggies"
  },
  {
    "name": "milk",
    "kwh": 0.38,
    "calories/serving": 103,
    "use-type": "serving",
    "sub-grouping": "dairy",
    "subtext": "Serving size: 1 cup"
  },
  {
    "name": "fruit",
    "kwh": 0.32,
    "calories/serving": 95,
    "use-type": "serving",
    "sub-grouping": "produce",
    "subtext": "Serving size: 1 apple or 0.5 cups"
  },
  {
    "name": "eggs",
    "kwh": 0.55,
    "calories/serving": 89,
    "use-type": "serving",
    "sub-grouping": "dairy",
    "subtext": "Serving size: 1 egg"
  },
  {
    "name": "chicken",
    "kwh": 0.83,
    "calories/serving": 204,
    "use-type": "serving",
    "sub-grouping": "meat",
    "subtext": "Serving size: 3 oz about the size of a deck of cards"
  },
  {
    "name": "dairy",
    "kwh": 0.64,
    "calories/serving": 170,
    "use-type": "serving",
    "sub-grouping": "meat",
    "subtext": "Serving size: 0.75 cups of yogurt or 1.5 oz of cheese"
  },
  {
    "name": "pork",
    "kwh": 2.3,
    "calories/serving": 206,
    "use-type": "serving",
    "sub-grouping": "meat",
    "subtext": "Serving size: 3 oz about the size of a deck of cards"
  },
  {
    "name": "beef",
    "kwh": 5.9,
    "calories/serving": 213,
    "use-type": "serving",
    "sub-grouping": "meat",
    "subtext": "Serving size: 3 oz about the size of a deck of cards"
  },
  {
    "name": "junk food",
    "kwh": 0.11,
    "calories/serving": 200,
    "use-type": "serving",
    "sub-grouping": "junk-food",
    "subtext": "Serving size: 16 delicious chips or one glorious cookie or a refreshing soda or not enough cake"
  }
]