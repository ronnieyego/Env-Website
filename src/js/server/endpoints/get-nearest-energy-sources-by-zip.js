import geolib from 'geolib';
import ZIP_ENERGY_DATA from '../../../../db/db-scripts/data/formatted/energy/all-us-energy-plants-by-zip.json';
import ZIP_COORD_DATA from '../../data/zip-codes/all-zips-and-lat-long.json';
const ALL_ENERGY_ZIPS = Object.keys(ZIP_ENERGY_DATA);
const NEARBY_ZIP_DIFF = 500;
const DEFAULT_MILES_LIMIT = 200;
const METERS_TO_MILES = 0.000621371;
const PLANT_TYPES = { // Based on mapping from map-all-energy-generators-to-plants.js
    utility: 'utility',
    independent: 'independent',
    commercial: 'commercial',
    industrial: 'industrial'
}

// Wrapper around geolib to convert meters to miles
const getDistance = (start, destination) => {
    const meters = geolib.getDistance(start,destination);
    return Math.round(meters * METERS_TO_MILES);
};

const getLatLongFromZip = zip => {
    const coords = ZIP_COORD_DATA[zip];
    if(typeof coords === 'undefined') {
        console.log('Error: Could not find coords for zip: ' + zip);
        return null;
    }
    return {
        latitude: coords.lat,
        longitude: coords.long
    };
}

const getNearbyZips = inputZip => {
    const intZip = parseInt(inputZip);
    return ALL_ENERGY_ZIPS.filter(zip => {
        const numericDifference = parseInt(zip) - intZip;
        const absoluteDifference = Math.abs(numericDifference);
        return absoluteDifference < NEARBY_ZIP_DIFF;
    });
};

const addDistanceToEnergySource = (inputCoords, arrayOfEnergySources) => {
    return arrayOfEnergySources.map(source => {
        const sourceCoords = { latitude: source.lat, longitude: source.long };
        const distance = getDistance(inputCoords, sourceCoords);
        source.distance = distance;
        return source;
    });
};


export default ({inputZip, allStations = false, maxDistance = DEFAULT_MILES_LIMIT }) => {
    const inputCoords = getLatLongFromZip(inputZip);
    const nearbyPowerPlants = getNearbyZips(inputZip)
        .filter(nearbyZipCode => ZIP_ENERGY_DATA[nearbyZipCode])
        .map(nearbyEnergyZip => addDistanceToEnergySource(inputCoords, ZIP_ENERGY_DATA[nearbyEnergyZip]))
        .reduce((allEnergySources, nearbyEnergyZip) => {
            allEnergySources.push(...nearbyEnergyZip);
            return allEnergySources;
        }, [])
        .filter(energySource => !allStations ? energySource.plantType === PLANT_TYPES.utility : true)
        .filter(energySource => energySource.distance < maxDistance)
        .sort((a,b) => a.distance - b.distance);
    return nearbyPowerPlants;
}