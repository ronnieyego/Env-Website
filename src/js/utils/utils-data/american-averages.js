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



const food = {
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
};

const utilityEmissionsPerState = {
    // Units lb/Co2 per kwh
    AK: 0.0276,
    AL: 0.0289,
    AR: 0.0322,
    AZ: 0.031,
    CA: 0.0179,
    CO: 0.0549,
    CT: 0.0178,
    DE: 0.031,
    FL: 0.0354,
    GA: 0.0328,
    HI: 0.0437,
    IA: 0.0441,
    ID: 0.0072,
    IL: 0.0581,
    IN: 0.0582,
    KS: 0.0453,
    KY: 0.0586,
    LA: 0.0311,
    MA: 0.022,
    MD: 0.0259,
    ME: 0.046,
    MI: 0.0417,
    MN: 0.0381,
    MO: 0.0524,
    MS: 0.0289,
    MT: 0.003,
    NC: 0.0304,
    ND: 0.0536,
    NE: 0.0417,
    NH: 0.0383,
    NM: 0.0568,
    NV: 0.0335,
    NY: 0.013,
    OH: 0.0544,
    OK: 0.0449,
    OR: 0.0091,
    PA: 0.0023,
    RI: 0.046,
    SC: 0.0209,
    SD: 0.0153,
    TN: 0.0301,
    TX: 0.0488,
    UT: 0.0561,
    VA: 0.0265,
    VT: 0.0002,
    WA: 0.003,
    WI: 0.0523,
    WV: 0.0627,
    WY: 0.0594,
    US: 0.0349
}
    


module.exports = {
    americanCarMiles,
    food, 
    kwhPerMonthAppliance,
    utilityEmissionsPerState,
    utilityUse
}
 