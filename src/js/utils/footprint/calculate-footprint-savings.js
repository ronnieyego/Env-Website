const _ = require('lodash');

const res = {
  "transportationData": {},
  "appliance": 1229,
  "applianceSubCategories": {
    "heating": 88,
    "cooling": 15.34,
    "entertainment": 838.6,
    "other": 0.44,
    "cleanliness": 103.2,
    "cooking": 184.18
  },
  "food": 924,
  "foodSubCategories": {
    "produce": 1.62,
    "dairy": 2.79,
    "meat": 29.01,
    "junk-food": 0.33
  },
  "transportationBreakdown": {
    "carMpg": "5.00",
    "carType": "Gasoline",
    "carPoolWork": false,
    "carPoolTrips": false,
    "totalMilesDriven": "152.1",
    "monthlyRoadTrip": "14.3",
    "monthlyCommute": "1032.0",
    "monthlyCar": "1046.3",
    "monthlyFly": "0.2",
    "transportation": "1046.5"
  },
  "transportation": "1046.5",
  "monthlyRoadTrip": "14.3",
  "monthlyCommute": "1032.0",
  "monthlyCar": "1046.3",
  "monthlyFly": "0.2",
  "totalEnergy": "3,199"
};

const betterDriving = res => {
    const currentMpg = res.transportationBreakdown.carMpg;
    const monthlyCar = res.transportationBreakdown.monthlyCar;
    const percentImprovement = currentMpg/(currentMpg * 1.15);
    return  (monthlyCar - (monthlyCar * percentImprovement)).toFixed(1);
}

const getSavings = res => {
    let results = [
        {
            display: 'Going vegetarian',
            amount: _.get(res, 'foodSubCategories.meat', 0)
        },
        {
            display: 'Going vegan',
            amount: _.get(res, 'foodSubCategories.meat', 0) + _.get(res, 'foodSubCategories.dairy', 0)
        },
        {
            display: 'Increasing mpg on your car',
            amount: betterDriving(res)
        },
        {
            display: 'Move next to your work',
            amount: _.get(res, 'transportationBreakdown.monthlyCommute', 0)
        },
        {
            display: 'Don\'t heat your house/apartment',
            amount: _.get(res, 'applianceSubCategories.heating', 0)
        }
    ];

    results.map(result => {
        result.amount = parseInt(result.amount);
        return result;
    })
    results.sort((a,b) => {
        return a.amount < b.amount
    });
    return results;
}

module.exports = getSavings;

console.log(getSavings(res));