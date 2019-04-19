// Deprecated

// import geolib from 'geolib';
// import ZIP_TEMP_DATA from '../../data/zip-codes/temp-by-zip.json';
// import BASIC_ZIP_DATA  from '../../../../db/db-scripts/data/formatted/basic-zip-data.json';

// const METERS_TO_MILES = 0.000621371;
// const TOO_FAR_WARNING_THRESHOLD = 100; // This is 100 miles


// // Wrapper around geolib to convert meters to miles
// const getDistance = (start, destination) => {
//     const meters = geolib.getDistance(start,destination);
//     return Math.round(meters * METERS_TO_MILES);
// };

// const getLatLongFromZip = zip => {
//     const coords = BASIC_ZIP_DATA[zip];
//     if(typeof coords === 'undefined' || !coords.lat || !coords.long) {
//         console.warn('Warning: Could not find coords for zip: ' + zip);
//         return null;
//     }
//     return {
//         latitude: coords.lat,
//         longitude: coords.long
//     };
// }

// const getShorestDistance = (inputZip, zipArray) => {
//     const inputCoords = getLatLongFromZip(inputZip);
//     const distances = {};
//     zipArray.forEach(zip => {
//         const zipCoords = getLatLongFromZip(zip);
//         if(zipCoords && inputCoords) {
//             const distance = getDistance(inputCoords, zipCoords);
//             distances[distance] = zip;
//         }
//         // DO nothing if can't find coords for nearby zip
//     });

//     const allDistances = Object.keys(distances);
//     const shortestDistance = Math.min(...allDistances);
//     const nearestZip = distances[shortestDistance];
//     return { nearestZip, distance: shortestDistance };
// };

// export default inputZip => {
//     // Happiest path is I have the zip already.
//     if(ZIP_TEMP_DATA[inputZip]) {
//         return ZIP_TEMP_DATA[inputZip];
//     } else if(!BASIC_ZIP_DATA[inputZip]) {
//         console.log('ERROR --  could not find this zip code', inputZip);
//         return -1;
//     } else if(!BASIC_ZIP_DATA[inputZip].lat || !BASIC_ZIP_DATA[inputZip].long) {
//         console.log('ERROR --  zip code has no lat or long data', inputZip);
//         return -1;
//     } else {
//         const inputZipNumber = parseInt(inputZip);
//         const allZips = Object.keys(ZIP_TEMP_DATA);
//         const nearbyZips = allZips.filter(zip => {
//             const numericDifference = parseInt(zip) - inputZipNumber;
//             const absoluteDifference = Math.abs(numericDifference);
//             return absoluteDifference < 500;
//         });
        
//         const { nearestZip, distance } = nearbyZips.length > 0 ? getShorestDistance(inputZip, nearbyZips) : getShorestDistance(inputZip, allZips);
//         if(distance > TOO_FAR_WARNING_THRESHOLD) {
//             console.log('WARNING -- found zip is too far away: ', distance, ' miles');
//         }
//         const nearestZipData = ZIP_TEMP_DATA[nearestZip];
//         nearestZipData.distanceFromUser = distance; // Mostly for testing
//         return nearestZipData;
//     }
// }