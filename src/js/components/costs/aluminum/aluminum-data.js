// Main source: http://www.aluwatch.org/wp-content/uploads/2015/10/AluWatch-Aluminium-and-GHG-emissions_-Are-all-top-producers-playing-the-same-game.pdf
// Aluminum is very energy intensive to make.
// How you get the energy determines co2

export const co2CostBySource = {
    // Lb CO2e/Lb aluminum
    hydro: 1.5,
    naturalGas: 7.7,
    coal: 15
};

// We import a lot from Canada and China.  Assumptions made about NG use and Coal
export const co2PerPoundInAmerica = 10;

export const percentGlobalEmissions = 1; // 1% of all global emissions
export const worldProduction = 63.4 // Million metric tons
export const worldEmissions = 507 // Million metric tons