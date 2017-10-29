// Car miles driven by age and gender
// Source:  https://www.fhwa.dot.gov/ohim/onh00/bar8.htm
const americanCarMiles = { 
    '16-19': {
        male: 8206,
        female: 6873,
    },
    '20-34': {
        male: 17976,
        female: 12004,
    },
    '35-54': {
        male: 18858,
        female: 11464,
    },
    '55-64': {
        male: 15859,
        female: 7780,
    },
    '65+': {
        male: 10304,
        female: 4785,
    },
    'average': {
        male: 16550,
        female: 10142,
    }
};

// Average kwh each month according to utility bills
// source:  EIA  https://www.eia.gov/tools/faqs/faq.php?id=97&t=3
const kwhPerMonthAppliance = 901;

// Total servings of food/year eaten by Americans and energy/serving
// Source:  NPR  http://www.npr.org/sections/thesalt/2011/12/31/144478009/the-average-american-ate-literally-a-ton-this-year
// Based on this data:  https://www.ers.usda.gov/Data/FoodConsumption/



const americanFood = {
    dairy: {
        yearServings: 630,
        energyPerServing: 0.75,
        co2PerServing: 4
    },
    grain: {
        yearServings: 197,
        energyPerServing: 0.43,
        co2PerServing: 0.23
    },
    fruit: {
        yearServings: 273,
        energyPerServing: 1.67,
        co2PerServing: 0.38
    },
    vegetables: {
        yearServings: 556,
        energyPerServing: 0.43,
        co2PerServing: 0.5
    },
    chicken: {
        yearServings: 54,
        energyPerServing: 4.4,
        co2PerServing: 1.01
     },
    pork: {
        yearServings: 60,
        energyPerServing: 12.6,
        co2PerServing: 1.14
     },
    beef: {
        yearServings: 71,
        energyPerServing: 31.5,
        co2PerServing: 5.24
    }
};


module.exports = {
    americanCarMiles,
    americanFood, 
    kwhPerMonthAppliance
    
}
 