// Complete hack.
// Getting the results is an async operation which means its hard to create all the redux stores.
// This is the results to make the redux easier since itll be synchronous
export default {
    "food": {
      "servings": {
        "beef": 1,
        "chicken": 1,
        "pork": 1,
        "seafood": 1,
        "grain": 2.4,
        "fruit": 1.6,
        "vegetables": 2.4,
        "dairy": 2.4,
        "cheese": 2.4,
        "junkFood": 2.4
      },
      "calories": {
        "total": 2399,
        "beef": 204,
        "chicken": 195,
        "pork": 197,
        "seafood": 138,
        "grain": 239,
        "fruit": 152,
        "vegetables": 141,
        "dairy": 247,
        "cheese": 407,
        "junkFood": 479
      },
      "totalCo2": 16,
      "monthlyCo2": 480,
      "co2": {
        "total": 16,
        "beef": 5.2,
        "chicken": 1,
        "pork": 1.1,
        "seafood": 1.1,
        "grain": 0.6,
        "fruit": 0.6,
        "vegetables": 1.2,
        "dairy": 1.2,
        "cheese": 3.1,
        "junkFood": 1.2
      },
      "ratioError": 1.33,
      "multiplier": 1.2
    },
    "home": {
      "totalCo2": 78400,
      "homeType": "Apartment",
      "homeMaterial": "Wood",
      "monthlyCo2": 82
    },
    "homeActivities": {
      "entertainment": 5,
      "cooking": 2,
      "cleanliness": 6,
      "background": 15,
      "totalCo2": 28,
      "monthlyCo2": 840
    },
    "heating": {
      "totalCo2": 14,
      "monthlyCo2": 420
    },
    "cooling": {
      "totalCo2": 34.9,
      "monthlyCo2": 1047
    },
    "transportation": {
      "car": 811,
      "carBuild": 31823,
      "carMonthlyBuild": 241,
      "bus": 31,
      "train": 19,
      "plane": 96,
      "totalCo2": 957
    },
    "pets": {
      "totalCo2": 17104,
      "monthlyCo2": 110
    },
    "stuff": {
      "monthlyCo2": 57,
      "totalCo2": 5949,
      "clothes": {
        "totalArticles": 102,
        "monthlyCo2": 14,
        "totalCo2": 347,
        "shirtsCo2": 30,
        "jacketsCo2": 30,
        "pantsCo2": 37,
        "shortsCo2": 40,
        "socksUndiesCo2": 6,
        "accessoriesCo2": 7,
        "shoesCo2": 197
      },
      "furniture": {
        "totalCo2": 3586,
        "monthlyCo2": 37
      },
      "stuff": {
        "totalCo2": 2016,
        "monthlyCo2": 6
      }
    },
    "monthlyCo2": 4234
  }