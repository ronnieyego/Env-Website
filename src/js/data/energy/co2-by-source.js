
// All data came from here
// https://openei.org/apps/LCA/
// They took ~200 research papers over 40 years and aggregated the results.

// Average is 1.001 lb co2 per kwh.  Its lower than the EIA

export default  { // pounds CO2 per kwh
    biofuel: 0.0881848,
    solarThermal: 0.059965664,
    solar: 0.09700328,
    geothermal: 0.0881848,
    wind: 0.023809896,
    hydro: 0.014550492,
    ocean: 0.017857422,
    nuclear: 0.02645544,
    coal: 2.18036918,
    naturalGas: 1.04939912,
    other: 1 // Based on nothing!
};