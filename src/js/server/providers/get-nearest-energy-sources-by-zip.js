// Deprecated

// import geolib from 'geolib';
// import ZIP_ENERGY_DATA from '../../../../db/db-scripts/data/formatted/energy/all-us-energy-plants-by-zip.json';
// import BASIC_ZIP_DATA  from '../../../../db/db-scripts/data/formatted/basic-zip-data.json';

// const ALL_ENERGY_ZIPS = Object.keys(ZIP_ENERGY_DATA);
// const NEARBY_ZIP_DIFF = 500;
// const DEFAULT_MILES_LIMIT = 200;
// const METERS_TO_MILES = 0.000621371;
// const PLANT_TYPES = { // Based on mapping from map-all-energy-generators-to-plants.js
//     utility: 'utility',
//     independent: 'independent',
//     commercial: 'commercial',
//     industrial: 'industrial'
// }

// // Wrapper around geolib to convert meters to miles
// const getDistance = (start, destination) => {
//     const meters = geolib.getDistance(start,destination);
//     return Math.round(meters * METERS_TO_MILES);
// };

// const getLatLongFromZip = zip => {
//     const coords = BASIC_ZIP_DATA[zip];
//     if(typeof coords === 'undefined' || !coords.lat || !coords.long) {
//         console.warn('Error: Could not find coords for zip: ' + zip);
//         return null;
//     }
//     return {
//         latitude: coords.lat,
//         longitude: coords.long
//     };
// }

// const getNearbyZips = inputZip => {
//     const intZip = parseInt(inputZip);
//     return ALL_ENERGY_ZIPS.filter(zip => {
//         const numericDifference = parseInt(zip) - intZip;
//         const absoluteDifference = Math.abs(numericDifference);
//         return absoluteDifference < NEARBY_ZIP_DIFF;
//     });
// };

// const addDistanceToEnergySource = (inputCoords, arrayOfEnergySources) => {
//     return arrayOfEnergySources.map(source => {
//         // Cant do distance without lat long.  Defaulting to something that will get filtered out.
//         if(!source.lat || !source.long) {
//             source.distance = 9999999;
//             return source;
//         }
//         const sourceCoords = { latitude: source.lat, longitude: source.long };
//         const distance = getDistance(inputCoords, sourceCoords);
//         source.distance = distance;
//         return source;
//     });
// };


// export const getAllEnergyStations = () => {
//     const allPlants = [];
//     ALL_ENERGY_ZIPS.forEach(zip => {
//         const plants = ZIP_ENERGY_DATA[zip]
//         allPlants.push(...plants);
//     });
//     return allPlants;
// };

// export default ({inputZip, allStations = false, maxDistance = DEFAULT_MILES_LIMIT }) => {
//     if(!BASIC_ZIP_DATA[inputZip]) {
//         console.log('ERROR --  could not find this zip code', inputZip);
//         return -1;
//     }
//     const inputCoords = getLatLongFromZip(inputZip);
//     // const powerPlantSearchGroup = maxDistance < 400 ? getNearbyZips(inputZip) : ALL_ENERGY_ZIPS;
//     const nearbyPowerPlants = ALL_ENERGY_ZIPS
//         .filter(nearbyZipCode => ZIP_ENERGY_DATA[nearbyZipCode])
//         .map(nearbyEnergyZip => addDistanceToEnergySource(inputCoords, ZIP_ENERGY_DATA[nearbyEnergyZip]))
//         .reduce((allEnergySources, nearbyEnergyZip) => {
//             allEnergySources.push(...nearbyEnergyZip);
//             return allEnergySources;
//         }, [])
//         .filter(energySource => !allStations ? energySource.plantType === PLANT_TYPES.utility : true)
//         .filter(energySource => energySource.distance < maxDistance)
//         .sort((a,b) => a.distance - b.distance);
//     return nearbyPowerPlants;
// }