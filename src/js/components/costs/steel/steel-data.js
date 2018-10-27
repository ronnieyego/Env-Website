// Main source 1:  Source: http://climate.columbia.edu/files/2012/04/GNCS-Iron-Steel.pdf
// Main source 2:  Source: Source: https://www.globalccsinstitute.com/insights/authors/dennisvanpuyvelde/2013/08/23/ccs-iron-and-steel-production


export const lbCo2PerLbSteel = 2.9;
export const recycledEmissionReduction = .75; // 75% more efficient to make steel from recycled steel
export const ironOre = .008; // Lb co2/pound for iron ore

export const emissionsPerCountry = {
    us:	2.9,
    brazil: 1.25,
    korea: 1.6,
    mexico: 1.6,
    china: 3.5,
    india: 3.5,
    average: 2
};

export const globalFacts = {
    yearlyEmissions: 2165, // Million Tonnes
    globalEmissionsPercent: 5 // 5% of global emissions
};