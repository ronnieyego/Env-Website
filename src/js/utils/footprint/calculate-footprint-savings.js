const _ = require('lodash');
const { lightYearsForCar } = require('./saving-fact-functions');

// SHould import these from DB or static file
const kwhPerGallon = 34.4;
const mpg = 23.6;
const kwhPer100MilesElectricCar = 30;

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
    "carMpg": "25.00",
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
};

const electricCar = res => {
    const carType = _.get(res, 'transportationBreakdown.carType', 'Electric'); // If error then return 0 and not show card
    if(carType === 'Electric') {
        return 0;
    }
    const totalMiles = _.get(res, 'transportationBreakdown.totalMilesDriven', 0);
    const mpg = _.get(res, 'transportationBreakdown.carMpg', 0);
    const gasEnergy = kwhPerGallon * totalMiles / mpg;
    const electricEnergy = kwhPer100MilesElectricCar * totalMiles / 100;
    const diff = parseInt(gasEnergy - electricEnergy);
    if(diff < 0) {
        return {
            amount: diff,
            subtext: 'Wow you have a very energy efficient car.  Keep it!'
        }
    }
    return {
        amount: diff,
        subtext: 'An electric car is about 4 times more energy efficient than a combustible enginge.'
    };
};

const getSavings = res => {
    let results = [
        {
            display: 'Go vegetarian',
            card: true,
            amount: _.get(res, 'foodSubCategories.meat', 0)
        },
        {
            display: 'Go vegan',
            card: true,
            amount: _.get(res, 'foodSubCategories.meat', 0) + _.get(res, 'foodSubCategories.dairy', 0)
        },
        {
            display: 'Drive more efficiently',
            card: true,
            amount: betterDriving(res),
            subtext: 'This can be done by not staying under 65 mph, slowly accelerating, and making sure you have fully inflated tires.',
            learnMore: 'https://www.fueleconomy.gov/feg/driveHabits.jsp'
        },
        {
            display: 'Move within walking distance of your work',
            card: true,
            amount: _.get(res, 'transportationBreakdown.monthlyCommute', 0),
            learnMore: 'https://www.citylab.com/life/2012/04/why-bigger-cities-are-greener/863/'
        },
        {
            display: 'Don\'t heat your house/apartment',
            card: true,
            amount: _.get(res, 'applianceSubCategories.heating', 0)
        },
        {
            display: 'Turn off the lights more',
            card: true,
            amount: _.get(res, 'applianceSubCategories.lighting', 0) * .5
        },
        {
            display: 'Switch to an electric car',
            card: true,
            amount: electricCar(res).amount,
            subtext: electricCar(res).subtext
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
