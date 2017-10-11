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
const food = {
    dairy: [630, .75], // Servings/year, energy/serving
    grain: [197, .43],
    fruit: [273, 1.67],
    vegetables: [556, .43],  // Veges + fats/sugars
    chicken: [54, 4.4],
    pork: [60, 12.6],
    beef: [71, 31.5]
};

const utilityUse = {
    AL: 1218,
    AK: 603,
    AZ: 1028,
    AR: 1122,
    CA: 557,
    CO: 688,
    CT: 731,
    DE: 977,
    DC: 841,
    FL: 1141,
    GA: 1122,
    HI: 514,
    ID: 957,
    IL: 719,
    IN: 964,
    IA: 847,
    KS: 896,
    KY: 1120,
    LA: 1286,
    ME: 556,
    MD: 1012,
    MA: 602,
    MI: 649,
    MN: 762,
    MS: 1218,
    MO: 1033,
    MT: 818,
    NE: 962,
    NV: 913,
    NH: 621,
    NJ: 696,
    NM: 635,
    NY: 601,
    NC: 1113,
    ND: 1091,
    OH: 877,
    OK: 1093,
    OR: 902,
    PA: 855,
    RI: 594,
    SC: 1146,
    SD: 981,
    TN: 1248,
    TX: 1176,
    UT: 744,
    VT: 558,
    VA: 1149,
    WA: 964,
    WV: 1107,
    WI: 668,
    WY: 832,
    US: 901
}
    


module.exports = {
    americanCarMiles,
    food, 
    kwhPerMonthAppliance,
    utilityUse
}
 