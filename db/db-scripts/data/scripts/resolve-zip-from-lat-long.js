// lat long to zip resolver
// Its a bit jankey how it works, bascically I hit google api, but only about 1/2 of requests will go through
// Half will fail for no good reason.
// I just do a timeout to wait until X mins have passed then write them all.
// 5 mins works for a timeout.
const Q = require('q');
const fs = require('fs');
const rp = require('request-promise');

// const LAT_LONGS = require('../raw/cities-temp-lat-long');
const LAT_LONGS = require('../raw/lat-long-retry')
    .map(({lat, long}) => {
        return {
            lat: lat.toString().replace('/ /g',''),
            long: long.toString().replace('/ /g',''),
        }
    });
const API_KEY = 'Not Here' // Get from the footprint finder project on google console.
const BASE_URL = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='

const totalRecords = LAT_LONGS.length;
let completed = 0;
const GOOD_RESULTS = [];
const MULTIPLE_RESULTS = [];
const NO_RESULTS = [];

const parseZipAndAddress = (res, { lat, long }) => {
    const components = res.results[0].address_components;
    const formattedAddress = res.results[0].formatted_address;
    const zips = components
        .filter(component => component.types.includes('postal_code'))
        .map(component => component['short_name'])
    if(zips.length === 1) {
        GOOD_RESULTS.push([lat,long, zips[0], formattedAddress]);
        completed++;
        console.log('GOOD: ' + completed + '/' + totalRecords + 'total');
        return zips[0];
    } else if (zips.length > 1) {
        MULTIPLE_RESULTS.push([lat,long, ...zips]);
        completed++;
        console.log('MULTIPLE: ' + completed + ' completed/ ' + totalRecords + 'total');
    } else {
        NO_RESULTS.push([lat,long]);
        completed++;
        console.log('NONE: ' + completed + ' completed/ ' + totalRecords + 'total');
    }
    return null;
}
 
const processRecord = async ({lat, long}) => {
    const recordPromise = Q.defer();
    const url = `${BASE_URL}${lat},${long}&key=${API_KEY}`;
    return rp(url)
        .then(res => JSON.parse(res))
        .then(res => {
            parseZipAndAddress(res, {lat, long})
            recordPromise.resolve('Success');
        })
        .catch(function(err){
            NO_RESULTS.push([lat,long]);
            completed++;
            console.log('ERROR: ' + completed + '/' + totalRecords + ' total.  Error on url: ' + url);
            recordPromise.reject('Failure');
        });
};

const writeSuccesses = () => {
    const data = GOOD_RESULTS.reduce((acc, current) => acc + current.toString() + '\r\n', 'Latitude,Longitude,Zip Code, Full Address\r\n');
    fs.writeFile(__dirname + "/../formatted/footprint/zip-code-resolutions.csv", data, function(err) {
        if(err) {
            return console.log(err);
        }
        
        console.log("Lat Longs resolve to zips data written to formatted/zip-code-resolutions");
    });
};

const writeNoResults = () => {
    const data = NO_RESULTS.reduce((acc, current) => acc + current.toString() + '\r\n', 'Latitude,Longitude\r\n');
    fs.writeFile(__dirname + "/../formatted/footprint/zip-code-resolutions-no-results.csv", data, function(err) {
        if(err) {
            return console.log(err);
        }
        
        console.log("Lat Longs resolve to zips data written to formatted/zip-code-resolutions-no-results");
    });
};

const writeMultipleResults = () => {
    const data = MULTIPLE_RESULTS.reduce((acc, current) => acc + current.toString() + '\r\n', 'Latitude,Longitude,Postal Code, Zip1,Zip2,Zip3,Zip4\r\n');
    fs.writeFile(__dirname + "/../formatted/footprint/zip-code-resolutions-multiple-results.csv", data, function(err) {
        if(err) {
            return console.log(err);
        }
        
        console.log("Lat Longs resolve to zips data written to formatted/zip-code-resolutions-multiple-results");
    });
};
 
const processAlLRecords = async () => {
    const promises = LAT_LONGS.map(({lat, long}, index) => {
        return processRecord({lat, long});
    }).filter(promise => promise !== null);
    await Q.all(promises);
    writeSuccesses();
    writeNoResults();
    writeMultipleResults();
};

setTimeout(() => {
    console.log('TIMEOUT WRITING')
    writeSuccesses();
    writeNoResults();
    writeMultipleResults();
}, 150000) // 4 mins
processAlLRecords();


