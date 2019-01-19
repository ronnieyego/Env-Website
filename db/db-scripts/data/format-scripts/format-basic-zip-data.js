const fs = require('fs');
const zipStream = fs.createReadStream('db/db-scripts/data/raw/basic-zip-data.csv');
const csv = require('fast-csv');

const ZIPS = [];
const JSON_ZIPS = {
    '00000': {

    },
    '86005': { // Newer zip.  In temp data but not all zips.
        zip: '86005',
        city: 'Flagstaff',
        county: 'Coconino',
        state: 'AZ',
        lat: 35.081583,
        long: -111.610142
    }
};

const csvStreamZips = csv()
    .on("data", function(data){
        ZIPS.push(data);
    })
    .on("end", function(){
        run();
    });

zipStream.pipe(csvStreamZips);

const writeResults = () => {
    const data = JSON.stringify(JSON_ZIPS, null, 2);
    fs.writeFile('db/db-scripts/data/formatted/basic-zip-data.json', data, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("Basic zip data written");
    });
}

const run = () => {
    ZIPS.forEach(row => {
        const zip = row[0];
        const city = row[1];
        const county = row[2];
        const state = row[3];
        const pop = row[4];
        const lat = row[5];
        const long = row[6];
        JSON_ZIPS[zip] = {
            zip,
            city,
            county,
            state,
            pop,
            lat,
            long
        };
    });
    writeResults();
}