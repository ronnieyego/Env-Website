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

module.exports = { getZipByCode };