const { getAnswer } = require('./get-answer-by-id-or-name');
const {CALC_PAYLOAD} = require('../../../../tests/footprint-calculator/fixtures');

const lightKwh = .1;
const cflLightKwh = .01;

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

const lightYearsForCar = (res, answers) => {
    const cflEnergy = getAnswer('energy-efficient-lightbulb', answers) * cflLightKwh;
    const halogenEnergy =  getAnswer('standard-lightbulb', answers) * lightKwh;
    const totalLightEnergyPerYear = (cflEnergy + halogenEnergy) * 24 * 365;
    return (res.monthlyCar / totalLightEnergy).toFixed(1);
};




module.exports = {
    lightYearsForCar
}
