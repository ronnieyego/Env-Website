import Pool from './config';
import Q from 'q';

const getEnergySourcesWithinDistance = async({ lat, long, distance }) => {
    const promise = Q.defer();
    // Note: Distance is based on land miles which don't account for earth curvature
    // Note2: points take in a long, lat instead of lat,long
    Pool.query(
        `SELECT id, plant_id, entity_id, entity_name, plant_capacity, hydroelectric, wind, coal, natural_gas, solar, nuclear, petroleum, geothermal, plant_name, sector, state, nameplate_capacity, county, lat, long
        FROM data.us_power_plants 
        WHERE point($2, $1) <@> point(long, lat) < $3;`
        , [lat, long, distance], (error, result) => {
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

module.exports = { getEnergySourcesWithinDistance }; 