import ids from '../../utils/ids/index';

// Car miles driven by age and gender
// Source:  https://www.fhwa.dot.gov/ohim/onh00/bar8.htm
export const americanCarMiles = { 
    [ids.sixteenNineteen]: {
        male: 8206,
        female: 6873,
    },
    [ids.twentyThirtyFour]: {
        male: 17976,
        female: 12004,
    },
    [ids.thirtyFiveFiftyFour]: {
        male: 18858,
        female: 11464,
    },
    [ids.fiftyFiveSixtyFour]: {
        male: 15859,
        female: 7780,
    },
    [ids.sixtyFivePlus]: {
        male: 10304,
        female: 4785,
    },
    [ids.americanAverage]: {
        male: 16550,
        female: 10142,
    }
};

// Average kwh each month according to utility bills
// source:  EIA  https://www.eia.gov/tools/faqs/faq.php?id=97&t=3
export const kwhPerMonthAppliance = 901;


// DEPRECATED SINCE I USE A DIFFERENT SYSTEM

// Total servings of food/year eaten by Americans and energy/serving
// Source:  NPR  http://www.npr.org/sections/thesalt/2011/12/31/144478009/the-average-american-ate-literally-a-ton-this-year
// Based on this data:  https://www.ers.usda.gov/Data/FoodConsumption/
// Added eggs from https://askkaren.custhelp.com/app/answers/detail/a_id/1410/~/how-many-eggs-do-americans-eat-each-year%3F

// This diet is 3890 calories a day.  Im just taking the ratio of food from here
export const americanDietCalories = 3500;
export const americanFood = {
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


export const demographicCalories ={
    [ids.sixteenNineteen]: {
        male: 2600,
        female: 1950,
    },
    [ids.twentyThirtyFour]: {
        male: 2750,
        female: 2000,
    },
    [ids.thirtyFiveFiftyFour]: {
        male: 2450,
        female: 1750,
    },
    [ids.fiftyFiveSixtyFour]: {
        male: 2100,
        female: 1750,
    },
    [ids.sixtyFivePlus]: {
        male: 2100,
        female: 1650,
    },
    [ids.americanAverage]: {
        male: 2450,
        female: 1800,
    }
};

export const americanClothing = {
    shopper: { // https://recoveringshopaholic.com/2013/02/12/what-is-a-normal-sized-wardrobe/
        male : {
            shirts: 112,
            pants: 10,
            shorts: 10,
            jackets: 10,
            shoes: 12,
            socksUndies: 60, // Estimate.  20 of each 
            accessories: 15 // Estimate. 
        },
        female: {
            shirts: 114,
            pants: 24,
            shorts: 24,
            jackets: 73,
            shoes: 53,
            socksUndies: 80, // Estimate
            accessories: 50
        }
    },
    normal: { 
        // 103 items for a woman http://www.dailymail.co.uk/femail/article-3564177/The-struggle-real-Infographic-reveals-average-woman-103-ITEMS-closet-laying-REAL-reasons-never-wear.html
        // Ratios derived from heave shopper above
        // Guy is a complete guess.  Mostly from https://www.reddit.com/r/AskMen/comments/1s9xlg/guys_how_much_clothing_do_you_own/?st=jece3lxu&sh=78e8f922
        male : {
            shirts: 28,
            pants: 6,
            shorts: 4,
            jackets: 8,
            shoes: 10,
            socksUndies: 36, 
            accessories: 5
        },
        female: {
            shirts: 30,
            pants: 6,
            shorts: 6,
            jackets: 19,
            shoes: 14,
            socksUndies: 40, 
            accessories: 13
        } 
    }
};

export const americanFurniture = {
    house: {
        chairs: 16,
        tables: 6,
        couches: 4,
        drawers: 10,
        bookcases: 6,
        beds: 3,
    },
    apartment: {
        chairs: 4,
        tables: 3,
        couches: 1,
        drawers: 6,
        bookcases: 2,
        beds: 1
    }
}
 