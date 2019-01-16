export const NAME_MAPPING = {
    coal: 'Coal',
    oil: 'Oil',
    naturalGas: 'Natural Gas',
    biofuel: 'Biofuel',
    solar: 'Solar',
    wind: 'Wind',
    geothermal: 'Geothermal',
    hydro: 'Hydroelectric',
    nuclear: 'Nuclear',
    other: 'Other',
};
export const SOURCE_NAMES = Object.keys(NAME_MAPPING);


// Distance in miles.  Zoom 20 is the 0th index.

const zoomLevels = [];
for(let i = 1; i<20; i++) { zoomLevels.push(.02 * Math.pow(2,i)); }
//[0.7, 1.4, 2.8, 5.6, 11.2, 22.4, 44.8, 89.6, 179.2, 358.4, 716.8, 1433.6, 2867.2, 5734.4, 11468.8, 22937.6, 45875.2, 91750.4, 183500.8, 367001.6, 734003.2 ];
export const getZoomLevel = maxDistance => {
    let zoomLevel = 12;
    if(!maxDistance || maxDistance < 0) {
        return zoomLevel; // 12 is a good county level
    };
    const zoomIndex = zoomLevels.findIndex(distance => maxDistance < distance);
    return 20 - zoomIndex;
}