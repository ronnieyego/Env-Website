import geolib from 'geolib';

// Wrapper around geolib to convert meters to miles
const getDistance = (start, destination) => {
    const meters = geolib.getDistance(start,destination);
    return Math.round(meters * METERS_TO_MILES);
} 

export default (req,res) => {
    return 6;
}