import Pool from './config';
import Q from 'q';

const getZipByCode = async(zipCode) => {
    const promise = Q.defer();
    Pool.query(
        `SELECT postal_code, city, state, population, lat, long 
        FROM data.zip_code 
        WHERE postal_code = $1;`
        , [zipCode], (error, result) => {
        if (error) {
            return promise.resolve({ error: true, message: `Could not find postal code for code: ${zipCode}.  Error: ${error}` });
        }
        if(!result.rows || result.rows.length === 0) {
            return promise.resolve({ error: true, message: `Could not find postal code for code: ${zipCode}.` });
        }
        return promise.resolve({ error: false, results: result.rows[0] });
    })
    return promise.promise;
};

const getNearesTemperatureData = async({lat, long}) => {
    const promise = Q.defer();
    Pool.query(
        `select point($2,$1) <@> point(long, lat) as distance_miles, zip, state, city, lat, long, jan, feb, mar, apr, may, jun, jul, aug, sept, oct, nov, dec, average, winter, summer
        from data.zip_temperature
        order by point($2,$1) <@> point(long, lat) asc
        limit 1;`
        , [lat, long], (error, result) => {
        if (error) {
            return promise.resolve({ error: true, message: `Could not find temperature data for lat/long: ${lat}/${long}.  Error: ${error}` });
        }
        if(!result.rows || result.rows.length === 0) {
            return promise.resolve({ error: true, message: `Could not find temperature data for lat/long: ${lat}/${long}.` });
        }
        return promise.resolve({ error: false, results: result.rows[0] });
    })
    return promise.promise;
};

module.exports = {
    getZipByCode,
    getNearesTemperatureData
};