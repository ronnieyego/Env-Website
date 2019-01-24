 export const plantTypes = {  
    coal: { display: 'Coal', color: 'red' },
    hydroelectric: { display: 'Hydroelectric', color: 'blue' },
    hydro: { display: 'Hydroelectric', color: 'blue' },
    wind: { display: 'Wind', color: 'green' },
    biofuel: { display: 'Biofuel', color: 'darkgreen' },
    geothermal: { display: 'Geothermal', color: 'pink' },
    naturalGas: { display: 'Natural Gas', color: 'orange' },
    petroleum: { display: 'Oil', color: 'black' },
    solar: { display: 'Solar', color: 'yellow' },
    nuclear: { display: 'Nuclear', color: 'purple' },
    oil: { display: 'Oil', color: 'black' },
    other: { display: 'Other', color: 'violet' }
 };


const zoomLevels = [];
for(let i = 1; i<20; i++) { zoomLevels.push(.02 * Math.pow(2,i)); }
// These are miles
//[0.7, 1.4, 2.8, 5.6, 11.2, 22.4, 44.8, 89.6, 179.2, 358.4, 716.8, 1433.6, 2867.2, 5734.4, 11468.8, 22937.6, 45875.2, 91750.4, 183500.8, 367001.6, 734003.2 ];
export const getZoomLevel = maxDistance => {
    let zoomLevel = 12;
    if(!maxDistance || maxDistance < 0) {
        return zoomLevel; // 12 is a good county level
    };
    const zoomIndex = zoomLevels.findIndex(distance => maxDistance < distance);
    return 20 - zoomIndex;
};

export const getAdjustedRadiusForZoom = (radius, zoomLevel) => {
    // 2500 is a guess and i should have better logic :)
    return Math.log(radius) * 2500; //zoomLevels[zoomLevel];
};
