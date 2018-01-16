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
    'American Average': {
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
// Added eggs from https://askkaren.custhelp.com/app/answers/detail/a_id/1410/~/how-many-eggs-do-americans-eat-each-year%3F

// This diet is 3890 calories a day.  Im just taking the ratio of food from here
const americanDietCalories = 3500;
const americanFood = {
    dairy: {
        yearServings: 2293,
        energyPerServing: 0.75,
        co2PerServing: 4,
        water: 59.6
    },
    milk: {
        yearServings: 1066,
        energyPerServing: 0.38,
        co2PerServing: .52,
        water: 44.2  
    },
    grain: {
        yearServings: 1051,
        energyPerServing: 0.43,
        co2PerServing: 0.23,
        water: 45
    },
    fruit: {
        yearServings: 1456,
        energyPerServing: 1.67,
        co2PerServing: 0.38,
        water: 54
    },
    vegetables: {
        yearServings: 2965,
        energyPerServing: 0.43,
        co2PerServing: 0.5,
        water: 43
    },
    chicken: {
        yearServings: 288,
        energyPerServing: 4.4,
        co2PerServing: 1.01,
        water: 85.6
     },
    eggs: {
        yearServings: 245,
        energyPerServing: 0.55,
        co2PerServing: 0.69,
        water: 52.7
     },
    pork: {
        yearServings: 320,
        energyPerServing: 12.6,
        co2PerServing: 1.14,
        water: 122.9
     },
    beef: {
        yearServings: 378,
        energyPerServing: 31.5,
        co2PerServing: 5.24,
        water: 374.8
    },
    "junk food" : {
        yearServings: 752,
        energyPerServing: .43,
        co2PerServing: .23,
        water: 45
    }
};


const demographicCalories ={
    '16-19': {
        male: 2600,
        female: 1950,
    },
    '20-34': {
        male: 2750,
        female: 2000,
    },
    '35-54': {
        male: 2450,
        female: 1750,
    },
    '55-64': {
        male: 2100,
        female: 1750,
    },
    '65+': {
        male: 2100,
        female: 1650,
    },
    'American Average': {
        male: 2450,
        female: 1800,
    }
}

module.exports = {
    americanCarMiles,
    americanDietCalories,
    americanFood, 
    demographicCalories,
    kwhPerMonthAppliance
    
}
 