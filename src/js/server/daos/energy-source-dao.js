import Pool from './config';
import Q from 'q';

const ALL_ENERGY_TYPES = [ "undefined", "industrial", "commercial", "utility",  "independent" ];

const getAllEnergySources = async() => {
    const promise = Q.defer();
    Pool.query(
        `SELECT id, plant_id, plant_name, utility_name, city, state, zip, county, lat, long, coal, oil, natural_gas, biofuel, solar, wind, geothermal, hydro, nuclear, other, total, plant_type, primary_fuel
        FROM data.us_power_plants 
        ;`
        , [], (error, result) => {
        if (error) {
            return promise.resolve({ error: true, message: `Error getting all power plants.  Error: ${error}` });
        }
        console.log('LENGTH IS', result.rows.length)
        return promise.resolve({ error: false, results: result.rows });
    })
    return promise.promise;
};

const getEnergySourcesWithinDistance = async({ lat, long, distance, onlyUtility }) => {
    const promise = Q.defer();
    const filteredEnergySources = onlyUtility ? ['utility'] : ALL_ENERGY_TYPES;
     
    // Note: Distance is based on land miles which don't account for earth curvature
    // Note2: points take in a long, lat instead of lat,long
    Pool.query(
        `SELECT id, plant_id, plant_name, utility_name, city, state, zip, county, lat, long, coal, oil, natural_gas, biofuel, solar, wind, geothermal, hydro, nuclear, other, total, plant_type, primary_fuel
        FROM data.us_power_plants 
        WHERE point($2, $1) <@> point(long, lat) < $3
        AND plant_type = ANY($4);`
        , [lat, long, distance, filteredEnergySources], (error, result) => {
        if (error) {
            return promise.resolve({ error: true, message: `Error finding power plants for lat/long: ${lat}/${long}. and distance ${distance}.  Error: ${error}` });
        }
        if(!result.rows) {
            return promise.resolve({ error: true, message: `Could not find any power plants for lat/long: ${lat}/${long}. and distance ${distance}.`});
        }
        return promise.resolve({ error: false, results: result.rows });
    })
    return promise.promise;
};

module.exports = { 
    getEnergySourcesWithinDistance,
    getAllEnergySources
}; 